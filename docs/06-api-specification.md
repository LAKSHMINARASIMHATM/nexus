# API Specification

## Search API

### POST /api/v1/search

**Request:**
\`\`\`json
{
  "query": "machine learning tutorials",
  "page": 1,
  "page_size": 10,
  "filters": {
    "language": "en",
    "date_range": {
      "start": "2024-01-01",
      "end": "2024-12-31"
    },
    "site": "example.com"
  },
  "options": {
    "safe_search": true,
    "spell_correct": true
  }
}
\`\`\`

**Response:**
\`\`\`json
{
  "query": {
    "original": "machne learning tutorials",
    "corrected": "machine learning tutorials",
    "intent": "informational"
  },
  "results": [
    {
      "doc_id": "abc123",
      "url": "https://example.com/ml-guide",
      "title": "Complete Machine Learning Tutorial",
      "snippet": "Learn <em>machine learning</em> from scratch with this comprehensive <em>tutorial</em>...",
      "score": 0.95,
      "highlights": [
        "machine learning",
        "tutorials"
      ],
      "metadata": {
        "author": "John Doe",
        "published_date": "2024-06-15",
        "language": "en"
      }
    }
  ],
  "total_results": 1523400,
  "page": 1,
  "page_size": 10,
  "query_time_ms": 145,
  "suggestions": [
    "machine learning tutorial for beginners",
    "machine learning tutorial python"
  ]
}
\`\`\`

### GET /api/v1/suggest

**Auto-complete suggestions**

\`\`\`
GET /api/v1/suggest?q=machine+lear&limit=10
\`\`\`

**Response:**
\`\`\`json
{
  "query": "machine lear",
  "suggestions": [
    {
      "text": "machine learning",
      "frequency": 1250000
    },
    {
      "text": "machine learning python",
      "frequency": 850000
    },
    {
      "text": "machine learning tutorial",
      "frequency": 650000
    }
  ]
}
\`\`\`

## Admin APIs

### POST /api/v1/admin/crawl

**Trigger crawl for specific URLs**

\`\`\`json
{
  "urls": [
    "https://example.com",
    "https://another.com"
  ],
  "priority": "high",
  "recrawl": false
}
\`\`\`

**Response:**
\`\`\`json
{
  "job_id": "crawl-job-12345",
  "status": "queued",
  "urls_queued": 2,
  "estimated_time_minutes": 15
}
\`\`\`

### GET /api/v1/admin/crawl/status/:job_id

\`\`\`json
{
  "job_id": "crawl-job-12345",
  "status": "in_progress",
  "progress": {
    "total_urls": 2,
    "completed": 1,
    "failed": 0,
    "in_progress": 1
  },
  "started_at": "2024-01-15T10:30:00Z",
  "details": [
    {
      "url": "https://example.com",
      "status": "completed",
      "pages_crawled": 245,
      "duration_seconds": 120
    },
    {
      "url": "https://another.com",
      "status": "in_progress",
      "pages_crawled": 102,
      "duration_seconds": 45
    }
  ]
}
\`\`\`

### GET /api/v1/admin/index/stats

\`\`\`json
{
  "index": {
    "total_documents": 10523400,
    "total_terms": 5420000,
    "total_size_gb": 3200,
    "shards": {
      "total": 64,
      "active": 64,
      "relocating": 0,
      "initializing": 0,
      "unassigned": 0
    },
    "replication": {
      "factor": 3,
      "lag_seconds": 2.5
    }
  },
  "health": {
    "status": "green",
    "nodes": 21,
    "data_nodes": 21
  },
  "performance": {
    "indexing_rate_docs_per_sec": 1250,
    "search_rate_queries_per_sec": 45000,
    "avg_search_latency_ms": 125
  },
  "freshness": {
    "last_update": "2024-01-15T12:00:00Z",
    "avg_document_age_hours": 4.2,
    "high_priority_age_hours": 1.8
  }
}
\`\`\`

### GET /api/v1/admin/metrics

\`\`\`json
{
  "period": "1h",
  "metrics": {
    "queries": {
      "total": 162000,
      "success_rate": 0.998,
      "avg_latency_ms": 145,
      "p50_latency_ms": 120,
      "p95_latency_ms": 185,
      "p99_latency_ms": 245
    },
    "crawler": {
      "urls_crawled": 125000,
      "urls_queued": 45000,
      "success_rate": 0.94,
      "avg_fetch_time_ms": 850,
      "bandwidth_mbps": 450
    },
    "indexing": {
      "documents_indexed": 118000,
      "indexing_rate": 32.8,
      "avg_indexing_latency_ms": 45
    },
    "cache": {
      "hit_rate": 0.72,
      "evictions_per_min": 125,
      "size_gb": 48
    }
  }
}
\`\`\`

## Experiment API

### POST /api/v1/experiments

**Create ranking experiment (A/B test)**

\`\`\`json
{
  "name": "pagerank-weight-test",
  "description": "Test increasing PageRank weight from 0.2 to 0.3",
  "traffic_split": 0.1,
  "config": {
    "ranking": {
      "bm25_weight": 0.4,
      "pagerank_weight": 0.3,
      "ml_weight": 0.3
    }
  },
  "metrics": [
    "ndcg@10",
    "ctr",
    "dwell_time"
  ],
  "duration_days": 7
}
\`\`\`

**Response:**
\`\`\`json
{
  "experiment_id": "exp-789",
  "status": "active",
  "started_at": "2024-01-15T14:00:00Z",
  "ends_at": "2024-01-22T14:00:00Z"
}
\`\`\`

### GET /api/v1/experiments/:id/results

\`\`\`json
{
  "experiment_id": "exp-789",
  "name": "pagerank-weight-test",
  "status": "completed",
  "results": {
    "control": {
      "queries": 450000,
      "metrics": {
        "ndcg@10": 0.951,
        "ctr": 0.385,
        "avg_dwell_time_seconds": 125
      }
    },
    "treatment": {
      "queries": 50000,
      "metrics": {
        "ndcg@10": 0.958,
        "ctr": 0.392,
        "avg_dwell_time_seconds": 132
      }
    },
    "statistical_significance": {
      "ndcg@10": {
        "p_value": 0.002,
        "significant": true,
        "lift": 0.7
      },
      "ctr": {
        "p_value": 0.018,
        "significant": true,
        "lift": 1.8
      }
    }
  },
  "recommendation": "deploy"
}
\`\`\`

## Rate Limiting

All API endpoints are rate limited:

\`\`\`
Rate Limits:
- Search API: 1000 requests/minute per API key
- Admin API: 100 requests/minute per API key
- Suggest API: 2000 requests/minute per API key

Headers:
  X-RateLimit-Limit: 1000
  X-RateLimit-Remaining: 873
  X-RateLimit-Reset: 1642252800
\`\`\`

## Authentication

\`\`\`
Authorization: Bearer <API_KEY>
\`\`\`

**API Key Format:**
\`\`\`
sk_live_abc123def456ghi789
\`\`\`

## Error Responses

\`\`\`json
{
  "error": {
    "code": "INVALID_QUERY",
    "message": "Query string is required",
    "details": {
      "field": "query",
      "constraint": "non_empty"
    }
  },
  "request_id": "req_xyz789"
}
\`\`\`

**Error Codes:**
- `INVALID_QUERY`: Malformed query
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `UNAUTHORIZED`: Invalid API key
- `INTERNAL_ERROR`: Server error
- `TIMEOUT`: Query exceeded time limit
