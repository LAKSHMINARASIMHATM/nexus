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
        // Handle single character/variable searches with pattern matching
        const isSingleChar = query.trim().length === 1;
        let sql;
        let queryParams;
        if (isSingleChar) {
            // For single character searches, use pattern matching instead of full-text search
            const searchPattern = `%${query.trim()}%`;
            sql = `
                WITH ranked_docs AS (
                    SELECT 
                        doc_id,
                        url,
                        title,
                        meta_description,
                        body,
                        pagerank,
                        crawl_timestamp,
                        language,
                        -- Simple relevance score for single character matches
                        CASE 
                            WHEN title ILIKE $1 THEN 3.0
                            WHEN meta_description ILIKE $1 THEN 2.0
                            WHEN body ILIKE $1 THEN 1.0
                            ELSE 0.5
                        END as rank
                    FROM documents
                    WHERE 
                        title ILIKE $1 OR 
                        meta_description ILIKE $1 OR 
                        body ILIKE $1
                ),
                total_count AS (
                    SELECT COUNT(*) as count FROM ranked_docs
                )
                SELECT 
                    rd.*,
                    tc.count as total_results,
                    -- Simple highlighting for pattern matches
                    CASE 
                        WHEN title ILIKE $1 THEN regexp_replace(title, '(' || $2 || ')', '<em>\\1</em>', 'gi')
                        ELSE title
                    END as title_highlight,
                    CASE 
                        WHEN body ILIKE $1 THEN regexp_replace(substring(body, 1, 500), '(' || $2 || ')', '<em>\\1</em>', 'gi')
                        ELSE substring(body, 1, 500)
                    END as body_highlight
                FROM ranked_docs rd, total_count tc
                ORDER BY rank DESC, pagerank DESC
                LIMIT $3 OFFSET $4
            `;
            queryParams = [
                searchPattern,
                query.trim(),
                pageSize,
                offset
            ];
        } else {
            // PostgreSQL Full-Text Search for longer queries
            // We use websearch_to_tsquery for advanced syntax support (quotes, or, -negation)
            // We search across title, meta_description, and body with different weights
            sql = `
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
            queryParams = [
                query,
                pageSize,
                offset
            ];
        }
        try {
            console.log(`Executing ${isSingleChar ? 'single character' : 'full-text'} search for query: "${query}"`);
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query(sql, queryParams);
            console.log(`SQL executed. Rows: ${result.rows.length}`);
            const totalResults = result.rows.length > 0 ? parseInt(result.rows[0].total_results, 10) : 0;
            const searchResults = result.rows.map((row)=>({
                    doc_id: row.doc_id,
                    url: row.url,
                    title: row.title,
                    snippet: isSingleChar ? (row.body_highlight || row.meta_description || row.body || '').substring(0, 200) + '...' : row.body_highlight || row.meta_description || '',
                    score: parseFloat(row.rank) || 0,
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
"[externals]/node:events [external] (node:events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:events", () => require("node:events"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/node:os [external] (node:os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:os", () => require("node:os"));

module.exports = mod;
}),
"[externals]/node:zlib [external] (node:zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:zlib", () => require("node:zlib"));

module.exports = mod;
}),
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:util [external] (node:util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:util", () => require("node:util"));

module.exports = mod;
}),
"[externals]/node:process [external] (node:process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:process", () => require("node:process"));

module.exports = mod;
}),
"[externals]/node:querystring [external] (node:querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:querystring", () => require("node:querystring"));

module.exports = mod;
}),
"[externals]/node:timers/promises [external] (node:timers/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:timers/promises", () => require("node:timers/promises"));

module.exports = mod;
}),
"[externals]/perf_hooks [external] (perf_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("perf_hooks", () => require("perf_hooks"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/node:http [external] (node:http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:http", () => require("node:http"));

module.exports = mod;
}),
"[externals]/node:https [external] (node:https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:https", () => require("node:https"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/node:assert [external] (node:assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:assert", () => require("node:assert"));

module.exports = mod;
}),
"[externals]/node:net [external] (node:net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:net", () => require("node:net"));

module.exports = mod;
}),
"[externals]/node:diagnostics_channel [external] (node:diagnostics_channel, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:diagnostics_channel", () => require("node:diagnostics_channel"));

module.exports = mod;
}),
"[externals]/node:tls [external] (node:tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:tls", () => require("node:tls"));

module.exports = mod;
}),
"[externals]/node:perf_hooks [external] (node:perf_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:perf_hooks", () => require("node:perf_hooks"));

module.exports = mod;
}),
"[externals]/node:util/types [external] (node:util/types, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:util/types", () => require("node:util/types"));

module.exports = mod;
}),
"[externals]/node:worker_threads [external] (node:worker_threads, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:worker_threads", () => require("node:worker_threads"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/node:http2 [external] (node:http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:http2", () => require("node:http2"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/node:console [external] (node:console, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:console", () => require("node:console"));

module.exports = mod;
}),
"[externals]/node:fs/promises [external] (node:fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs/promises", () => require("node:fs/promises"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:timers [external] (node:timers, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:timers", () => require("node:timers"));

module.exports = mod;
}),
"[externals]/node:dns [external] (node:dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:dns", () => require("node:dns"));

module.exports = mod;
}),
"[externals]/node:url [external] (node:url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:url", () => require("node:url"));

module.exports = mod;
}),
"[project]/config/elasticsearch/index-mappings.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"settings":{"number_of_shards":64,"number_of_replicas":2,"refresh_interval":"30s","index":{"codec":"best_compression","max_result_window":10000},"analysis":{"analyzer":{"custom_analyzer":{"type":"custom","tokenizer":"standard","filter":["lowercase","porter_stem","stop","asciifolding"]},"ngram_analyzer":{"type":"custom","tokenizer":"standard","filter":["lowercase","ngram_filter"]}},"filter":{"ngram_filter":{"type":"ngram","min_gram":2,"max_gram":15}}}},"mappings":{"properties":{"url":{"type":"keyword"},"canonical_url":{"type":"keyword"},"title":{"type":"text","analyzer":"custom_analyzer","fields":{"raw":{"type":"keyword"},"ngram":{"type":"text","analyzer":"ngram_analyzer"}},"term_vector":"with_positions_offsets"},"body":{"type":"text","analyzer":"custom_analyzer","term_vector":"with_positions_offsets","store":false},"meta_description":{"type":"text","analyzer":"custom_analyzer"},"anchor_texts":{"type":"text","analyzer":"custom_analyzer"},"headings":{"type":"text","analyzer":"custom_analyzer"},"doc_length":{"type":"integer"},"pagerank":{"type":"float"},"language":{"type":"keyword"},"domain":{"type":"keyword"},"crawl_timestamp":{"type":"date"},"content_hash":{"type":"keyword"},"inbound_links":{"type":"integer"},"outbound_links":{"type":"integer"},"structured_data":{"type":"object","enabled":true}}}});}),
"[project]/lib/services/elasticsearch-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "elasticsearchService",
    ()=>elasticsearchService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$elastic$2f$elasticsearch$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@elastic/elasticsearch/index.js [app-route] (ecmascript)");
;
class ElasticsearchService {
    client;
    indexName = 'search-documents';
    constructor(){
        this.client = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$elastic$2f$elasticsearch$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Client"]({
            nodes: process.env.ELASTICSEARCH_NODES?.split(',') || [
                'http://localhost:9200'
            ],
            maxRetries: 5,
            requestTimeout: 60000,
            sniffOnStart: true
        });
    }
    async createIndex() {
        const exists = await this.client.indices.exists({
            index: this.indexName
        });
        if (!exists) {
            const mappings = __turbopack_context__.r("[project]/config/elasticsearch/index-mappings.json (json)");
            await this.client.indices.create({
                index: this.indexName,
                body: mappings
            });
            console.log(`Created index: ${this.indexName}`);
        }
    }
    async indexDocument(doc) {
        return await this.client.index({
            index: this.indexName,
            id: doc.doc_id,
            document: {
                url: doc.url,
                canonical_url: doc.canonical_url,
                title: doc.title,
                body: doc.body,
                meta_description: doc.meta_description,
                anchor_texts: doc.anchor_texts || [],
                headings: doc.headings || [],
                doc_length: doc.body_length,
                pagerank: doc.pagerank || 0,
                language: doc.language || 'en',
                domain: new URL(doc.url).hostname,
                crawl_timestamp: doc.crawl_timestamp,
                content_hash: doc.content_hash,
                inbound_links: doc.inbound_links || 0,
                outbound_links: doc.outbound_links || 0,
                structured_data: doc.structured_data || []
            }
        });
    }
    async bulkIndex(docs) {
        const operations = docs.flatMap((doc)=>[
                {
                    index: {
                        _index: this.indexName,
                        _id: doc.doc_id
                    }
                },
                {
                    url: doc.url,
                    canonical_url: doc.canonical_url,
                    title: doc.title,
                    body: doc.body,
                    meta_description: doc.meta_description,
                    anchor_texts: doc.anchor_texts || [],
                    headings: doc.headings || [],
                    doc_length: doc.body_length,
                    pagerank: doc.pagerank || 0,
                    language: doc.language || 'en',
                    domain: new URL(doc.url).hostname,
                    crawl_timestamp: doc.crawl_timestamp,
                    content_hash: doc.content_hash,
                    inbound_links: doc.inbound_links || 0,
                    outbound_links: doc.outbound_links || 0,
                    structured_data: doc.structured_data || []
                }
            ]);
        const result = await this.client.bulk({
            operations,
            refresh: false
        });
        if (result.errors) {
            const erroredDocuments = result.items.filter((item)=>item.index?.error);
            console.error('Bulk indexing errors:', erroredDocuments);
        }
        return result;
    }
    async search(query, options = {}) {
        const { page = 1, pageSize = 10, filters = {} } = options;
        const from = (page - 1) * pageSize;
        // Build Elasticsearch query
        const mustClauses = [
            {
                multi_match: {
                    query,
                    fields: [
                        'title^3',
                        'meta_description^2',
                        'body',
                        'headings^2',
                        'anchor_texts^1.5'
                    ],
                    type: 'best_fields',
                    operator: 'or',
                    fuzziness: 'AUTO'
                }
            }
        ];
        // Add filters
        const filterClauses = [];
        if (filters.language) {
            filterClauses.push({
                term: {
                    language: filters.language
                }
            });
        }
        if (filters.site) {
            filterClauses.push({
                term: {
                    domain: filters.site
                }
            });
        }
        if (filters.dateRange) {
            filterClauses.push({
                range: {
                    crawl_timestamp: {
                        gte: filters.dateRange.start,
                        lte: filters.dateRange.end
                    }
                }
            });
        }
        const searchBody = {
            query: {
                function_score: {
                    query: {
                        bool: {
                            must: mustClauses,
                            filter: filterClauses
                        }
                    },
                    functions: [
                        {
                            // Boost by PageRank
                            field_value_factor: {
                                field: 'pagerank',
                                factor: 1.2,
                                modifier: 'log1p',
                                missing: 0
                            }
                        },
                        {
                            // Boost by inbound links
                            field_value_factor: {
                                field: 'inbound_links',
                                factor: 0.1,
                                modifier: 'log1p',
                                missing: 0
                            }
                        },
                        {
                            // Boost recent documents slightly
                            gauss: {
                                crawl_timestamp: {
                                    origin: 'now',
                                    scale: '30d',
                                    decay: 0.5
                                }
                            }
                        }
                    ],
                    score_mode: 'sum',
                    boost_mode: 'multiply'
                }
            },
            from,
            size: pageSize,
            highlight: {
                fields: {
                    title: {
                        number_of_fragments: 0
                    },
                    body: {
                        number_of_fragments: 1,
                        fragment_size: 150
                    },
                    meta_description: {
                        number_of_fragments: 1
                    }
                },
                pre_tags: [
                    '<em>'
                ],
                post_tags: [
                    '</em>'
                ]
            },
            _source: [
                'url',
                'title',
                'meta_description',
                'body',
                'domain',
                'language',
                'pagerank',
                'crawl_timestamp',
                'inbound_links',
                'outbound_links'
            ]
        };
        try {
            const result = await this.client.search({
                index: this.indexName,
                body: searchBody
            });
            return {
                hits: result.hits.hits,
                total: typeof result.hits.total === 'number' ? result.hits.total : result.hits.total?.value || 0
            };
        } catch (error) {
            console.error('Elasticsearch search error:', error);
            throw error;
        }
    }
    async getStats() {
        try {
            const health = await this.client.cluster.health();
            const stats = await this.client.indices.stats({
                index: this.indexName
            });
            return {
                index: stats.indices?.[this.indexName],
                cluster: health
            };
        } catch (error) {
            console.error('Elasticsearch stats error:', error);
            throw error;
        }
    }
    async healthCheck() {
        try {
            const health = await this.client.cluster.health();
            return health.status === 'green' || health.status === 'yellow';
        } catch (error) {
            console.error('Elasticsearch health check failed:', error);
            return false;
        }
    }
}
const elasticsearchService = new ElasticsearchService();
}),
"[project]/lib/services/cache-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// import Redis from 'ioredis'; // Disabled for No-Docker
__turbopack_context__.s([
    "cacheService",
    ()=>cacheService
]);
class CacheService {
    // private redis: Redis;
    localCache;
    LOCAL_CACHE_TTL = 60 * 1000;
    constructor(){
        /*
        this.redis = new Redis({
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379'),
            maxRetriesPerRequest: 3,
            retryStrategy: (times) => {
                const delay = Math.min(times * 50, 2000);
                return delay;
            },
        });
        */ this.localCache = new Map();
        // Cleanup expired local cache entries
        setInterval(()=>{
            const now = Date.now();
            for (const [key, entry] of this.localCache.entries()){
                if (entry.expiry < now) {
                    this.localCache.delete(key);
                }
            }
        }, 60000); // Every minute
    }
    getCacheKey(prefix, key) {
        return `${prefix}:${key}`;
    }
    async get(prefix, key) {
        const cacheKey = this.getCacheKey(prefix, key);
        // L1: Check local cache
        const localEntry = this.localCache.get(cacheKey);
        if (localEntry && localEntry.expiry > Date.now()) {
            return localEntry.value;
        }
        return null;
    }
    async set(prefix, key, value, ttl) {
        const cacheKey = this.getCacheKey(prefix, key);
        // Update local cache
        this.localCache.set(cacheKey, {
            value,
            expiry: Date.now() + (ttl ? ttl * 1000 : this.LOCAL_CACHE_TTL)
        });
    }
    async delete(prefix, key) {
        const cacheKey = this.getCacheKey(prefix, key);
        this.localCache.delete(cacheKey);
    }
    async invalidatePattern(pattern) {
        // Clear local cache entries matching pattern
        for (const key of this.localCache.keys()){
            if (key.match(pattern)) {
                this.localCache.delete(key);
            }
        }
    }
    // Rate limiting (Mocked)
    async checkRateLimit(key, limit, window) {
        return true; // Always allow
    }
    async disconnect() {
    // await this.redis.quit();
    }
}
const cacheService = new CacheService();
}),
"[project]/lib/services/hybrid-search-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "HybridSearchService",
    ()=>HybridSearchService,
    "hybridSearchService",
    ()=>hybridSearchService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$search$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/search-service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$elasticsearch$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/elasticsearch-service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$cache$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/cache-service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$search$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$search$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
class HybridSearchService {
    CACHE_TTL = 300;
    SEARCH_TIMEOUT = 5000;
    /**
   * Generate cache key for search query
   */ getCacheKey(params) {
        const normalized = {
            query: params.query.toLowerCase().trim(),
            page: params.page || 1,
            pageSize: params.pageSize || 10,
            filters: params.filters || {}
        };
        const hash = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash('sha256').update(JSON.stringify(normalized)).digest('hex');
        return `search:${hash}`;
    }
    /**
   * Main search method with hybrid strategy
   */ async search(params) {
        const startTime = Date.now();
        const cacheKey = this.getCacheKey(params);
        const useCache = params.useCache !== false;
        try {
            // Step 1: Try cache
            if (useCache) {
                const cached = await this.tryCache(cacheKey);
                if (cached) {
                    console.log(`Cache hit for query: "${params.query}"`);
                    cached.query_time_ms = Date.now() - startTime;
                    return cached;
                }
            }
            // Step 2: Try Elasticsearch (if configured and preferred)
            if (params.preferElasticsearch && process.env.ENABLE_ELASTICSEARCH === 'true') {
                try {
                    const esResult = await this.tryElasticsearch(params);
                    if (esResult) {
                        console.log(`Elasticsearch returned ${esResult.results.length} results`);
                        // Cache the result
                        if (useCache) {
                            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$cache$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cacheService"].set(cacheKey, esResult, this.CACHE_TTL).catch((err)=>{
                                console.error('Failed to cache ES result:', err);
                            });
                        }
                        esResult.query_time_ms = Date.now() - startTime;
                        return esResult;
                    }
                } catch (error) {
                    console.warn('Elasticsearch search failed, falling back to PostgreSQL:', error);
                }
            }
            // Step 3: Fallback to PostgreSQL
            console.log('Using PostgreSQL for search');
            const pgResult = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$search$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["searchService"].search(params);
            // Cache the result
            if (useCache) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$cache$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cacheService"].set(cacheKey, pgResult, this.CACHE_TTL).catch((err)=>{
                    console.error('Failed to cache PG result:', err);
                });
            }
            pgResult.query_time_ms = Date.now() - startTime;
            return pgResult;
        } catch (error) {
            console.error('All search backends failed:', error);
            throw new Error('Search service temporarily unavailable');
        }
    }
    /**
   * Try to get results from cache
   */ async tryCache(cacheKey) {
        try {
            const cached = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$cache$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cacheService"].get('search', cacheKey);
            return cached;
        } catch (error) {
            console.warn('Cache lookup failed:', error);
            return null;
        }
    }
    /**
   * Try to get results from Elasticsearch
   */ async tryElasticsearch(params) {
        // Check if Elasticsearch is healthy
        const isHealthy = await this.withTimeout(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$elasticsearch$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["elasticsearchService"].healthCheck(), 2000);
        if (!isHealthy) {
            console.log('Elasticsearch not healthy, skipping');
            return null;
        }
        // Execute search with timeout
        const esResponse = await this.withTimeout(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$elasticsearch$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["elasticsearchService"].search(params.query, {
            page: params.page,
            pageSize: params.pageSize,
            filters: params.filters
        }), this.SEARCH_TIMEOUT);
        if (!esResponse || esResponse.hits.length === 0) {
            return null;
        }
        // Transform Elasticsearch results to SearchResponse format
        const results = esResponse.hits.map((hit)=>{
            const source = hit._source;
            return {
                doc_id: hit._id,
                url: source.url,
                title: source.title,
                snippet: this.extractSnippet(hit, source),
                score: hit._score || 0,
                highlights: this.extractHighlights(hit),
                metadata: {
                    author: source.author,
                    published_date: source.crawl_timestamp,
                    language: source.language
                }
            };
        });
        return {
            query: {
                original: params.query
            },
            results,
            total_results: esResponse.total,
            page: params.page || 1,
            page_size: params.pageSize || 10,
            query_time_ms: 0,
            suggestions: []
        };
    }
    /**
   * Extract snippet from Elasticsearch hit
   */ extractSnippet(hit, source) {
        if (hit.highlight?.body) {
            return hit.highlight.body[0];
        }
        if (hit.highlight?.meta_description) {
            return hit.highlight.meta_description[0];
        }
        if (source.meta_description) {
            return source.meta_description.substring(0, 200);
        }
        if (source.body) {
            return source.body.substring(0, 200) + '...';
        }
        return '';
    }
    /**
   * Extract highlights from Elasticsearch hit
   */ extractHighlights(hit) {
        const highlights = [];
        if (hit.highlight) {
            for (const field of Object.keys(hit.highlight)){
                highlights.push(...hit.highlight[field]);
            }
        }
        return highlights;
    }
    /**
   * Execute promise with timeout
   */ async withTimeout(promise, timeoutMs) {
        return Promise.race([
            promise,
            new Promise((_, reject)=>setTimeout(()=>reject(new Error('Operation timed out')), timeoutMs))
        ]);
    }
    /**
   * Warm up cache with popular queries
   */ async warmCache(queries) {
        console.log(`Warming cache with ${queries.length} queries...`);
        const promises = queries.map((query)=>this.search({
                query,
                page: 1,
                pageSize: 10,
                useCache: true
            }).catch((err)=>{
                console.error(`Failed to warm cache for query "${query}":`, err);
            }));
        await Promise.all(promises);
        console.log('Cache warming complete');
    }
    /**
   * Invalidate cache for a query
   */ async invalidateCache(params) {
        const cacheKey = this.getCacheKey(params);
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$cache$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cacheService"].delete('search', cacheKey);
    }
    /**
   * Get search backend health status
   */ async getHealthStatus() {
        const [esHealth, pgHealth] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$elasticsearch$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["elasticsearchService"].healthCheck().catch(()=>false),
            this.checkPostgresHealth().catch(()=>false)
        ]);
        return {
            elasticsearch: esHealth,
            postgresql: pgHealth,
            cache: true
        };
    }
    /**
   * Check PostgreSQL health
   */ async checkPostgresHealth() {
        try {
            // Try a simple search
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$search$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["searchService"].search({
                query: 'test',
                page: 1,
                pageSize: 1
            });
            return true;
        } catch  {
            return false;
        }
    }
}
const hybridSearchService = new HybridSearchService();
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/services/interaction-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "InteractionService",
    ()=>InteractionService,
    "interactionService",
    ()=>interactionService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
class InteractionService {
    async logSearchEvent(event) {
        const sql = `
            INSERT INTO search_events (
                user_id, 
                session_id, 
                query_text, 
                result_count, 
                execution_time_ms
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING event_id
        `;
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query(sql, [
                event.user_id || null,
                event.session_id,
                event.query,
                event.result_count,
                event.execution_time_ms
            ]);
            return result.rows[0].event_id;
        } catch (error) {
            console.error('Failed to log search event:', error);
            return ''; // Fail gracefully
        }
    }
    async logClickEvent(event) {
        const sql = `
            INSERT INTO click_events (
                search_event_id,
                doc_id,
                position
            )
            VALUES ($1, $2, $3)
            RETURNING click_id
        `;
        try {
            // Verify search_event_id exists to maintain referential integrity
            // In a real high-volume system, we might skip this check or use a queue
            if (event.search_event_id) {
                const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query(sql, [
                    event.search_event_id,
                    event.doc_id,
                    event.position
                ]);
                return result.rows[0].click_id;
            } else {
                console.warn('Click event missing search_event_id, skipping insert');
                return '';
            }
        } catch (error) {
            console.error('Failed to log click event:', error);
            return '';
        }
    }
    async getUserHistory(userId, limit = 10) {
        const sql = `
            SELECT 
                se.query_text, 
                se.timestamp, 
                count(ce.click_id) as clicks
            FROM search_events se
            LEFT JOIN click_events ce ON se.event_id = ce.search_event_id
            WHERE se.user_id = $1
            GROUP BY se.event_id, se.query_text, se.timestamp
            ORDER BY se.timestamp DESC
            LIMIT $2
        `;
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query(sql, [
                userId,
                limit
            ]);
            return result.rows;
        } catch (error) {
            console.error('Failed to get user history:', error);
            return [];
        }
    }
}
const interactionService = new InteractionService();
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

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
"[project]/lib/validation/schemas.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clickEventSchema",
    ()=>clickEventSchema,
    "crawlRequestSchema",
    ()=>crawlRequestSchema,
    "createErrorResponse",
    ()=>createErrorResponse,
    "sanitizeHtml",
    ()=>sanitizeHtml,
    "sanitizeUrl",
    ()=>sanitizeUrl,
    "searchRequestSchema",
    ()=>searchRequestSchema,
    "suggestionRequestSchema",
    ()=>suggestionRequestSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
;
const searchRequestSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    query: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, 'Query cannot be empty').max(500, 'Query too long (max 500 characters)').transform((val)=>sanitizeQuery(val)),
    page: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive().max(100, 'Page number too high').default(1).optional(),
    page_size: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive().min(1).max(100, 'Page size too large').default(10).optional(),
    filters: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        language: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().length(2).optional(),
        site: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)).optional(),
        dateRange: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            start: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime().optional(),
            end: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime().optional()
        }).optional()
    }).optional(),
    options: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        spell_correct: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
        exact_match: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
        safe_search: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(true).optional()
    }).optional()
});
const suggestionRequestSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    q: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, 'Query must be at least 1 character').max(200, 'Query too long').transform((val)=>sanitizeQuery(val)),
    limit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive().max(20).default(10).optional()
});
const clickEventSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    search_event_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid('Invalid search event ID'),
    doc_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid('Invalid document ID'),
    position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive().max(1000),
    url: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url('Invalid URL'),
    query: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(500).optional()
});
const crawlRequestSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    urls: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url('Invalid URL')).min(1, 'At least one URL required').max(1000, 'Too many URLs (max 1000)'),
    priority: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'low',
        'normal',
        'high'
    ]).default('normal').optional(),
    respect_robots: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(true).optional()
});
/**
 * Sanitizes search query to prevent injection attacks
 * Removes potentially dangerous characters while preserving search functionality
 */ function sanitizeQuery(query) {
    // Remove null bytes
    let sanitized = query.replace(/\0/g, '');
    // Remove control characters except newline, carriage return, tab
    sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
    // Limit consecutive spaces
    sanitized = sanitized.replace(/\s+/g, ' ');
    // Remove leading/trailing whitespace
    sanitized = sanitized.trim();
    // Remove potentially dangerous SQL patterns (defense in depth)
    const dangerousPatterns = [
        /;\s*(drop|delete|insert|update|create|alter|exec|execute|script)/gi,
        /--/g,
        /\/\*/g,
        /\*\//g
    ];
    for (const pattern of dangerousPatterns){
        sanitized = sanitized.replace(pattern, '');
    }
    return sanitized;
}
function sanitizeHtml(html) {
    if (!html) return '';
    // Strip HTML tags
    let sanitized = html.replace(/<[^>]*>/g, '');
    // Encode special characters
    sanitized = sanitized.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F;');
    return sanitized;
}
function sanitizeUrl(url) {
    try {
        const parsed = new URL(url);
        // Only allow http and https protocols
        if (![
            'http:',
            'https:'
        ].includes(parsed.protocol)) {
            throw new Error('Invalid protocol');
        }
        return parsed.toString();
    } catch  {
        throw new Error('Invalid URL format');
    }
}
function createErrorResponse(code, message, details, requestId) {
    return {
        error: {
            code,
            message,
            details
        },
        request_id: requestId || `req_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        timestamp: new Date().toISOString()
    };
}
}),
"[project]/lib/middleware/rate-limit.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createRateLimitMiddleware",
    ()=>createRateLimitMiddleware,
    "getSessionKey",
    ()=>getSessionKey,
    "rateLimitConfigs",
    ()=>rateLimitConfigs,
    "rateLimiter",
    ()=>rateLimiter,
    "withRateLimit",
    ()=>withRateLimit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validation/schemas.ts [app-route] (ecmascript)");
