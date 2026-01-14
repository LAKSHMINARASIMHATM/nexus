# Ranking Pipeline Architecture

## Overview
Two-stage ranking system combining efficient candidate retrieval (BM25) with accurate reranking (ML model).

## Pipeline Architecture

\`\`\`
Query → BM25 Retrieval (Top 1000) → ML Reranker (Top 100) → Results
         ↓                            ↓
    Inverted Index            Feature Store + Model
\`\`\`

## Stage 1: BM25 Candidate Retrieval

### BM25 Algorithm

\`\`\`
BM25(q, d) = Σ IDF(qi) · (f(qi, d) · (k1 + 1)) / (f(qi, d) + k1 · (1 - b + b · |d| / avgdl))

Where:
- qi = query term i
- f(qi, d) = term frequency in document d
- |d| = document length
- avgdl = average document length in collection
- k1 = 1.2 (term frequency saturation parameter)
- b = 0.75 (length normalization parameter)
- IDF(qi) = log((N - df(qi) + 0.5) / (df(qi) + 0.5))
\`\`\`

### Implementation

\`\`\`typescript
// BM25 Scorer

interface BM25Params {
  k1: number;  // 1.2
  b: number;   // 0.75
}

class BM25Scorer {
  private params: BM25Params = { k1: 1.2, b: 0.75 };
  private avgDocLength: number;
  private totalDocs: number;
  
  computeScore(
    query: string[], 
    doc: Document, 
    stats: CollectionStats
  ): number {
    let score = 0;
    
    for (const term of query) {
      const tf = doc.termFrequency(term);
      if (tf === 0) continue;
      
      const df = stats.documentFrequency(term);
      const idf = this.computeIDF(df);
      
      const numerator = tf * (this.params.k1 + 1);
      const denominator = tf + this.params.k1 * (
        1 - this.params.b + 
        this.params.b * (doc.length / this.avgDocLength)
      );
      
      score += idf * (numerator / denominator);
    }
    
    return score;
  }
  
  private computeIDF(df: number): number {
    return Math.log(
      (this.totalDocs - df + 0.5) / (df + 0.5) + 1
    );
  }
}
\`\`\`

### Field Boosting

\`\`\`typescript
const FIELD_BOOSTS = {
  title: 2.0,
  anchor: 1.5,
  body: 1.0,
  url: 1.2
};

function computeFieldBoostedScore(
  scores: Map<string, number>
): number {
  let totalScore = 0;
  
  for (const [field, score] of scores) {
    totalScore += score * FIELD_BOOSTS[field];
  }
  
  return totalScore;
}
\`\`\`

## Stage 2: ML Reranker

### Feature Engineering

**Text Features (20):**
- BM25 score (title, body, anchor)
- TF-IDF scores
- Query term coverage
- Exact match signals
- Proximity scores
- Field length ratios

**Link Features (15):**
- PageRank score
- Inbound link count
- Outbound link count
- Anchor text relevance
- Domain authority

**User Features (10):**
- Historical click-through rate (CTR)
- Dwell time
- Bounce rate
- Query-document click history

**Temporal Features (5):**
- Document freshness
- Crawl recency
- Update frequency
- Time-sensitive query detection

**Total: 50+ features**

### Feature Extraction

\`\`\`python
# Python Feature Extractor

import numpy as np
from typing import Dict, List

class FeatureExtractor:
    def __init__(self, feature_store: FeatureStore):
        self.feature_store = feature_store
        
    def extract(self, query: str, doc: Document) -> np.ndarray:
        features = []
        
        # Text features
        features.extend(self._text_features(query, doc))
        
        # Link features
        features.extend(self._link_features(doc))
        
        # User features
        features.extend(self._user_features(query, doc))
        
        # Temporal features
        features.extend(self._temporal_features(doc))
        
        return np.array(features)
    
    def _text_features(self, query: str, doc: Document) -> List[float]:
        query_terms = query.split()
        
        return [
            doc.bm25_score,
            doc.title_bm25,
            doc.body_bm25,
            doc.anchor_bm25,
            self._query_coverage(query_terms, doc),
            self._exact_match_score(query, doc),
            self._proximity_score(query_terms, doc),
            doc.title_length / 100.0,  # Normalized
            doc.body_length / 5000.0,
            self._term_position_score(query_terms, doc),
        ]
    
    def _link_features(self, doc: Document) -> List[float]:
        return [
            doc.pagerank,
            np.log1p(doc.inbound_links),
            np.log1p(doc.outbound_links),
            doc.domain_authority,
            doc.anchor_text_relevance,
        ]
    
    def _user_features(self, query: str, doc: Document) -> List[float]:
        stats = self.feature_store.get_user_stats(query, doc.doc_id)
        
        return [
            stats.ctr,
            stats.avg_dwell_time / 60.0,  # Normalized to minutes
            1.0 - stats.bounce_rate,
            stats.click_count,
        ]
    
    def _temporal_features(self, doc: Document) -> List[float]:
        now = time.time()
        crawl_age = (now - doc.crawl_timestamp) / 86400.0  # Days
        
        return [
            1.0 / (1.0 + crawl_age),  # Freshness score
            doc.update_frequency,
            self._time_sensitivity_score(doc),
        ]
    
    def _query_coverage(self, query_terms: List[str], doc: Document) -> float:
        covered = sum(1 for term in query_terms if term in doc.terms)
        return covered / len(query_terms) if query_terms else 0.0
    
    def _exact_match_score(self, query: str, doc: Document) -> float:
        query_lower = query.lower()
        
        if query_lower in doc.title.lower():
            return 1.0
        elif query_lower in doc.body.lower():
            return 0.5
        return 0.0
    
    def _proximity_score(self, query_terms: List[str], doc: Document) -> float:
        """Calculate how close query terms appear together"""
        positions = []
        for term in query_terms:
            if term in doc.term_positions:
                positions.append(doc.term_positions[term])
        
        if len(positions) < 2:
            return 0.0
        
        # Find minimum span containing all terms
        min_span = float('inf')
        # ... implementation details
        
        return 1.0 / (1.0 + min_span)
\`\`\`

### Model Architecture

**Option 1: LightGBM (GBDT)**
\`\`\`python
import lightgbm as lgb

# Model configuration
params = {
    'objective': 'lambdarank',
    'metric': 'ndcg',
    'ndcg_eval_at': [1, 3, 5, 10],
    'num_leaves': 255,
    'learning_rate': 0.1,
    'feature_fraction': 0.8,
    'bagging_fraction': 0.8,
    'bagging_freq': 5,
    'max_depth': 10,
}

# Train model
model = lgb.train(
    params,
    train_data,
    num_boost_round=1000,
    valid_sets=[valid_data],
    early_stopping_rounds=50
)
\`\`\`

**Option 2: Small Transformer (BERT-tiny)**
\`\`\`python
from transformers import AutoModel, AutoTokenizer

class TransformerReranker:
    def __init__(self):
        self.model = AutoModel.from_pretrained('prajjwal1/bert-tiny')
        self.tokenizer = AutoTokenizer.from_pretrained('prajjwal1/bert-tiny')
        self.classifier = nn.Linear(128, 1)  # BERT-tiny hidden size
    
    def forward(self, query: str, doc_title: str, doc_snippet: str):
        # Concatenate query + doc
        text = f"[CLS] {query} [SEP] {doc_title} {doc_snippet} [SEP]"
        
        # Tokenize
        inputs = self.tokenizer(
            text, 
            return_tensors='pt',
            max_length=256,
            truncation=True
        )
        
        # Get embeddings
        outputs = self.model(**inputs)
        cls_embedding = outputs.last_hidden_state[:, 0, :]
        
        # Classify
        score = self.classifier(cls_embedding)
        return score
\`\`\`

### Model Serving

\`\`\`python
# TensorFlow Serving with batching

import tensorflow as tf
from tensorflow_serving.apis import predict_pb2, prediction_service_pb2_grpc

class ModelServer:
    def __init__(self, model_name: str, server_address: str):
        self.channel = grpc.insecure_channel(server_address)
        self.stub = prediction_service_pb2_grpc.PredictionServiceStub(
            self.channel
        )
        self.model_name = model_name
    
    async def predict_batch(self, features: List[np.ndarray]) -> List[float]:
        # Create request
        request = predict_pb2.PredictRequest()
        request.model_spec.name = self.model_name
        request.model_spec.signature_name = 'serving_default'
        
        # Batch features
        batched = np.vstack(features)
        request.inputs['features'].CopyFrom(
            tf.make_tensor_proto(batched, shape=batched.shape)
        )
        
        # Async prediction
        result = await self.stub.Predict.future(request)
        
        # Parse scores
        scores = tf.make_ndarray(result.outputs['scores'])
        return scores.tolist()
\`\`\`

### Ranking Aggregation

\`\`\`typescript
// Combine BM25 + PageRank + ML scores

interface RankingSignals {
  bm25Score: number;
  pagerank: number;
  mlScore: number;
}

function computeFinalScore(signals: RankingSignals): number {
  // Learned weights from experimentation
  const weights = {
    bm25: 0.4,
    pagerank: 0.2,
    ml: 0.4
  };
  
  return (
    weights.bm25 * normalize(signals.bm25Score, 0, 50) +
    weights.pagerank * signals.pagerank +
    weights.ml * sigmoid(signals.mlScore)
  );
}

function normalize(value: number, min: number, max: number): number {
  return (value - min) / (max - min);
}

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}
\`\`\`

## Query Understanding

### Query Classification

\`\`\`python
# Classify query intent

class QueryClassifier:
    INTENTS = ['navigational', 'informational', 'transactional']
    
    def classify(self, query: str) -> str:
        # Navigational: brand names, domains
        if self._is_navigational(query):
            return 'navigational'
        
        # Transactional: buy, purchase, price
        if self._contains_transactional_keywords(query):
            return 'transactional'
        
        return 'informational'
    
    def _is_navigational(self, query: str) -> bool:
        # Check for domain patterns
        if re.search(r'\.(com|org|net)', query):
            return True
        
        # Check against known brand list
        return any(brand in query.lower() for brand in BRANDS)
\`\`\`

### Spell Correction

\`\`\`python
# SymSpell algorithm for fast spell correction

from symspellpy import SymSpell

class SpellCorrector:
    def __init__(self):
        self.sym_spell = SymSpell(max_dictionary_edit_distance=2)
        self.sym_spell.load_dictionary("frequency_dict.txt", 0, 1)
    
    def correct(self, query: str) -> str:
        suggestions = self.sym_spell.lookup_compound(
            query, 
            max_edit_distance=2
        )
        
        if suggestions:
            return suggestions[0].term
        return query
\`\`\`

## Evaluation Metrics

### NDCG@k (Normalized Discounted Cumulative Gain)

\`\`\`python
def ndcg_at_k(relevance_scores: List[int], k: int) -> float:
    """
    Calculate NDCG@k
    relevance_scores: Ground truth relevance [3, 2, 3, 0, 1, 2]
    """
    def dcg(scores, k):
        scores = scores[:k]
        return sum(
            (2 ** rel - 1) / np.log2(i + 2) 
            for i, rel in enumerate(scores)
        )
    
    actual_dcg = dcg(relevance_scores, k)
    ideal_dcg = dcg(sorted(relevance_scores, reverse=True), k)
    
    return actual_dcg / ideal_dcg if ideal_dcg > 0 else 0.0
\`\`\`

### Mean Reciprocal Rank (MRR)

\`\`\`python
def mean_reciprocal_rank(results: List[List[bool]]) -> float:
    """
    results: [[False, True, False], [True, False], ...]
    """
    rr_sum = 0
    for result in results:
        for i, is_relevant in enumerate(result):
            if is_relevant:
                rr_sum += 1 / (i + 1)
                break
    
    return rr_sum / len(results)
\`\`\`

## Configuration

\`\`\`yaml
ranking:
  stage1_bm25:
    k1: 1.2
    b: 0.75
    top_k: 1000
    field_boosts:
      title: 2.0
      anchor: 1.5
      body: 1.0
      url: 1.2
  
  stage2_reranker:
    model_type: lightgbm  # or 'transformer'
    model_path: /models/ranker_v1.txt
    batch_size: 32
    timeout_ms: 50
    top_k: 100
  
  final_ranking:
    bm25_weight: 0.4
    pagerank_weight: 0.2
    ml_weight: 0.4
  
  features:
    enable_user_features: true
    enable_temporal_features: true
    feature_store_timeout_ms: 10
