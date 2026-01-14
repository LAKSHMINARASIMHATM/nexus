import pool from '../lib/db';

/**
 * Database Optimization Script
 * 
 * Adds performance-critical indexes for:
 * - Full-text search
 * - URL deduplication
 * - Query performance
 */

async function optimizeDatabase() {
    console.log('Starting database optimization...\n');

    try {
        // 1. Add GIN indexes for full-text search
        console.log('1. Creating GIN indexes for full-text search...');
        await pool.query(`
            CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_documents_title_tsvector 
            ON documents USING GIN (to_tsvector('english', title));
        `);
        console.log('   ✓ Created GIN index on documents.title');

        await pool.query(`
            CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_documents_body_tsvector 
            ON documents USING GIN (to_tsvector('english', body));
        `);
        console.log('   ✓ Created GIN index on documents.body');

        await pool.query(`
            CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_documents_meta_tsvector 
            ON documents USING GIN (to_tsvector('english', meta_description));
        `);
        console.log('   ✓ Created GIN index on documents.meta_description\n');

        // 2. Add URL fingerprint column for deduplication
        console.log('2. Adding URL fingerprint column...');
        await pool.query(`
            ALTER TABLE documents 
            ADD COLUMN IF NOT EXISTS url_fingerprint VARCHAR(64);
        `);
        
        // Create hash function for URL normalization
        await pool.query(`
            CREATE OR REPLACE FUNCTION normalize_url(url TEXT) 
            RETURNS TEXT AS $$
            BEGIN
                -- Remove protocol
                url := regexp_replace(url, '^https?://', '', 'i');
                -- Remove www
                url := regexp_replace(url, '^www\\.', '', 'i');
                -- Remove trailing slash
                url := regexp_replace(url, '/$', '');
                -- Convert to lowercase
                url := lower(url);
                RETURN url;
            END;
            $$ LANGUAGE plpgsql IMMUTABLE;
        `);

        // Update existing rows
        await pool.query(`
            UPDATE documents 
            SET url_fingerprint = md5(normalize_url(url))
            WHERE url_fingerprint IS NULL;
        `);

        // Create unique index on url_fingerprint
        await pool.query(`
            CREATE UNIQUE INDEX CONCURRENTLY IF NOT EXISTS idx_documents_url_fingerprint 
            ON documents (url_fingerprint);
        `);
        console.log('   ✓ Created url_fingerprint column and unique index\n');

        // 3. Add composite indexes for common queries
        console.log('3. Creating composite indexes...');
        await pool.query(`
            CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_documents_language_crawl 
            ON documents (language, crawl_timestamp DESC);
        `);
        console.log('   ✓ Created composite index on (language, crawl_timestamp)');

        await pool.query(`
            CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_documents_pagerank 
            ON documents (pagerank DESC) 
            WHERE pagerank > 0;
        `);
        console.log('   ✓ Created partial index on pagerank\n');

        // 4. Optimize search_events table
        console.log('4. Optimizing search_events table...');
        await pool.query(`
            CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_search_events_timestamp 
            ON search_events (timestamp DESC);
        `);
        console.log('   ✓ Created index on search_events.timestamp');

        await pool.query(`
            CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_search_events_query 
            ON search_events USING HASH (query_text);
        `);
        console.log('   ✓ Created hash index on search_events.query_text');

        await pool.query(`
            CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_search_events_session 
            ON search_events (session_id, timestamp DESC);
        `);
        console.log('   ✓ Created composite index on (session_id, timestamp)\n');

        // 5. Optimize click_events table
        console.log('5. Optimizing click_events table...');
        await pool.query(`
            CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_click_events_search 
            ON click_events (search_event_id);
        `);
        console.log('   ✓ Created index on click_events.search_event_id');

        await pool.query(`
            CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_click_events_doc 
            ON click_events (doc_id, timestamp DESC);
        `);
        console.log('   ✓ Created composite index on (doc_id, timestamp)\n');

        // 6. Optimize query_suggestions table
        console.log('6. Optimizing query_suggestions table...');
        await pool.query(`
            CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_query_suggestions_text 
            ON query_suggestions (query_text text_pattern_ops);
        `);
        console.log('   ✓ Created text pattern index on query_suggestions.query_text');

        await pool.query(`
            CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_query_suggestions_frequency 
            ON query_suggestions (frequency DESC);
        `);
        console.log('   ✓ Created index on query_suggestions.frequency\n');

        // 7. Update table statistics
        console.log('7. Updating table statistics...');
        await pool.query('ANALYZE documents;');
        await pool.query('ANALYZE search_events;');
        await pool.query('ANALYZE click_events;');
        await pool.query('ANALYZE query_suggestions;');
        console.log('   ✓ Updated statistics for all tables\n');

        // 8. Set autovacuum settings for high-traffic tables
        console.log('8. Configuring autovacuum settings...');
        await pool.query(`
            ALTER TABLE search_events SET (
                autovacuum_vacuum_scale_factor = 0.05,
                autovacuum_analyze_scale_factor = 0.02
            );
        `);
        await pool.query(`
            ALTER TABLE click_events SET (
                autovacuum_vacuum_scale_factor = 0.05,
                autovacuum_analyze_scale_factor = 0.02
            );
        `);
        console.log('   ✓ Configured autovacuum for high-traffic tables\n');

        // 9. Create materialized view for popular queries
        console.log('9. Creating materialized views...');
        await pool.query(`
            DROP MATERIALIZED VIEW IF EXISTS popular_queries;
            CREATE MATERIALIZED VIEW popular_queries AS
            SELECT 
                query_text,
                COUNT(*) as search_count,
                AVG(execution_time_ms) as avg_execution_time,
                AVG(result_count) as avg_result_count,
                MAX(timestamp) as last_searched
            FROM search_events
            WHERE timestamp > NOW() - INTERVAL '7 days'
            GROUP BY query_text
            HAVING COUNT(*) > 5
            ORDER BY search_count DESC
            LIMIT 1000;
        `);
        
        await pool.query(`
            CREATE UNIQUE INDEX ON popular_queries (query_text);
        `);
        console.log('   ✓ Created popular_queries materialized view\n');

        console.log('✅ Database optimization complete!\n');
        console.log('Summary of optimizations:');
        console.log('  - Full-text search GIN indexes');
        console.log('  - URL deduplication with fingerprints');
        console.log('  - Composite indexes for common queries');
        console.log('  - Optimized search analytics tables');
        console.log('  - Configured autovacuum for performance');
        console.log('  - Created materialized views for reporting\n');

    } catch (error) {
        console.error('❌ Database optimization failed:', error);
        throw error;
    } finally {
        await pool.end();
    }
}

// Run optimization
optimizeDatabase().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});
