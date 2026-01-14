import pool from '../lib/db';

const vastUrlList = [
    // --- Technology & Programming (100) ---
    'https://github.com/', 'https://stackoverflow.com/', 'https://gitlab.com/', 'https://bitbucket.org/', 'https://sourceforge.net/',
    'https://dev.to/', 'https://news.ycombinator.com/', 'https://slashdot.org/', 'https://dzone.com/', 'https://hashnode.com/',
    'https://products.hubspot.com/', 'https://techcrunch.com/', 'https://www.theverge.com/', 'https://arstechnica.com/', 'https://wired.com/',
    'https://engadget.com/', 'https://cnet.com/', 'https://zdnet.com/', 'https://venturebeat.com/', 'https://digitaltrends.com/',
    'https://reactjs.org/', 'https://vuejs.org/', 'https://angular.io/', 'https://svelte.dev/', 'https://nextjs.org/',
    'https://nuxtjs.org/', 'https://gatsbyjs.com/', 'https://nodejs.org/', 'https://deno.land/', 'https://python.org/',
    'https://ruby-lang.org/', 'https://golang.org/', 'https://rust-lang.org/', 'https://php.net/', 'https://perl.org/',
    'https://java.com/', 'https://kotlinlang.org/', 'https://scala-lang.org/', 'https://swift.org/', 'https://developer.apple.com/',
    'https://developer.android.com/', 'https://firebase.google.com/', 'https://aws.amazon.com/', 'https://cloud.google.com/', 'https://azure.microsoft.com/',
    'https://docker.com/', 'https://kubernetes.io/', 'https://terraform.io/', 'https://ansible.com/', 'https://jenkins.io/',
    'https://circleci.com/', 'https://travis-ci.org/', 'https://netlify.com/', 'https://vercel.com/', 'https://heroku.com/',
    'https://digitalocean.com/', 'https://linode.com/', 'https://vultr.com/', 'https://cloudflare.com/', 'https://fastly.com/',
    'https://stripe.com/', 'https://paypal.com/', 'https://braintreepayments.com/', 'https://square.com/', 'https://shopify.com/',
    'https://magento.com/', 'https://wordpress.org/', 'https://drupal.org/', 'https://joomla.org/', 'https://ghost.org/',
    'https://medium.com/', 'https://tumblr.com/', 'https://blogger.com/', 'https://wix.com/', 'https://squarespace.com/',
    'https://weebly.com/', 'https://webflow.com/', 'https://framer.com/', 'https://figma.com/', 'https://sketch.com/',
    'https://invisionapp.com/', 'https://zeplin.io/', 'https://adobe.com/', 'https://jetbrains.com/', 'https://visualstudio.com/',
    'https://sublimetext.com/', 'https://atom.io/', 'https://code.visualstudio.com/', 'https://vim.org/', 'https://gnu.org/software/emacs/',
    'https://linux.org/', 'https://ubuntu.com/', 'https://debian.org/', 'https://fedora.org/', 'https://centos.org/',
    'https://archlinux.org/', 'https://gentoo.org/', 'https://mint.com/', 'https://kali.org/', 'https://raspberrypi.org/',
    'https://arduino.cc/',

    // --- News & Media (100) ---
    'https://bbc.com/', 'https://cnn.com/', 'https://nytimes.com/', 'https://washingtonpost.com/', 'https://theguardian.com/',
    'https://reuters.com/', 'https://apnews.com/', 'https://bloomberg.com/', 'https://forbes.com/', 'https://wsj.com/',
    'https://ft.com/', 'https://economist.com/', 'https://time.com/', 'https://newsweek.com/', 'https://usatoday.com/',
    'https://nbcnews.com/', 'https://abcnews.go.com/', 'https://cbsnews.com/', 'https://foxnews.com/', 'https://msnbc.com/',
    'https://npr.org/', 'https://pbs.org/', 'https://aljazeera.com/', 'https://rt.com/', 'https://sputniknews.com/',
    'https://xinhuanet.com/', 'https://chinadaily.com.cn/', 'https://japantimes.co.jp/', 'https://koreatimes.co.kr/', 'https://timesofindia.indiatimes.com/',
    'https://hindustantimes.com/', 'https://thehindu.com/', 'https://indianexpress.com/', 'https://dawn.com/', 'https://straitstimes.com/',
    'https://scmp.com/', 'https://smh.com.au/', 'https://abc.net.au/', 'https://nzherald.co.nz/', 'https://globeandmail.com/',
    'https://cbc.ca/', 'https://ctvnews.ca/', 'https://globalnews.ca/', 'https://torontostar.com/', 'https://lefigaro.fr/',
    'https://lemonde.fr/', 'https://france24.com/', 'https://dw.com/', 'https://spiegel.de/', 'https://bild.de/',
    'https://elpais.com/', 'https://elmundo.es/', 'https://corriere.it/', 'https://repubblica.it/', 'https://pravda.ru/',
    'https://tass.com/', 'https://moscowtimes.com/', 'https://kyivindependent.com/', 'https://jerusalempost.com/', 'https://haaretz.com/',
    'https://al-monitor.com/', 'https://middleeasteye.net/', 'https://allafrica.com/', 'https://news24.com/', 'https://dailymaverick.co.za/',
    'https://folha.uol.com.br/', 'https://globo.com/', 'https://clarin.com/', 'https://lanacion.com.ar/', 'https://eluniversal.com.mx/',
    'https://reforma.com/', 'https://buzzfeed.com/', 'https://huffpost.com/', 'https://vice.com/', 'https://vox.com/',
    'https://axios.com/', 'https://politico.com/', 'https://thehill.com/', 'https://slate.com/', 'https://salon.com/',
    'https://grist.org/', 'https://propublica.org/', 'https://theintercept.com/', 'https://democracynow.org/', 'https://jacobin.com/',
    'https://reason.com/', 'https://nationalreview.com/', 'https://weeklystandard.com/', 'https://spectator.co.uk/', 'https://newstatesman.com/',

    // --- Education & Research (100) ---
    'https://wikipedia.org/', 'https://wikibooks.org/', 'https://wikiversity.org/', 'https://wiktionary.org/', 'https://wikidata.org/',
    'https://scholar.google.com/', 'https://researchgate.net/', 'https://academia.edu/', 'https://jstor.org/', 'https://sciencedirect.com/',
    'https://springer.com/', 'https://wiley.com/', 'https://tandfonline.com/', 'https://sagepub.com/', 'https://oup.com/',
    'https://cambridge.org/', 'https://mit.edu/', 'https://harvard.edu/', 'https://stanford.edu/', 'https://yale.edu/',
    'https://princeton.edu/', 'https://columbia.edu/', 'https://upenn.edu/', 'https://cornell.edu/', 'https://dartmouth.edu/',
    'https://brown.edu/', 'https://uchicago.edu/', 'https://northwestern.edu/', 'https://jhu.edu/', 'https://duke.edu/',
    'https://caltech.edu/', 'https://berkeley.edu/', 'https://ucla.edu/', 'https://umich.edu/', 'https://virginia.edu/',
    'https://unc.edu/', 'https://utexas.edu/', 'https://nyu.edu/', 'https://usc.edu/', 'https://cmu.edu/',
    'https://ox.ac.uk/', 'https://cam.ac.uk/', 'https://imperial.ac.uk/', 'https://ucl.ac.uk/', 'https://lse.ac.uk/',
    'https://ethz.ch/', 'https://epfl.ch/', 'https://utoronto.ca/', 'https://mcgill.ca/', 'https://ubc.ca/',
    'https://anu.edu.au/', 'https://unimelb.edu.au/', 'https://sydney.edu.au/', 'https://tsinghua.edu.cn/', 'https://pku.edu.cn/',
    'https://u-tokyo.ac.jp/', 'https://nus.edu.sg/', 'https://hku.hk/', 'https://sorbonne-universite.fr/', 'https://uni-muenchen.de/',
    'https://coursera.org/', 'https://edx.org/', 'https://udacity.com/', 'https://udemy.com/', 'https://khanacademy.org/',
    'https://classcentral.com/', 'https://futurelearn.com/', 'https://skillshare.com/', 'https://linkedin.com/learning/', 'https://pluralsight.com/',
    'https://codecademy.com/', 'https://freecodecamp.org/', 'https://datacamp.com/', 'https://brilliant.org/', 'https://masterclass.com/',
    'https://duolingo.com/', 'https://babbel.com/', 'https://rosettaStone.com/', 'https://memrise.com/', 'https://busuu.com/',
    'https://quizlet.com/', 'https://chegg.com/', 'https://coursehero.com/', 'https://scribd.com/', 'https://issuu.com/',
    'https://slideshare.net/', 'https://prezi.com/', 'https://kahoot.com/', 'https://socratic.org/', 'https://brainly.com/',

    // --- E-commerce & Shopping (100) ---
    'https://amazon.com/', 'https://ebay.com/', 'https://walmart.com/', 'https://target.com/', 'https://bestbuy.com/',
    'https://costco.com/', 'https://homedepot.com/', 'https://lowes.com/', 'https://ikea.com/', 'https://wayfair.com/',
    'https://etsy.com/', 'https://shopify.com/', 'https://alibaba.com/', 'https://aliexpress.com/', 'https://taobao.com/',
    'https://tmall.com/', 'https://jd.com/', 'https://rakuten.co.jp/', 'https://flipkart.com/', 'https://snapdeal.com/',
    'https://myntra.com/', 'https://jabong.com/', 'https://paytm.com/', 'https://mercadolibre.com/', 'https://jumia.com/',
    'https://asos.com/', 'https://boohoo.com/', 'https://zara.com/', 'https://hm.com/', 'https://uniqlo.com/',
    'https://gap.com/', 'https://nike.com/', 'https://adidas.com/', 'https://puma.com/', 'https://underarmour.com/',
    'https://reebok.com/', 'https://newbalance.com/', 'https://converse.com/', 'https://vans.com/', 'https://gucci.com/',
    'https://louisvuitton.com/', 'https://chanel.com/', 'https://hermes.com/', 'https://prada.com/', 'https://versace.com/',
    'https://armani.com/', 'https://burberry.com/', 'https://dior.com/', 'https://ysl.com/', 'https://tiffany.com/',
    'https://cartier.com/', 'https://rolex.com/', 'https://omega.ch/', 'https://tagheuer.com/', 'https://breitling.com/',
    'https://sephora.com/', 'https://ulta.com/', 'https://maccosmetics.com/', 'https://loreal.com/', 'https://esteeLauder.com/',
    'https://clinique.com/', 'https://lancome.com/', 'https://maybelline.com/', 'https://neutrogena.com/', 'https://olay.com/',
    'https://newegg.com/', 'https://bhphotovideo.com/', 'https://microcenter.com/', 'https://gamestop.com/', 'https://steamcommunity.com/',
    'https://epicgames.com/', 'https://gog.com/', 'https://humblebundle.com/', 'https://greenmangaming.com/', 'https://fanatical.com/',
    'https://zappos.com/', 'https://6pm.com/', 'https://dsw.com/', 'https://footlocker.com/', 'https://finishline.com/',
    'https://nordstrom.com/', 'https://macys.com/', 'https://bloomingdales.com/', 'https://saksfifthavenue.com/', 'https://neimanmarcus.com/',

    // --- Social Media & Community (50) ---
    'https://facebook.com/', 'https://instagram.com/', 'https://twitter.com/', 'https://linkedin.com/', 'https://snapchat.com/',
    'https://tiktok.com/', 'https://pinterest.com/', 'https://reddit.com/', 'https://quora.com/', 'https://tumblr.com/',
    'https://flickr.com/', 'https://vimeo.com/', 'https://dailymotion.com/', 'https://twitch.tv/', 'https://discord.com/',
    'https://telegram.org/', 'https://whatsapp.com/', 'https://signal.org/', 'https://wechat.com/', 'https://qq.com/',
    'https://weibo.com/', 'https://line.me/', 'https://kakaocorp.com/', 'https://vk.com/', 'https://ok.ru/',
    'https://mix.com/', 'https://digg.com/', 'https://producthunt.com/', 'https://hackernews.com/', 'https://dev.to/',
    'https://stackoverflow.com/', 'https://github.com/', 'https://gitlab.com/', 'https://bitbucket.org/', 'https://meetup.com/',
    'https://eventbrite.com/', 'https://nextdoor.com/', 'https://facebook.com/marketplace/', 'https://dating.com/', 'https://tinder.com/',
    'https://bumble.com/', 'https://hinge.co/', 'https://okcupid.com/', 'https://match.com/', 'https://eharmony.com/',
    'https://pof.com/', 'https://zoosk.com/', 'https://grindr.com/', 'https://her.com/', 'https://feeld.co/',

    // --- Entertainment & Gaming (100) ---
    'https://netflix.com/', 'https://hulu.com/', 'https://disneyplus.com/', 'https://hbomax.com/', 'https://amazon.com/primevideo',
    'https://apple.com/tv-plus/', 'https://peacocktv.com/', 'https://paramountplus.com/', 'https://discoveryplus.com/', 'https://youtube.com/',
    'https://vimeo.com/', 'https://dailymotion.com/', 'https://twitch.tv/', 'https://spotify.com/', 'https://applemusic.com/',
    'https://pandora.com/', 'https://soundcloud.com/', 'https://tidal.com/', 'https://deezer.com/', 'https://iheart.com/',
    'https://last.fm/', 'https://bandcamp.com/', 'https://genius.com/', 'https://billboard.com/', 'https://rollingstone.com/',
    'https://pitchfork.com/', 'https://nme.com/', 'https://variety.com/', 'https://hollywoodreporter.com/', 'https://deadline.com/',
    'https://imdb.com/', 'https://rottentomatoes.com/', 'https://metacritic.com/', 'https://fandango.com/', 'https://amctheatres.com/',
    'https://regmovies.com/', 'https://cinemark.com/', 'https://ign.com/', 'https://gamespot.com/', 'https://kotaku.com/',
    'https://polygon.com/', 'https://pcgamer.com/', 'https://eurogamer.net/', 'https://gameinformer.com/', 'https://destructoid.com/',
    'https://rockpapershotgun.com/', 'https://giantbomb.com/', 'https://gamefaqs.com/', 'https://nintendo.com/', 'https://playstation.com/',
    'https://xbox.com/', 'https://steampowered.com/', 'https://epicgames.com/', 'https://ubisoft.com/', 'https://ea.com/',
    'https://activisionblizzard.com/', 'https://take2games.com/', 'https://bethesda.net/', 'https://square-enix-games.com/', 'https://capcom.com/',
    'https://konami.com/', 'https://sega.com/', 'https://bandainamcoent.com/', 'https://riotgames.com/', 'https://roblox.com/',
    'https://minecraft.net/', 'https://fortnite.com/', 'https://leagueoflegends.com/', 'https://dota2.com/', 'https://overwatch.com/',
    'https://csgo.com/', 'https://valorant.com/', 'https://apexlegends.com/', 'https://pubg.com/', 'https://callofduty.com/',
    'https://pokemongo.com/', 'https://clashofclans.com/', 'https://candyrush.com/', 'https://angrybirds.com/', 'https://amongus.com/',
    'https://marvel.com/', 'https://dccomics.com/', 'https://starwars.com/', 'https://startrek.com/', 'https://harrypotter.com/',
    'https://lotr.fandom.com/', 'https://gameofthrones.fandom.com/', 'https://walkingdead.fandom.com/', 'https://strangerthings.fandom.com/', 'https://doctorwho.tv/',

    // --- Health & Wellness (50) ---
    'https://webmd.com/', 'https://mayoclinic.org/', 'https://clevelandclinic.org/', 'https://hopkinsmedicine.org/', 'https://nih.gov/',
    'https://cdc.gov/', 'https://who.int/', 'https://medlineplus.gov/', 'https://healthline.com/', 'https://medicalnewstoday.com/',
    'https://everydayhealth.com/', 'https://verywellhealth.com/', 'https://drugs.com/', 'https://rxlist.com/', 'https://medscape.com/',
    'https://psychologytoday.com/', 'https://headspace.com/', 'https://calm.com/', 'https://myfitnesspal.com/', 'https://fitbit.com/',
    'https://garmin.com/', 'https://strava.com/', 'https://nike.com/ntc-app', 'https://apple.com/apple-fitness-plus/', 'https://peloton.com/',
    'https://weightwatchers.com/', 'https://noom.com/', 'https://hellofresh.com/', 'https://blueapron.com/', 'https://sunbasket.com/',
    'https://gnc.com/', 'https://vitaminshoppe.com/', 'https://bodybuilding.com/', 'https://menshealth.com/', 'https://womenshealthmag.com/',
    'https://prevention.com/', 'https://shape.com/', 'https://self.com/', 'https://wellandgood.com/', 'https://mindbodygreen.com/',
    'https://yogajournal.com/', 'https://runnersworld.com/', 'https://bicycling.com/', 'https://triathlete.com/', 'https://crossfit.com/',
    'https://plannedparenthood.org/', 'https://heart.org/', 'https://cancer.org/', 'https://diabetes.org/', 'https://alz.org/',

    // --- Finance & Business (50) ---
    'https://investopedia.com/', 'https://marketwatch.com/', 'https://fool.com/', 'https://seekingalpha.com/', 'https://morningstar.com/',
    'https://barrons.com/', 'https://kiplinger.com/', 'https://nerdwallet.com/', 'https://creditkarma.com/', 'https://mint.com/',
    'https://ynab.com/', 'https://personalcapital.com/', 'https://robinhood.com/', 'https://coinbase.com/', 'https://binance.com/',
    'https://kraken.com/', 'https://etoro.com/', 'https://betterment.com/', 'https://wealthfront.com/', 'https://acorns.com/',
    'https://stash.com/', 'https://fidelity.com/', 'https://vanguard.com/', 'https://schwab.com/', 'https://tdameritrade.com/',
    'https://e-trade.com/', 'https://interactivebrokers.com/', 'https://ally.com/', 'https://chase.com/', 'https://bankofamerica.com/',
    'https://wellsfargo.com/', 'https://citi.com/', 'https://usbank.com/', 'https://capitalone.com/', 'https://amex.com/',
    'https://discover.com/', 'https://visa.com/', 'https://mastercard.com/', 'https://paypal.com/', 'https://stripe.com/',
    'https://square.com/', 'https://quickbooks.intuit.com/', 'https://xero.com/', 'https://freshbooks.com/', 'https://waveapps.com/',
    'https://zoho.com/books/', 'https://sage.com/', 'https://oracle.com/netsuite/', 'https://sap.com/', 'https://salesforce.com/',

    // --- Travel & Tourism (50) ---
    'https://tripadvisor.com/', 'https://lonelyplanet.com/', 'https://fodors.com/', 'https://frommers.com/', 'https://cntraveler.com/',
    'https://travelandleisure.com/', 'https://natgeotravel.com/', 'https://airbnb.com/', 'https://vrbo.com/', 'https://booking.com/',
    'https://expedia.com/', 'https://hotels.com/', 'https://agoda.com/', 'https://kayak.com/', 'https://skyscanner.com/',
    'https://momondo.com/', 'https://google.com/travel/flights', 'https://southwest.com/', 'https://delta.com/', 'https://united.com/',
    'https://aa.com/', 'https://britishairways.com/', 'https://lufthansa.com/', 'https://emirates.com/', 'https://qatarairways.com/',
    'https://singaporeair.com/', 'https://cathaypacific.com/', 'https://ana.co.jp/', 'https://jal.co.jp/', 'https://airfrance.com/',
    'https://klm.com/', 'https://ryanair.com/', 'https://easyjet.com/', 'https://trivago.com/', 'https://hostelworld.com/',
    'https://couchsurfing.com/', 'https://uber.com/', 'https://lyft.com/', 'https://grab.com/', 'https://blablacar.com/',
    'https://hertz.com/', 'https://avis.com/', 'https://enterprise.com/', 'https://budget.com/', 'https://sixt.com/',
    'https://marriott.com/', 'https://hilton.com/', 'https://hyatt.com/', 'https://ihg.com/', 'https://accor.com/',

    // --- Sports & Fitness (50) ---
    'https://espn.com/', 'https://si.com/', 'https://bleacherreport.com/', 'https://cbssports.com/', 'https://nbcsports.com/',
    'https://foxsports.com/', 'https://skysports.com/', 'https://bbc.com/sport', 'https://eurosport.com/', 'https://goal.com/',
    'https://fifa.com/', 'https://uefa.com/', 'https://premierleague.com/', 'https://laliga.com/', 'https://bundesliga.com/',
    'https://seriea.it/', 'https://ligue1.com/', 'https://mlssoccer.com/', 'https://nfl.com/', 'https://nba.com/',
    'https://mlb.com/', 'https://nhl.com/', 'https://pga.com/', 'https://atptour.com/', 'https://wtatennis.com/',
    'https://formula1.com/', 'https://motogp.com/', 'https://nascar.com/', 'https://ufc.com/', 'https://bellator.com/',
    'https://wwe.com/', 'https://olympics.com/', 'https://paralympic.org/', 'https://ncaa.com/', 'https://maxpreps.com/',
    'https://rivals.com/', 'https://247sports.com/', 'https://on3.com/', 'https://strava.com/', 'https://runkeeper.com/',
    'https://mapmyrun.com/', 'https://nike.com/running', 'https://adidas.com/running', 'https://underarmour.com/fitness', 'https://reebok.com/fitness',
    'https://peloton.com/', 'https://zwift.com/', 'https://trainerroad.com/', 'https://rouvy.com/', 'https://wahoo.com/',

    // --- Food & Cooking (50) ---
    'https://allrecipes.com/', 'https://foodnetwork.com/', 'https://epicurious.com/', 'https://bonappetit.com/', 'https://saveur.com/',
    'https://foodandwine.com/', 'https://eatingwell.com/', 'https://cookinglight.com/', 'https://delish.com/', 'https://thekitchn.com/',
    'https://seriouseats.com/', 'https://simplyrecipes.com/', 'https://smittenkitchen.com/', 'https://pioneerwoman.com/', 'https://marthastewart.com/',
    'https://jamieoliver.com/', 'https://gordonramsay.com/', 'https://nigella.com/', 'https://altonbrown.com/', 'https://bobbyflay.com/',
    'https://eater.com/', 'https://grubstreet.com/', 'https://infatuation.com/', 'https://zagat.com/', 'https://michelin.com/',
    'https://opentable.com/', 'https://resy.com/', 'https://yelp.com/', 'https://tripadvisor.com/restaurants', 'https://zomato.com/',
    'https://ubereats.com/', 'https://grubhub.com/', 'https://doordash.com/', 'https://postmates.com/', 'https://instacart.com/',
    'https://freshdirect.com/', 'https://peapod.com/', 'https://shipt.com/', 'https://starbucks.com/', 'https://dunkindonuts.com/',
    'https://mcdonalds.com/', 'https://burgerking.com/', 'https://wendys.com/', 'https://tacobell.com/', 'https://kfc.com/',
    'https://pizzahut.com/', 'https://dominos.com/', 'https://subway.com/', 'https://chipotle.com/', 'https://panerabread.com/',

    // --- Science & Nature (50) ---
    'https://nasa.gov/', 'https://esa.int/', 'https://spacex.com/', 'https://blueorigin.com/', 'https://virgingalactic.com/',
    'https://nationalgeographic.com/', 'https://discovery.com/', 'https://animalplanet.com/', 'https://science.org/', 'https://nature.com/',
    'https://scientificamerican.com/', 'https://newscientist.com/', 'https://popsci.com/', 'https://livescience.com/', 'https://sciencedaily.com/',
    'https://phys.org/', 'https://space.com/', 'https://astronomy.com/', 'https://skyandtelescope.org/', 'https://weather.com/',
    'https://accuweather.com/', 'https://wunderground.com/', 'https://noaa.gov/', 'https://usgs.gov/', 'https://epa.gov/',
    'https://worldwildlife.org/', 'https://nature.org/', 'https://audubon.org/', 'https://sierraclub.org/', 'https://greenpeace.org/',
    'https://nrdc.org/', 'https://edf.org/', 'https://ucsusa.org/', 'https://janegoodall.org/', 'https://cousteau.org/',
    'https://smithsonianmag.com/', 'https://amnh.org/', 'https://nhm.ac.uk/', 'https://fieldmuseum.org/', 'https://calacademy.org/',
    'https://montereybayaquarium.org/', 'https://georgiaaquarium.org/', 'https://sandiegozoo.org/', 'https://bronxzoo.com/', 'https://londonzoo.org/',
    'https://kew.org/', 'https://nybg.org/', 'https://bbg.org/', 'https://mobot.org/', 'https://longwoodgardens.org/',

    // --- Arts & Culture (50) ---
    'https://moma.org/', 'https://metmuseum.org/', 'https://guggenheim.org/', 'https://whitney.org/', 'https://artic.edu/',
    'https://nga.gov/', 'https://getty.edu/', 'https://lacma.org/', 'https://broad.org/', 'https://tate.org.uk/',
    'https://nationalgallery.org.uk/', 'https://britishmuseum.org/', 'https://vam.ac.uk/', 'https://louvre.fr/', 'https://musee-orsay.fr/',
    'https://centrepompidou.fr/', 'https://museodelprado.es/', 'https://museoreinasofia.es/', 'https://uffizi.it/', 'https://museivaticani.va/',
    'https://rijksmuseum.nl/', 'https://vangoghmuseum.nl/', 'https://hermitagemuseum.org/', 'https://tretyakovgallery.ru/', 'https://nmwa.go.jp/',
    'https://artnews.com/', 'https://artforum.com/', 'https://artsy.net/', 'https://artnet.com/', 'https://hyperallergic.com/',
    'https://behance.net/', 'https://dribbble.com/', 'https://deviantart.com/', 'https://artstation.com/', 'https://pinterest.com/art',
    'https://broadway.com/', 'https://playbill.com/', 'https://theatermania.com/', 'https://westend.com/', 'https://londontheatre.co.uk/',
    'https://opera.com/', 'https://metopera.org/', 'https://roh.org.uk/', 'https://wiener-staatsoper.at/', 'https://alascala.org/',
    'https://nyphil.org/', 'https://lso.co.uk/', 'https://berliner-philharmoniker.de/', 'https://vienna-philharmonic.at/', 'https://rco.nl/',

    // --- Government & Legal (50) ---
    'https://usa.gov/', 'https://whitehouse.gov/', 'https://congress.gov/', 'https://senate.gov/', 'https://house.gov/',
    'https://supremecourt.gov/', 'https://fbi.gov/', 'https://cia.gov/', 'https://state.gov/', 'https://defense.gov/',
    'https://treasury.gov/', 'https://justice.gov/', 'https://dol.gov/', 'https://education.gov/', 'https://hhs.gov/',
    'https://hud.gov/', 'https://transportation.gov/', 'https://energy.gov/', 'https://va.gov/', 'https://dhs.gov/',
    'https://irs.gov/', 'https://ssa.gov/', 'https://medicare.gov/', 'https://medicaid.gov/', 'https://fema.gov/',
    'https://usps.com/', 'https://census.gov/', 'https://archives.gov/', 'https://loc.gov/', 'https://si.edu/',
    'https://europa.eu/', 'https://ec.europa.eu/', 'https://europarl.europa.eu/', 'https://consilium.europa.eu/', 'https://curia.europa.eu/',
    'https://ecb.europa.eu/', 'https://nato.int/', 'https://un.org/', 'https://unicef.org/', 'https://unesco.org/',
    'https://who.int/', 'https://wto.org/', 'https://imf.org/', 'https://worldbank.org/', 'https://oecd.org/',
    'https://interpol.int/', 'https://icj-cij.org/', 'https://icc-cpi.int/', 'https://ohchr.org/', 'https://unhcr.org/',

    // --- Random / Others (50) ---
    'https://archive.org/', 'https://creativecommons.org/', 'https://eff.org/', 'https://aclu.org/', 'https://splcenter.org/',
    'https://hrw.org/', 'https://amnesty.org/', 'https://doctorswithoutborders.org/', 'https://redcross.org/', 'https://salvationarmy.org/',
    'https://unitedway.org/', 'https://ymca.org/', 'https://girlscouts.org/', 'https://scouting.org/', 'https://rotary.org/',
    'https://lionsclubs.org/', 'https://kiwanis.org/', 'https://toastmasters.org/', 'https://mensa.org/', 'https://ted.com/',
    'https://npr.org/podcasts', 'https://serialpodcast.org/', 'https://thisamericanlife.org/', 'https://radiolab.org/', 'https://99percentinvisible.org/',
    'https://freakonomics.com/', 'https://waitbutwhy.com/', 'https://xkcd.com/', 'https://theoatmeal.com/', 'https://smbc-comics.com/',
    'https://penny-arcade.com/', 'https://dilbert.com/', 'https://gocomics.com/', 'https://webtoons.com/', 'https://tapas.io/',
    'https://knowyourmeme.com/', 'https://urbandictionary.com/', 'https://tvtropes.org/', 'https://wikia.com/', 'https://fandom.com/',
    'https://snopes.com/', 'https://factcheck.org/', 'https://politifact.com/', 'https://truthorfiction.com/', 'https://hoax-slayer.net/',
    'https://guinnessworldrecords.com/', 'https://ripleys.com/', 'https://atlasobscura.com/', 'https://mentalfloss.com/', 'https://listverse.com/',
    'https://theonion.com/', 'https://babylonbee.com/', 'https://duffelblog.com/', 'https://clickhole.com/', 'https://reductress.com/'
];

