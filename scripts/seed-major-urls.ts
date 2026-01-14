import pool from '../lib/db';

const majorUrls = [
    // --- User Specified & Special Domains ---
    'https://simhahatwra.me/',
    'https://simhahatwar.me/',
    'https://hatwar.app/',

    // --- Global News & Media ---
    'https://www.reuters.com/',
    'https://apnews.com/',
    'https://www.bbc.com/news',
    'https://www.aljazeera.com/',
    'https://www.nytimes.com/',
    'https://www.theguardian.com/',
    'https://www.washingtonpost.com/',
    'https://www.economist.com/',
    'https://www.bloomberg.com/',
    'https://www.wsj.com/',
    'https://www.ft.com/',
    'https://www.cnbc.com/',
    'https://www.npr.org/',
    'https://www.usatoday.com/',
    'https://www.latimes.com/',
    'https://www.chicagotribune.com/',
    'https://www.dw.com/',
    'https://www.france24.com/',
    'https://www.independent.co.uk/',
    'https://www.telegraph.co.uk/',
    'https://www.thehindu.com/',
    'https://www.timesofindia.indiatimes.com/',
    'https://www.indiatoday.in/',
    'https://www.scmp.com/',
    'https://www.straitstimes.com/',
    'https://www.nikkei.com/',
    'https://www.lemonde.fr/',
    'https://www.spiegel.de/',
    'https://www.corriere.it/',
    'https://www.elpais.com/',
    'https://www.asahi.com/',

    // --- Technology & AI ---
    'https://www.theverge.com/',
    'https://techcrunch.com/',
    'https://arstechnica.com/',
    'https://www.wired.com/',
    'https://openai.com/',
    'https://www.anthropic.com/',
    'https://huggingface.co/',
    'https://www.deepmind.com/',
    'https://www.nvidia.com/',
    'https://github.com/trending',
    'https://news.ycombinator.com/',
    'https://www.engadget.com/',
    'https://www.cnet.com/',
    'https://www.zdnet.com/',
    'https://www.digitaltrends.com/',
    'https://www.slashdot.org/',
    'https://www.tomshardware.com/',
    'https://www.anandtech.com/',
    'https://www.9to5mac.com/',
    'https://www.androidauthority.com/',
    'https://www.venturebeat.com/',
    'https://www.theinformation.com/',
    'https://www.recode.net/',
    'https://www.technologyreview.com/',

    // --- Developer Tools & Documentation ---
    'https://developer.mozilla.org/',
    'https://www.docker.com/',
    'https://kubernetes.io/',
    'https://aws.amazon.com/free/',
    'https://azure.microsoft.com/',
    'https://cloud.google.com/',
    'https://www.terraform.io/',
    'https://www.mongodb.com/',
    'https://www.postgresql.org/',
    'https://www.python.org/',
    'https://www.rust-lang.org/',
    'https://www.typescriptlang.org/',
    'https://react.dev/',
    'https://nextjs.org/',
    'https://tailwindcss.com/',

    // --- Creator & Writing Platforms ---
    'https://substack.com/',
    'https://www.patreon.com/',
    'https://dev.to/',
    'https://hashnode.com/',
    'https://ghost.org/',
    'https://www.buymeacoffee.com/',
    'https://www.wattpad.com/',
    'https://www.behance.net/',
    'https://www.dribbble.com/',
    'https://www.artstation.com/',

    // --- Social & Community ---
    'https://www.reddit.com/',
    'https://www.quora.com/',
    'https://www.linkedin.com/',
    'https://www.medium.com/',
    'https://www.stackexchange.com/',
    'https://www.stackoverflow.com/',
    'https://www.mastodon.social/',
    'https://www.discord.com/',
    'https://www.pinterest.com/',
    'https://www.goodreads.com/',
    'https://www.twitch.tv/',

    // --- E-commerce & Retail ---
    'https://www.amazon.com/',
    'https://www.ebay.com/',
    'https://www.walmart.com/',
    'https://www.target.com/',
    'https://www.etsy.com/',
    'https://www.shopify.com/',
    'https://www.bestbuy.com/',
    'https://www.homedepot.com/',
    'https://www.ikea.com/',
    'https://www.costco.com/',
    'https://www.wayfair.com/',
    'https://www.newegg.com/',
    'https://www.aliexpress.com/',
    'https://www.zappos.com/',
    'https://www.nike.com/',
    'https://www.adidas.com/',
    'https://www.mercari.com/',
    'https://www.stockx.com/',
    'https://www.grailed.com/',
    'https://www.goat.com/',

    // --- Startup & Venture ---
    'https://www.producthunt.com/',
    'https://www.crunchbase.com/',
    'https://www.kickstarter.com/',
    'https://www.indiegogo.com/',
    'https://www.ycombinator.com/',
    'https://www.techstars.com/',
    'https://www.angellist.com/',
    'https://www.seedrs.com/',

    // --- Job & Career ---
    'https://www.indeed.com/',
    'https://www.glassdoor.com/',
    'https://www.monster.com/',
    'https://wellfound.com/',
    'https://www.ziprecruiter.com/',
    'https://www.careerbuilder.com/',
    'https://www.dice.com/',
    'https://www.linkedin.com/jobs/',
    'https://www.upwork.com/',
    'https://www.fiverr.com/',

    // --- Education & Knowledge ---
    'https://www.wikipedia.org/',
    'https://www.britannica.com/',
    'https://www.khanacademy.org/',
    'https://www.coursera.org/',
    'https://www.edx.org/',
    'https://www.mit.edu/',
    'https://www.harvard.edu/',
    'https://www.stanford.edu/',
    'https://www.ox.ac.uk/',
    'https://www.cam.ac.uk/',
    'https://www.yale.edu/',
    'https://www.princeton.edu/',
    'https://www.berkeley.edu/',
    'https://www.udemy.com/',
    'https://www.duolingo.com/',
    'https://www.codecademy.com/',
    'https://www.freecodecamp.org/',
    'https://scholar.google.com/',
    'https://www.wolframalpha.com/',
    'https://www.jstor.org/',
    'https://www.academia.edu/',

    // --- Art & Culture ---
    'https://www.moma.org/',
    'https://www.metmuseum.org/',
    'https://www.tate.org.uk/',
    'https://www.louvre.fr/',
    'https://www.guggenheim.org/',
    'https://www.britishmuseum.org/',
    'https://www.uffizi.it/',
    'https://www.nationalgallery.org.uk/',
    'https://www.rijksmuseum.nl/',
    'https://www.vangoghmuseum.nl/',
    'https://www.artsy.net/',

    // --- Law & Legal ---
    'https://www.findlaw.com/',
    'https://www.justia.com/',
    'https://www.supremecourt.gov/',
    'https://www.nolo.com/',
    'https://www.law.cornell.edu/',
    'https://www.lexisnexis.com/',
    'https://www.westlaw.com/',
    'https://www.aba.org/',

    // --- Real Estate ---
    'https://www.zillow.com/',
    'https://www.redfin.com/',
    'https://www.realtor.com/',
    'https://www.trulia.com/',
    'https://www.apartments.com/',
    'https://www.rightmove.co.uk/',
    'https://www.zillow.com/commercial/',

    // --- Finance & Business ---
    'https://www.investopedia.com/',
    'https://www.forbes.com/',
    'https://www.businessinsider.com/',
    'https://www.marketwatch.com/',
    'https://www.fool.com/',
    'https://www.nerdwallet.com/',
    'https://www.morningstar.com/',
    'https://www.yahoo.com/finance/',
    'https://www.barrons.com/',
    'https://www.kiplinger.com/',
    'https://www.reuters.com/business/',
    'https://www.coinmarketcap.com/',
    'https://www.coindesk.com/',
    'https://www.fastcompany.com/',
    'https://www.inc.com/',

    // --- Health & Lifestyle ---
    'https://www.webmd.com/',
    'https://www.mayoclinic.org/',
    'https://www.healthline.com/',
    'https://www.nih.gov/',
    'https://www.cdc.gov/',
    'https://www.who.int/',
    'https://www.clevelandclinic.org/',
    'https://www.hopkinsmedicine.org/',
    'https://www.medscape.com/',
    'https://www.drugs.com/',
    'https://www.psychologytoday.com/',
    'https://www.menshealth.com/',
    'https://www.womenshealthmag.com/',
    'https://www.self.com/',

    // --- Entertainment & Gaming ---
    'https://www.imdb.com/',
    'https://www.rottentomatoes.com/',
    'https://www.ign.com/',
    'https://www.gamespot.com/',
    'https://www.pcgamer.com/',
    'https://www.kotaku.com/',
    'https://www.polygon.com/',
    'https://www.netflix.com/',
    'https://www.hulu.com/',
    'https://www.disneyplus.com/',
    'https://www.spotify.com/',
    'https://www.soundcloud.com/',
    'https://www.metacritic.com/',
    'https://www.billboard.com/',
    'https://www.rollingstone.com/',
    'https://www.variety.com/',
    'https://www.hollywoodreporter.com/',
    'https://www.eurogamer.net/',

    // --- E-Sports ---
    'https://www.hltv.org/',
    'https://liquipedia.net/',
    'https://www.dotabuff.com/',
    'https://www.op.gg/',
    'https://www.vlr.gg/',
    'https://www.gosugamers.net/',

    // --- Sports ---
    'https://www.espn.com/',
    'https://www.nba.com/',
    'https://www.nfl.com/',
    'https://www.fifa.com/',
    'https://www.espncricinfo.com/',
    'https://www.bleacherreport.com/',
    'https://www.skysports.com/',
    'https://www.mlb.com/',
    'https://www.nhl.com/',
    'https://www.formula1.com/',
    'https://www.ufc.com/',
    'https://www.si.com/',
    'https://www.goal.com/',

    // --- Food & Cooking ---
    'https://www.allrecipes.com/',
    'https://www.foodnetwork.com/',
    'https://www.epicurious.com/',
    'https://www.seriouseats.com/',
    'https://www.thekitchn.com/',
    'https://www.bonappetit.com/',
    'https://www.simplyrecipes.com/',
    'https://www.tasty.co/',
    'https://www.marthastewart.com/',
    'https://www.food52.com/',

    // --- Travel & Automotive ---
    'https://www.tripadvisor.com/',
    'https://www.lonelyplanet.com/',
    'https://www.airbnb.com/',
    'https://www.booking.com/',
    'https://www.expedia.com/',
    'https://www.kayak.com/',
    'https://www.tesla.com/',
    'https://www.toyota.com/',
    'https://www.ford.com/',
    'https://www.caranddriver.com/',
    'https://www.motortrend.com/',
    'https://www.autotrader.com/',
    'https://www.edmunds.com/',
    'https://www.cars.com/',
    'https://www.ferrari.com/',

    // --- Science & Nature ---
    'https://www.nature.com/',
    'https://www.scientificamerican.com/',
    'https://www.nationalgeographic.com/',
    'https://www.nasa.gov/',
    'https://www.space.com/',
    'https://www.sciencedaily.com/',
    'https://www.phys.org/',
    'https://www.livescience.com/',
    'https://www.smithsonianmag.com/',
    'https://www.newscientist.com/',
    'https://www.popsci.com/',

    // --- History & Humanities ---
    'https://www.history.com/',
    'https://www.archives.gov/',
    'https://www.loc.gov/',
    'https://www.biography.com/',
    'https://www.ancient.eu/',
    'https://www.british-history.ac.uk/',

    // --- Reference, Government & Organizations ---
    'https://www.usa.gov/',
    'https://www.un.org/',
    'https://www.whitehouse.gov/',
    'https://www.europa.eu/',
    'https://www.nato.int/',
    'https://www.who.int/',
    'https://www.imf.org/',
    'https://www.worldbank.org/',
    'https://www.weforum.org/',
    'https://www.merriam-webster.com/',
    'https://www.dictionary.com/',
    'https://www.thesaurus.com/',
    'https://www.gov.uk/',
    'https://www.canada.ca/',
    'https://www.australia.gov.au/',

    // --- Books & Literature ---
    'https://www.gutenberg.org/',
    'https://openlibrary.org/',
    'https://www.worldcat.org/',
    'https://www.poetryfoundation.org/',
    'https://www.literaryhub.com/',

    // --- Non-Profit & Charities ---
    'https://www.redcross.org/',
    'https://www.amnesty.org/',
    'https://www.hrw.org/',
    'https://www.greenpeace.org/',
    'https://www.doctorswithoutborders.org/',
    'https://www.unicef.org/',

    // --- Parenting & Home ---
    'https://www.babycenter.com/',
    'https://www.parenting.com/',
    'https://www.thebump.com/',
    'https://www.betterhomesandgardens.com/',
    'https://www.realsimple.com/',
    'https://www.hgtv.com/',
    'https://www.apartmenttherapy.com/',
    'https://www.thespruce.com/',

    // --- Fashion & Lifestyle ---
    'https://www.vogue.com/',
    'https://www.elle.com/',
    'https://www.gq.com/',
    'https://www.cosmopolitan.com/',
    'https://www.harpersbazaar.com/',
    'https://www.esquire.com/',
    'https://www.vanityfair.com/',
    'https://www.refinery29.com/',
    'https://www.allure.com/',

    // --- Utilities & Productivity ---
    'https://www.speedtest.net/',
    'https://www.canva.com/',
    'https://www.figma.com/',
    'https://www.notion.so/',
    'https://www.slack.com/',
    'https://www.zoom.us/',
    'https://www.trello.com/',
    'https://www.asana.com/',
    'https://www.dropbox.com/',

    // --- Privacy & Security ---
    'https://proton.me/',
    'https://duckduckgo.com/',
    'https://www.brave.com/',
    'https://1password.com/',
    'https://www.nordvpn.com/',
    'https://www.torproject.org/',
    'https://www.eff.org/',

    // --- Regional Giants (APAC, EMEA, LATAM) ---
    'https://www.alibaba.com/',
    'https://www.baidu.com/',
    'https://www.tencent.com/',
    'https://www.samsung.com/',
    'https://www.rakuten.co.jp/',
    'https://www.flipkart.com/',
    'https://www.paytm.com/',
    'https://www.grab.com/',
    'https://www.shopee.com/',
    'https://www.mercadolibre.com/',
    'https://www.jumia.com/',
    'https://www.globo.com/',
    'https://www.naver.com/',
    'https://www.line.me/',

    // --- Heavy Infrastructure & Energy ---
    'https://www.maersk.com/',
    'https://www.ups.com/',
    'https://www.fedex.com/',
    'https://www.shell.com/',
    'https://www.bp.com/',
    'https://www.exxonmobil.com/',
    'https://www.siemens.com/',
    'https://www.ge.com/',

    // --- Alphabetical Global Giants (A-Z) ---
    // A
    'https://www.amazon.com/', 'https://www.apple.com/', 'https://www.airbnb.com/', 'https://www.adobe.com/', 'https://abc.xyz/',
    // B
    'https://www.bbc.com/', 'https://www.bloomberg.com/', 'https://www.baidu.com/', 'https://www.booking.com/', 'https://www.bestbuy.com/',
    // C
    'https://www.cnn.com/', 'https://www.cnbc.com/', 'https://www.canva.com/', 'https://www.coursera.org/', 'https://www.cisco.com/',
    // D
    'https://www.disney.com/', 'https://www.dropbox.com/', 'https://www.dell.com/', 'https://duckduckgo.com/', 'https://discord.com/',
    // E
    'https://www.ebay.com/', 'https://www.etsy.com/', 'https://www.espn.com/', 'https://www.economist.com/', 'https://evernote.com/',
    // F
    'https://www.facebook.com/', 'https://www.forbes.com/', 'https://www.fedex.com/', 'https://www.figma.com/', 'https://www.ford.com/',
    // G
    'https://www.google.com/', 'https://github.com/', 'https://www.theguardian.com/', 'https://www.goldmansachs.com/', 'https://www.ge.com/',
    // H
    'https://www.hulu.com/', 'https://www.harvard.edu/', 'https://www.homedepot.com/', 'https://www.honda.com/', 'https://www.hp.com/',
    // I
    'https://www.instagram.com/', 'https://www.ibm.com/', 'https://www.ikea.com/', 'https://www.indeed.com/', 'https://www.intel.com/',
    // J
    'https://www.jpmorgan.com/', 'https://www.jetblue.com/', 'https://www.jumia.com/', 'https://global.jd.com/', 'https://www.jnj.com/',
    // K
    'https://www.kickstarter.com/', 'https://www.khanacademy.org/', 'https://www.kayak.com/', 'https://www.klm.com/', 'https://www.kroger.com/',
    // L
    'https://www.linkedin.com/', 'https://www.lufthansa.com/', 'https://www.lego.com/', 'https://www.lenovo.com/', 'https://www.lyft.com/',
    // M
    'https://www.microsoft.com/', 'https://www.meta.com/', 'https://medium.com/', 'https://www.mcdonalds.com/', 'https://www.mozilla.org/',
    // N
    'https://www.netflix.com/', 'https://www.nike.com/', 'https://www.nvidia.com/', 'https://www.nytimes.com/', 'https://www.nasa.gov/',
    // O
    'https://openai.com/', 'https://www.oracle.com/', 'https://www.outlook.com/', 'https://www.overstock.com/', 'https://www.oldnavy.com/',
    // P
    'https://www.pinterest.com/', 'https://www.paypal.com/', 'https://www.playstation.com/', 'https://www.pfizer.com/', 'https://www.pepsi.com/',
    // Q
    'https://www.quora.com/', 'https://www.qualcomm.com/', 'https://www.qantas.com/', 'https://www.quicken.com/', 'https://quizlet.com/',
    // R
    'https://www.reddit.com/', 'https://www.reuters.com/', 'https://www.redhat.com/', 'https://www.rolex.com/', 'https://www.razer.com/',
    // S
    'https://www.spotify.com/', 'https://www.slack.com/', 'https://www.spacex.com/', 'https://www.salesforce.com/', 'https://www.samsung.com/',
    // T
    'https://www.twitter.com/', 'https://www.tesla.com/', 'https://techcrunch.com/', 'https://www.twitch.tv/', 'https://www.toyota.com/',
    // U
    'https://www.uber.com/', 'https://www.ubisoft.com/', 'https://www.udemy.com/', 'https://www.ups.com/', 'https://www.united.com/',
    // V
    'https://vimeo.com/', 'https://www.visa.com/', 'https://www.volkswagen.com/', 'https://www.verizon.com/', 'https://www.valvesoftware.com/',
    // W
    'https://www.wikipedia.org/', 'https://www.walmart.com/', 'https://www.whatsapp.com/', 'https://www.wired.com/', 'https://wordpress.com/',
    // X
    'https://www.xbox.com/', 'https://www.xerox.com/', 'https://www.mi.com/', 'https://www.xero.com/', 'https://www.xfinity.com/',
    // Y
    'https://www.youtube.com/', 'https://www.yahoo.com/', 'https://www.yelp.com/', 'https://www.ycombinator.com/', 'https://yandex.com/',
    // Z
    'https://zoom.us/', 'https://www.zillow.com/', 'https://www.zappos.com/', 'https://www.zara.com/', 'https://www.zendesk.com/'
];

async function seedMajorUrls() {
    const client = await pool.connect();

    try {
        console.log(`🌱 Seeding crawl queue with ${majorUrls.length} major URLs...`);

        let insertedCount = 0;

        for (const url of majorUrls) {
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
                // Silently skip existing to avoid log bloat for 500+ URLs
            }
        }

        console.log(`\n✅ Seeding complete! Added ${insertedCount} NEW major URLs to the queue.`);
        console.log(`📊 Total URLs in major list: ${majorUrls.length}`);

    } catch (error) {
        console.error('Error seeding major URLs:', error);
    } finally {
        client.release();
        await pool.end();
    }
}

seedMajorUrls();
