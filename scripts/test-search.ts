import pool from '../lib/db';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

async function testSearch() {
    console.log('🧪 Testing Search Functionality (Raw SQL)...\n');

    const query = 'React';
    const sql = `
        SELECT websearch_to_tsquery('english', $1) as query
    `;

    try {
        console.log(`Testing websearch_to_tsquery with "${query}"...`);
        const res = await pool.query(sql, [query]);
        console.log('Query result:', res.rows[0]);

        console.log('Now testing full search query...');
        const fullSql = `
            WITH search_query AS (
                SELECT websearch_to_tsquery('english', $1) as query
            )
            SELECT count(*) FROM documents
            WHERE to_tsvector('english', title) @@ (SELECT query FROM search_query)
        `;
        const res2 = await pool.query(fullSql, [query]);
        console.log('Full search count:', res2.rows[0].count);

    } catch (error) {
        console.error(`   ❌ Error:`, error);
    } finally {
        await pool.end();
    }
}

testSearch();
