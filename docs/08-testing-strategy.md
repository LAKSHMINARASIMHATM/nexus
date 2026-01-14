# Testing & Quality Assurance Strategy

## Unit Testing

### Crawler Tests

\`\`\`typescript
// tests/crawler.test.ts

import { describe, it, expect, beforeEach } from '@jest/globals';
import { CrawlerWorker } from '../src/crawler/worker';
import { RobotsCache } from '../src/crawler/robots-cache';
import { URLDeduplicator } from '../src/crawler/deduplicator';

describe('CrawlerWorker', () => {
  let crawler: CrawlerWorker;
  let robotsCache: RobotsCache;
  let deduplicator: URLDeduplicator;

  beforeEach(() => {
    robotsCache = new RobotsCache();
    deduplicator = new URLDeduplicator();
    crawler = new CrawlerWorker({
      robotsCache,
      deduplicator,
      userAgent: 'TestBot/1.0'
    });
  });

  it('should respect robots.txt disallow rules', async () => {
    const url = 'https://example.com/admin';
    
    // Mock robots.txt with /admin disallowed
    robotsCache.set('example.com', {
      rules: [{ path: '/admin', allow: false }],
      crawlDelay: 1
    });

    const allowed = await crawler.isAllowed(url);
    expect(allowed).toBe(false);
  });

  it('should deduplicate URLs', async () => {
    const url = 'https://example.com/page';
    
    const firstCrawl = await crawler.shouldCrawl(url);
    expect(firstCrawl).toBe(true);
    
    const secondCrawl = await crawler.shouldCrawl(url);
    expect(secondCrawl).toBe(false);
  });

  it('should handle fetch timeouts', async () => {
    const url = 'https://slow-site.com/page';
    
    const result = await crawler.crawl(url, { timeout: 100 });
    
    expect(result.error).toBeDefined();
    expect(result.error).toContain('timeout');
  });
});
\`\`\`

### Ranking Tests

\`\`\`python
# tests/test_ranking.py

import unittest
import numpy as np
from src.ranking.bm25_scorer import BM25Scorer
from src.ranking.feature_extractor import FeatureExtractor
from src.ranking.ml_reranker import MLReranker

class TestBM25Scorer(unittest.TestCase):
    def setUp(self):
        self.scorer = BM25Scorer(k1=1.2, b=0.75)
        self.scorer.avg_doc_length = 1000
        self.scorer.total_docs = 1000000
    
    def test_score_calculation(self):
        query = ["machine", "learning"]
        doc = {
            "terms": {"machine": 5, "learning": 3},
            "length": 1000
        }
        stats = {
            "document_frequency": {"machine": 50000, "learning": 30000}
        }
        
        score = self.scorer.compute_score(query, doc, stats)
        
        self.assertGreater(score, 0)
        self.assertLess(score, 100)
    
    def test_term_saturation(self):
        """Test that BM25 saturates term frequency"""
        query = ["test"]
        stats = {"document_frequency": {"test": 1000}}
        
        doc_low_tf = {"terms": {"test": 1}, "length": 1000}
        doc_high_tf = {"terms": {"test": 100}, "length": 1000}
        
        score_low = self.scorer.compute_score(query, doc_low_tf, stats)
        score_high = self.scorer.compute_score(query, doc_high_tf, stats)
        
        # High TF should score higher, but not 100x higher
        self.assertGreater(score_high, score_low)
        self.assertLess(score_high / score_low, 10)


class TestFeatureExtractor(unittest.TestCase):
    def setUp(self):
        self.extractor = FeatureExtractor()
    
    def test_feature_shape(self):
        query = "machine learning tutorial"
        doc = {
            "title": "Machine Learning Tutorial",
            "body": "Learn machine learning...",
            "pagerank": 0.5
        }
        
        features = self.extractor.extract(query, doc)
        
        self.assertEqual(features.shape, (50,))
    
    def test_exact_match_feature(self):
        query = "machine learning"
        doc_with_match = {
            "title": "Machine Learning Guide",
            "body": "...",
            "pagerank": 0.5
        }
        doc_without_match = {
            "title": "AI Tutorial",
            "body": "...",
            "pagerank": 0.5
        }
        
        features_with = self.extractor.extract(query, doc_with_match)
        features_without = self.extractor.extract(query, doc_without_match)
        
        # Exact match feature should be different
        self.assertNotEqual(features_with[5], features_without[5])


class TestMLReranker(unittest.TestCase):
    def setUp(self):
        self.reranker = MLReranker(model_path="models/test_model.pkl")
    
    def test_batch_prediction(self):
        features = np.random.rand(100, 50)
        
        scores = self.reranker.predict_batch(features)
        
        self.assertEqual(len(scores), 100)
        self.assertTrue(all(0 <= s <= 1 for s in scores))
\`\`\`

### Index Tests

\`\`\`typescript
// tests/indexer.test.ts

import { describe, it, expect } from '@jest/globals';
import { Indexer } from '../src/indexing/indexer';
import { Tokenizer } from '../src/indexing/tokenizer';

describe('Indexer', () => {
  let indexer: Indexer;

  beforeEach(() => {
    indexer = new Indexer();
  });

  it('should tokenize and stem terms correctly', () => {
    const text = "Running runners run";
    const tokens = indexer.tokenize(text);
    
    // All should stem to "run"
    expect(tokens).toEqual(['run', 'run', 'run']);
  });

  it('should build correct postings', () => {
    const doc = {
      doc_id: 'doc1',
      title: 'Machine Learning',
      body: 'Machine learning is great. Learning is fun.'
    };

    const postings = indexer.buildPostings(doc);

    expect(postings.get('learning')).toBeDefined();
    expect(postings.get('learning').tf).toBe(2);
    expect(postings.get('learning').positions.length).toBe(2);
  });

  it('should set correct field flags', () => {
    const doc = {
      doc_id: 'doc1',
      title: 'Title word',
      body: 'Body word'
    };

    const postings = indexer.buildPostings(doc);

    const titlePosting = postings.get('title');
    const bodyPosting = postings.get('body');

    expect(titlePosting.field_flags & 0b00001).toBe(1); // Title flag
    expect(bodyPosting.field_flags & 0b00010).toBe(2);  // Body flag
  });
});
\`\`\`

## Integration Testing

\`\`\`typescript
// tests/integration/search-pipeline.test.ts

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { SearchService } from '../src/services/search';
import { TestDataLoader } from './helpers/test-data-loader';

describe('Search Pipeline Integration', () => {
  let searchService: SearchService;
  let testData: TestDataLoader;

  beforeAll(async () => {
    // Load test index
    testData = new TestDataLoader();
    await testData.loadTestDocuments(1000);
    
    searchService = new SearchService();
  });

  afterAll(async () => {
    await testData.cleanup();
  });

  it('should return relevant results for simple query', async () => {
    const results = await searchService.search({
      query: 'machine learning',
      page: 1,
      pageSize: 10
    });

    expect(results.documents.length).toBeGreaterThan(0);
    expect(results.documents[0].title).toMatch(/machine learning/i);
    expect(results.total).toBeGreaterThan(0);
  });

  it('should handle phrase queries', async () => {
    const results = await searchService.search({
      query: '"deep learning"',
      page: 1,
      pageSize: 10
    });

    // All results should contain exact phrase
    results.documents.forEach(doc => {
      expect(doc.snippet.toLowerCase()).toContain('deep learning');
    });
  });

  it('should filter by site', async () => {
    const results = await searchService.search({
      query: 'tutorial',
      page: 1,
      pageSize: 10,
      filters: {
        site: 'example.com'
      }
    });

    results.documents.forEach(doc => {
      expect(doc.url).toContain('example.com');
    });
  });

  it('should meet latency requirements', async () => {
    const start = Date.now();
    
    await searchService.search({
      query: 'test query',
      page: 1,
      pageSize: 10
    });
    
    const latency = Date.now() - start;
    
    expect(latency).toBeLessThan(200); // p95 target
  });
});
\`\`\`

## Load Testing

### Apache JMeter Test Plan

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<jmeterTestPlan version="1.2">
  <hashTree>
    <TestPlan guiclass="TestPlanGui" testname="Search Engine Load Test">
      <stringProp name="TestPlan.comments">50K QPS Load Test</stringProp>
      <boolProp name="TestPlan.functional_mode">false</boolProp>
    </TestPlan>
    
    <hashTree>
      <ThreadGroup guiclass="ThreadGroupGui" testname="Query Load">
        <intProp name="ThreadGroup.num_threads">5000</intProp>
        <intProp name="ThreadGroup.ramp_time">60</intProp>
        <longProp name="ThreadGroup.duration">3600</longProp>
        <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
      </ThreadGroup>
      
      <hashTree>
        <HTTPSamplerProxy guiclass="HttpTestSampleGui" testname="Search Request">
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments">
            <collectionProp name="Arguments.arguments">
              <elementProp name="query" elementType="HTTPArgument">
                <stringProp name="Argument.value">${query}</stringProp>
              </elementProp>
            </collectionProp>
          </elementProp>
          <stringProp name="HTTPSampler.domain">api.search-engine.com</stringProp>
          <stringProp name="HTTPSampler.path">/api/v1/search</stringProp>
          <stringProp name="HTTPSampler.method">POST</stringProp>
        </HTTPSamplerProxy>
        
        <CSVDataSet guiclass="TestBeanGUI" testname="Query Dataset">
          <stringProp name="filename">test_queries.csv</stringProp>
          <stringProp name="variableNames">query</stringProp>
        </CSVDataSet>
        
        <ConstantThroughputTimer>
          <intProp name="throughput">3000000</intProp> <!-- 50K QPS -->
        </ConstantThroughputTimer>
      </hashTree>
    </hashTree>
  </hashTree>
</jmeterTestPlan>
\`\`\`

### K6 Load Test Script

\`\`\`javascript
// tests/load/k6-search-load.js

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const errorRate = new Rate('errors');
const searchLatency = new Trend('search_latency');

export const options = {
  stages: [
    { duration: '2m', target: 100 },   // Ramp up
    { duration: '5m', target: 5000 },  // Ramp to 50K QPS
    { duration: '10m', target: 5000 }, // Sustained load
    { duration: '2m', target: 0 },     // Ramp down
  ],
  thresholds: {
    'http_req_duration': ['p(95)<200'], // 95% < 200ms
    'errors': ['rate<0.01'],             // Error rate < 1%
  },
};

const queries = [
  'machine learning',
  'web development tutorial',
  'python programming',
  'artificial intelligence',
  'cloud computing',
  // ... more test queries
];

export default function () {
  const query = queries[Math.floor(Math.random() * queries.length)];
  
  const payload = JSON.stringify({
    query: query,
    page: 1,
    page_size: 10
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${__ENV.API_KEY}`,
    },
  };

  const start = Date.now();
  const res = http.post(
    'https://api.search-engine.com/api/v1/search',
    payload,
    params
  );
  const duration = Date.now() - start;

  searchLatency.add(duration);

  const success = check(res, {
    'status is 200': (r) => r.status === 200,
    'response has results': (r) => JSON.parse(r.body).results.length > 0,
  });

  errorRate.add(!success);

  sleep(0.01); // 10ms between requests per VU
}
\`\`\`

## Relevance Testing

### Test Query Dataset

\`\`\`python
# tests/relevance/test_queries.py

TEST_QUERIES = [
    {
        "query": "machine learning tutorial",
        "expected_urls": [
            "https://example.com/ml-tutorial",
            "https://tutorial-site.com/machine-learning",
        ],
        "min_ndcg": 0.95
    },
    {
        "query": "python programming",
        "expected_urls": [
            "https://python.org",
            "https://realpython.com",
        ],
        "min_ndcg": 0.93
    },
    # ... 1000+ test queries with judgments
]

def evaluate_relevance():
    results = []
    
    for test_case in TEST_QUERIES:
        search_results = search_service.search(test_case["query"])
        
        # Calculate NDCG@10
        relevance_scores = []
        for result in search_results[:10]:
            if result.url in test_case["expected_urls"]:
                relevance_scores.append(3)  # Highly relevant
            elif is_relevant(result, test_case["query"]):
                relevance_scores.append(2)  # Relevant
            else:
                relevance_scores.append(0)  # Not relevant
        
        ndcg = calculate_ndcg(relevance_scores, k=10)
        
        results.append({
            "query": test_case["query"],
            "ndcg": ndcg,
            "passed": ndcg >= test_case["min_ndcg"]
        })
    
    return results
\`\`\`

## CI/CD Pipeline

\`\`\`yaml
# .github/workflows/test.yml

name: Test & Deploy

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  integration-tests:
    runs-on: ubuntu-latest
    services:
      elasticsearch:
        image: elasticsearch:8.11.0
        env:
          discovery.type: single-node
        ports:
          - 9200:9200
      redis:
        image: redis:7
        ports:
          - 6379:6379
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup environment
        run: |
          npm ci
          npm run seed-test-data
      
      - name: Run integration tests
        run: npm run test:integration

  load-tests:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Install k6
        run: |
          sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
          echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
          sudo apt-get update
          sudo apt-get install k6
      
      - name: Run load tests
        run: k6 run tests/load/k6-search-load.js
        env:
          API_KEY: ${{ secrets.TEST_API_KEY }}

  deploy:
    needs: [unit-tests, integration-tests]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure kubectl
        run: |
          mkdir -p $HOME/.kube
          echo "${{ secrets.KUBECONFIG }}" > $HOME/.kube/config
      
      - name: Deploy to staging
        run: |
          kubectl apply -f k8s/staging/ --namespace=search-engine-staging
      
      - name: Wait for rollout
        run: |
          kubectl rollout status deployment/query-service -n search-engine-staging
          kubectl rollout status deployment/crawler -n search-engine-staging
      
      - name: Run smoke tests
        run: npm run test:smoke -- --env=staging
\`\`\`

## Quality Metrics

**Target Metrics:**
- Unit test coverage: >80%
- Integration test pass rate: 100%
- Load test success: 50K QPS sustained, p95 < 200ms
- Relevance (NDCG@10): ≥95%
- Uptime: 99.95%
- Error rate: <0.1%
