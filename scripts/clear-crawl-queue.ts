import pool from '../lib/db';

async function clearCrawlQueue() {
    const client = await pool.connect();
    try {
        console.log('🗑️  Clearing crawl queue...');
        const res = await client.query('DELETE FROM crawl_queue');
        console.log(`✅ Deleted ${res.rowCount} items from the crawl queue.`);
    } catch (error) {
        console.error('Error clearing crawl queue:', error);
    } finally {
        client.release();
        await pool.end();
    }
}

clearCrawlQueue();
