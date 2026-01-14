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

export class LocalRecommendationService {
  /**
   * Get popular documents based on PageRank and recency
   */
  async getPopularDocuments(options: RecommendationOptions = {}): Promise<DocumentRecommendation[]> {
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

    const result = await pool.query(query, [limit, offset]);
    return result.rows;
  }

  /**
   * Get trending documents (recently added or updated)
   */
  async getTrendingDocuments(options: RecommendationOptions = {}): Promise<DocumentRecommendation[]> {
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

    const result = await pool.query(query, [limit, offset]);
    return result.rows;
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

    // First, get the source document
    const sourceDoc = await pool.query(
      'SELECT title, meta_description FROM documents WHERE doc_id = $1',
      [docId]
    );

    if (sourceDoc.rows.length === 0) {
      return [];
    }

    const { title, meta_description } = sourceDoc.rows[0];

    // Create search terms from title and description
    const searchText = [title, meta_description]
      .filter(Boolean)
      .join(' ')
      .replace(/[^\w\s]/g, ' ') // Remove special characters
      .split(/\s+/)
      .filter(word => word.length > 3) // Only words longer than 3 chars
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
      const result = await pool.query(query, [
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
      const result = await pool.query(fallbackQuery, [docId, searchPattern, limit, offset]);
      return result.rows;
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
      const result = await pool.query(searchQuery, [query, limit, offset]);
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
      const result = await pool.query(fallbackQuery, [searchPattern, limit, offset]);
      return result.rows;
    }
  }

  /**
   * Get random documents (for discovery)
   */
  async getRandomDocuments(options: RecommendationOptions = {}): Promise<DocumentRecommendation[]> {
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

    const result = await pool.query(query, [limit, offset]);
    return result.rows;
  }

  /**
   * Get document count for statistics
   */
  async getDocumentCount(): Promise<number> {
    const result = await pool.query(
      "SELECT COUNT(*) as count FROM documents WHERE index_status = 'indexed'"
    );
    return parseInt(result.rows[0].count);
  }
}

// Export singleton instance
export const localRecommendationService = new LocalRecommendationService();
