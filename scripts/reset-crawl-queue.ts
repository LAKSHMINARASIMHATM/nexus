/**
 * Clear Crawl Queue and Add Indexed URLs
 * 
 * Clears the entire crawl queue and adds only the indexed document URLs
 */

import pool from '../lib/db';

async function resetCrawlQueue() {
    console.log('🧹 Clearing crawl queue and adding indexed URLs...');

    const client = await pool.connect();
    let totalAdded = 0;

    try {
        await client.query('BEGIN');

        // Clear the entire crawl queue
        console.log('🗑️  Clearing existing crawl queue...');
        const deleteResult = await client.query('DELETE FROM crawl_queue');
        console.log(`   ✓ Removed ${deleteResult.rowCount} entries`);

        // Get all indexed documents
        const documents = await client.query(`
            SELECT doc_id, url, title
            FROM documents
            WHERE index_status = 'indexed'
            ORDER BY pagerank DESC, created_at DESC
        `);

        console.log(`\n📊 Found ${documents.rows.length} indexed documents`);
        console.log('➕ Adding URLs to crawl queue...\n');

        // Add each URL to crawl queue
        for (const doc of documents.rows) {
            try {
                await client.query(`
                    INSERT INTO crawl_queue (
                        url,
                        priority,
                        depth,
                        status,
                        discovered_at,
                        scheduled_at
                    ) VALUES ($1, $2, $3, $4, NOW(), NOW())
                `, [
                    doc.url,
                    5, // Medium priority
                    0, // Depth 0
                    'pending'
                ]);

                totalAdded++;

                if (totalAdded % 100 === 0) {
                    console.log(`   ✓ Added ${totalAdded} URLs...`);
                }
            } catch (error) {
                console.error(`   ⚠ Error adding URL ${doc.url}:`, (error as Error).message);
            }
        }

        await client.query('COMMIT');
        console.log(`\n✅ Successfully added ${totalAdded} URLs to crawl queue!`);

        // Show final summary
        const stats = await client.query(`
            SELECT 
                COUNT(*) as total_queued,
                COUNT(*) FILTER (WHERE status = 'pending') as pending,
                COUNT(*) FILTER (WHERE status = 'processing') as processing,
                COUNT(*) FILTER (WHERE status = 'completed') as completed,
                COUNT(*) FILTER (WHERE status = 'failed') as failed
            FROM crawl_queue
        `);

        console.log('\n📊 Final Crawl Queue Statistics:');
        console.log(`   Total Queued: ${stats.rows[0].total_queued}`);
        console.log(`   Pending: ${stats.rows[0].pending}`);
        console.log(`   Processing: ${stats.rows[0].processing}`);
        console.log(`   Completed: ${stats.rows[0].completed}`);
        console.log(`   Failed: ${stats.rows[0].failed}`);

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Error resetting crawl queue:', error);
        throw error;
    } finally {
        client.release();
    }
}

// Run the reset
resetCrawlQueue()
    .then(() => {
        console.log('\n✨ Crawl queue reset complete!');
        process.exit(0);
    })
    .catch((error: Error) => {
        console.error('\n💥 Reset failed:', error);
        process.exit(1);
    });
