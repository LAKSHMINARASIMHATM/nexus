# Data Models & Database Schemas

## PostgreSQL Schemas

### Document Metadata

\`\`\`sql
-- documents table
CREATE TABLE documents (
    doc_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    url TEXT NOT NULL UNIQUE,
    canonical_url TEXT,
    title TEXT NOT NULL,
    meta_description TEXT,
    body_length INTEGER NOT NULL,
    language VARCHAR(10) DEFAULT 'en',
    content_hash CHAR(64) NOT NULL, -- SHA-256
    simhash BIGINT, -- For near-duplicate detection
    pagerank DOUBLE PRECISION DEFAULT 0.0,
    crawl_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    last_modified TIMESTAMP WITH TIME ZONE,
    index_status VARCHAR(20) DEFAULT 'pending', -- pending, indexed, failed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_documents_url ON documents(url);
CREATE INDEX idx_documents_content_hash ON documents(content_hash);
CREATE INDEX idx_documents_simhash ON documents(simhash);
CREATE INDEX idx_documents_pagerank ON documents(pagerank DESC);
CREATE INDEX idx_documents_crawl_timestamp ON documents(crawl_timestamp DESC);
CREATE INDEX idx_documents_index_status ON documents(index_status);
\`\`\`

### Link Graph

\`\`\`sql
-- links table
CREATE TABLE links (
    id BIGSERIAL PRIMARY KEY,
    source_doc_id UUID NOT NULL REFERENCES documents(doc_id) ON DELETE CASCADE,
    target_url TEXT NOT NULL,
    target_doc_id UUID REFERENCES documents(doc_id) ON DELETE SET NULL,
    anchor_text TEXT,
    link_type VARCHAR(20), -- internal, external, redirect
    position INTEGER, -- Position in document
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_links_source ON links(source_doc_id);
CREATE INDEX idx_links_target_url ON links(target_url);
CREATE INDEX idx_links_target_doc ON links(target_doc_id);

-- Materialized view for inbound link counts
CREATE MATERIALIZED VIEW inbound_link_counts AS
SELECT 
    target_doc_id,
    COUNT(*) as inbound_count,
    COUNT(DISTINCT source_doc_id) as unique_sources
FROM links
WHERE target_doc_id IS NOT NULL
GROUP BY target_doc_id;

CREATE INDEX idx_inbound_counts_doc ON inbound_link_counts(target_doc_id);

-- Refresh schedule: REFRESH MATERIALIZED VIEW CONCURRENTLY inbound_link_counts;
\`\`\`

### Crawl Queue

\`\`\`sql
-- crawl_queue table
CREATE TABLE crawl_queue (
    id BIGSERIAL PRIMARY KEY,
    url TEXT NOT NULL UNIQUE,
    priority INTEGER NOT NULL DEFAULT 5, -- 1-10 scale
    depth INTEGER NOT NULL DEFAULT 0,
    referrer_url TEXT,
    discovered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    scheduled_at TIMESTAMP WITH TIME ZONE,
    crawled_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'pending', -- pending, in_progress, completed, failed
    retry_count INTEGER DEFAULT 0,
    last_error TEXT,
    metadata JSONB
);

CREATE INDEX idx_crawl_queue_status_priority ON crawl_queue(status, priority DESC);
CREATE INDEX idx_crawl_queue_scheduled ON crawl_queue(scheduled_at);
CREATE INDEX idx_crawl_queue_url ON crawl_queue(url);
\`\`\`

### User Interaction Logs

\`\`\`sql
-- query_logs table
CREATE TABLE query_logs (
    id BIGSERIAL PRIMARY KEY,
    query_text TEXT NOT NULL,
    query_hash CHAR(64), -- For grouping
    user_id VARCHAR(255), -- Anonymous or authenticated
    session_id VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    results_count INTEGER,
    page INTEGER DEFAULT 1,
    latency_ms INTEGER,
    clicked_doc_id UUID REFERENCES documents(doc_id),
    clicked_position INTEGER,
    dwell_time_seconds INTEGER,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_query_logs_timestamp ON query_logs(timestamp DESC);
CREATE INDEX idx_query_logs_query_hash ON query_logs(query_hash);
CREATE INDEX idx_query_logs_session ON query_logs(session_id);

-- query_suggestions table (for autocomplete)
CREATE TABLE query_suggestions (
    id SERIAL PRIMARY KEY,
    query_text TEXT NOT NULL UNIQUE,
    frequency INTEGER DEFAULT 1,
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_query_suggestions_text ON query_suggestions(query_text text_pattern_ops);
CREATE INDEX idx_query_suggestions_freq ON query_suggestions(frequency DESC);
\`\`\`

### Feature Store

\`\`\`sql
-- document_features table
CREATE TABLE document_features (
    doc_id UUID PRIMARY KEY REFERENCES documents(doc_id) ON DELETE CASCADE,
    pagerank DOUBLE PRECISION,
    inbound_links INTEGER,
    outbound_links INTEGER,
    domain_authority DOUBLE PRECISION,
    avg_anchor_relevance DOUBLE PRECISION,
    historical_ctr DOUBLE PRECISION,
    avg_dwell_time DOUBLE PRECISION,
    bounce_rate DOUBLE PRECISION,
    freshness_score DOUBLE PRECISION,
    update_frequency VARCHAR(20), -- hourly, daily, weekly, monthly
    features_vector DOUBLE PRECISION[], -- ML feature vector
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_document_features_pagerank ON document_features(pagerank DESC);
CREATE INDEX idx_document_features_updated ON document_features(updated_at);
\`\`\`

### Experiments

\`\`\`sql
-- experiments table
CREATE TABLE experiments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    traffic_split DOUBLE PRECISION NOT NULL, -- 0.0 to 1.0
    config JSONB NOT NULL, -- Experiment configuration
    status VARCHAR(20) DEFAULT 'draft', -- draft, active, paused, completed
    started_at TIMESTAMP WITH TIME ZONE,
    ended_at TIMESTAMP WITH TIME ZONE,
    created_by VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- experiment_metrics table
CREATE TABLE experiment_metrics (
    id BIGSERIAL PRIMARY KEY,
    experiment_id UUID NOT NULL REFERENCES experiments(id) ON DELETE CASCADE,
    variant VARCHAR(50) NOT NULL, -- control, treatment
    metric_name VARCHAR(100) NOT NULL,
    metric_value DOUBLE PRECISION NOT NULL,
    sample_size INTEGER NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_experiment_metrics_exp ON experiment_metrics(experiment_id);
CREATE INDEX idx_experiment_metrics_variant ON experiment_metrics(variant);
\`\`\`

## Redis Data Structures

### Query Cache

\`\`\`
Key: query:{query_hash}
Type: String (JSON)
TTL: 300 seconds
Value: {
  "results": [...],
  "total": 12345,
  "timestamp": "2024-01-15T12:00:00Z"
}
\`\`\`

### Rate Limiting

\`\`\`
Key: ratelimit:{api_key}:{minute}
Type: String (counter)
TTL: 60 seconds
Value: request_count
\`\`\`

### Crawler Host Locks

\`\`\`
Key: crawler:host:{hostname}
Type: String
TTL: 1 second
Value: worker_id
\`\`\`

### robots.txt Cache

\`\`\`
Key: robots:{hostname}
Type: Hash
TTL: 86400 seconds (24 hours)
Fields:
  - rules: JSON string
  - crawl_delay: integer
  - fetched_at: timestamp
\`\`\`

## Kafka Topics

### Crawl Events

\`\`\`yaml
Topic: crawl-events
Partitions: 64
Replication: 3
Schema:
  event_type: string  # discovered, fetched, failed
  url: string
  priority: integer
  metadata:
    referrer: string
    depth: integer
    discovered_at: timestamp
\`\`\`

### Index Updates

\`\`\`yaml
Topic: index-updates
Partitions: 64
Replication: 3
Schema:
  doc_id: string
  operation: string  # create, update, delete
  document:
    url: string
    title: string
    body: string
    metadata: object
  timestamp: timestamp
\`\`\`

### Click Events

\`\`\`yaml
Topic: click-events
Partitions: 32
Replication: 3
Schema:
  query: string
  doc_id: string
  position: integer
  timestamp: timestamp
  session_id: string
\`\`\`

## Elasticsearch Mappings

### Search Index

\`\`\`json
{
  "settings": {
    "number_of_shards": 64,
    "number_of_replicas": 2,
    "refresh_interval": "30s",
    "index": {
      "codec": "best_compression",
      "max_result_window": 10000
    },
    "analysis": {
      "analyzer": {
        "custom_analyzer": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": ["lowercase", "porter_stem", "stop"]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "url": {
        "type": "keyword"
      },
      "canonical_url": {
        "type": "keyword"
      },
      "title": {
        "type": "text",
        "analyzer": "custom_analyzer",
        "fields": {
          "raw": {
            "type": "keyword"
          },
          "ngram": {
            "type": "text",
            "analyzer": "ngram_analyzer"
          }
        },
        "term_vector": "with_positions_offsets"
      },
      "body": {
        "type": "text",
        "analyzer": "custom_analyzer",
        "term_vector": "with_positions_offsets",
        "store": false
      },
      "meta_description": {
        "type": "text",
        "analyzer": "custom_analyzer"
      },
      "anchor_texts": {
        "type": "text",
        "analyzer": "custom_analyzer"
      },
      "headings": {
        "type": "text",
        "analyzer": "custom_analyzer"
      },
      "doc_length": {
        "type": "integer"
      },
      "pagerank": {
        "type": "float"
      },
      "language": {
        "type": "keyword"
      },
      "domain": {
        "type": "keyword"
      },
      "crawl_timestamp": {
        "type": "date"
      },
      "content_hash": {
        "type": "keyword"
      }
    }
  }
}
\`\`\`

## Data Flow Diagram

\`\`\`
Crawler → PostgreSQL (metadata) → Kafka (index-updates) → Indexer → Elasticsearch
                                                                           │
User Query → API Gateway → Query Service → Elasticsearch ← Ranker ─────────┘
                                    │
                                    ├─→ Redis (cache)
                                    └─→ PostgreSQL (features) → ML Model
\`\`\`

## Partitioning Strategy

### PostgreSQL Partitioning

\`\`\`sql
-- Partition query_logs by month
CREATE TABLE query_logs (
    id BIGSERIAL,
    query_text TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ...
) PARTITION BY RANGE (timestamp);

CREATE TABLE query_logs_2024_01 PARTITION OF query_logs
FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

CREATE TABLE query_logs_2024_02 PARTITION OF query_logs
FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');

-- Auto-create new partitions monthly
CREATE OR REPLACE FUNCTION create_monthly_partition()
RETURNS void AS $$
DECLARE
    start_date DATE;
    end_date DATE;
    partition_name TEXT;
BEGIN
    start_date := DATE_TRUNC('month', NOW() + INTERVAL '1 month');
    end_date := start_date + INTERVAL '1 month';
    partition_name := 'query_logs_' || TO_CHAR(start_date, 'YYYY_MM');
    
    EXECUTE format(
        'CREATE TABLE IF NOT EXISTS %I PARTITION OF query_logs
         FOR VALUES FROM (%L) TO (%L)',
        partition_name, start_date, end_date
    );
END;
$$ LANGUAGE plpgsql;
