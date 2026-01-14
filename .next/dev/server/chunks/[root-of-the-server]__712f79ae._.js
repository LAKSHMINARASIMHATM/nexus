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
"[project]/lib/services/local-recommendation-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

/**
 * Local Document Recommendation Service
 * 
 * Provides recommendations based on documents in the local database
 */ __turbopack_context__.s([
    "LocalRecommendationService",
    ()=>LocalRecommendationService,
    "localRecommendationService",
    ()=>localRecommendationService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
class LocalRecommendationService {
    /**
   * Get popular documents based on PageRank and recency
   */ async getPopularDocuments(options = {}) {
        const { limit = 10, offset = 0 } = options;
        const query = `
      SELECT 
        doc_id,
        url,
        title,
        meta_description,
        pagerank as score,
        pagerank,
        created_at
      FROM documents
      WHERE index_status = 'indexed'
        AND title IS NOT NULL
        AND title != ''
      ORDER BY 
        pagerank DESC,
        created_at DESC
      LIMIT $1 OFFSET $2
    `;
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query(query, [
            limit,
            offset
        ]);
        return result.rows;
    }
    /**
   * Get trending documents (recently added or updated)
   */ async getTrendingDocuments(options = {}) {
        const { limit = 10, offset = 0 } = options;
        const query = `
      SELECT 
        doc_id,
        url,
        title,
        meta_description,
        pagerank as score,
        pagerank,
        created_at
      FROM documents
      WHERE index_status = 'indexed'
        AND title IS NOT NULL
        AND title != ''
        AND created_at >= NOW() - INTERVAL '30 days'
      ORDER BY 
        created_at DESC,
        pagerank DESC
      LIMIT $1 OFFSET $2
    `;
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query(query, [
            limit,
            offset
        ]);
        return result.rows;
    }
    /**
   * Get similar documents based on content similarity
   * Uses the document's title and description to find related content
   */ async getSimilarDocuments(docId, options = {}) {
        const { limit = 10, offset = 0 } = options;
        // First, get the source document
        const sourceDoc = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query('SELECT title, meta_description FROM documents WHERE doc_id = $1', [
            docId
        ]);
        if (sourceDoc.rows.length === 0) {
            return [];
        }
        const { title, meta_description } = sourceDoc.rows[0];
        // Create search terms from title and description
        const searchText = [
            title,
            meta_description
        ].filter(Boolean).join(' ').replace(/[^\w\s]/g, ' ') // Remove special characters
        .split(/\s+/).filter((word)=>word.length > 3) // Only words longer than 3 chars
        .slice(0, 10) // Take first 10 words
        .join(' & '); // Use AND operator for tsquery
        if (!searchText) {
            return this.getPopularDocuments(options);
        }
        const query = `
      SELECT 
        doc_id,
        url,
        title,
        meta_description,
        similarity as score,
        pagerank,
        created_at
      FROM documents,
        similarity(title || ' ' || COALESCE(meta_description, ''), $1) as similarity
      WHERE doc_id != $2
        AND index_status = 'indexed'
        AND title IS NOT NULL
        AND title != ''
      ORDER BY 
        similarity DESC,
        pagerank DESC
      LIMIT $3 OFFSET $4
    `;
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query(query, [
                title + ' ' + (meta_description || ''),
                docId,
                limit,
                offset
            ]);
            return result.rows;
        } catch (error) {
            // Fallback to simple text matching if similarity function not available
            const fallbackQuery = `
        SELECT 
          doc_id,
          url,
          title,
          meta_description,
          0.5 as score,
          pagerank,
          created_at
        FROM documents
        WHERE doc_id != $1
          AND index_status = 'indexed'
          AND title IS NOT NULL
          AND title != ''
          AND (
            title ILIKE $2
            OR meta_description ILIKE $2
          )
        ORDER BY 
          pagerank DESC,
          created_at DESC
        LIMIT $3 OFFSET $4
      `;
            const searchPattern = `%${title.split(' ')[0]}%`;
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query(fallbackQuery, [
                docId,
                searchPattern,
                limit,
                offset
            ]);
            return result.rows;
        }
    }
    /**
   * Get documents related to a search query
   */ async getRelatedDocuments(query, options = {}) {
        const { limit = 10, offset = 0 } = options;
        if (!query || query.trim().length === 0) {
            return this.getPopularDocuments(options);
        }
        const searchQuery = `
      SELECT 
        doc_id,
        url,
        title,
        meta_description,
        GREATEST(
          similarity(title, $1),
          similarity(COALESCE(meta_description, ''), $1)
        ) as score,
        pagerank,
        created_at
      FROM documents
      WHERE index_status = 'indexed'
        AND title IS NOT NULL
        AND title != ''
      ORDER BY 
        score DESC,
        pagerank DESC
      LIMIT $2 OFFSET $3
    `;
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query(searchQuery, [
                query,
                limit,
                offset
            ]);
            return result.rows;
        } catch (error) {
            // Fallback to ILIKE search
            const fallbackQuery = `
        SELECT 
          doc_id,
          url,
          title,
          meta_description,
          CASE 
            WHEN title ILIKE $1 THEN 0.9
            WHEN meta_description ILIKE $1 THEN 0.7
            ELSE 0.5
          END as score,
          pagerank,
          created_at
        FROM documents
        WHERE index_status = 'indexed'
          AND title IS NOT NULL
          AND title != ''
          AND (
            title ILIKE $1
            OR meta_description ILIKE $1
          )
        ORDER BY 
          score DESC,
          pagerank DESC,
          created_at DESC
        LIMIT $2 OFFSET $3
      `;
            const searchPattern = `%${query}%`;
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query(fallbackQuery, [
                searchPattern,
                limit,
                offset
            ]);
            return result.rows;
        }
    }
    /**
   * Get random documents (for discovery)
   */ async getRandomDocuments(options = {}) {
        const { limit = 10, offset = 0 } = options;
        const query = `
      SELECT 
        doc_id,
        url,
        title,
        meta_description,
        RANDOM() as score,
        pagerank,
        created_at
      FROM documents
      WHERE index_status = 'indexed'
        AND title IS NOT NULL
        AND title != ''
      ORDER BY RANDOM()
      LIMIT $1 OFFSET $2
    `;
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query(query, [
            limit,
            offset
        ]);
        return result.rows;
    }
    /**
   * Get document count for statistics
   */ async getDocumentCount() {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].query("SELECT COUNT(*) as count FROM documents WHERE index_status = 'indexed'");
        return parseInt(result.rows[0].count);
    }
}
const localRecommendationService = new LocalRecommendationService();
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/app/api/recommendations/local/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

