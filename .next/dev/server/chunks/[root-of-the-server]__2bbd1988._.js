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
"[project]/lib/services/recommendation-client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * TypeScript Client for AI Recommendation System API
 * 
 * This client provides a type-safe interface to interact with the
 * AI Recommendation System deployed at Render.com
 */ // ============================================================================
// Type Definitions
// ============================================================================
/**
 * Request to get predictions for specific items
 */ __turbopack_context__.s([
    "RecommendationAPIError",
    ()=>RecommendationAPIError,
    "RecommendationClient",
    ()=>RecommendationClient,
    "RecommendationNetworkError",
    ()=>RecommendationNetworkError,
    "createRecommendationClient",
    ()=>createRecommendationClient
]);
class RecommendationAPIError extends Error {
    statusCode;
    details;
    constructor(message, statusCode, details){
        super(message), this.statusCode = statusCode, this.details = details;
        this.name = 'RecommendationAPIError';
    }
}
class RecommendationNetworkError extends Error {
    originalError;
    constructor(message, originalError){
        super(message), this.originalError = originalError;
        this.name = 'RecommendationNetworkError';
    }
}
class RecommendationClient {
    baseUrl;
    timeout;
    headers;
    retries;
    retryDelay;
    /**
     * Create a new RecommendationClient instance
     * 
     * @param config - Client configuration or base URL string
     * 
     * @example
     * ```typescript
     * // Simple usage
     * const client = new RecommendationClient('https://ai-recommendation-system-lt3w.onrender.com');
     * 
     * // With configuration
     * const client = new RecommendationClient({
     *   baseUrl: 'https://ai-recommendation-system-lt3w.onrender.com',
     *   timeout: 60000,
     *   retries: 5
     * });
     * ```
     */ constructor(config){
        if (typeof config === 'string') {
            this.baseUrl = config.replace(/\/$/, ''); // Remove trailing slash
            this.timeout = 30000;
            this.headers = {
                'Content-Type': 'application/json'
            };
            this.retries = 3;
            this.retryDelay = 1000;
        } else {
            this.baseUrl = config.baseUrl.replace(/\/$/, '');
            this.timeout = config.timeout ?? 30000;
            this.headers = {
                'Content-Type': 'application/json',
                ...config.headers
            };
            this.retries = config.retries ?? 3;
            this.retryDelay = config.retryDelay ?? 1000;
        }
    }
    /**
     * Make an HTTP request with retry logic
     */ async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        let lastError = null;
        for(let attempt = 0; attempt <= this.retries; attempt++){
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(()=>controller.abort(), this.timeout);
                const response = await fetch(url, {
                    ...options,
                    headers: {
                        ...this.headers,
                        ...options.headers
                    },
                    signal: controller.signal
                });
                clearTimeout(timeoutId);
                // Handle non-OK responses
                if (!response.ok) {
                    const errorData = await response.json().catch(()=>({}));
                    throw new RecommendationAPIError(`API request failed: ${response.statusText}`, response.status, errorData);
                }
                // Parse and return JSON response
                const data = await response.json();
                return data;
            } catch (error) {
                lastError = error;
                // Don't retry on client errors (4xx)
                if (error instanceof RecommendationAPIError && error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
                    throw error;
                }
                // If this was the last attempt, throw the error
                if (attempt === this.retries) {
                    break;
                }
                // Wait before retrying
                await new Promise((resolve)=>setTimeout(resolve, this.retryDelay * (attempt + 1)));
            }
        }
        // All retries failed
        if (lastError instanceof RecommendationAPIError) {
            throw lastError;
        }
        throw new RecommendationNetworkError(`Request failed after ${this.retries + 1} attempts`, lastError || undefined);
    }
    // ==========================================================================
    // Public API Methods
    // ==========================================================================
    /**
     * Get predictions for specific items for a user
     * 
     * @param userId - The user ID
     * @param itemIds - Array of item IDs to get predictions for
     * @returns Prediction response with scores for each item
     * 
     * @example
     * ```typescript
     * const predictions = await client.predict(123, [1, 2, 3, 4, 5]);
     * console.log(predictions.recommendations);
     * ```
     */ async predict(userId, itemIds) {
        const request = {
            user_id: userId,
            item_ids: itemIds
        };
        return this.request('/predict', {
            method: 'POST',
            body: JSON.stringify(request)
        });
    }
    /**
     * Get top-K recommendations for a user
     * 
     * @param userId - The user ID
     * @param k - Number of recommendations to return (default: 10)
     * @returns Top-K recommendations sorted by score
     * 
     * @example
     * ```typescript
     * // Get top 10 recommendations
     * const recommendations = await client.getRecommendations(123);
     * 
     * // Get top 20 recommendations
     * const recommendations = await client.getRecommendations(123, 20);
     * ```
     */ async getRecommendations(userId, k = 10) {
        const request = {
            user_id: userId,
            k
        };
        return this.request('/recommend_top_k', {
            method: 'POST',
            body: JSON.stringify(request)
        });
    }
    /**
     * Check the health status of the API
     * 
     * @returns Health check response
     * 
     * @example
     * ```typescript
     * const health = await client.healthCheck();
     * console.log(health.status); // 'healthy'
     * ```
     */ async healthCheck() {
        return this.request('/health', {
            method: 'GET'
        });
    }
    /**
     * Get Prometheus metrics from the API
     * 
     * @returns Raw metrics text in Prometheus format
     * 
     * @example
     * ```typescript
     * const metrics = await client.getMetrics();
     * console.log(metrics);
     * ```
     */ async getMetrics() {
        const url = `${this.baseUrl}/metrics`;
        const response = await fetch(url, {
            headers: this.headers
        });
        if (!response.ok) {
            throw new RecommendationAPIError(`Failed to fetch metrics: ${response.statusText}`, response.status);
        }
        return response.text();
    }
    /**
     * Get API information and available endpoints
     * 
     * @returns API information object
     * 
     * @example
     * ```typescript
     * const info = await client.getInfo();
     * console.log(info.version); // '1.0'
     * ```
     */ async getInfo() {
        return this.request('/', {
            method: 'GET'
        });
    }
    // ==========================================================================
    // Utility Methods
    // ==========================================================================
    /**
     * Update client configuration
     * 
     * @param config - Partial configuration to update
     */ updateConfig(config) {
        if (config.timeout !== undefined) this.timeout = config.timeout;
        if (config.headers !== undefined) {
            this.headers = {
                ...this.headers,
                ...config.headers
            };
        }
        if (config.retries !== undefined) this.retries = config.retries;
        if (config.retryDelay !== undefined) this.retryDelay = config.retryDelay;
    }
    /**
     * Get the current base URL
     */ getBaseUrl() {
        return this.baseUrl;
    }
}
function createRecommendationClient(config) {
    return new RecommendationClient(config);
}
}),
"[project]/app/api/recommendations/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Next.js API Route for AI Recommendations
 * 
 * This demonstrates how to integrate the RecommendationClient
 * into your Next.js application
 */ __turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$recommendation$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/recommendation-client.ts [app-route] (ecmascript)");
