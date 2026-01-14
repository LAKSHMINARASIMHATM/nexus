import pool from '../lib/db';
import * as dotenv from 'dotenv';
import * as cheerio from 'cheerio';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';
import { URL } from 'url';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const MAX_PAGES = 10000; // Safety limit for demo
const CRAWL_DELAY_MS = 1000; // Be polite

async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchUrl(url: string) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; SearchEngineBot/1.0; +http://localhost:3000)'
            }
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('text/html')) {
            return null; // Skip non-HTML
        }

        return await response.text();
    } catch (error) {
        console.error(`Failed to fetch ${url}:`, error);
        return null;
    }
}

function extractStructuredData($: cheerio.CheerioAPI): any[] {
    const structuredData: any[] = [];
    $('script[type="application/ld+json"]').each((_, el) => {
        try {
            const content = $(el).html();
            if (content) {
                const data = JSON.parse(content);
                structuredData.push(data);
            }
        } catch (e) {
            // Ignore parse errors
        }
    });
    return structuredData;
}

async function processUrl(url: string) {
    console.log(`🕷️  Crawling: ${url}`);

    const html = await fetchUrl(url);
    if (!html) return false;

    const $ = cheerio.load(html);

    // 1. Extract Metadata & Content
    const structuredData = extractStructuredData($);
    $('script, style, nav, footer, iframe, svg, noscript').remove();
    const title = $('title').text().trim() || url;
    const metaDescription = $('meta[name="description"]').attr('content') || '';
    const body = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 20000);

    if (body.length < 100) {
        console.log('   ⚠️  Content too short, skipping index.');
        return true; // Still mark as crawled
    }

    // 2. Index Document
    const docId = uuidv4();
    const contentHash = crypto.createHash('sha256').update(body).digest('hex');

    const insertSql = `
        INSERT INTO documents (doc_id, url, title, meta_description, body, body_length, language, content_hash, pagerank, crawl_timestamp, index_status, structured_data)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), 'indexed', $10)
        ON CONFLICT (url) DO UPDATE SET
            title = EXCLUDED.title,
            meta_description = EXCLUDED.meta_description,
            body = EXCLUDED.body,
            structured_data = EXCLUDED.structured_data,
            updated_at = NOW(),
            index_status = 'indexed'
    `;

    await pool.query(insertSql, [
        docId, url, title, metaDescription, body, body.length, 'en', contentHash, 1.0, JSON.stringify(structuredData)
    ]);
    console.log(`   ✅ Indexed: "${title.substring(0, 40)}..."`);

    // 3. Discover Links
    const links = new Set<string>();
    $('a[href]').each((_, el) => {
        const href = $(el).attr('href');
        if (href) {
            try {
                const absoluteUrl = new URL(href, url).href;
                if (absoluteUrl.startsWith('http') && !absoluteUrl.includes('localhost')) {
                    links.add(absoluteUrl);
                }
            } catch (e) {
                // Ignore invalid URLs
            }
        }
    });

    // 4. Add Links to Queue
    let newLinksCount = 0;
    for (const link of links) {
        const queueSql = `
            INSERT INTO crawl_queue (url, priority, depth, referrer_url, status)
            VALUES ($1, 5, 1, $2, 'pending')
            ON CONFLICT (url) DO NOTHING
        `;
        const res = await pool.query(queueSql, [link, url]);
        if ((res as any).rowCount > 0) newLinksCount++;
    }
    console.log(`   🔗 Found ${links.size} links, ${newLinksCount} new queued.`);

    return true;
}

async function crawl() {
    console.log('🚀 Starting Real-time Crawler...');

    // Seed queue if empty
    // Always try to seed initial URLs (idempotent via ON CONFLICT)
    const seeds = [
        'https://news.ycombinator.com/',
        'https://dev.to/',
        'https://github.com/trending',
        'https://simhahatwar.me',
        ...Array.from({ length: 26 }, (_, i) => `https://en.wikipedia.org/wiki/${String.fromCharCode(65 + i)}`)
    ];

    for (const url of seeds) {
        await pool.query('INSERT INTO crawl_queue (url, status) VALUES ($1, \'pending\') ON CONFLICT DO NOTHING', [url]);
    }

    let pagesCrawled = 0;

    while (pagesCrawled < MAX_PAGES) {
        // Get next URL
        const res = await pool.query(`
            SELECT id, url FROM crawl_queue 
            WHERE status = 'pending' 
            ORDER BY priority DESC, id ASC 
            LIMIT 1
            FOR UPDATE SKIP LOCKED
        `);

        if (res.rows.length === 0) {
            console.log('No more pending URLs. Sleeping...');
            await sleep(2000);
            continue;
        }

        const { id, url } = res.rows[0];

        try {
            await pool.query('UPDATE crawl_queue SET status = \'processing\', crawled_at = NOW() WHERE id = $1', [id]);

            const success = await processUrl(url);

            await pool.query('UPDATE crawl_queue SET status = $1 WHERE id = $2', [success ? 'completed' : 'failed', id]);

            pagesCrawled++;
            await sleep(CRAWL_DELAY_MS);

        } catch (error) {
            console.error(`Error processing ${url}:`, error);
            await pool.query('UPDATE crawl_queue SET status = \'failed\', last_error = $1 WHERE id = $2', [String(error), id]);
        }
    }

    console.log(`🛑 Reached limit of ${MAX_PAGES} pages. Stopping.`);
    await pool.end();
}

crawl();
