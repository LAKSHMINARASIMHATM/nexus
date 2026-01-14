console.log('STARTING SCRIPT...');
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

console.log('Connecting to:', process.env.DATABASE_URL);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/search_engine',
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    connectionTimeoutMillis: 5000,
});

async function test() {
    try {
        console.log('Connecting...');
        const client = await pool.connect();
        console.log('Connected!');

        const query = 'AI';
        console.log(`Testing websearch_to_tsquery with "${query}"...`);

        const sql = `SELECT websearch_to_tsquery('english', $1) as query`;
        const res = await client.query(sql, [query]);
        console.log('Query result:', res.rows[0]);

        console.log('Now testing full search query...');
        const fullSql = `
            WITH search_query AS (
                SELECT websearch_to_tsquery('english', $1) as query
            )
            SELECT count(*) FROM documents
            WHERE to_tsvector('english', title) @@ (SELECT query FROM search_query)
        `;
        const res2 = await client.query(fullSql, [query]);
        console.log('Full search count:', res2.rows[0].count);

        client.release();
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

test();
