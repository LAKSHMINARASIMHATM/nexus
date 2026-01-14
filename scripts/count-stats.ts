import pool from '../lib/db';

async function countStats() {
    const client = await pool.connect();
    try {
        const docRes = await client.query('SELECT COUNT(*) FROM documents');
        const linkRes = await client.query('SELECT COUNT(*) FROM links');
        const queueRes = await client.query('SELECT COUNT(*) FROM crawl_queue');
        const queuePendingRes = await client.query("SELECT COUNT(*) FROM crawl_queue WHERE status = 'pending'");

        console.log('--- Database Stats ---');
        console.log(`Documents (Indexed URLs): ${docRes.rows[0].count}`);
        console.log(`Links (Discovered): ${linkRes.rows[0].count}`);
        console.log(`Crawl Queue Total: ${queueRes.rows[0].count}`);
        console.log(`Crawl Queue Pending: ${queuePendingRes.rows[0].count}`);
        console.log('----------------------');

    } catch (error) {
        console.error('Error counting stats:', error);
    } finally {
        client.release();
        await pool.end();
    }
}

countStats();
