# Search Engine API Documentation

## Base URL
- Development: `http://localhost:3000`
- Production: `https://your-domain.com`

## Authentication
Currently, the API uses session-based tracking without authentication. For programmatic access, API keys can be added in the future.

### Headers
All requests should include:
- `Content-Type: application/json`
- `x-session-id` (optional): Client session identifier
- `x-user-id` (optional): Authenticated user identifier

## Rate Limits
All endpoints have rate limiting to ensure fair usage:

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/v1/search` | 60 requests | 1 minute |
| `/api/v1/suggest` | 120 requests | 1 minute |
| `/api/v1/click` | 100 requests | 1 minute |
| `/api/v1/admin/*` | 10 requests | 1 minute |

Rate limit headers are included in responses:
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Time when limit resets
- `Retry-After`: Seconds to wait (on 429 responses)

## Endpoints

### 1. Search

Perform a full-text search across indexed documents.

**Endpoint:** `POST /api/v1/search`

**Request Body:**
```json
{
  "query": "machine learning",
  "page": 1,
  "page_size": 10,
  "filters": {
    "language": "en",
    "site": "example.com",
    "dateRange": {
      "start": "2024-01-01T00:00:00Z",
      "end": "2024-12-31T23:59:59Z"
    }
  },
  "options": {
    "spell_correct": true,
    "exact_match": false,
    "safe_search": true
  }
}
```

**Parameters:**
- `query` (required): Search query string (1-500 characters)
- `page` (optional): Page number, default: 1, max: 100
- `page_size` (optional): Results per page, default: 10, max: 100
- `filters` (optional):
  - `language`: ISO 639-1 language code (2 characters)
  - `site`: Filter by domain name
  - `dateRange`: Filter by date range (ISO 8601 format)
- `options` (optional):
  - `spell_correct`: Enable spell correction (boolean)
  - `exact_match`: Require exact phrase match (boolean)
  - `safe_search`: Enable safe search filtering (boolean)

**Response (200 OK):**
```json
{
  "query": {
    "original": "machine learning",
    "corrected": null,
    "intent": "informational"
  },
  "results": [
    {
      "doc_id": "550e8400-e29b-41d4-a716-446655440000",
      "url": "https://example.com/ml-guide",
      "title": "Introduction to Machine Learning",
      "snippet": "Machine learning is a subset of artificial intelligence...",
      "score": 0.95,
      "highlights": [
        "Machine <em>learning</em> is a subset...",
        "popular <em>machine</em> <em>learning</em> algorithms"
      ],
      "metadata": {
        "author": "John Doe",
        "published_date": "2024-03-15T10:30:00Z",
        "language": "en"
      }
    }
  ],
  "total_results": 1234,
  "page": 1,
  "page_size": 10,
  "query_time_ms": 145,
  "suggestions": [],
  "meta": {
    "search_event_id": "event_123abc",
    "request_id": "req_456def"
  }
}
```

**Error Responses:**

*400 Bad Request - Validation Error:*
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "path": ["query"],
        "message": "Query cannot be empty"
      }
    ]
  },
  "request_id": "req_789ghi",
  "timestamp": "2024-12-20T10:00:00Z"
}
```

*429 Too Many Requests:*
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later.",
    "details": {
      "limit": 60,
      "window_ms": 60000,
      "retry_after_seconds": 45
    }
  },
  "request_id": "req_789ghi",
  "timestamp": "2024-12-20T10:00:00Z"
}
```

*503 Service Unavailable:*
```json
{
  "error": {
    "code": "SERVICE_UNAVAILABLE",
    "message": "Search service temporarily unavailable",
    "details": null
  },
  "request_id": "req_789ghi",
  "timestamp": "2024-12-20T10:00:00Z"
}
```

### 2. Query Suggestions

Get autocomplete suggestions for search queries.

**Endpoint:** `GET /api/v1/suggest?q={query}`

**Query Parameters:**
- `q` (required): Partial query string (1-200 characters)
- `limit` (optional): Max suggestions to return, default: 10, max: 20

**Response (200 OK):**
```json
{
  "query": "machine le",
  "suggestions": [
    {
      "text": "machine learning",
      "frequency": 5420
    },
    {
      "text": "machine learning algorithms",
      "frequency": 3210
    },
    {
      "text": "machine learning python",
      "frequency": 2890
    }
  ]
}
```

### 3. Click Tracking

Track user clicks on search results for ranking improvement.

**Endpoint:** `POST /api/v1/click`

**Request Body:**
```json
{
  "search_event_id": "event_123abc",
  "doc_id": "550e8400-e29b-41d4-a716-446655440000",
  "position": 3,
  "url": "https://example.com/article",
  "query": "machine learning"
}
```

**Parameters:**
- `search_event_id` (required): UUID from search response metadata
- `doc_id` (required): UUID of clicked document
- `position` (required): Position in results (1-indexed)
- `url` (required): Clicked URL
- `query` (optional): Original search query

**Response (200 OK):**
```json
{
  "success": true,
  "request_id": "req_456def"
}
```

### 4. Admin - Index Stats

Get statistics about the search index (admin only).

**Endpoint:** `GET /api/v1/admin/index/stats`

**Response (200 OK):**
```json
{
  "total_documents": 10547832,
  "index_size_bytes": 52428800000,
  "last_indexed": "2024-12-20T09:45:00Z",
  "documents_indexed_today": 12543,
  "elasticsearch_health": "green",
  "postgresql_health": "healthy"
}
```

### 5. Admin - Crawl Trigger

Trigger a crawl for specific URLs (admin only).

**Endpoint:** `POST /api/v1/admin/crawl`

**Request Body:**
```json
{
  "urls": [
    "https://example.com",
    "https://another-site.com/page"
  ],
  "priority": "high",
  "respect_robots": true
}
```

**Parameters:**
- `urls` (required): Array of URLs to crawl (1-1000 URLs)
- `priority` (optional): "low", "normal", or "high", default: "normal"
- `respect_robots` (optional): Respect robots.txt, default: true

**Response (200 OK):**
```json
{
  "success": true,
  "queued": 2,
  "job_ids": ["job_abc123", "job_def456"]
}
```

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Request parameters are invalid |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Internal server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable |

## Performance Considerations

### Response Times
- **Target p95 latency**: < 200ms
- **Typical response time**: 50-150ms
- **Cached queries**: 10-30ms

### Optimization Tips
1. **Use pagination**: Limit page_size to 10-20 results
2. **Cache results**: Identical queries are cached for 5 minutes
3. **Batch requests**: Use client-side debouncing for autocomplete
4. **Filter early**: Apply filters to reduce result set size

### Best Practices
1. **Debounce autocomplete**: Wait 150-300ms between keystrokes
2. **Cancel obsolete requests**: Cancel pending requests when new query starts
3. **Track clicks**: Always send click events for ranking improvement
4. **Include session ID**: Helps with analytics and personalization
5. **Handle errors gracefully**: Implement retry logic with exponential backoff

## Code Examples

### JavaScript/TypeScript (Fetch API)

```typescript
// Search with debouncing
let searchTimeout: NodeJS.Timeout;

function searchWithDebounce(query: string) {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(async () => {
    const response = await fetch('/api/v1/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-session-id': getSessionId(),
      },
      body: JSON.stringify({
        query,
        page: 1,
        page_size: 10,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        // Rate limited - wait and retry
        const retryAfter = response.headers.get('Retry-After');
        console.log(`Rate limited. Retry after ${retryAfter}s`);
        return;
      }
      throw new Error(`Search failed: ${response.status}`);
    }

    const data = await response.json();
    displayResults(data);
  }, 500);
}

// Track clicks
async function trackClick(docId: string, url: string, position: number, searchEventId: string) {
  try {
    await fetch('/api/v1/click', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-session-id': getSessionId(),
      },
      body: JSON.stringify({
        search_event_id: searchEventId,
        doc_id: docId,
        position,
        url,
      }),
    });
  } catch (error) {
    console.error('Click tracking failed:', error);
  }
}
```

### Python (Requests)

```python
import requests
import time

API_BASE = "http://localhost:3000"
SESSION_ID = "session_123"

def search(query, page=1, page_size=10):
    """Perform a search with retry logic."""
    headers = {
        "Content-Type": "application/json",
        "x-session-id": SESSION_ID,
    }
    
    payload = {
        "query": query,
        "page": page,
        "page_size": page_size,
    }
    
    max_retries = 3
    for attempt in range(max_retries):
        response = requests.post(
            f"{API_BASE}/api/v1/search",
            json=payload,
            headers=headers,
            timeout=10,
        )
        
        if response.status_code == 429:
            # Rate limited
            retry_after = int(response.headers.get('Retry-After', 60))
            print(f"Rate limited. Waiting {retry_after}s...")
            time.sleep(retry_after)
            continue
        
        response.raise_for_status()
        return response.json()
    
    raise Exception("Max retries exceeded")

def track_click(doc_id, url, position, search_event_id):
    """Track a click event."""
    headers = {
        "Content-Type": "application/json",
        "x-session-id": SESSION_ID,
    }
    
    payload = {
        "search_event_id": search_event_id,
        "doc_id": doc_id,
        "position": position,
        "url": url,
    }
    
    requests.post(
        f"{API_BASE}/api/v1/click",
        json=payload,
        headers=headers,
        timeout=5,
    )

# Example usage
results = search("machine learning")
print(f"Found {results['total_results']} results in {results['query_time_ms']}ms")

for idx, result in enumerate(results['results']):
    print(f"{idx + 1}. {result['title']}")
```

## Support

For issues or questions:
- GitHub Issues: https://github.com/your-repo/issues
- Documentation: https://docs.your-domain.com
- Email: support@your-domain.com
