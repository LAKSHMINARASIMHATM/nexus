module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/pg [external] (pg, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("pg");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$lib$2f$main$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dotenv/lib/main.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$lib$2f$main$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["config"]({
    path: '.env.local'
});
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$lib$2f$main$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["config"]({
    path: '.env'
});
console.log('Initializing DB pool with:', process.env.DATABASE_URL);
const pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__["Pool"]({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/search_engine',
    ssl: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : false
});
const __TURBOPACK__default__export__ = pool;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/services/search-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "SearchService",
    ()=>SearchService,
    "searchService",
    ()=>searchService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
class SearchService {
    async search(params) {
        const startTime = Date.now();
        const { query, page = 1, pageSize = 10 } = params;
        const offset = (page - 1) * pageSize;
        // PostgreSQL Full-Text Search
        // We use websearch_to_tsquery for advanced syntax support (quotes, or, -negation)
        // We search across title, meta_description, and body with different weights
        const sql = `
            WITH search_query AS (
                SELECT websearch_to_tsquery('english', $1) as query
            ),
            ranked_docs AS (
                SELECT 
                    doc_id,
                    url,
                    title,
                    meta_description,
                    body,
                    pagerank,
                    crawl_timestamp,
                    language,
                    -- Rank calculation: (Title A-weight) + (Meta B-weight) + (Body C-weight)
                    ts_rank_cd(
                        setweight(to_tsvector('english', title), 'A') ||
                        setweight(to_tsvector('english', coalesce(meta_description, '')), 'B') ||
                        setweight(to_tsvector('english', coalesce(body, '')), 'C'),
                        (SELECT query FROM search_query)
                    ) as rank
                FROM documents
                WHERE 
                    (
                        setweight(to_tsvector('english', title), 'A') ||
                        setweight(to_tsvector('english', coalesce(meta_description, '')), 'B') ||
                        setweight(to_tsvector('english', coalesce(body, '')), 'C')
                    ) @@ (SELECT query FROM search_query)
            ),
            total_count AS (
                SELECT COUNT(*) as count FROM ranked_docs
            )
            SELECT 
                rd.*,
                tc.count as total_results,
                ts_headline('english', rd.body, (SELECT query FROM search_query), 
                    'StartSel=<em>, StopSel=</em>, MaxWords=35, MinWords=15, ShortWord=3, HighlightAll=FALSE, MaxFragments=1, FragmentDelimiter="..."'
                ) as body_highlight,
                ts_headline('english', rd.title, (SELECT query FROM search_query), 
                    'StartSel=<em>, StopSel=</em>, HighlightAll=FALSE'
                ) as title_highlight
            FROM ranked_docs rd, total_count tc
            ORDER BY rank DESC, pagerank DESC
            LIMIT $2 OFFSET $3
        `;
        try {
            console.log(`Executing SQL for query: "${query}"`);
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query(sql, [
                query,
                pageSize,
                offset
            ]);
            console.log(`SQL executed. Rows: ${result.rows.length}`);
            const totalResults = result.rows.length > 0 ? parseInt(result.rows[0].total_results, 10) : 0;
            const searchResults = result.rows.map((row)=>({
                    doc_id: row.doc_id,
                    url: row.url,
                    title: row.title,
                    snippet: row.body_highlight || row.meta_description || '',
                    score: row.rank,
                    highlights: [
                        row.title_highlight,
                        row.body_highlight
                    ].filter(Boolean),
                    metadata: {
                        language: row.language,
                        published_date: row.crawl_timestamp
                    }
                }));
            const endTime = Date.now();
            // Log the search event
            this.logSearchEvent(query, totalResults, endTime - startTime);
            return {
                query: {
                    original: query
                },
                results: searchResults,
                total_results: totalResults,
                page,
                page_size: pageSize,
                query_time_ms: endTime - startTime,
                suggestions: []
            };
        } catch (error) {
            console.error('Search error:', error);
            throw error;
        }
    }
    async logSearchEvent(query, resultCount, executionTime) {
        try {
            const sql = `
                INSERT INTO search_events (query_text, result_count, execution_time_ms)
                VALUES ($1, $2, $3)
            `;
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query(sql, [
                query,
                resultCount,
                executionTime
            ]);
        } catch (err) {
            console.error('Failed to log search event:', err);
        }
    }
    async suggest(query, limit = 10) {
        const sql = `
            SELECT query_text 
            FROM query_suggestions 
            WHERE query_text ILIKE $1 
            ORDER BY frequency DESC 
            LIMIT $2
        `;
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query(sql, [
                `${query}%`,
                limit
            ]);
            return result.rows.map((row)=>row.query_text);
        } catch (error) {
            console.error('Suggestion error:', error);
            return [];
        }
    }
}
const searchService = new SearchService();
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}),
"[externals]/perf_hooks [external] (perf_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("perf_hooks", () => require("perf_hooks"));

module.exports = mod;
}),
"[externals]/v8 [external] (v8, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("v8", () => require("v8"));

module.exports = mod;
}),
"[externals]/cluster [external] (cluster, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("cluster", () => require("cluster"));

