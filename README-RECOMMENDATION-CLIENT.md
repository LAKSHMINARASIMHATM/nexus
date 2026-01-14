# AI Recommendation System Client

A TypeScript client library for interacting with the AI Recommendation System API deployed at [https://ai-recommendation-system-lt3w.onrender.com](https://ai-recommendation-system-lt3w.onrender.com).

## Features

✅ **Fully Type-Safe** - Complete TypeScript definitions for all API endpoints  
✅ **Automatic Retries** - Built-in retry logic with exponential backoff  
✅ **Error Handling** - Custom error classes for API and network errors  
✅ **Timeout Support** - Configurable request timeouts  
✅ **Easy to Use** - Simple, intuitive API with sensible defaults  
✅ **Production Ready** - Robust error handling and retry mechanisms

## Installation

The client is already included in this project. No additional installation needed!

```typescript
import { RecommendationClient } from './lib/services/recommendation-client';
```

## Quick Start

```typescript
import { RecommendationClient } from './lib/services/recommendation-client';

// Create a client
const client = new RecommendationClient('https://ai-recommendation-system-lt3w.onrender.com');

// Get top-10 recommendations for a user
const recommendations = await client.getRecommendations(userId, 10);

console.log(recommendations.recommendations);
// [
//   { item_id: 123, score: 0.95 },
//   { item_id: 456, score: 0.87 },
//   ...
// ]
```

## API Reference

### Constructor

```typescript
// Simple usage
const client = new RecommendationClient('https://ai-recommendation-system-lt3w.onrender.com');

// With configuration
const client = new RecommendationClient({
  baseUrl: 'https://ai-recommendation-system-lt3w.onrender.com',
  timeout: 60000,        // 60 seconds (default: 30000)
  retries: 5,            // Retry up to 5 times (default: 3)
  retryDelay: 2000,      // 2 seconds between retries (default: 1000)
  headers: {             // Custom headers
    'X-API-Key': 'your-key'
  }
});
```

### Methods

#### `getRecommendations(userId, k?)`

Get top-K recommendations for a user.

```typescript
const recommendations = await client.getRecommendations(123, 10);

// Response:
// {
//   user_id: 123,
//   recommendations: [
//     { item_id: 1, score: 0.95 },
//     { item_id: 2, score: 0.87 },
//     ...
//   ]
// }
```

**Parameters:**
- `userId` (number) - The user ID
- `k` (number, optional) - Number of recommendations to return (default: 10)

**Returns:** `Promise<PredictionResponse>`

---

#### `predict(userId, itemIds)`

Get predictions for specific items for a user.

```typescript
const predictions = await client.predict(123, [1, 2, 3, 4, 5]);

// Response:
// {
//   user_id: 123,
//   recommendations: [
//     { item_id: 1, score: 0.82 },
//     { item_id: 2, score: 0.75 },
//     { item_id: 3, score: 0.91 },
//     ...
//   ]
// }
```

**Parameters:**
- `userId` (number) - The user ID
- `itemIds` (number[]) - Array of item IDs to get predictions for

**Returns:** `Promise<PredictionResponse>`

---

#### `healthCheck()`

Check the health status of the API.

```typescript
const health = await client.healthCheck();

// Response:
// {
//   status: 'healthy',
//   timestamp: '2025-12-27T10:00:00Z'
// }
```

**Returns:** `Promise<HealthResponse>`

---

#### `getMetrics()`

Get Prometheus metrics from the API.

```typescript
const metrics = await client.getMetrics();

// Returns raw Prometheus metrics text
```

**Returns:** `Promise<string>`

---

#### `getInfo()`

Get API information and available endpoints.

```typescript
const info = await client.getInfo();

// Response:
// {
//   message: 'AI Recommendation System API',
//   version: '1.0',
//   status: 'active',
//   endpoints: { ... }
// }
```

**Returns:** `Promise<Record<string, any>>`

---

#### `updateConfig(config)`

Update client configuration after initialization.

```typescript
client.updateConfig({
  timeout: 60000,
  retries: 5
});
```

---

#### `getBaseUrl()`

Get the current base URL.

```typescript
const url = client.getBaseUrl();
// 'https://ai-recommendation-system-lt3w.onrender.com'
```

## Usage Examples

### Basic Usage

```typescript
import { RecommendationClient } from './lib/services/recommendation-client';

const client = new RecommendationClient('https://ai-recommendation-system-lt3w.onrender.com');

// Get recommendations
const recs = await client.getRecommendations(1, 10);
console.log(recs.recommendations);
```

### Batch Processing

```typescript
// Get recommendations for multiple users
const userIds = [1, 2, 3, 4, 5];

const results = await Promise.all(
  userIds.map(userId => client.getRecommendations(userId, 5))
);

results.forEach((result, idx) => {
  console.log(`User ${userIds[idx]}: ${result.recommendations.length} recommendations`);
});
```

### Error Handling

```typescript
import { 
  RecommendationAPIError, 
  RecommendationNetworkError 
} from './lib/services/recommendation-client';

try {
  const recs = await client.getRecommendations(userId, 10);
} catch (error) {
  if (error instanceof RecommendationAPIError) {
    console.error('API Error:', error.message);
    console.error('Status Code:', error.statusCode);
    console.error('Details:', error.details);
  } else if (error instanceof RecommendationNetworkError) {
    console.error('Network Error:', error.message);
  } else {
    console.error('Unknown Error:', error);
  }
}
```

### Real-time Recommendations

```typescript
// User is viewing items
const userId = 1;
const viewedItems = [10, 25, 42, 88, 156];

// Get predictions for items they're viewing
const predictions = await client.predict(userId, viewedItems);

// Show items with high predicted scores
const highInterest = predictions.recommendations
  .filter(pred => pred.score > 0.7)
  .map(pred => pred.item_id);

console.log('User is likely interested in:', highInterest);

// Get additional recommendations
const moreRecs = await client.getRecommendations(userId, 5);
console.log('Suggested items:', moreRecs.recommendations);
```

### Using with React

```typescript
import { useState, useEffect } from 'react';
import { RecommendationClient } from './lib/services/recommendation-client';

const client = new RecommendationClient('https://ai-recommendation-system-lt3w.onrender.com');

function RecommendationList({ userId }: { userId: number }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        const result = await client.getRecommendations(userId, 10);
        setRecommendations(result.recommendations);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [userId]);

  if (loading) return <div>Loading recommendations...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {recommendations.map((rec) => (
        <li key={rec.item_id}>
          Item {rec.item_id} - Score: {rec.score.toFixed(2)}
        </li>
      ))}
    </ul>
  );
}
```

### Using with Next.js API Routes

```typescript
// app/api/recommendations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { RecommendationClient } from '@/lib/services/recommendation-client';

const client = new RecommendationClient('https://ai-recommendation-system-lt3w.onrender.com');

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = parseInt(searchParams.get('userId') || '1');
  const k = parseInt(searchParams.get('k') || '10');

  try {
    const recommendations = await client.getRecommendations(userId, k);
    return NextResponse.json(recommendations);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

## Type Definitions

```typescript
interface Recommendation {
  item_id: number;
  score: number;
  [key: string]: any;
}

interface PredictionResponse {
  user_id: number;
  recommendations: Recommendation[];
}

interface TopKRequest {
  user_id: number;
  k?: number;
}

interface PredictionRequest {
  user_id: number;
  item_ids: number[];
}
```

## Error Types

### `RecommendationAPIError`

Thrown when the API returns an error response (4xx or 5xx).

**Properties:**
- `message` (string) - Error message
- `statusCode` (number) - HTTP status code
- `details` (APIError) - Detailed error information from the API

### `RecommendationNetworkError`

Thrown when a network error occurs (timeout, connection refused, etc.).

**Properties:**
- `message` (string) - Error message
- `originalError` (Error) - The original error that caused the failure

## Advanced Configuration

### Custom Headers

```typescript
const client = new RecommendationClient({
  baseUrl: 'https://ai-recommendation-system-lt3w.onrender.com',
  headers: {
    'Authorization': 'Bearer your-token',
    'X-Custom-Header': 'value'
  }
});
```

### Retry Configuration

```typescript
const client = new RecommendationClient({
  baseUrl: 'https://ai-recommendation-system-lt3w.onrender.com',
  retries: 5,           // Retry up to 5 times
  retryDelay: 2000,     // Wait 2 seconds between retries
});
```

### Timeout Configuration

```typescript
const client = new RecommendationClient({
  baseUrl: 'https://ai-recommendation-system-lt3w.onrender.com',
  timeout: 60000,  // 60 seconds
});
```

## Running Examples

To run the example file:

```bash
# Using ts-node
npx ts-node examples/recommendation-client-usage.ts

# Or compile and run
npx tsc examples/recommendation-client-usage.ts
node examples/recommendation-client-usage.js
```

## API Endpoints

The client supports all endpoints from the AI Recommendation System:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API information |
| `/health` | GET | Health check |
| `/metrics` | GET | Prometheus metrics |
| `/predict` | POST | Get predictions for specific items |
| `/recommend_top_k` | POST | Get top-K recommendations |

## License

This client is part of the search-engine-spec project.

## Support

For issues or questions about the AI Recommendation System API, please refer to the main project documentation.
