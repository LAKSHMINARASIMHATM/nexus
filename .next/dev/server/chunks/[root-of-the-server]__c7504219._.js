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

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@neondatabase/serverless/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$lib$2f$main$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dotenv/lib/main.js [app-route] (ecmascript)");
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$lib$2f$main$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["config"]({
    path: '.env.local'
});
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$lib$2f$main$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["config"]({
    path: '.env'
});
console.log('Initializing Neon DB pool...');
const pool = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Pool"]({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/search_engine',
    ssl: true
});
const __TURBOPACK__default__export__ = pool;
}),
"[project]/lib/services/search-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SearchService",
    ()=>SearchService,
    "searchService",
    ()=>searchService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
;
class SearchService {
    async search(params) {
        const startTime = Date.now();
        const { query, page = 1, pageSize = 10 } = params;
        const offset = (page - 1) * pageSize;
        // Handle single character/variable searches with pattern matching
        const isSingleChar = query.trim().length === 1;
        const siteFilter = params.filters?.site;
        const hasSiteFilter = siteFilter && (Array.isArray(siteFilter) ? siteFilter.length > 0 : true);
        const siteCondition = hasSiteFilter ? Array.isArray(siteFilter) ? `AND url ILIKE ANY($${isSingleChar ? 5 : 4})` : `AND url ILIKE $${isSingleChar ? 5 : 4}` : '';
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
                        CASE 
                            WHEN title ILIKE $1 THEN 3.0
                            WHEN meta_description ILIKE $1 THEN 2.0
                            WHEN body ILIKE $1 THEN 1.0
                            ELSE 0.5
                        END as rank
                    FROM documents
                    WHERE 
                        (title ILIKE $1 OR 
                         meta_description ILIKE $1 OR 
                         body ILIKE $1)
                        ${siteCondition}
                ),
                total_count AS (
                    SELECT COUNT(*) as count FROM ranked_docs
                )
                SELECT 
                    rd.*,
                    tc.count as total_results,
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
            if (hasSiteFilter) {
                const patterns = Array.isArray(siteFilter) ? siteFilter.map((s)=>`%${s}%`) : `%${siteFilter}%`;
                queryParams.push(patterns);
            }
        } else {
            // PostgreSQL Full-Text Search for longer queries
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
                        ${siteCondition}
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
            if (hasSiteFilter) {
                const patterns = Array.isArray(siteFilter) ? siteFilter.map((s)=>`%${s}%`) : `%${siteFilter}%`;
                queryParams.push(patterns);
            }
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
}),
"[project]/app/api/v1/suggest/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$search$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/search-service.ts [app-route] (ecmascript)");
;
;
async function GET(req) {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    if (!query) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            query: '',
            suggestions: []
        }, {
            status: 200
        });
    }
    const suggestions = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$search$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["searchService"].suggest(query, limit);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        query,
        suggestions: suggestions.map((text)=>({
                text,
                frequency: 0
            }))
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c7504219._.js.map