;
;
// Initialize the client (reuse across requests)
const recommendationClient = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$recommendation$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RecommendationClient"]({
    baseUrl: 'https://ai-recommendation-system-lt3w.onrender.com',
    timeout: 30000,
    retries: 3
});
async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        // Parse query parameters
        const userIdParam = searchParams.get('userId');
        const kParam = searchParams.get('k');
        // Validate userId
        if (!userIdParam) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Missing required parameter: userId'
            }, {
                status: 400
            });
        }
        const userId = parseInt(userIdParam);
        if (isNaN(userId)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid userId: must be a number'
            }, {
                status: 400
            });
        }
        // Parse k parameter (default to 10)
        const k = kParam ? parseInt(kParam) : 10;
        if (isNaN(k) || k < 1 || k > 100) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid k: must be a number between 1 and 100'
            }, {
                status: 400
            });
        }
        // Get recommendations
        const recommendations = await recommendationClient.getRecommendations(userId, k);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: recommendations
        });
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$recommendation$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RecommendationAPIError"]) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: error.message,
                details: error.details
            }, {
                status: error.statusCode || 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Failed to fetch recommendations'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        // Validate request body
        if (!body.userId || typeof body.userId !== 'number') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Missing or invalid userId'
            }, {
                status: 400
            });
        }
        if (!Array.isArray(body.itemIds) || body.itemIds.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Missing or invalid itemIds: must be a non-empty array'
            }, {
                status: 400
            });
        }
        // Validate all item IDs are numbers
        if (!body.itemIds.every((id)=>typeof id === 'number')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'All itemIds must be numbers'
            }, {
                status: 400
            });
        }
        // Get predictions
        const predictions = await recommendationClient.predict(body.userId, body.itemIds);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: predictions
        });
    } catch (error) {
        console.error('Error getting predictions:', error);
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$recommendation$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RecommendationAPIError"]) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: error.message,
                details: error.details
            }, {
                status: error.statusCode || 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Failed to get predictions'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2bbd1988._.js.map