/**
 * Local Document Recommendations API
 * 
 * Provides recommendations based on documents in the local database
 */ __turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$local$2d$recommendation$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/local-recommendation-service.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$local$2d$recommendation$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$local$2d$recommendation$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const dynamic = 'force-dynamic';
async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        // Parse and validate parameters
        const type = searchParams.get('type');
        const limitParam = searchParams.get('limit');
        const offsetParam = searchParams.get('offset');
        const docId = searchParams.get('docId');
        const query = searchParams.get('query');
        // Validate type parameter
        if (!type) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Missing required parameter: type',
                validTypes: [
                    'popular',
                    'trending',
                    'similar',
                    'related',
                    'random'
                ]
            }, {
                status: 400
            });
        }
        const validTypes = [
            'popular',
            'trending',
            'similar',
            'related',
            'random'
        ];
        if (!validTypes.includes(type)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: `Invalid type: ${type}`,
                validTypes
            }, {
                status: 400
            });
        }
        // Parse limit and offset
        const limit = limitParam ? Math.min(parseInt(limitParam), 50) : 10;
        const offset = offsetParam ? parseInt(offsetParam) : 0;
        if (isNaN(limit) || limit < 1) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Invalid limit: must be a number between 1 and 50'
            }, {
                status: 400
            });
        }
        if (isNaN(offset) || offset < 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Invalid offset: must be a non-negative number'
            }, {
                status: 400
            });
        }
        // Get recommendations based on type
        let recommendations;
        switch(type){
            case 'popular':
                recommendations = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$local$2d$recommendation$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["localRecommendationService"].getPopularDocuments({
                    limit,
                    offset
                });
                break;
            case 'trending':
                recommendations = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$local$2d$recommendation$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["localRecommendationService"].getTrendingDocuments({
                    limit,
                    offset
                });
                break;
            case 'similar':
                if (!docId) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        success: false,
                        error: 'Missing required parameter for type=similar: docId'
                    }, {
                        status: 400
                    });
                }
                recommendations = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$local$2d$recommendation$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["localRecommendationService"].getSimilarDocuments(docId, {
                    limit,
                    offset
                });
                break;
            case 'related':
                if (!query) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        success: false,
                        error: 'Missing required parameter for type=related: query'
                    }, {
                        status: 400
                    });
                }
                recommendations = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$local$2d$recommendation$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["localRecommendationService"].getRelatedDocuments(query, {
                    limit,
                    offset
                });
                break;
            case 'random':
                recommendations = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$local$2d$recommendation$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["localRecommendationService"].getRandomDocuments({
                    limit,
                    offset
                });
                break;
            default:
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: `Unsupported type: ${type}`
                }, {
                    status: 400
                });
        }
        // Get total document count for context
        const totalDocuments = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$local$2d$recommendation$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["localRecommendationService"].getDocumentCount();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            type,
            recommendations,
            total: recommendations.length,
            totalDocuments,
            limit,
            offset
        });
    } catch (error) {
        console.error('Error fetching local recommendations:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Failed to fetch recommendations',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__712f79ae._.js.map