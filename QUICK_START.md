# Quick Start Guide - Search Engine with Sample Data

This guide will help you get your search engine up and running with sample data in minutes.

## Prerequisites

- **Docker Desktop** installed and running
- **Node.js** (v18 or higher)
- **npm** installed

## Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your credentials:
   - **Neon Database**: Add your `DATABASE_URL` (e.g., `postgresql://user:pass@ep-xyz.region.neondatabase.co/dbname?sslmode=require`)
   - **Recommendation API**: Set `RECOMMENDATION_API_URL` if using a custom endpoint (default is provided).

## Step-by-Step Setup

### 1. Start Docker Desktop

Make sure Docker Desktop is running on your system. You can verify by running:

```bash
docker --version
```

### 2. Start Infrastructure Services

Start all required services (PostgreSQL, Elasticsearch, Kafka, Redis, monitoring):

```bash
docker-compose up -d
```

Wait for all services to be healthy (~30-60 seconds). Check status:

```bash
docker-compose ps
```

All services should show "Up" status.

### 3. Install Dependencies

```bash
npm install
```

### 4. Initialize Database

Create all required database tables:

```bash
npm run db:setup
```

You should see: ✓ Schema initialized successfully

### 5. Seed Sample Data

Populate the database with sample URLs, documents, and query suggestions:

```bash
npm run db:seed
```

This will add:
- **50+ seed URLs** for crawling (tech docs, blogs, news sites)
- **15 sample documents** (pre-indexed articles)
- **120+ query suggestions** (for autocomplete)
- **2 A/B test experiments**

### 6. Start the Application

```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

### 7. Start Workers (Optional - for crawling)

To start crawling the seed URLs, open two additional terminals:

**Terminal 2 - Crawler Service:**
```bash
npx tsx scripts/crawler.ts
```

**Terminal 3 - Indexing Worker:**
```bash
npx tsx workers/indexing-worker.ts
```

### 8. Add Discovery Seed Data (Optional)

To add specific discovery documents (e.g., arXiv) to the crawl queue:

```bash
npx tsx scripts/add-discovery-to-crawl-queue.js
```

## Access Points

Once everything is running:

| Service | URL | Credentials |
|---------|-----|-------------|
| Search UI | http://localhost:3000 | - |
| Admin Dashboard | http://localhost:3000/admin | - |
| Elasticsearch | http://localhost:9200 | - |
| Prometheus | http://localhost:9090 | - |
| Grafana | http://localhost:3001 | admin/admin |
| Jaeger | http://localhost:16686 | - |

## Try It Out

### Search for Documents

1. Go to http://localhost:3000
2. Try searching for:
   - "javascript"
   - "react hooks"
   - "docker kubernetes"
   - "machine learning"
   - "typescript"

You should see results from the pre-indexed sample documents!

### View Admin Dashboard

1. Go to http://localhost:3000/admin
2. See crawl queue status
3. View indexing statistics
4. Monitor system health

### Test Autocomplete

Start typing in the search box - you should see query suggestions appear based on the seeded data.

### Explore AI Recommendations

1. Navigate to http://localhost:3000/recommendations/local
2. See the **Local Recommendation Engine** in action.
3. Check out the **Nexus UI** integration with glassmorphism cards and smooth animations.

## What's Included in Sample Data

### Seed URLs (50+)
- Tech documentation (MDN, React, Node.js, TypeScript)
- Developer resources (Stack Overflow, GitHub)
- Tech news (TechCrunch, Hacker News)
- Cloud platforms (AWS, GCP, Azure)
- Frameworks and libraries
- Database documentation

### Sample Documents (15)
Pre-indexed articles on:
- JavaScript basics
- React Hooks
- Python data structures
- Docker & Kubernetes
- SQL vs NoSQL
- Machine Learning
- REST API design
- Git workflows
- TypeScript advanced features
- Web performance
- And more...

### Query Suggestions (120+)
Popular tech search queries with realistic frequencies for autocomplete.

## Troubleshooting

### Docker not running
**Error:** `Cannot connect to Docker daemon`

**Solution:** Start Docker Desktop and wait for it to fully initialize.

### Database connection failed
**Error:** `ECONNREFUSED ::1:5432`

**Solution:** 
1. Make sure Docker services are running: `docker-compose ps`
2. Wait 30 seconds for PostgreSQL to be ready
3. Try again: `npm run db:seed`

### Port already in use
**Error:** `Port 3000 is already in use`

**Solution:** 
- Stop other applications using port 3000
- Or change the port in `.env.local`: `PORT=3001`

### Elasticsearch not ready
**Error:** `No Living connections`

**Solution:**
1. Check Elasticsearch status: `docker-compose ps elasticsearch-1`
2. Wait for it to be healthy (can take 1-2 minutes)
3. Check logs: `docker-compose logs elasticsearch-1`

## Next Steps

### Customize the Data

Edit the seed data files in `scripts/data/`:
- `seed-urls.ts` - Add your own URLs to crawl
- `sample-documents.ts` - Add more pre-indexed content
- `query-suggestions.ts` - Add domain-specific queries

Then re-run: `npm run db:seed`

### Monitor Crawling

Watch the crawler in action:
```bash
# View crawl queue status
docker-compose exec postgres psql -U postgres -d search_engine -c "SELECT status, COUNT(*) FROM crawl_queue GROUP BY status;"
```

### Check Indexed Documents

```bash
# View indexed documents
docker-compose exec postgres psql -U postgres -d search_engine -c "SELECT url, title FROM documents LIMIT 10;"
```

### View Metrics

- **Prometheus**: http://localhost:9090 - Query metrics
- **Grafana**: http://localhost:3001 - View dashboards
- **Jaeger**: http://localhost:16686 - Distributed tracing

## Stopping Services

When you're done:

```bash
# Stop application
Ctrl+C (in the terminal running npm run dev)

# Stop workers
Ctrl+C (in worker terminals)

# Stop Docker services
docker-compose down

# Stop and remove all data (⚠️ destructive)
docker-compose down -v
```

## Need Help?

- Check the main [README.md](./README.md) for architecture details
- See [scripts/data/README.md](./scripts/data/README.md) for data seeding details
- View [docs/](./docs/) for system architecture and design docs

---

**Happy Searching! 🔍**
