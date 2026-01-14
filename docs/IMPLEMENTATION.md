# Implementation Guide

This guide provides step-by-step instructions for implementing, deploying, and maintaining the production-grade search engine.

## Table of Contents
- [Quick Start](#quick-start)
- [Architecture Overview](#architecture-overview)
- [Local Development](#local-development)
- [Production Deployment](#production-deployment)
- [Performance Tuning](#performance-tuning)
- [Monitoring & Maintenance](#monitoring--maintenance)
- [Troubleshooting](#troubleshooting)

## Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- Docker & Docker Compose (optional, for full stack)
- 8GB+ RAM recommended

### Initial Setup (5 minutes)

1. **Clone and Install**
```bash
git clone <repository-url>
cd search-engine-spec
npm install
```

2. **Configure Database**
```bash
# Create .env file
echo "DATABASE_URL=postgresql://postgres:password@localhost:5432/search_engine" > .env
```

3. **Initialize Database**
```bash
npm run db:setup    # Create schema
npm run db:seed     # Add sample data
npm run db:optimize # Add indexes
```

4. **Start Development Server**
```bash
npm run dev
```

Visit http://localhost:3000 - you should see the search interface!

## Architecture Overview

### System Components

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
┌──────▼──────────────────────┐
│   Next.js API (3000)        │
│  - Rate Limiting            │
│  - Input Validation         │
│  - Session Management       │
└──────┬──────────────────────┘
       │
┌──────▼──────────────────────┐
│  Hybrid Search Orchestrator │
│  - Cache → ES → PostgreSQL  │
└──────┬──────────────────────┘
       │
   ┌───┴────┬────────────┬─────────┐
   │        │            │         │
┌──▼──┐ ┌──▼────────┐ ┌─▼──────┐ │
│Cache│ │Elasticsearch│ │PostgreSQL│ │
│(L1) │ │(Primary)    │ │(Fallback)│ │
└─────┘ └────────────┘ └─────────┘ │
                                    │
                        ┌───────────▼──────┐
                        │Monitoring Stack  │
                        │- Prometheus      │
                        │- Grafana         │
                        │- Jaeger          │
                        └──────────────────┘
```

### Key Features Implemented

✅ **Security**
- Input sanitization and validation (Zod schemas)
- Rate limiting (60 req/min for search)
- XSS protection
- SQL injection prevention

✅ **Performance**
- Hybrid search (Cache → Elasticsearch → PostgreSQL)
- Request debouncing (500ms)
- Database indexing (GIN, B-tree, Hash)
- Connection pooling

✅ **Real-time Search**
- Debounced autocomplete (150ms)
- Request cancellation
- Progressive results loading

✅ **Analytics**
- Click tracking
- Search event logging
- Performance metrics (Prometheus)

✅ **Reliability**
- Graceful fallbacks
- Error handling
- Health checks

## Local Development

### Running Without Docker

If you don't want to use Docker, you can run PostgreSQL locally:

```bash
# Install PostgreSQL locally (Windows)
# Download from: https://www.postgresql.org/download/windows/

# Create database
psql -U postgres
CREATE DATABASE search_engine;
\q

# Initialize
npm run db:setup
npm run db:seed
npm run db:optimize

# Start app
npm run dev
```

### Running With Docker

Full infrastructure stack:

```bash
# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f api

# Stop services
docker-compose down
```

### Development Workflow

1. **Make Changes**
   - Edit code in `app/`, `lib/`, `components/`
   - Hot reload is automatic

2. **Test Locally**
   ```bash
   # Search API
   curl -X POST http://localhost:3000/api/v1/search \
     -H "Content-Type: application/json" \
     -d '{"query": "test"}'
   
   # Suggestions
   curl http://localhost:3000/api/v1/suggest?q=test
   ```

3. **Check Logs**
   ```bash
   # Application logs in terminal
   # Database logs
   docker-compose logs postgres
   ```

4. **Run Linting**
   ```bash
   npm run lint
   ```

## Production Deployment

### Option 1: Vercel (Recommended for Next.js)

1. **Prepare Environment**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login
```

2. **Configure Environment Variables**
```bash
# .env.production
DATABASE_URL=postgresql://user:pass@production-db:5432/search_engine
ELASTICSEARCH_NODES=https://es-node-1:9200,https://es-node-2:9200
NODE_ENV=production
```

3. **Deploy**
```bash
# Build and deploy
vercel --prod

# Set environment variables
vercel env add DATABASE_URL production
```

### Option 2: Docker + Kubernetes

1. **Build Images**
```bash
# API server
docker build -t search-engine-api:latest .

# Workers
docker build -t search-engine-crawler:latest -f Dockerfile.crawler .
docker build -t search-engine-indexer:latest -f Dockerfile.indexer .
```

2. **Deploy to Kubernetes**
```bash
# Create namespace
kubectl create namespace search-engine

# Apply configurations
kubectl apply -f k8s/

# Check deployment
kubectl get pods -n search-engine
kubectl get services -n search-engine
```

3. **Configure Ingress**
```yaml
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: search-engine-ingress
spec:
  rules:
  - host: search.yourdomain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: search-engine-api
            port:
              number: 3000
```

### Option 3: VPS/Cloud VM

1. **Setup Server**
```bash
# SSH into server
ssh user@your-server

# Install dependencies
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs postgresql

# Clone repository
git clone <repo-url> /opt/search-engine
cd /opt/search-engine
npm install
```

2. **Configure PM2**
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start npm --name "search-api" -- start

# Configure auto-restart
pm2 startup
pm2 save
```

3. **Setup Nginx**
```nginx
# /etc/nginx/sites-available/search-engine
server {
    listen 80;
    server_name search.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # Rate limiting
        limit_req zone=api burst=20 nodelay;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/search-engine /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Performance Tuning

### Database Optimization

1. **Run Optimization Script**
```bash
npm run db:optimize
```

This creates:
- GIN indexes for full-text search
- URL fingerprint for deduplication
- Composite indexes for common queries
- Materialized views for analytics

2. **Configure Connection Pool**
```typescript
// lib/db.ts
const pool = new Pool({
  max: 20,                    // Maximum connections
  min: 5,                     // Minimum connections
  idleTimeoutMillis: 30000,   // Close idle connections after 30s
  connectionTimeoutMillis: 5000,
});
```

3. **Monitor Query Performance**
```sql
-- Check slow queries
SELECT query, mean_exec_time, calls
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;

-- Check index usage
SELECT schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes
ORDER BY idx_scan ASC;
```

### Elasticsearch Tuning

1. **Optimize Index Settings**
```json
{
  "settings": {
    "number_of_shards": 5,
    "number_of_replicas": 2,
    "refresh_interval": "30s",
    "index.max_result_window": 10000
  }
}
```

2. **Warm Up Cache**
```bash
# Run popular queries
npm run db:seed  # Loads sample queries
```

### Application Tuning

1. **Adjust Cache TTL**
```typescript
// lib/services/hybrid-search-service.ts
private readonly CACHE_TTL = 300; // 5 minutes (adjust as needed)
```

2. **Configure Timeouts**
```typescript
// lib/services/hybrid-search-service.ts
private readonly SEARCH_TIMEOUT = 5000; // 5 seconds
```

3. **Tune Rate Limits**
```typescript
// lib/middleware/rate-limit.ts
export const rateLimitConfigs = {
  search: {
    windowMs: 60 * 1000,
    maxRequests: 60,  // Adjust based on capacity
  },
};
```

## Monitoring & Maintenance

### Health Checks

1. **Application Health**
```bash
# Check API health
curl http://localhost:3000/api/health

# Check search backends
curl http://localhost:3000/api/v1/admin/index/stats
```

2. **Database Health**
```sql
-- Connection count
SELECT count(*) FROM pg_stat_activity;

-- Database size
SELECT pg_size_pretty(pg_database_size('search_engine'));

-- Table sizes
SELECT schemaname, tablename,
       pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename))
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Metrics Monitoring

Access Prometheus at http://localhost:9090

**Key Metrics:**
- `search_queries_total` - Total searches
- `search_query_duration_seconds` - Query latency
- `documents_indexed_total` - Indexing rate
- `cache_hits_total` / `cache_misses_total` - Cache efficiency

### Logs

1. **Application Logs**
```bash
# Development
npm run dev  # Logs to console

# Production (PM2)
pm2 logs search-api
pm2 logs search-api --lines 100

# Docker
docker-compose logs -f --tail=100 api
```

2. **PostgreSQL Logs**
```bash
# Location: /var/log/postgresql/
tail -f /var/log/postgresql/postgresql-14-main.log
```

### Regular Maintenance

**Daily:**
- Check error rates in Grafana
- Monitor query response times
- Review rate limit hits

**Weekly:**
- Analyze slow queries
- Review disk space
- Update materialized views:
  ```sql
  REFRESH MATERIALIZED VIEW CONCURRENTLY popular_queries;
  ```

**Monthly:**
- Vacuum databases:
  ```sql
  VACUUM ANALYZE;
  ```
- Archive old logs
- Review and optimize indexes

## Troubleshooting

### Common Issues

#### 1. Slow Query Performance

**Symptoms:** p95 latency > 200ms

**Solutions:**
```bash
# Check database indexes
npm run db:optimize

# Analyze query plans
psql -U postgres search_engine
EXPLAIN ANALYZE SELECT ... ;

# Increase cache TTL
# Edit lib/services/hybrid-search-service.ts
```

#### 2. Rate Limiting Too Aggressive

**Symptoms:** Many 429 errors

**Solutions:**
```typescript
// Increase limits in lib/middleware/rate-limit.ts
export const rateLimitConfigs = {
  search: {
    maxRequests: 120,  // Increased from 60
  },
};
```

#### 3. Elasticsearch Connection Failures

**Symptoms:** All searches fall back to PostgreSQL

**Solutions:**
```bash
# Check Elasticsearch health
curl http://localhost:9200/_cluster/health

# Restart Elasticsearch
docker-compose restart elasticsearch-1

# Check logs
docker-compose logs elasticsearch-1
```

#### 4. High Memory Usage

**Symptoms:** Application crashes or slow performance

**Solutions:**
```bash
# Reduce connection pool
# Edit lib/db.ts
max: 10,  // Reduced from 20

# Clear cache
# Restart application
pm2 restart search-api

# Check memory usage
pm2 monit
```

#### 5. Database Connection Pool Exhausted

**Symptoms:** "sorry, too many clients already" error

**Solutions:**
```sql
-- Increase PostgreSQL max_connections
ALTER SYSTEM SET max_connections = 200;
SELECT pg_reload_conf();

-- Or reduce pool size in application
-- Edit lib/db.ts
```

### Debug Mode

Enable verbose logging:

```bash
# Development
DEBUG=* npm run dev

# Production
NODE_ENV=development npm start
```

### Getting Help

- **Documentation:** `/docs` directory
- **Logs:** Check application and database logs
- **Metrics:** Review Grafana dashboards
- **Health:** Check `/api/health` endpoint

## Next Steps

After successful implementation:

1. **Add Tests** - See [TESTING.md](./TESTING.md)
2. **Set Up CI/CD** - Automate deployments
3. **Configure Backups** - Database and index backups
4. **Load Testing** - Verify performance targets
5. **Security Audit** - Review security measures

---

For additional help, refer to:
- [API Documentation](./API.md)
- [Architecture Documentation](./ARCHITECTURE.md)
- [README.md](../README.md)
