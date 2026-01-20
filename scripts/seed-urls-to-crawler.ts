/**
 * Seed URLs to Crawler Queue
 * 
 * Takes indexed documents and adds them to the crawl queue for processing
 */

import pool from '../lib/db';

async function seedUrlsToCrawler() {
    console.log('🚀 Starting URL seeding to crawler queue...');

    const client = await pool.connect();
    let totalAdded = 0;

    try {
        await client.query('BEGIN');

        // Get all indexed documents
        const documents = await client.query(`
            SELECT doc_id, url, title
            FROM documents
            WHERE index_status = 'indexed'
            ORDER BY created_at DESC
        `);

        console.log(`📊 Found ${documents.rows.length} indexed documents`);

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
                    ON CONFLICT (url) DO UPDATE
                    SET priority = EXCLUDED.priority,
                        scheduled_at = NOW()
                `, [
                    doc.url,
                    5, // Medium priority
                    0, // Depth 0
                    'pending'
                ]);

                totalAdded++;

                if (totalAdded % 100 === 0) {
                    console.log(`   ✓ Added ${totalAdded} URLs to crawl queue...`);
                }
            } catch (error) {
                console.error(`   ⚠ Error adding URL ${doc.url}:`, (error as Error).message);
            }
        }

        await client.query('COMMIT');
        console.log(`\n✅ Successfully added ${totalAdded} URLs to crawl queue!`);

        // Show summary
        const stats = await client.query(`
            SELECT 
                COUNT(*) as total_queued,
                COUNT(*) FILTER (WHERE status = 'pending') as pending,
                COUNT(*) FILTER (WHERE status = 'completed') as completed,
                COUNT(*) FILTER (WHERE status = 'failed') as failed
            FROM crawl_queue
        `);

        console.log('\n📊 Crawl Queue Statistics:');
        console.log(`   Total Queued: ${stats.rows[0].total_queued}`);
        console.log(`   Pending: ${stats.rows[0].pending}`);
        console.log(`   Completed: ${stats.rows[0].completed}`);
        console.log(`   Failed: ${stats.rows[0].failed}`);

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Error seeding URLs to crawler:', error);
        throw error;
    } finally {
        client.release();
    }
}

// Run the seeding
seedUrlsToCrawler()
    .then(() => {
        console.log('\n✨ URL seeding to crawler complete!');
        process.exit(0);
    })
    .catch((error: Error) => {
        console.error('\n💥 Seeding failed:', error);
        process.exit(1);
    });
