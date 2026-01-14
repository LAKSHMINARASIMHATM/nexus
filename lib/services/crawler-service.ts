import pool from '../db';

export class CrawlerService {
    async queueUrls(urls: string[], priority: number = 5): Promise<string> {
        const jobId = `crawl-job-${Date.now()}`;

        // In a real system, we would push to Kafka/Queue. Here we insert into DB.
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            for (const url of urls) {
                await client.query(
                    `INSERT INTO crawl_queue (url, priority, status, metadata) 
           VALUES ($1, $2, 'pending', $3)
           ON CONFLICT (url) DO UPDATE SET priority = $2, status = 'pending'`,
                    [url, priority, JSON.stringify({ jobId })]
                );
            }
            await client.query('COMMIT');
            return jobId;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async getJobStatus(jobId: string) {
        // This is a simplified status check assuming we track job_id in metadata
        // In reality, we'd have a separate jobs table or more complex tracking
        const sql = `
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'completed') as completed,
        COUNT(*) FILTER (WHERE status = 'failed') as failed,
        COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress
      FROM crawl_queue
      WHERE metadata->>'jobId' = $1
    `;

        const result = await pool.query(sql, [jobId]);
        const row = result.rows[0];

        return {
            job_id: jobId,
            status: row.completed == row.total && row.total > 0 ? 'completed' : 'in_progress',
            progress: {
                total_urls: parseInt(row.total),
                completed: parseInt(row.completed),
                failed: parseInt(row.failed),
                in_progress: parseInt(row.in_progress)
            }
        };
    }
}

export const crawlerService = new CrawlerService();
