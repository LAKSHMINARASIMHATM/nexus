# System Architecture

## High-Level Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                         INTERNET                                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CRAWLING LAYER                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Crawler    │  │   Crawler    │  │   Crawler    │          │
│  │   Worker 1   │  │   Worker 2   │  │  Worker N    │ (1000+)  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                  │                   │
│         └─────────────────┴──────────────────┘                   │
│                           │                                      │
│                           ▼                                      │
│                  ┌─────────────────┐                             │
│                  │  Crawl Queue    │                             │
│                  │    (Kafka)      │                             │
│                  └────────┬────────┘                             │
└───────────────────────────┼──────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   PROCESSING LAYER                               │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Document Processor Pool                      │   │
│  │  • HTML Parsing  • Text Extraction  • Link Extraction    │   │
│  │  • Language Detection  • Metadata Extraction             │   │
│  └──────────────────┬───────────────────────────────────────┘   │
│                     │                                            │
│         ┌───────────┴───────────┬──────────────┐                │
│         ▼                       ▼              ▼                │
│  ┌─────────────┐       ┌──────────────┐  ┌──────────┐          │
│  │   Content   │       │  Link Graph  │  │ Indexing │          │
│  │ Deduplicator│       │   Builder    │  │  Queue   │          │
│  └─────────────┘       └──────┬───────┘  └────┬─────┘          │
│                               │                │                │
└───────────────────────────────┼────────────────┼────────────────┘
                                │                │
                                ▼                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GRAPH COMPUTATION                             │
│               ┌───────────────────────┐                          │
│               │   PageRank Engine     │                          │
│               │   (MapReduce/Spark)   │                          │
│               └───────────┬───────────┘                          │
│                           │                                      │
│                           ▼                                      │
│                  ┌─────────────────┐                             │
│                  │  Authority DB   │                             │
│                  │  (PostgreSQL)   │                             │
│                  └─────────────────┘                             │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    INDEXING LAYER                                │
│                                                                  │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌──────────┐  │
│  │   Shard 0  │  │   Shard 1  │  │   Shard 2  │  │ Shard N  │  │
│  │ (terms a-c)│  │ (terms d-f)│  │ (terms g-i)│  │  (...)   │  │
│  └────────────┘  └────────────┘  └────────────┘  └──────────┘  │
│                                                                  │
│              Inverted Index (Elasticsearch)                      │
│              • 3x Replication  • Auto-sharding                   │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      QUERY LAYER                                 │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                   API Gateway                             │   │
│  │          (Rate Limiting, Auth, TLS)                      │   │
│  └────────────────────────┬─────────────────────────────────┘   │
│                           │                                     │
│                           ▼                                     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                Query Coordinator                          │   │
│  │   • Query Parsing  • Spell Check  • Shard Fanout         │   │
│  └──────────┬───────────────────────────────────┬───────────┘   │
│             │                                   │               │
│             ▼                                   ▼               │
│  ┌──────────────────┐              ┌──────────────────┐        │
│  │  Redis Cache     │              │ Feature Store    │        │
│  │  (Query Cache)   │              │ (Ranking Signals)│        │
│  └──────────────────┘              └──────────────────┘        │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    RANKING LAYER                                 │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Stage 1: Candidate Retrieval                 │   │
│  │                    BM25 Scoring                           │   │
│  │           (Retrieve Top 1000 Documents)                   │   │
│  └────────────────────────┬─────────────────────────────────┘   │
│                           │                                     │
│                           ▼                                     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Stage 2: ML Reranker                         │   │
│  │        GBDT/Transformer (Rerank Top 100)                  │   │
│  │  Features: BM25, PageRank, Click-through, Freshness      │   │
│  └────────────────────────┬─────────────────────────────────┘   │
│                           │                                     │
│                           ▼                                     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │            Snippet Generator + Highlighter                │   │
│  └────────────────────────┬─────────────────────────────────┘   │
└────────────────────────────┼─────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                            │
│                                                                  │
│  ┌──────────────┐         ┌──────────────┐                      │
│  │  Search API  │         │  Admin UI    │                      │
│  │  (REST/gRPC) │         │  Dashboard   │                      │
│  └──────────────┘         └──────────────┘                      │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

## Component Details

### 1. Crawling Layer
- **Crawl Coordinator**: Manages crawl queue priorities, respects politeness policies
- **Worker Fleet**: 1,000+ distributed workers (Kubernetes pods)
- **URL Frontier**: Priority queue with host-based rate limiting
- **robots.txt Cache**: Distributed cache for robots.txt rules
- **Bloom Filter**: Fast URL deduplication check

### 2. Processing Layer
- **Parser Service**: HTML cleaning, term extraction, tokenization
- **Link Extractor**: Anchor text collection, outbound link discovery
- **Content Hasher**: MinHash/SimHash for near-duplicate detection
- **Language Detector**: Multi-language support (fastText)
- **Metadata Extractor**: Title, description, structured data

### 3. Graph Computation
- **Link Graph Store**: Compressed adjacency list (PostgreSQL/Cassandra)
- **PageRank Engine**: Batch computation (Apache Spark)
- **Update Frequency**: Daily for full graph, hourly for incremental

### 4. Indexing Layer
- **Inverted Index**: Elasticsearch with term-based sharding
- **Positions Index**: For phrase query support
- **Document Store**: Metadata and original content snippets
- **Shard Strategy**: Hash(term) % num_shards
- **Replication**: 3x replication for high availability

### 5. Query Layer
- **Query Parser**: Operator support (AND, OR, phrase, site:, inurl:)
- **Spell Corrector**: SymSpell algorithm with query logs
- **Query Suggester**: Trie-based autocomplete
- **Cache**: Redis with TTL-based invalidation

### 6. Ranking Layer
- **BM25 Scorer**: k1=1.2, b=0.75 tuned parameters
- **Feature Extractor**: 50+ signals (text, link, user, temporal)
- **ML Model**: LightGBM or small BERT model
- **Serving**: TensorFlow Serving with batching

## Data Flow

### Indexing Pipeline
\`\`\`
URL → Crawl Queue → Crawler → Raw HTML → Parser → Clean Text
                                                       │
                                                       ▼
                                          ┌─── Link Graph Builder
                                          │
                                          └─── Indexer → Inverted Index
\`\`\`

### Query Pipeline
\`\`\`
User Query → API Gateway → Query Parser → Cache Check
                                              │
                                    Cache Miss│
                                              ▼
                              Shard Fanout (Parallel)
                                              │
                         ┌────────────────────┼────────────────────┐
                         ▼                    ▼                    ▼
                    Shard 0              Shard 1              Shard N
                    (BM25)               (BM25)               (BM25)
                         │                    │                    │
                         └────────────────────┼────────────────────┘
                                              ▼
                                     Merge Top 1000
                                              │
                                              ▼
                                      ML Reranker
                                              │
                                              ▼
                                  Snippet Generation
                                              │
                                              ▼
                                       Response
\`\`\`

## Scalability Strategy

### Horizontal Scaling
- **Crawlers**: Stateless workers (scale to 1000+)
- **Index Shards**: Add shards with consistent hashing
- **Query Servers**: Autoscaling based on QPS
- **Rankers**: Batch inference with model parallelism

### Vertical Optimization
- **Index Compression**: Variable-byte encoding, delta encoding
- **Query Optimization**: Early termination, skip pointers
- **Caching**: Multi-tier (L1: local, L2: Redis, L3: CDN)

### Geographic Distribution
- **Regions**: US-East, US-West, EU-West, Asia-Pacific
- **Index Replication**: Full replication in each region
- **Query Routing**: GeoDNS + edge routing
