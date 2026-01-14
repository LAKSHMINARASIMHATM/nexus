import pool from '../lib/db';

async function listUrls() {
    const client = await pool.connect();
    try {
        console.log('📋 Fetching URLs from crawl_queue...');
        const res = await client.query('SELECT url, status, priority FROM crawl_queue ORDER BY id DESC LIMIT 100');

        console.log(`\nFound ${res.rowCount} URLs (showing last 100):`);
        console.log('------------------------------------------------');
        res.rows.forEach(row => {
            console.log(`[${row.status}] (${row.priority}) ${row.url}`);
        });

        const countRes = await client.query('SELECT COUNT(*) FROM crawl_queue');
        console.log('\n------------------------------------------------');
        console.log(`📊 Total URLs in queue: ${countRes.rows[0].count}`);

    } catch (error) {
        console.error('Error listing URLs:', error);
    } finally {
        client.release();
        await pool.end();
    }
}

listUrls();