async function seedVastCrawlQueue() {
    const client = await pool.connect();

    // Remove duplicates
    const uniqueUrls = [...new Set(vastUrlList)];

    try {
        console.log(`🌍 Starting massive seed operation...`);
        console.log(`📋 Total Unique URLs to process: ${uniqueUrls.length}`);

        let insertedCount = 0;
        let batchSize = 50;

        // Process in batches to avoid overwhelming the connection
        for (let i = 0; i < uniqueUrls.length; i += batchSize) {
            const batch = uniqueUrls.slice(i, i + batchSize);

            // Execute batch in parallel
            await Promise.all(batch.map(async (url) => {
                const query = `
                    INSERT INTO crawl_queue (url, priority, status)
                    VALUES ($1, 5, 'pending')
                    ON CONFLICT (url) DO NOTHING
                `;

                try {
                    const res = await client.query(query, [url]);
                    if ((res as any).rowCount > 0) {
                        insertedCount++;
                    }
                } catch (err) {
                    console.error(`Failed to insert ${url}`, err);
                }
            }));

            // Progress bar effect
            const percent = Math.round(((i + batch.length) / uniqueUrls.length) * 100);
            process.stdout.write(`\r⏳ Progress: ${percent}% (${Math.min(i + batch.length, uniqueUrls.length)}/${uniqueUrls.length})`);
        }

        console.log(`\n\n✅ Seeding complete!`);
        console.log(`✨ Added ${insertedCount} new URLs to the crawl queue.`);
        console.log(`📊 Total available for crawling: ${uniqueUrls.length}`);

    } catch (error) {
        console.error('\n❌ Error seeding crawl queue:', error);
    } finally {
        client.release();
        await pool.end();
    }
}

seedVastCrawlQueue();
