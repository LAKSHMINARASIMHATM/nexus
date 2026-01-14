import fs from 'fs';
import path from 'path';
import pool from '../lib/db';

async function seedFromFile() {
    const filePath = path.join(process.cwd(), 'indexed_urls.txt');

    if (!fs.existsSync(filePath)) {
        console.error('❌ indexed_urls.txt not found!');
        return;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n');
    const urlsToSeed = new Set<string>();

    // Regex to extract URLs (http/https)
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    console.log(`📂 Reading URLs from ${filePath}...`);

    lines.forEach(line => {
        // Skip log lines or headers if possible, but regex will just find URLs anywhere
        const matches = line.match(urlRegex);
        if (matches) {
            matches.forEach(url => {
                // Clean up URL (remove trailing brackets or ellipsis if present from logs)
                let cleanUrl = url.replace(/[)\]]$/, '');
                // Remove trailing dots if it was truncated
                if (cleanUrl.endsWith('...')) return;

                try {
                    new URL(cleanUrl); // Validate
                    urlsToSeed.add(cleanUrl);
                } catch (e) {
                    // Invalid URL
                }
            });
        }
    });

    console.log(`🔍 Found ${urlsToSeed.size} unique URLs.`);

    if (urlsToSeed.size === 0) {
        console.log('⚠️ No URLs found to seed.');
        return;
    }

    const client = await pool.connect();
    try {
        let insertedCount = 0;
        console.log('🌱 Inserting into crawl_queue...');

        for (const url of urlsToSeed) {
            const query = `
        INSERT INTO crawl_queue (url, priority, status)
        VALUES ($1, 10, 'pending')
        ON CONFLICT (url) DO NOTHING
      `;
            // Priority 10 to prioritize these user-added URLs
            const res = await client.query(query, [url]);
            if ((res as any).rowCount > 0) {
                insertedCount++;
            }
        }

        console.log(`✅ Successfully seeded ${insertedCount} new URLs from file.`);

    } catch (error) {
        console.error('Error seeding from file:', error);
    } finally {
        client.release();
        await pool.end();
    }
}

seedFromFile();
