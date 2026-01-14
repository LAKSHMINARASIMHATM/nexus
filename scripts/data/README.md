# Seeding Data for Search Engine

This directory contains scripts and data files to populate your search engine with initial data.

## Quick Start

```bash
# 1. Make sure Docker services are running
docker-compose up -d

# 2. Initialize database schema
npm run db:setup

# 3. Seed data
npm run db:seed
```

## What Gets Seeded

### 1. Crawl Queue (50+ URLs)
High-quality seed URLs across multiple categories:
- **Tech Documentation**: MDN, Node.js, React, TypeScript, etc.
- **Tech News**: TechCrunch, The Verge, Hacker News, etc.
- **Developer Resources**: Stack Overflow, GitHub, freeCodeCamp, etc.
- **Cloud Platforms**: AWS, Google Cloud, Azure docs
- **Programming Languages**: Python, Go, Rust, Java docs
- **Frameworks**: Vue, Angular, Express, Django, etc.
- **Databases**: PostgreSQL, MongoDB, Redis, Elasticsearch
- **DevOps**: Kubernetes, Docker, Terraform
- **AI/ML**: PyTorch, TensorFlow, Hugging Face

### 2. Sample Documents (15 articles)
Pre-indexed documents for immediate search results:
- JavaScript Guide
- React Hooks Tutorial
- Python Data Structures
- Docker & Kubernetes Guide
- SQL vs NoSQL
- Machine Learning Basics
- REST API Design
- Git Workflow
- TypeScript Advanced
- Web Performance Optimization
- Microservices Architecture
- CSS Flexbox & Grid
- Node.js Streams
- GraphQL vs REST
- Web Security Best Practices

### 3. Query Suggestions (120+ queries)
Popular search queries with frequencies for autocomplete:
- Programming languages (JavaScript, Python, TypeScript, etc.)
- Frameworks (React, Next.js, Vue, Angular, etc.)
- Backend technologies (Node.js, Express, NestJS, etc.)
- Databases (SQL, PostgreSQL, MongoDB, Redis, etc.)
- DevOps (Docker, Kubernetes, CI/CD, etc.)
- Web development (HTML, CSS, responsive design, etc.)
- APIs (REST, GraphQL)
- Testing (Jest, unit testing)
- Version control (Git)
- Cloud platforms (AWS, Azure, Google Cloud)
- Machine Learning (TensorFlow, PyTorch, etc.)
- Security (OAuth, JWT, authentication)

### 4. Sample Experiments (2 A/B tests)
- **BM25 vs TF-IDF Ranking**: Compare scoring algorithms
- **Results Per Page Test**: 10 vs 20 results per page

## Data Files

- `data/seed-urls.ts` - URLs to be crawled
- `data/sample-documents.ts` - Pre-indexed documents
- `data/query-suggestions.ts` - Autocomplete suggestions

## Customizing Data

### Add More URLs
Edit `scripts/data/seed-urls.ts`:

```typescript
export const seedUrls = [
    { url: 'https://your-site.com', priority: 8, depth: 0 },
    // ... more URLs
];
```

### Add More Documents
Edit `scripts/data/sample-documents.ts`:

```typescript
export const sampleDocuments = [
    {
        url: 'https://example.com/article',
        title: 'Your Article Title',
        meta_description: 'Description',
        body_length: 5000,
        // ... more fields
    },
];
```

### Add More Query Suggestions
Edit `scripts/data/query-suggestions.ts`:

```typescript
export const querySuggestions = [
    { query: 'your search term', frequency: 1000 },
    // ... more queries
];
```

## After Seeding

Once data is seeded, you can:

1. **Start the workers** to begin crawling:
   ```bash
   # Terminal 1: Crawler worker
   npx tsx workers/crawler-worker.ts
   
   # Terminal 2: Indexing worker
   npx tsx workers/indexing-worker.ts
   ```

2. **View the admin dashboard**:
   ```
   http://localhost:3000/admin
   ```

3. **Try searching**:
   ```
   http://localhost:3000
   ```

4. **Monitor crawl progress**:
   ```bash
   # Check crawl queue status
   psql $DATABASE_URL -c "SELECT status, COUNT(*) FROM crawl_queue GROUP BY status;"
   ```

## Database Tables Populated

- `crawl_queue` - URLs pending crawl
- `documents` - Indexed documents
- `query_suggestions` - Autocomplete data
- `experiments` - A/B test configurations

## Troubleshooting

### Connection Errors
Make sure Docker services are running:
```bash
docker-compose ps
```

### Database Not Found
Initialize the schema first:
```bash
npm run db:setup
```

### Duplicate Key Errors
The seed script uses `ON CONFLICT DO NOTHING`, so re-running is safe. Duplicates will be skipped.

## Production Considerations

For production, you would:
1. Use a proper URL frontier service
2. Implement distributed crawling with Kafka
3. Add rate limiting and politeness policies
4. Use real PageRank calculations
5. Implement continuous crawling and recrawling
6. Add domain-specific seed lists
7. Monitor crawl health and quality
