/**
 * TypeScript Client for AI Recommendation System API
 * 
 * This client provides a type-safe interface to interact with the
 * AI Recommendation System deployed at Render.com
 */

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Request to get predictions for specific items
 */
export interface PredictionRequest {
    user_id: number;
    item_ids: number[];
}

/**
 * Request to get top-K recommendations for a user
 */
export interface TopKRequest {
    user_id: number;
    k?: number; // Default: 10
}

/**
 * Individual recommendation item
 */
export interface Recommendation {
    item_id: number;
    score: number;
    [key: string]: any; // Allow additional properties
}

/**
 * Response containing recommendations
 */
export interface PredictionResponse {
    user_id: number;
    recommendations: Recommendation[];
}

/**
 * Health check response
 */
export interface HealthResponse {
    status: string;
    timestamp?: string;
    [key: string]: any;
}

/**
 * API error response
 */
export interface APIError {
    detail?: Array<{
        loc: (string | number)[];
        msg: string;
        type: string;
    }>;
    message?: string;
}

/**
 * Client configuration options
 */
export interface RecommendationClientConfig {
    baseUrl: string;
    timeout?: number; // Request timeout in milliseconds (default: 30000)
    headers?: Record<string, string>; // Custom headers
    retries?: number; // Number of retries on failure (default: 3)
    retryDelay?: number; // Delay between retries in ms (default: 1000)
}

// ============================================================================
// Custom Error Classes
// ============================================================================

export class RecommendationAPIError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
        public details?: APIError
    ) {
        super(message);
        this.name = 'RecommendationAPIError';
    }
}

export class RecommendationNetworkError extends Error {
    constructor(message: string, public originalError?: Error) {
        super(message);
        this.name = 'RecommendationNetworkError';
    }
}

// ============================================================================
// Recommendation Client
// ============================================================================

export class RecommendationClient {
    private baseUrl: string;
    private timeout: number;
    private headers: Record<string, string>;
    private retries: number;
    private retryDelay: number;

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
     */
    constructor(config: string | RecommendationClientConfig) {
        if (typeof config === 'string') {
            this.baseUrl = config.replace(/\/$/, ''); // Remove trailing slash
            this.timeout = 30000;
            this.headers = { 'Content-Type': 'application/json' };
            this.retries = 3;
            this.retryDelay = 1000;
        } else {
            this.baseUrl = config.baseUrl.replace(/\/$/, '');
            this.timeout = config.timeout ?? 30000;
            this.headers = {
                'Content-Type': 'application/json',
                ...config.headers,
            };
            this.retries = config.retries ?? 3;
            this.retryDelay = config.retryDelay ?? 1000;
        }
    }

    /**
     * Make an HTTP request with retry logic
     */
    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;
        let lastError: Error | null = null;

        for (let attempt = 0; attempt <= this.retries; attempt++) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), this.timeout);

                const response = await fetch(url, {
                    ...options,
                    headers: {
                        ...this.headers,
                        ...options.headers,
                    },
                    signal: controller.signal,
                });

                clearTimeout(timeoutId);

                // Handle non-OK responses
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new RecommendationAPIError(
                        `API request failed: ${response.statusText}`,
                        response.status,
                        errorData
                    );
                }

                // Parse and return JSON response
                const data = await response.json();
                return data as T;
            } catch (error) {
                lastError = error as Error;

                // Don't retry on client errors (4xx)
                if (
                    error instanceof RecommendationAPIError &&
                    error.statusCode &&
                    error.statusCode >= 400 &&
                    error.statusCode < 500
                ) {
                    throw error;
                }

                // If this was the last attempt, throw the error
                if (attempt === this.retries) {
                    break;
                }

                // Wait before retrying
                await new Promise((resolve) =>
                    setTimeout(resolve, this.retryDelay * (attempt + 1))
                );
            }
        }

        // All retries failed
        if (lastError instanceof RecommendationAPIError) {
            throw lastError;
        }
        throw new RecommendationNetworkError(
            `Request failed after ${this.retries + 1} attempts`,
            lastError || undefined
        );
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
     */
    async predict(
        userId: number,
        itemIds: number[]
    ): Promise<PredictionResponse> {
        const request: PredictionRequest = {
            user_id: userId,
            item_ids: itemIds,
        };

        return this.request<PredictionResponse>('/predict', {
            method: 'POST',
            body: JSON.stringify(request),
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
     */
    async getRecommendations(
        userId: number,
        k: number = 10
    ): Promise<PredictionResponse> {
        const request: TopKRequest = {
            user_id: userId,
            k,
        };

        return this.request<PredictionResponse>('/recommend_top_k', {
            method: 'POST',
            body: JSON.stringify(request),
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
     */
    async healthCheck(): Promise<HealthResponse> {
        return this.request<HealthResponse>('/health', {
            method: 'GET',
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
     */
    async getMetrics(): Promise<string> {
        const url = `${this.baseUrl}/metrics`;
        const response = await fetch(url, {
            headers: this.headers,
        });

        if (!response.ok) {
            throw new RecommendationAPIError(
                `Failed to fetch metrics: ${response.statusText}`,
                response.status
            );
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
     */
    async getInfo(): Promise<Record<string, any>> {
        return this.request<Record<string, any>>('/', {
            method: 'GET',
        });
    }

    // ==========================================================================
    // Utility Methods
    // ==========================================================================

    /**
     * Update client configuration
     * 
     * @param config - Partial configuration to update
     */
    updateConfig(config: Partial<Omit<RecommendationClientConfig, 'baseUrl'>>) {
        if (config.timeout !== undefined) this.timeout = config.timeout;
        if (config.headers !== undefined) {
            this.headers = { ...this.headers, ...config.headers };
        }
        if (config.retries !== undefined) this.retries = config.retries;
        if (config.retryDelay !== undefined) this.retryDelay = config.retryDelay;
    }

    /**
     * Get the current base URL
     */
    getBaseUrl(): string {
        return this.baseUrl;
    }
}

// ============================================================================
// Convenience Factory Function
// ============================================================================

/**
 * Create a new RecommendationClient instance
 * 
 * @param config - Client configuration or base URL string
 * @returns New RecommendationClient instance
 * 
 * @example
 * ```typescript
 * const client = createRecommendationClient('https://ai-recommendation-system-lt3w.onrender.com');
 * ```
 */
export function createRecommendationClient(
    config: string | RecommendationClientConfig
): RecommendationClient {
    return new RecommendationClient(config);
}
