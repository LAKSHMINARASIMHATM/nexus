import { SearchParams, SearchResponse, SearchResult, searchService } from './search-service';
import { cacheService } from './cache-service';
import crypto from 'crypto';

/**
 * Hybrid Search Service
 * Orchestrates search across multiple backends with fallback and caching
 * Priority: Cache → PostgreSQL (Free Tier)
 */

export interface HybridSearchOptions extends SearchParams {
  useCache?: boolean;
  preferElasticsearch?: boolean; // Ignored in free tier
  timeout?: number;
}

export class HybridSearchService {
  private readonly CACHE_TTL = 300; // 5 minutes

  /**
   * Generate cache key for search query
   */
  private getCacheKey(params: SearchParams): string {
    const normalized = {
      query: params.query.toLowerCase().trim(),
      page: params.page || 1,
      pageSize: params.pageSize || 10,
      filters: params.filters || {},
    };
    const hash = crypto.createHash('sha256').update(JSON.stringify(normalized)).digest('hex');
    return `search:${hash}`;
  }

  /**
   * Main search method
   */
  async search(params: HybridSearchOptions): Promise<SearchResponse> {
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

      // Step 2: PostgreSQL (Source of Truth)
      console.log('Using PostgreSQL for search (Free Tier)');
      const pgResult = await searchService.search(params);

      // Cache the result
      if (useCache) {
        await cacheService.set('search', cacheKey, pgResult, this.CACHE_TTL).catch((err) => {
          console.error('Failed to cache PG result:', err);
        });
      }

      pgResult.query_time_ms = Date.now() - startTime;
      return pgResult;

    } catch (error) {
      console.error('Search failed:', error);
      throw new Error('Search service temporarily unavailable');
    }
  }

  /**
   * Try to get results from cache
   */
  private async tryCache(cacheKey: string): Promise<SearchResponse | null> {
    try {
      const cached = await cacheService.get<SearchResponse>('search', cacheKey);
      return cached;
    } catch (error) {
      console.warn('Cache lookup failed:', error);
      return null;
    }
  }

  /**
   * Warm up cache with popular queries
   */
  async warmCache(queries: string[]): Promise<void> {
    console.log(`Warming cache with ${queries.length} queries...`);
    const promises = queries.map((query) =>
      this.search({ query, page: 1, pageSize: 10, useCache: true }).catch((err) => {
        console.error(`Failed to warm cache for query "${query}":`, err);
      })
    );
    await Promise.all(promises);
    console.log('Cache warming complete');
  }

  /**
   * Invalidate cache for a query
   */
  async invalidateCache(params: SearchParams): Promise<void> {
    const cacheKey = this.getCacheKey(params);
    await cacheService.delete('search', cacheKey);
  }

  /**
   * Get search backend health status
   */
  async getHealthStatus(): Promise<{
    elasticsearch: boolean;
    postgresql: boolean;
    cache: boolean;
  }> {
    const pgHealth = await this.checkPostgresHealth().catch(() => false);

    return {
      elasticsearch: false, // Disabled
      postgresql: pgHealth,
      cache: true,
    };
  }

  /**
   * Check PostgreSQL health
   */
  private async checkPostgresHealth(): Promise<boolean> {
    try {
      // Try a simple search
      await searchService.search({ query: 'test', page: 1, pageSize: 1 });
      return true;
    } catch {
      return false;
    }
  }
}

export const hybridSearchService = new HybridSearchService();

