import pool from '../lib/db';

const seedUrls = [
    // --- Technology & Programming ---
    'https://news.ycombinator.com/',
    'https://github.com/trending',
    'https://stackoverflow.com/',
    'https://dev.to/',
    'https://www.theverge.com/',
    'https://techcrunch.com/',
    'https://arstechnica.com/',
    'https://www.wired.com/',
    'https://developer.mozilla.org/en-US/',
    'https://react.dev/',
    'https://nextjs.org/',
    'https://www.typescriptlang.org/',
    'https://slashdot.org/',
    'https://www.engadget.com/',
    'https://www.cnet.com/',
    'https://www.zdnet.com/',
    'https://venturebeat.com/',
    'https://www.digitaltrends.com/',
    'https://www.androidauthority.com/',
    'https://9to5mac.com/',
    'https://www.tomshardware.com/',
    'https://www.pcgamer.com/',
    'https://www.polygon.com/',
    'https://www.anandtech.com/',

    // --- Science & Nature ---
    'https://www.sciencedaily.com/',
    'https://www.nature.com/',
    'https://www.scientificamerican.com/',
    'https://www.nationalgeographic.com/',
    'https://www.nasa.gov/',
    'https://www.space.com/',
    'https://www.newscientist.com/',
    'https://www.popsci.com/',
    'https://www.livescience.com/',
    'https://phys.org/',
    'https://www.sciencenews.org/',
    'https://www.smithsonianmag.com/',
    'https://www.discovery.com/',

    // --- News & Global Media ---
    'https://www.reuters.com/',
    'https://apnews.com/',
    'https://www.aljazeera.com/',
    'https://www.bbc.com/news',
    'https://www.npr.org/',
    'https://www.economist.com/',
    'https://www.nytimes.com/',
    'https://www.washingtonpost.com/',
    'https://www.theguardian.com/',
    'https://www.cnn.com/',
    'https://www.foxnews.com/',
    'https://www.nbcnews.com/',
    'https://www.wsj.com/',
    'https://www.usatoday.com/',
    'https://time.com/',
    'https://www.newsweek.com/',
    'https://www.atlantic.com/',
    'https://www.vox.com/',

    // --- Finance, Business & Crypto ---
    'https://www.bloomberg.com/',
    'https://www.forbes.com/',
    'https://www.businessinsider.com/',
    'https://www.cnbc.com/',
    'https://www.ft.com/',
    'https://www.marketwatch.com/',
    'https://www.investopedia.com/',
    'https://www.fool.com/',
    'https://www.nerdwallet.com/',
    'https://www.coinbase.com/',
    'https://www.binance.com/',
    'https://coinmarketcap.com/',
    'https://www.coindesk.com/',
    'https://www.kraken.com/',
    'https://robinhood.com/',

    // --- Healthcare & Medicine ---
    'https://www.webmd.com/',
    'https://www.mayoclinic.org/',
    'https://www.nih.gov/',
    'https://www.who.int/',
    'https://www.cdc.gov/',
    'https://www.healthline.com/',
    'https://www.medicalnewstoday.com/',
    'https://www.clevelandclinic.org/',
    'https://www.hopkinsmedicine.org/',
    'https://www.medscape.com/',
    'https://www.drugs.com/',
    'https://www.psychologytoday.com/',

    // --- Education & Learning ---
    'https://www.coursera.org/',
    'https://www.edx.org/',
    'https://www.udemy.com/',
    'https://www.duolingo.com/',
    'https://www.khanacademy.org/',
    'https://www.mit.edu/',
    'https://www.harvard.edu/',
    'https://www.stanford.edu/',
    'https://www.yale.edu/',
    'https://www.ox.ac.uk/',
    'https://www.cam.ac.uk/',
    'https://www.britannica.com/',
    'https://scholar.google.com/',
    'https://www.codecademy.com/',
    'https://www.freecodecamp.org/',

    // --- E-commerce & Retail ---
    'https://www.amazon.com/',
    'https://www.ebay.com/',
    'https://www.walmart.com/',
    'https://www.target.com/',
    'https://www.bestbuy.com/',
    'https://www.homedepot.com/',
    'https://www.ikea.com/',
    'https://www.shopify.com/',
    'https://www.etsy.com/',
    'https://www.costco.com/',
    'https://www.wayfair.com/',
    'https://www.newegg.com/',
    'https://www.aliexpress.com/',
    'https://www.nike.com/',
    'https://www.adidas.com/',

    // --- Travel & Hospitality ---
    'https://www.airbnb.com/',
    'https://www.tripadvisor.com/',
    'https://www.expedia.com/',
    'https://www.lonelyplanet.com/',
    'https://www.booking.com/',
    'https://www.kayak.com/',
    'https://www.hotels.com/',
    'https://www.skyscanner.com/',
    'https://www.travelocity.com/',
    'https://www.orbitz.com/',
    'https://www.marriott.com/',
    'https://www.hilton.com/',

    // --- Entertainment, Gaming & Media ---
    'https://www.imdb.com/',
    'https://www.rottentomatoes.com/',
    'https://www.spotify.com/',
    'https://soundcloud.com/',
    'https://www.twitch.tv/',
    'https://www.netflix.com/',
    'https://www.hulu.com/',
    'https://www.disneyplus.com/',
    'https://www.ign.com/',
    'https://www.gamespot.com/',
    'https://kotaku.com/',
    'https://www.polygon.com/',
    'https://store.steampowered.com/',
    'https://www.epicgames.com/',
    'https://www.roblox.com/',

    // --- Food & Cooking ---
    'https://www.allrecipes.com/',
    'https://www.foodnetwork.com/',
    'https://www.bonappetit.com/',
    'https://www.epicurious.com/',
    'https://www.seriouseats.com/',
    'https://www.thekitchn.com/',
    'https://tasty.co/',
    'https://www.eater.com/',

    // --- Fashion & Lifestyle ---
    'https://www.vogue.com/',
    'https://www.gq.com/',
    'https://www.elle.com/',
    'https://www.harpersbazaar.com/',
    'https://www.cosmopolitan.com/',
    'https://www.esquire.com/',
    'https://www.vanityfair.com/',
    'https://www.refinery29.com/',

    // --- Government & International Organizations ---
    'https://www.usa.gov/',
    'https://www.un.org/',
    'https://www.whitehouse.gov/',
    'https://europa.eu/',
    'https://www.nato.int/',
    'https://www.imf.org/',
    'https://www.worldbank.org/',
    'https://www.weforum.org/',

    // --- Sports ---
    'https://www.espn.com/',
    'https://www.nba.com/',
    'https://www.nfl.com/',
    'https://www.fifa.com/',
    'https://www.strava.com/',
    'https://www.mlb.com/',
    'https://www.nhl.com/',
    'https://www.pgatour.com/',
    'https://www.formula1.com/',
    'https://www.ufc.com/',
    'https://bleacherreport.com/',

    // --- Automotive ---
    'https://www.tesla.com/',
    'https://www.toyota.com/',
    'https://www.ford.com/',
    'https://www.caranddriver.com/',
    'https://www.motortrend.com/',
    'https://www.autotrader.com/',
    'https://www.cars.com/',
    'https://www.edmunds.com/',

    // --- Real Estate ---
    'https://www.zillow.com/',
    'https://www.realtor.com/',
    'https://www.redfin.com/',
    'https://www.trulia.com/',
    'https://www.apartments.com/',

    // --- AI & Future Tech ---
    'https://openai.com/',
    'https://www.anthropic.com/',
    'https://huggingface.co/',
    'https://www.midjourney.com/',
    'https://stability.ai/',
    'https://www.deepmind.com/',
    'https://www.nvidia.com/',
    'https://www.bostonDynamics.com/'
];

async function seedCrawlQueue() {
    const client = await pool.connect();

    try {
        console.log(`🌱 Seeding crawl queue with ${seedUrls.length} URLs...`);

        let insertedCount = 0;

        for (const url of seedUrls) {
            const query = `
        INSERT INTO crawl_queue (url, priority, status)
        VALUES ($1, 5, 'pending')
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

seedCrawlQueue();
