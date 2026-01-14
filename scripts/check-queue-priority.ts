import pool from '../lib/db';

async function checkQueue() {
    const client = await pool.connect();
    try {
        console.log('--- 🕷️  Crawl Queue Priority Stats ---');
        const res = await client.query('SELECT priority, status, COUNT(*) FROM crawl_queue GROUP BY priority, status ORDER BY priority DESC, status');
        res.rows.forEach(row => {
            console.log(`Priority ${row.priority} [${row.status}]: ${row.count}`);
        });

        console.log('\n--- 🔝 Top 10 Pending URLs ---');
        const top = await client.query("SELECT url, priority FROM crawl_queue WHERE status = 'pending' ORDER BY priority DESC, id ASC LIMIT 10");
        top.rows.forEach(row => {
            console.log(`[P${row.priority}] ${row.url}`);
        });

    } catch (error) {
        console.error('Error checking queue:', error);
    } finally {
        client.release();
        await pool.end();
    }
}

checkQueue();
