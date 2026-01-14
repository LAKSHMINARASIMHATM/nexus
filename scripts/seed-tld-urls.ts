import pool from '../lib/db';

const seedUrls = [
    // .ORG
    'https://www.wikipedia.org/',
    'https://www.archive.org/',
    'https://www.mozilla.org/',
    'https://www.apache.org/',
    'https://www.python.org/',
    'https://www.linux.org/',
    'https://www.khanacademy.org/',
    'https://www.ted.com/',
    'https://www.pbs.org/',
    'https://www.npr.org/',
    'https://www.un.org/',
    'https://www.w3.org/',
    'https://www.coursera.org/',
    'https://www.edx.org/',
    'https://www.worldbank.org/',
    'https://www.imf.org/',
    'https://www.redcross.org/',
    'https://www.eff.org/',
    'https://www.ieee.org/',
    'https://www.acm.org/',
    'https://www.nationalgeographic.org/',

    // .ME
    'https://about.me/',
    'https://paypal.me/',
    'https://simhahatwar.me/',
    'https://telegram.me/',
    'https://proton.me/',
    'https://maps.me/',

    // .APP
    'https://hatwar.app/',
    'https://linear.app/',
    'https://expo.dev/',
    'https://get.google.app/',
    'https://bsky.app/',
    'https://peer.list.app/',
    'https://beeper.com/',

    // .DEV
    'https://web.dev/',
    'https://react.dev/',
    'https://flutter.dev/',
    'https://go.dev/',
    'https://chrome.dev/',
    'https://nextjs.org/',
    'https://vuejs.org/',
    'https://angular.io/',
    'https://deno.com/',
    'https://openai.com/',

    // .IN (India)
    'https://www.india.gov.in/',
    'https://www.amazon.in/',
    'https://www.google.co.in/',
    'https://www.irctc.co.in/',
    'https://www.onlinesbi.sbi/',
    'https://www.licindia.in/',

    // .GOV
    'https://www.usa.gov/',
    'https://www.nasa.gov/',
    'https://www.noaa.gov/',
    'https://www.cdc.gov/',
    'https://www.whitehouse.gov/',
    'https://www.defense.gov/',
    'https://www.energy.gov/',
    'https://www.transportation.gov/',
    'https://www.nih.gov/',
    'https://www.irs.gov/',
    'https://www.fbi.gov/',
    'https://www.state.gov/',
    'https://www.weather.gov/',
    'https://www.nist.gov/',
    'https://www.epa.gov/'
];

async function seedTldUrls() {
    const client = await pool.connect();

    try {
        console.log(`🌱 Seeding crawl queue with ${seedUrls.length} TLD-specific URLs...`);

        let insertedCount = 0;

        for (const url of seedUrls) {
            const query = `
        INSERT INTO crawl_queue (url, priority, status)
        VALUES ($1, 8, 'pending')
        ON CONFLICT (url) DO NOTHING
      `;

            const res = await client.query(query, [url]);
            if ((res as any).rowCount > 0) {
                insertedCount++;
                console.log(`   Added: ${url}`);
            } else {
                console.log(`   Skipped (already exists): ${url}`);
            }
        }

        console.log(`\n✅ Seeding complete! Added ${insertedCount} new URLs to the queue.`);

    } catch (error) {
        console.error('Error seeding crawl queue:', error);
    } finally {
        client.release();
        await pool.end();
    }
}

seedTldUrls();