;
;
class RateLimiter {
    store = new Map();
    cleanupInterval;
    constructor(){
        // Cleanup old entries every 5 minutes
        this.cleanupInterval = setInterval(()=>{
            this.cleanup();
        }, 5 * 60 * 1000);
    }
    /**
   * Check if request is allowed under rate limit
   */ check(key, config) {
        const now = Date.now();
        const windowStart = now - config.windowMs;
        // Get or create record
        let record = this.store.get(key);
        if (!record) {
            record = {
                timestamps: []
            };
            this.store.set(key, record);
        }
        // Check if currently blocked
        if (record.blockedUntil && record.blockedUntil > now) {
            return {
                allowed: false,
                remaining: 0,
                resetAt: new Date(record.blockedUntil)
            };
        }
        // Remove timestamps outside the window
        record.timestamps = record.timestamps.filter((ts)=>ts > windowStart);
        // Check if limit exceeded
        if (record.timestamps.length >= config.maxRequests) {
            // Block for remaining window time
            const oldestTimestamp = Math.min(...record.timestamps);
            const resetAt = oldestTimestamp + config.windowMs;
            record.blockedUntil = resetAt;
            return {
                allowed: false,
                remaining: 0,
                resetAt: new Date(resetAt)
            };
        }
        // Add current request
        record.timestamps.push(now);
        return {
            allowed: true,
            remaining: config.maxRequests - record.timestamps.length,
            resetAt: new Date(now + config.windowMs)
        };
    }
    /**
   * Cleanup old entries from store
   */ cleanup() {
        const now = Date.now();
        const maxAge = 3600000; // 1 hour
        for (const [key, record] of this.store.entries()){
            // Remove if no recent activity and not blocked
            if ((!record.blockedUntil || record.blockedUntil < now) && record.timestamps.length === 0) {
                this.store.delete(key);
                continue;
            }
            // Remove if last activity was over max age
            if (record.timestamps.length > 0) {
                const lastTimestamp = Math.max(...record.timestamps);
                if (now - lastTimestamp > maxAge) {
                    this.store.delete(key);
                }
            }
        }
    }
    /**
   * Reset rate limit for a key
   */ reset(key) {
        this.store.delete(key);
    }
    /**
   * Shutdown cleanup interval
   */ destroy() {
        clearInterval(this.cleanupInterval);
    }
}
// Global rate limiter instance
const rateLimiter = new RateLimiter();
const rateLimitConfigs = {
    // Search API: 60 requests per minute per IP
    search: {
        windowMs: 60 * 1000,
        maxRequests: 60
    },
    // Suggestions API: 120 requests per minute per IP (more lenient for autocomplete)
    suggest: {
        windowMs: 60 * 1000,
        maxRequests: 120
    },
    // Admin APIs: 10 requests per minute per IP
    admin: {
        windowMs: 60 * 1000,
        maxRequests: 10
    },
    // Click tracking: 100 requests per minute per IP
    click: {
        windowMs: 60 * 1000,
        maxRequests: 100
    }
};
/**
 * Get client identifier from request
 * Uses IP address, falling back to user-agent if IP unavailable
 */ function getClientKey(req, prefix = 'rl') {
    // Get IP address
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const ip = forwarded?.split(',')[0] || realIp || req.ip || 'unknown';
    // Include user agent for better uniqueness
    const userAgent = req.headers.get('user-agent') || 'unknown';
    const userAgentHash = simpleHash(userAgent);
    return `${prefix}:${ip}:${userAgentHash}`;
}
/**
 * Simple hash function for strings
 */ function simpleHash(str) {
    let hash = 0;
    for(let i = 0; i < str.length; i++){
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
}
function createRateLimitMiddleware(config) {
    return async (req)=>{
        // Generate rate limit key
        const key = config.keyGenerator?.(req) || getClientKey(req);
        // Check rate limit
        const result = rateLimiter.check(key, config);
        // Add rate limit headers
        const headers = new Headers();
        headers.set('X-RateLimit-Limit', config.maxRequests.toString());
        headers.set('X-RateLimit-Remaining', result.remaining.toString());
        headers.set('X-RateLimit-Reset', result.resetAt.toISOString());
        // If rate limit exceeded, return 429
        if (!result.allowed) {
            const retryAfter = Math.ceil((result.resetAt.getTime() - Date.now()) / 1000);
            headers.set('Retry-After', retryAfter.toString());
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createErrorResponse"])('RATE_LIMIT_EXCEEDED', 'Too many requests. Please try again later.', {
                limit: config.maxRequests,
                window_ms: config.windowMs,
                retry_after_seconds: retryAfter
            }), {
                status: 429,
                headers
            });
        }
        return null; // Allow request to proceed
    };
}
function withRateLimit(handler, config) {
    return async (req)=>{
        const rateLimitMiddleware = createRateLimitMiddleware(config);
        const rateLimitResponse = await rateLimitMiddleware(req);
        if (rateLimitResponse) {
            return rateLimitResponse;
        }
        return handler(req);
    };
}
function getSessionKey(req) {
    const sessionId = req.headers.get('x-session-id');
    const userId = req.headers.get('x-user-id');
    if (userId) {
        return `rl:user:${userId}`;
    } else if (sessionId) {
        return `rl:session:${sessionId}`;
    } else {
        return getClientKey(req);
    }
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$hybrid$2d$search$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/hybrid-search-service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$interaction$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/interaction-service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$metrics$2f$prometheus$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/metrics/prometheus.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validation/schemas.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$middleware$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/middleware/rate-limit.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$hybrid$2d$search$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$interaction$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$hybrid$2d$search$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$interaction$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
/**
 * Search API endpoint
 * POST /api/v1/search
 * 
 * Features:
 * - Input validation and sanitization
 * - Rate limiting (60 req/min per IP)
 * - Hybrid search (Cache → Elasticsearch → PostgreSQL)
 * - Comprehensive error handling
 * - Metrics collection
 */ async function searchHandler(req) {
    const startTime = Date.now();
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    try {
        // Parse and validate request body
        const body = await req.json();
        const validation = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["searchRequestSchema"].safeParse(body);
        if (!validation.success) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$metrics$2f$prometheus$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["queryCounter"].inc({
                status: 'error',
                cache_hit: 'false'
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createErrorResponse"])('VALIDATION_ERROR', 'Invalid request parameters', validation.error.errors, requestId), {
                status: 400
            });
        }
        const { query, page, page_size, filters, options } = validation.data;
        // Execute hybrid search (Cache → PostgreSQL fallback, skip Elasticsearch)
        const searchStart = Date.now();
        const results = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$hybrid$2d$search$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hybridSearchService"].search({
            query,
            page,
            pageSize: page_size,
            filters,
            useCache: true,
            preferElasticsearch: process.env.ENABLE_ELASTICSEARCH === 'true'
        });
        const executionTime = Date.now() - searchStart;
        // Log search event
        const sessionId = req.headers.get('x-session-id') || 'anonymous';
        const userId = req.headers.get('x-user-id') || undefined;
        let eventId = '';
        try {
            eventId = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$interaction$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["interactionService"].logSearchEvent({
                user_id: userId,
                session_id: sessionId,
                query,
                result_count: results.total_results,
                execution_time_ms: executionTime
            });
        } catch (err) {
            console.error('Error logging search event:', err);
        }
        // Record metrics
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$metrics$2f$prometheus$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["queryCounter"].inc({
            status: 'success',
            cache_hit: 'false'
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$metrics$2f$prometheus$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["queryResultCount"].observe(results.results.length);
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$metrics$2f$prometheus$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["queryLatency"].observe({
            stage: 'total'
        }, (Date.now() - startTime) / 1000);
        // Add response headers
        const headers = new Headers();
        headers.set('X-Request-ID', requestId);
        headers.set('X-Query-Time-Ms', executionTime.toString());
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ...results,
            meta: {
                search_event_id: eventId,
                request_id: requestId
            }
        }, {
            headers
        });
    } catch (error) {
        console.error('Search API error:', error);
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$metrics$2f$prometheus$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["queryCounter"].inc({
            status: 'error',
            cache_hit: 'false'
        });
        // Determine error type and status code
        let statusCode = 500;
        let errorCode = 'INTERNAL_ERROR';
        let errorMessage = 'An internal server error occurred';
        if (error.message === 'Search service temporarily unavailable') {
            statusCode = 503;
            errorCode = 'SERVICE_UNAVAILABLE';
            errorMessage = error.message;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createErrorResponse"])(errorCode, errorMessage, ("TURBOPACK compile-time truthy", 1) ? error.message : "TURBOPACK unreachable", requestId), {
            status: statusCode
        });
    }
}
const POST = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$middleware$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withRateLimit"])(searchHandler, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$middleware$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["rateLimitConfigs"].search);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__52bd0634._.js.map