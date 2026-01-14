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
"[project]/app/api/v1/click/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$interaction$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/interaction-service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validation/schemas.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$middleware$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/middleware/rate-limit.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$interaction$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$interaction$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
/**
 * Click Tracking API endpoint
 * POST /api/v1/click
 * 
 * Features:
 * - Input validation
 * - Rate limiting (100 req/min per IP)
 * - Async logging (fire and forget)
 */ async function clickHandler(req) {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    try {
        const body = await req.json();
        // Validate request body
        const validation = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clickEventSchema"].safeParse(body);
        if (!validation.success) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createErrorResponse"])('VALIDATION_ERROR', 'Invalid click event data', validation.error.errors, requestId), {
                status: 400
            });
        }
        const { search_event_id, doc_id, position, url } = validation.data;
        const sessionId = req.headers.get('x-session-id') || 'anonymous';
        const userId = req.headers.get('x-user-id') || undefined;
        // Log click event asynchronously (don't block response)
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$interaction$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["interactionService"].logClickEvent({
            search_event_id,
            doc_id,
            position,
            session_id: sessionId,
            user_id: userId
        }).catch((error)=>{
            console.error('Failed to log click event:', error);
        });
        // Return success immediately
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            request_id: requestId
        });
    } catch (error) {
        console.error('Click API error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createErrorResponse"])('INTERNAL_ERROR', 'Failed to process click event', ("TURBOPACK compile-time truthy", 1) ? error.message : "TURBOPACK unreachable", requestId), {
            status: 500
        });
    }
}
const POST = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$middleware$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withRateLimit"])(clickHandler, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$middleware$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["rateLimitConfigs"].click);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c0a1cc84._.js.map