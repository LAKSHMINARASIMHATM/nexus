/**
 * Local Document Recommendation Service
 * 
 * Provides recommendations based on documents in the local database
 */

import pool from '../db';

export interface DocumentRecommendation {
  doc_id: string;
  url: string;
  title: string;
  meta_description: string | null;
  score: number;
  pagerank: number;
  created_at: Date;
}

export interface RecommendationOptions {
  limit?: number;
  offset?: number;
}

// Simple in-memory cache for high-frequency lists
interface CacheEntry<T> {
  data: T;
  expiry: number;
}

const cache = new Map<string, CacheEntry<any>>();
const CACHE_TTL = 10 * 60 * 1000; // Increase to 10 minutes

export class LocalRecommendationService {
  private getCached<T>(key: string): T | null {
    const entry = cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiry) {
      cache.delete(key);
      return null;
    }
    return entry.data;
  }

  private setCached<T>(key: string, data: T, customTTL?: number): void {
    cache.set(key, {
      data,
      expiry: Date.now() + (customTTL || CACHE_TTL)
    });
  }

  /**
   * Warm up the cache for common queries
   */
  async warmup(): Promise<void> {
    console.log('🔥 Warming up recommendations cache...');
    try {
      // Warm up popular and trending
      await Promise.all([
        this.getPopularDocuments({ limit: 10 }),
        this.getTrendingDocuments({ limit: 10 }),
        this.getTrendingDocuments({ limit: 5 }), // For landing page
        this.getPopularDocuments({ limit: 5 }),  // For sidebar
      ]);

      // Warm up common categories
      const commonCategories = [
        'technology ai software',
        'science research space',
        'design ux ui art',
        'web development internet code'
      ];

      await Promise.all(
        commonCategories.map(query => this.getRelatedDocuments(query, { limit: 5 }))
      );

      console.log('✅ Recommendations cache warmed up');
    } catch (error) {
      console.error('❌ Cache warmup failed:', error);
    }
  }

  /**
   * Get popular documents based on PageRank and recency
   */
  async getPopularDocuments(options: RecommendationOptions = {}): Promise<DocumentRecommendation[]> {
    const { limit = 10, offset = 0 } = options;
    const cacheKey = `popular_${limit}_${offset}`;

    const cached = this.getCached<DocumentRecommendation[]>(cacheKey);
    if (cached) return cached;

    const query = `
      WITH top_docs AS (
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
        LIMIT 20
      )
      SELECT * FROM top_docs
      ORDER BY RANDOM()
      LIMIT $1 OFFSET $2
    `;

    const result = await pool.query(query, [limit, offset]);
    const recommendations = result.rows;
    this.setCached(cacheKey, recommendations);
    return recommendations;
  }

  /**
   * Get trending documents (recently added or updated)
   */
  async getTrendingDocuments(options: RecommendationOptions = {}): Promise<DocumentRecommendation[]> {
    const { limit = 10, offset = 0 } = options;
    const cacheKey = `trending_${limit}_${offset}`;

    const cached = this.getCached<DocumentRecommendation[]>(cacheKey);
    if (cached) return cached;

    const query = `
      WITH trending_docs AS (
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
        LIMIT 20
      )
      SELECT * FROM trending_docs
      ORDER BY RANDOM()
      LIMIT $1 OFFSET $2
    `;

    const result = await pool.query(query, [limit, offset]);
    const recommendations = result.rows;
    this.setCached(cacheKey, recommendations);
    return recommendations;
  }

  /**
   * Get similar documents based on content similarity
   * Uses the document's title and description to find related content
   */
  async getSimilarDocuments(
    docId: string,
    options: RecommendationOptions = {}
  ): Promise<DocumentRecommendation[]> {
    const { limit = 10, offset = 0 } = options;
    const cacheKey = `similar_${docId}_${limit}_${offset}`;

    const cached = this.getCached<DocumentRecommendation[]>(cacheKey);
    if (cached) return cached;

    // First, get the source document
    const sourceDoc = await pool.query(
      'SELECT title, meta_description FROM documents WHERE doc_id = $1',
      [docId]
    );

    if (sourceDoc.rows.length === 0) {
      return [];
    }

    const { title, meta_description } = sourceDoc.rows[0];

    const query = `
      WITH similar_docs AS (
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
        LIMIT 20
      )
      SELECT * FROM similar_docs
      ORDER BY RANDOM()
      LIMIT $3 OFFSET $4
    `;

    try {
      const result = await pool.query(query, [
        title + ' ' + (meta_description || ''),
        docId,
        limit,
        offset
      ]);
      const recommendations = result.rows;
      this.setCached(cacheKey, recommendations);
      return recommendations;
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
      const result = await pool.query(fallbackQuery, [docId, searchPattern, limit, offset]);
      const recommendations = result.rows;
      this.setCached(cacheKey, recommendations);
      return recommendations;
    }
  }

  /**
   * Get documents related to a search query
   */
  async getRelatedDocuments(
    query: string,
    options: RecommendationOptions = {}
  ): Promise<DocumentRecommendation[]> {
    const { limit = 10, offset = 0 } = options;
    const cacheKey = `related_${query}_${limit}_${offset}`;

    const cached = this.getCached<DocumentRecommendation[]>(cacheKey);
    if (cached) return cached;

    if (!query || query.trim().length === 0) {
      return this.getPopularDocuments(options);
    }

    const searchQuery = `
      WITH related_docs AS (
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
        LIMIT 20
      )
      SELECT * FROM related_docs
      ORDER BY RANDOM()
      LIMIT $2 OFFSET $3
    `;

    try {
      const result = await pool.query(searchQuery, [query, limit, offset]);
      const recommendations = result.rows;
      this.setCached(cacheKey, recommendations);
      return recommendations;
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
      const result = await pool.query(fallbackQuery, [searchPattern, limit, offset]);
      const recommendations = result.rows;
      this.setCached(cacheKey, recommendations);
      return recommendations;
    }
  }

  /**
   * Get random documents (for discovery)
   */
  async getRandomDocuments(options: RecommendationOptions = {}): Promise<DocumentRecommendation[]> {
    const { limit = 10, offset = 0 } = options;
    // We don't cache random documents as they should be random each time

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

    const result = await pool.query(query, [limit, offset]);
    return result.rows;
  }

  /**
   * Get document count for statistics
   */
  async getDocumentCount(): Promise<number> {
    const cacheKey = 'doc_count';
    const cached = this.getCached<number>(cacheKey);
    if (cached !== null) return cached;

    const result = await pool.query(
      "SELECT COUNT(*) as count FROM documents WHERE index_status = 'indexed'"
    );
    const count = parseInt(result.rows[0].count);
    this.setCached(cacheKey, count, 60 * 60 * 1000); // Cache count for 1 hour
    return count;
  }
}

// Export singleton instance
export const localRecommendationService = new LocalRecommendationService();
