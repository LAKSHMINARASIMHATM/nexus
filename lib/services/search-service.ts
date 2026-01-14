import pool from '../db';

export interface SearchParams {
    query: string;
    page?: number;
    pageSize?: number;
    filters?: {
        language?: string;
        dateRange?: {
            start?: string;
            end?: string;
        };
        site?: string | string[];
    };
}

export interface SearchResult {
    doc_id: string;
    url: string;
    title: string;
    snippet: string;
    score: number;
    highlights: string[];
    metadata: {
        author?: string;
        published_date?: string;
        language?: string;
    };
}

export interface SearchResponse {
    query: {
        original: string;
        corrected?: string;
        intent?: string;
    };
    results: SearchResult[];
    total_results: number;
    page: number;
    page_size: number;
    query_time_ms: number;
    suggestions: string[];
}

export class SearchService {
    async search(params: SearchParams): Promise<SearchResponse> {
        const startTime = Date.now();
        const { query, page = 1, pageSize = 10 } = params;
        const offset = (page - 1) * pageSize;

        // Handle single character/variable searches with pattern matching
        const isSingleChar = query.trim().length === 1;
        const siteFilter = params.filters?.site;
        const hasSiteFilter = siteFilter && (Array.isArray(siteFilter) ? siteFilter.length > 0 : true);
        const siteCondition = hasSiteFilter
            ? Array.isArray(siteFilter)
                ? `AND url ILIKE ANY($${isSingleChar ? 5 : 4})`
                : `AND url ILIKE $${isSingleChar ? 5 : 4}`
            : '';

        let sql;
        let queryParams: any[];

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
            queryParams = [searchPattern, query.trim(), pageSize, offset];
            if (hasSiteFilter) {
                const patterns = Array.isArray(siteFilter) ? siteFilter.map(s => `%${s}%`) : `%${siteFilter}%`;
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
            queryParams = [query, pageSize, offset];
            if (hasSiteFilter) {
                const patterns = Array.isArray(siteFilter) ? siteFilter.map(s => `%${s}%`) : `%${siteFilter}%`;
                queryParams.push(patterns);
            }
        }

        try {
            console.log(`Executing ${isSingleChar ? 'single character' : 'full-text'} search for query: "${query}"`);
            const result = await pool.query(sql, queryParams);
            console.log(`SQL executed. Rows: ${result.rows.length}`);

            const totalResults = result.rows.length > 0 ? parseInt(result.rows[0].total_results, 10) : 0;

            const searchResults: SearchResult[] = result.rows.map((row: any) => ({
                doc_id: row.doc_id,
                url: row.url,
                title: row.title,
                snippet: isSingleChar
                    ? (row.body_highlight || row.meta_description || row.body || '').substring(0, 200) + '...'
                    : (row.body_highlight || row.meta_description || ''),
                score: parseFloat(row.rank) || 0,
                highlights: [
                    row.title_highlight,
                    row.body_highlight
                ].filter(Boolean),
                metadata: {
                    language: row.language,
                    published_date: row.crawl_timestamp,
                },
            }));

            const endTime = Date.now();

            // Log the search event
            this.logSearchEvent(query, totalResults, endTime - startTime);

            return {
                query: {
                    original: query,
                },
                results: searchResults,
                total_results: totalResults,
                page,
                page_size: pageSize,
                query_time_ms: endTime - startTime,
                suggestions: [],
            };
        } catch (error) {
            console.error('Search error:', error);
            throw error;
        }
    }

    private async logSearchEvent(query: string, resultCount: number, executionTime: number) {
        try {
            const sql = `
                INSERT INTO search_events (query_text, result_count, execution_time_ms)
                VALUES ($1, $2, $3)
            `;
            await pool.query(sql, [query, resultCount, executionTime]);
        } catch (err) {
            console.error('Failed to log search event:', err);
        }
    }

    async suggest(query: string, limit: number = 10): Promise<string[]> {
        const sql = `
            SELECT query_text 
            FROM query_suggestions 
            WHERE query_text ILIKE $1 
            ORDER BY frequency DESC 
            LIMIT $2
        `;
        try {
            const result = await pool.query(sql, [`${query}%`, limit]);
            return result.rows.map((row: any) => row.query_text);
        } catch (error) {
            console.error('Suggestion error:', error);
            return [];
        }
    }
}

export const searchService = new SearchService();
