const pool = require('../lib/db.js');

const alphabetUrls = [
  // A
  { url: 'https://www.apple.com', title: 'Apple', description: 'Technology company' },
  { url: 'https://www.amazon.com', title: 'Amazon', description: 'E-commerce platform' },
  { url: 'https://www.adobe.com', title: 'Adobe', description: 'Software company' },
  
  // B
  { url: 'https://www.bbc.com', title: 'BBC', description: 'News and media' },
  { url: 'https://www.bloomberg.com', title: 'Bloomberg', description: 'Financial news' },
  { url: 'https://www.booking.com', title: 'Booking.com', description: 'Travel booking' },
  
  // C
  { url: 'https://www.cnn.com', title: 'CNN', description: 'News network' },
  { url: 'https://www.coca-cola.com', title: 'Coca-Cola', description: 'Beverage company' },
  { url: 'https://www.cloudflare.com', title: 'Cloudflare', description: 'Web infrastructure' },
  
  // D
  { url: 'https://www.dell.com', title: 'Dell', description: 'Computer hardware' },
  { url: 'https://www.disney.com', title: 'Disney', description: 'Entertainment' },
  { url: 'https://www.dropbox.com', title: 'Dropbox', description: 'File storage' },
  
  // E
  { url: 'https://www.ebay.com', title: 'eBay', description: 'Online marketplace' },
  { url: 'https://www.espn.com', title: 'ESPN', description: 'Sports network' },
  { url: 'https://www.ericsson.com', title: 'Ericsson', description: 'Telecommunications' },
  
  // F
  { url: 'https://www.facebook.com', title: 'Facebook', description: 'Social media' },
  { url: 'https://www.ford.com', title: 'Ford', description: 'Automotive' },
  { url: 'https://www.fedex.com', title: 'FedEx', description: 'Shipping services' },
  
  // G
  { url: 'https://www.google.com', title: 'Google', description: 'Search engine' },
  { url: 'https://www.github.com', title: 'GitHub', description: 'Code repository' },
  { url: 'https://www.ge.com', title: 'General Electric', description: 'Conglomerate' },
  
  // H
  { url: 'https://www.honda.com', title: 'Honda', description: 'Automotive' },
  { url: 'https://www.hulu.com', title: 'Hulu', description: 'Streaming service' },
  { url: 'https://www.hp.com', title: 'HP', description: 'Technology company' },
  
  // I
  { url: 'https://www.ibm.com', title: 'IBM', description: 'Technology company' },
  { url: 'https://www.instagram.com', title: 'Instagram', description: 'Social media' },
  { url: 'https://www.intel.com', title: 'Intel', description: 'Semiconductor company' },
  
  // J
  { url: 'https://www.jpmorgan.com', title: 'JPMorgan Chase', description: 'Financial services' },
  { url: 'https://www.jeopardy.com', title: 'Jeopardy', description: 'Game show' },
  { url: 'https://www.jetblue.com', title: 'JetBlue', description: 'Airline' },
  
  // K
  { url: 'https://www.kelloggs.com', title: "Kellogg's", description: 'Food company' },
  { url: 'https://www.khanacademy.org', title: 'Khan Academy', description: 'Education platform' },
  { url: 'https://www.kfc.com', title: 'KFC', description: 'Restaurant chain' },
  
  // L
  { url: 'https://www.linkedin.com', title: 'LinkedIn', description: 'Professional network' },
  { url: 'https://www.louisvuitton.com', title: 'Louis Vuitton', description: 'Luxury brand' },
  { url: 'https://www.lowes.com', title: "Lowe's", description: 'Home improvement' },
  
  // M
  { url: 'https://www.microsoft.com', title: 'Microsoft', description: 'Technology company' },
  { url: 'https://www.mcdonalds.com', title: "McDonald's", description: 'Restaurant chain' },
  { url: 'https://www.mastodon.social', title: 'Mastodon', description: 'Social network' },
  
  // N
  { url: 'https://www.netflix.com', title: 'Netflix', description: 'Streaming service' },
  { url: 'https://www.nike.com', title: 'Nike', description: 'Sportswear' },
  { url: 'https://www.npr.org', title: 'NPR', description: 'News and radio' },
  
  // O
  { url: 'https://www.oracle.com', title: 'Oracle', description: 'Database company' },
  { url: 'https://www.overstock.com', title: 'Overstock', description: 'E-commerce' },
  { url: 'https://www.okta.com', title: 'Okta', description: 'Identity management' },
  
  // P
  { url: 'https://www.paypal.com', title: 'PayPal', description: 'Payment service' },
  { url: 'https://www.pinterest.com', title: 'Pinterest', description: 'Social media' },
  { url: 'https://www.pepsi.com', title: 'Pepsi', description: 'Beverage company' },
  
  // Q
  { url: 'https://www.qualcomm.com', title: 'Qualcomm', description: 'Semiconductor company' },
  { url: 'https://www.quora.com', title: 'Quora', description: 'Q&A platform' },
  { url: 'https://www.qvc.com', title: 'QVC', description: 'Shopping network' },
  
  // R
  { url: 'https://www.reddit.com', title: 'Reddit', description: 'Social platform' },
  { url: 'https://www.roblox.com', title: 'Roblox', description: 'Gaming platform' },
  { url: 'https://www.royalcaribbean.com', title: 'Royal Caribbean', description: 'Cruise line' },
  
  // S
  { url: 'https://www.spotify.com', title: 'Spotify', description: 'Music streaming' },
  { url: 'https://www.salesforce.com', title: 'Salesforce', description: 'CRM software' },
  { url: 'https://www.starbucks.com', title: 'Starbucks', description: 'Coffee chain' },
  
  // T
  { url: 'https://www.tesla.com', title: 'Tesla', description: 'Electric vehicles' },
  { url: 'https://www.x.com', title: 'X (Twitter)', description: 'Social media' },
  { url: 'https://www.target.com', title: 'Target', description: 'Retail store' },
  
  // U
  { url: 'https://www.uber.com', title: 'Uber', description: 'Ride sharing' },
  { url: 'https://www.ups.com', title: 'UPS', description: 'Shipping services' },
  { url: 'https://www.united.com', title: 'United Airlines', description: 'Airline' },
  
  // V
  { url: 'https://www.verizon.com', title: 'Verizon', description: 'Telecommunications' },
  { url: 'https://www.visa.com', title: 'Visa', description: 'Payment network' },
  { url: 'https://www.volkswagen.com', title: 'Volkswagen', description: 'Automotive' },
  
  // W
  { url: 'https://www.walmart.com', title: 'Walmart', description: 'Retail store' },
  { url: 'https://www.wikipedia.org', title: 'Wikipedia', description: 'Online encyclopedia' },
  { url: 'https://www.wellsfargo.com', title: 'Wells Fargo', description: 'Bank' },
  
  // X
  { url: 'https://www.x.com', title: 'X (Twitter)', description: 'Social media' },
  { url: 'https://www.xbox.com', title: 'Xbox', description: 'Gaming console' },
  { url: 'https://www.xerox.com', title: 'Xerox', description: 'Document management' },
  
  // Y
  { url: 'https://www.yahoo.com', title: 'Yahoo', description: 'Web portal' },
  { url: 'https://www.youtube.com', title: 'YouTube', description: 'Video platform' },
  { url: 'https://www.yelp.com', title: 'Yelp', description: 'Review platform' },
  
  // Z
  { url: 'https://www.zillow.com', title: 'Zillow', description: 'Real estate' },
  { url: 'https://www.zoom.us', title: 'Zoom', description: 'Video conferencing' },
  { url: 'https://www.zara.com', title: 'Zara', description: 'Fashion retailer' }
];

const crypto = require('crypto');

async function insertAlphabetUrls() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    for (const site of alphabetUrls) {
      const docId = crypto.randomUUID();
      const contentHash = crypto.createHash('sha256').update(site.url + site.title).digest('hex');
      const body = `${site.title} is ${site.description}. Visit ${site.url} for more information.`;
      
      const query = `
        INSERT INTO documents (doc_id, url, canonical_url, title, meta_description, body, body_length, language, content_hash, index_status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (url) DO NOTHING
      `;
      
      const values = [
        docId,
        site.url,
        site.url,
        site.title,
        site.description,
        body,
        body.length,
        'en',
        contentHash,
        'indexed'
      ];
      
      await client.query(query, values);
      console.log(`Inserted: ${site.title} - ${site.url}`);
    }
    
    await client.query('COMMIT');
    console.log('All alphabet URLs inserted successfully!');
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error inserting URLs:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

insertAlphabetUrls();
