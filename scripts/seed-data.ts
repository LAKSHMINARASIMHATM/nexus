import { Pool } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';
import * as cheerio from 'cheerio';
import { seedUrls } from './data/seed-urls';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

async function fetchUrlContent(url: string) {
    try {
        console.log(`Fetching: ${url}`);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; SearchEngineBot/1.0; +http://localhost:3000)'
            }
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            console.warn(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
            return null;
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // Remove scripts, styles, and other non-content elements
        $('script, style, nav, footer, iframe, svg, noscript').remove();

        const title = $('title').text().trim() || url;
        const metaDescription = $('meta[name="description"]').attr('content') ||
            $('meta[property="og:description"]').attr('content') || '';

        // Get body text, collapse whitespace
        const body = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 10000); // Limit body size

        return {
            url,
            title,
            meta_description: metaDescription.substring(0, 300), // Limit description size
            body,
            language: 'en', // Assumption for now
            pagerank: 1.0, // Default for seed URLs
        };

    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        return null;
    }
}

async function seed() {
    console.log('Starting data seeding with REAL content...');

    try {
        // 1. Fetch content for seed URLs (limit to top 20 to avoid long wait)
        const urlsToFetch = seedUrls.slice(0, 20);
        const documents = [];

        for (const seed of urlsToFetch) {
            const doc = await fetchUrlContent(seed.url);
            if (doc) {
                documents.push({ ...doc, pagerank: seed.priority / 10 }); // Normalize priority to 0-1
            }
        }

        if (documents.length === 0) {
            console.log('No documents fetched. Using fallback data.');
            // Fallback data could go here if needed, but let's assume some succeed
        }

        console.log(`Ready to insert ${documents.length} documents...`);

        for (const doc of documents) {
            const docId = uuidv4();
            const contentHash = crypto.createHash('sha256').update(doc.body).digest('hex');

            // Insert into PostgreSQL
            const sql = `
                INSERT INTO documents (doc_id, url, title, meta_description, body, body_length, language, content_hash, pagerank, crawl_timestamp)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
                ON CONFLICT (url) DO UPDATE SET
                    title = EXCLUDED.title,
                    meta_description = EXCLUDED.meta_description,
                    body = EXCLUDED.body,
                    pagerank = EXCLUDED.pagerank,
                    updated_at = NOW()
                RETURNING doc_id
            `;

            await pool.query(sql, [
                docId,
                doc.url,
                doc.title,
                doc.meta_description,
                doc.body,
                doc.body.length,
                doc.language,
                contentHash,
                doc.pagerank
            ]);

            console.log(`Indexed: ${doc.title.substring(0, 50)}...`);
        }

        console.log('Seeding completed successfully.');
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await pool.end();
    }
}

seed();
