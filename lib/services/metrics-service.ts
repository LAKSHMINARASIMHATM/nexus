import pool from '../db';

export class MetricsService {
    async getIndexStats() {
        const docCount = await pool.query('SELECT COUNT(*) FROM documents');
        const queueCount = await pool.query('SELECT COUNT(*) FROM crawl_queue WHERE status = \'pending\'');

        // Mocking some data that would come from Elasticsearch or internal metrics
        return {
            index: {
                total_documents: parseInt(docCount.rows[0].count),
                total_terms: 5420000, // Mock
                total_size_gb: 3200, // Mock
                shards: {
                    total: 64,
                    active: 64,
                    relocating: 0,
                    initializing: 0,
                    unassigned: 0
                },
                replication: {
                    factor: 3,
                    lag_seconds: 2.5
                }
            },
            health: {
                status: "green",
                nodes: 21,
                data_nodes: 21
            },
            performance: {
                indexing_rate_docs_per_sec: 1250,
                search_rate_queries_per_sec: 45000,
                avg_search_latency_ms: 125
            },
            freshness: {
                last_update: new Date().toISOString(),
                avg_document_age_hours: 4.2,
                high_priority_age_hours: 1.8
            }
        };
    }

    async getMetrics(period: string) {
        // Mock metrics data
        return {
            period,
            metrics: {
                queries: {
                    total: 162000,
                    success_rate: 0.998,
                    avg_latency_ms: 145,
                    p50_latency_ms: 120,
                    p95_latency_ms: 185,
                    p99_latency_ms: 245
                },
                crawler: {
                    urls_crawled: parseInt((await pool.query("SELECT COUNT(*) FROM crawl_queue WHERE status = 'completed'")).rows[0].count),
                    urls_queued: parseInt((await pool.query("SELECT COUNT(*) FROM crawl_queue WHERE status = 'pending'")).rows[0].count),
                    success_rate: 0.94, // Keep mock for now until we track failures better
                    avg_fetch_time_ms: 850,
                    bandwidth_mbps: 450
                },
                indexing: {
                    documents_indexed: 118000,
                    indexing_rate: 32.8,
                    avg_indexing_latency_ms: 45
                },
                cache: {
                    hit_rate: 0.72,
                    evictions_per_min: 125,
                    size_gb: 48
                }
            }
        };
    }
}

export const metricsService = new MetricsService();
