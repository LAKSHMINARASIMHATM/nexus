// Local Cache Service (Free Tier)
class CacheService {
    private localCache: Map<string, { value: any; expiry: number }>;
    private readonly LOCAL_CACHE_TTL = 60 * 1000; // 1 minute

    constructor() {
        this.localCache = new Map();
        console.log('CacheService initialized (Local Map)');

        // Cleanup expired local cache entries
        setInterval(() => {
            const now = Date.now();
            for (const [key, entry] of this.localCache.entries()) {
                if (entry.expiry < now) {
                    this.localCache.delete(key);
                }
            }
        }, 60000); // Every minute
    }

    private getCacheKey(prefix: string, key: string): string {
        return `${prefix}:${key}`;
    }

    async get<T>(prefix: string, key: string): Promise<T | null> {
        const cacheKey = this.getCacheKey(prefix, key);
        const localEntry = this.localCache.get(cacheKey);

        if (localEntry && localEntry.expiry > Date.now()) {
            return localEntry.value as T;
        }

        return null;
    }

    async set(prefix: string, key: string, value: any, ttl?: number): Promise<void> {
        const cacheKey = this.getCacheKey(prefix, key);
        this.localCache.set(cacheKey, {
            value,
            expiry: Date.now() + (ttl ? ttl * 1000 : this.LOCAL_CACHE_TTL),
        });
    }

    async delete(prefix: string, key: string): Promise<void> {
        const cacheKey = this.getCacheKey(prefix, key);
        this.localCache.delete(cacheKey);
    }

    async invalidatePattern(pattern: string): Promise<void> {
        const regex = new RegExp(pattern);
        for (const key of this.localCache.keys()) {
            if (regex.test(key)) {
                this.localCache.delete(key);
            }
        }
    }

    async checkRateLimit(key: string, limit: number, window: number): Promise<boolean> {
        // Simple memory-based rate limiting could be added here if needed
        return true;
    }

    async disconnect(): Promise<void> {
        // No-op for local map
    }
}

export const cacheService = new CacheService();
