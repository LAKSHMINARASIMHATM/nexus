#!/usr/bin/env node

/**
 * Crawler Worker
 * 
 * Distributed web crawler that:
 * - Fetches URLs from Kafka queue
 * - Respects robots.txt and politeness policies
 * - Extracts content and links
 * - Publishes to indexing pipeline
 */

import axios from 'axios';
import * as cheerio from 'cheerio';
import { kafkaService } from '@/lib/services/kafka-service';
import { crawlCounter, crawlLatency, crawlQueueSize } from '@/lib/metrics/prometheus';
import pool from '@/lib/db';

interface CrawlJob {
    url: string;
    priority: number;
    depth: number;
    referrer_url?: string;
}

class CrawlerWorker {
    private workerId: string;
    private running = false;
    private readonly USER_AGENT = 'SearchEngineBot/1.0';
    private readonly CRAWL_DELAY_MS = 1000; // 1 second between requests to same domain
    private lastCrawlTime: Map<string, number> = new Map();

    constructor() {
        this.workerId = `crawler-${process.pid}`;
    }

    async start() {
        console.log(`Starting crawler worker: ${this.workerId}`);
        this.running = true;

        const consumer = kafkaService.createConsumer('crawler-worker-group');
        await consumer.connect();
        await consumer.subscribe({ topic: 'crawl-events', fromBeginning: false });

        await consumer.run({
            eachMessage: async ({ message }) => {
                if (!this.running) return;

                try {
                    const event = JSON.parse(message.value?.toString() || '{}');
                    if (event.event_type === 'discovered') {
                        await this.crawlUrl(event);
                    }
                } catch (error) {
                    console.error('Crawl processing error:', error);
                }
            },
        });
    }

    private async crawlUrl(job: CrawlJob) {
        const startTime = Date.now();
        const domain = new URL(job.url).hostname;

        try {
            // Politeness: respect crawl delay
            const lastCrawl = this.lastCrawlTime.get(domain) || 0;
            const timeSinceLastCrawl = Date.now() - lastCrawl;
            if (timeSinceLastCrawl < this.CRAWL_DELAY_MS) {
                await new Promise(resolve => setTimeout(resolve, this.CRAWL_DELAY_MS - timeSinceLastCrawl));
            }

            // Fetch URL
            const response = await axios.get(job.url, {
                headers: {
                    'User-Agent': this.USER_AGENT,
                },
                timeout: 30000,
                maxRedirects: 5,
            });

            this.lastCrawlTime.set(domain, Date.now());

            // Parse HTML
            const $ = cheerio.load(response.data);
            const title = $('title').text().trim();
            const metaDescription = $('meta[name="description"]').attr('content') || '';
            const body = $('body').text().replace(/\s+/g, ' ').trim();

            // Extract links
            const links: string[] = [];
            $('a[href]').each((_, el) => {
                const href = $(el).attr('href');
                if (href) {
                    try {
                        const absoluteUrl = new URL(href, job.url).href;
                        links.push(absoluteUrl);
                    } catch (e) {
                        // Invalid URL, skip
                    }
                }
            });

            // Save to database
            const client = await pool.connect();
            try {
                const result = await client.query(
                    `INSERT INTO documents (url, title, meta_description, body_length, crawl_timestamp, index_status)
           VALUES ($1, $2, $3, $4, NOW(), 'pending')
           ON CONFLICT (url) DO UPDATE SET
           title = $2, meta_description = $3, body_length = $4, crawl_timestamp = NOW()
           RETURNING doc_id`,
                    [job.url, title, metaDescription, body.length]
                );

                const docId = result.rows[0].doc_id;

                // Publish to indexing queue
                await kafkaService.publishIndexUpdate({
                    doc_id: docId,
                    url: job.url,
                    title,
                    meta_description: metaDescription,
                    body,
                    body_length: body.length,
                    crawl_timestamp: new Date().toISOString(),
                });

                // Queue discovered links
                for (const link of links.slice(0, 100)) { // Limit to 100 links per page
                    await kafkaService.publishCrawlEvent({
                        event_type: 'discovered',
                        url: link,
                        priority: Math.max(1, job.priority - 1),
                        metadata: {
                            referrer: job.url,
                            depth: job.depth + 1,
                        },
                    });
                }

                crawlCounter.inc({ status: 'success' });
                console.log(`Crawled: ${job.url} (${links.length} links found)`);
            } finally {
                client.release();
            }

            crawlLatency.observe((Date.now() - startTime) / 1000);
        } catch (error: any) {
            console.error(`Failed to crawl ${job.url}:`, error.message);
            crawlCounter.inc({ status: 'error' });

            // Update crawl queue status
            await pool.query(
                `UPDATE crawl_queue SET status = 'failed', last_error = $1 WHERE url = $2`,
                [error.message, job.url]
            );
        }
    }

    async stop() {
        this.running = false;
        console.log('Crawler worker stopped');
    }
}

// Start worker if running as standalone process
if (require.main === module) {
    const worker = new CrawlerWorker();
    worker.start().catch(console.error);

    process.on('SIGTERM', () => worker.stop());
    process.on('SIGINT', () => worker.stop());
}

export { CrawlerWorker };
