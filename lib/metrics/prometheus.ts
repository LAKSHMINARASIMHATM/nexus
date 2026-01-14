import { register, Counter, Histogram, Gauge } from 'prom-client';

// Query metrics
export const queryCounter = new Counter({
    name: 'search_queries_total',
    help: 'Total number of search queries',
    labelNames: ['status', 'cache_hit'],
});

export const queryLatency = new Histogram({
    name: 'search_query_duration_seconds',
    help: 'Search query latency in seconds',
    labelNames: ['stage'],
    buckets: [0.01, 0.05, 0.1, 0.2, 0.5, 1, 2, 5],
});

export const queryResultCount = new Histogram({
    name: 'search_query_results',
    help: 'Number of results returned per query',
    buckets: [0, 1, 10, 100, 1000, 10000],
});

// Indexing metrics
export const indexingCounter = new Counter({
    name: 'documents_indexed_total',
    help: 'Total number of documents indexed',
    labelNames: ['status'],
});

export const indexingLatency = new Histogram({
    name: 'indexing_duration_seconds',
    help: 'Document indexing latency in seconds',
    buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
});

// Crawler metrics
export const crawlCounter = new Counter({
    name: 'urls_crawled_total',
    help: 'Total number of URLs crawled',
    labelNames: ['status'],
});

export const crawlLatency = new Histogram({
    name: 'crawl_duration_seconds',
    help: 'URL crawl latency in seconds',
    buckets: [0.1, 0.5, 1, 2, 5, 10, 30],
});

export const crawlQueueSize = new Gauge({
    name: 'crawl_queue_size',
    help: 'Current size of the crawl queue',
    labelNames: ['priority'],
});

// Cache metrics
export const cacheHitCounter = new Counter({
    name: 'cache_hits_total',
    help: 'Total number of cache hits',
    labelNames: ['tier'],
});

export const cacheMissCounter = new Counter({
    name: 'cache_misses_total',
    help: 'Total number of cache misses',
    labelNames: ['tier'],
});

// System metrics
export const activeConnections = new Gauge({
    name: 'active_connections',
    help: 'Number of active connections',
    labelNames: ['service'],
});

export const errorCounter = new Counter({
    name: 'errors_total',
    help: 'Total number of errors',
    labelNames: ['service', 'type'],
});

// Export metrics endpoint
export function getMetrics() {
    return register.metrics();
}

export { register };