module.exports = mod;
}),
"[project]/lib/metrics/prometheus.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "activeConnections",
    ()=>activeConnections,
    "cacheHitCounter",
    ()=>cacheHitCounter,
    "cacheMissCounter",
    ()=>cacheMissCounter,
    "crawlCounter",
    ()=>crawlCounter,
    "crawlLatency",
    ()=>crawlLatency,
    "crawlQueueSize",
    ()=>crawlQueueSize,
    "errorCounter",
    ()=>errorCounter,
    "getMetrics",
    ()=>getMetrics,
    "indexingCounter",
    ()=>indexingCounter,
    "indexingLatency",
    ()=>indexingLatency,
    "queryCounter",
    ()=>queryCounter,
    "queryLatency",
    ()=>queryLatency,
    "queryResultCount",
    ()=>queryResultCount
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prom$2d$client$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/prom-client/index.js [app-route] (ecmascript)");
;
const queryCounter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prom$2d$client$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Counter"]({
    name: 'search_queries_total',
    help: 'Total number of search queries',
    labelNames: [
        'status',
        'cache_hit'
    ]
});
const queryLatency = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prom$2d$client$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Histogram"]({
    name: 'search_query_duration_seconds',
    help: 'Search query latency in seconds',
    labelNames: [
        'stage'
    ],
    buckets: [
        0.01,
        0.05,
        0.1,
        0.2,
        0.5,
        1,
        2,
        5
    ]
});
const queryResultCount = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prom$2d$client$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Histogram"]({
    name: 'search_query_results',
    help: 'Number of results returned per query',
    buckets: [
        0,
        1,
        10,
        100,
        1000,
        10000
    ]
});
const indexingCounter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prom$2d$client$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Counter"]({
    name: 'documents_indexed_total',
    help: 'Total number of documents indexed',
    labelNames: [
        'status'
    ]
});
const indexingLatency = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prom$2d$client$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Histogram"]({
    name: 'indexing_duration_seconds',
    help: 'Document indexing latency in seconds',
    buckets: [
        0.01,
        0.05,
        0.1,
        0.5,
        1,
        2,
        5
    ]
});
const crawlCounter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prom$2d$client$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Counter"]({
    name: 'urls_crawled_total',
    help: 'Total number of URLs crawled',
    labelNames: [
        'status'
    ]
});
const crawlLatency = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prom$2d$client$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Histogram"]({
    name: 'crawl_duration_seconds',
    help: 'URL crawl latency in seconds',
    buckets: [
        0.1,
        0.5,
        1,
        2,
        5,
        10,
        30
    ]
});
const crawlQueueSize = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prom$2d$client$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Gauge"]({
    name: 'crawl_queue_size',
    help: 'Current size of the crawl queue',
    labelNames: [
        'priority'
    ]
});
const cacheHitCounter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prom$2d$client$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Counter"]({
    name: 'cache_hits_total',
    help: 'Total number of cache hits',
    labelNames: [
        'tier'
    ]
});
const cacheMissCounter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prom$2d$client$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Counter"]({
    name: 'cache_misses_total',
    help: 'Total number of cache misses',
    labelNames: [
        'tier'
    ]
});
const activeConnections = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prom$2d$client$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Gauge"]({
    name: 'active_connections',
    help: 'Number of active connections',
    labelNames: [
        'service'
    ]
});
const errorCounter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prom$2d$client$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Counter"]({
    name: 'errors_total',
    help: 'Total number of errors',
    labelNames: [
        'service',
        'type'
    ]
});
function getMetrics() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$prom$2d$client$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["register"].metrics();
}
;
}),
"[project]/app/api/v1/search/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$search$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/search-service.ts [app-route] (ecmascript)");
// import { cacheService } from '@/lib/services/cache-service'; // Disabled for No-Docker
// import { kafkaService } from '@/lib/services/kafka-service'; // Disabled for No-Docker
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$metrics$2f$prometheus$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/metrics/prometheus.ts [app-route] (ecmascript) <locals>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$search$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$search$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
async function POST(req) {
    const startTime = Date.now();
    try {
        const body = await req.json();
        const { query, page = 1, page_size = 10, filters, options } = body;
        if (!query || typeof query !== 'string' || query.trim().length === 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$metrics$2f$prometheus$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["queryCounter"].inc({
                status: 'error',
                cache_hit: 'false'
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: {
                    code: 'INVALID_QUERY',
                    message: 'Query string is required',
                    details: {
                        field: 'query',
                        constraint: 'non_empty'
                    }
                },
                request_id: `req_${Date.now()}`
            }, {
                status: 400
            });
        }
        // Generate cache key (Mocked/Disabled)
        /*
        const cacheKey = crypto
            .createHash('sha256')
            .update(JSON.stringify({ query, page, page_size, filters }))
            .digest('hex');

        // Check cache
        const cached = await cacheService.get<any>('query', cacheKey);
        if (cached) {
            queryCounter.inc({ status: 'success', cache_hit: 'true' });
            queryLatency.observe({ stage: 'total' }, (Date.now() - startTime) / 1000);
            return NextResponse.json(cached);
        }
        */ // Search with PostgreSQL (via SearchService)
        const searchStart = Date.now();
        const results = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$search$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["searchService"].search({
            query,
            page,
            pageSize: page_size,
            filters
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$metrics$2f$prometheus$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["queryLatency"].observe({
            stage: 'postgres'
        }, (Date.now() - searchStart) / 1000);
        // Cache results (Disabled)
        // await cacheService.set('query', cacheKey, results, 300); // 5 minutes
        // Record metrics
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$metrics$2f$prometheus$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["queryCounter"].inc({
            status: 'success',
            cache_hit: 'false'
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$metrics$2f$prometheus$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["queryResultCount"].observe(results.results.length);
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$metrics$2f$prometheus$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["queryLatency"].observe({
            stage: 'total'
        }, (Date.now() - startTime) / 1000);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(results);
    } catch (error) {
        console.error('Search API error:', error);
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$metrics$2f$prometheus$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["queryCounter"].inc({
            status: 'error',
            cache_hit: 'false'
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: {
                code: 'INTERNAL_ERROR',
                message: 'An internal server error occurred',
                details: ("TURBOPACK compile-time truthy", 1) ? error.message : "TURBOPACK unreachable"
            },
            request_id: `req_${Date.now()}`
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__061a017a._.js.map