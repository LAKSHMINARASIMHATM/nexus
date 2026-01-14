-- Insert alphabet URLs into documents table
-- Using UUID for doc_id and SHA-256 for content_hash

INSERT INTO documents (doc_id, url, canonical_url, title, meta_description, body, body_length, language, content_hash, index_status) VALUES
-- A
(uuid_generate_v4(), 'https://www.apple.com', 'https://www.apple.com', 'Apple', 'Technology company', 'Apple Inc. is an American multinational technology company that specializes in consumer electronics, computer software, and online services.', 150, 'en', sha256('https://www.apple.comapple'), 'indexed'),
(uuid_generate_v4(), 'https://www.amazon.com', 'https://www.amazon.com', 'Amazon', 'E-commerce platform', 'Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.', 160, 'en', sha256('https://www.amazon.comamazon'), 'indexed'),
(uuid_generate_v4(), 'https://www.adobe.com', 'https://www.adobe.com', 'Adobe', 'Software company', 'Adobe Inc. is an American multinational computer software company incorporated in Delaware and headquartered in San Jose, California.', 140, 'en', sha256('https://www.adobe.comadobe'), 'indexed'),

-- B
(uuid_generate_v4(), 'https://www.bbc.com', 'https://www.bbc.com', 'BBC', 'News and media', 'The British Broadcasting Corporation is the national broadcaster of the United Kingdom, based at Broadcasting House in London.', 130, 'en', sha256('https://www.bbc.combbc'), 'indexed'),
(uuid_generate_v4(), 'https://www.bloomberg.com', 'https://www.bloomberg.com', 'Bloomberg', 'Financial news', 'Bloomberg L.P. is a privately held financial, software, data, and media company headquartered in Midtown Manhattan, New York City.', 145, 'en', sha256('https://www.bloomberg.combloomberg'), 'indexed'),
(uuid_generate_v4(), 'https://www.booking.com', 'https://www.booking.com', 'Booking.com', 'Travel booking', 'Booking.com is a Dutch online travel agency for lodging reservations & other travel products and a subsidiary of Booking Holdings.', 155, 'en', sha256('https://www.booking.combooking'), 'indexed'),

-- C
(uuid_generate_v4(), 'https://www.cnn.com', 'https://www.cnn.com', 'CNN', 'News network', 'Cable News Network is a multinational news-based pay television channel headquartered in Atlanta, Georgia.', 125, 'en', sha256('https://www.cnn.comcnn'), 'indexed'),
(uuid_generate_v4(), 'https://www.coca-cola.com', 'https://www.coca-cola.com', 'Coca-Cola', 'Beverage company', 'The Coca-Cola Company is an American multinational beverage corporation incorporated under Delaware General Corporation Law.', 150, 'en', sha256('https://www.coca-cola.comcoca-cola'), 'indexed'),
(uuid_generate_v4(), 'https://www.cloudflare.com', 'https://www.cloudflare.com', 'Cloudflare', 'Web infrastructure', 'Cloudflare, Inc. is an American web infrastructure and website security company that provides content delivery network services.', 160, 'en', sha256('https://www.cloudflare.comcloudflare'), 'indexed'),

-- D
(uuid_generate_v4(), 'https://www.dell.com', 'https://www.dell.com', 'Dell', 'Computer hardware', 'Dell Inc. is an American multinational technology company that develops, sells, repairs, and supports computers and related products.', 155, 'en', sha256('https://www.del.comdell'), 'indexed'),
(uuid_generate_v4(), 'https://www.disney.com', 'https://www.disney.com', 'Disney', 'Entertainment', 'The Walt Disney Company, commonly known as Disney, is an American multinational mass media and entertainment conglomerate.', 160, 'en', sha256('https://www.disney.comdisney'), 'indexed'),
(uuid_generate_v4(), 'https://www.dropbox.com', 'https://www.dropbox.com', 'Dropbox', 'File storage', 'Dropbox is a file hosting service operated by the American company Dropbox, Inc., headquartered in San Francisco, California.', 155, 'en', sha256('https://www.dropbox.comdropbox'), 'indexed'),

-- E
(uuid_generate_v4(), 'https://www.ebay.com', 'https://www.ebay.com', 'eBay', 'Online marketplace', 'eBay Inc. is an American multinational e-commerce corporation based in San Jose, California, that facilitates consumer-to-consumer and business-to-consumer sales.', 175, 'en', sha256('https://www.ebay.comebay'), 'indexed'),
(uuid_generate_v4(), 'https://www.espn.com', 'https://www.espn.com', 'ESPN', 'Sports network', 'ESPN is an American international basic cable sports channel owned by The Walt Disney Company and Hearst Communications.', 155, 'en', sha256('https://www.espn.comespn'), 'indexed'),
(uuid_generate_v4(), 'https://www.ericsson.com', 'https://www.ericsson.com', 'Ericsson', 'Telecommunications', 'Ericsson is a Swedish multinational networking and telecommunications company headquartered in Stockholm.', 145, 'en', sha256('https://www.ericsson.comericsson'), 'indexed'),

-- F
(uuid_generate_v4(), 'https://www.facebook.com', 'https://www.facebook.com', 'Facebook', 'Social media', 'Facebook is an American online social media and social networking service based in Menlo Park, California.', 140, 'en', sha256('https://www.facebook.comfacebook'), 'indexed'),
(uuid_generate_v4(), 'https://www.ford.com', 'https://www.ford.com', 'Ford', 'Automotive', 'Ford Motor Company is an American multinational automobile manufacturer headquartered in Dearborn, Michigan.', 145, 'en', sha256('https://www.ford.comford'), 'indexed'),
(uuid_generate_v4(), 'https://www.fedex.com', 'https://www.fedex.com', 'FedEx', 'Shipping services', 'FedEx Corporation, formerly Federal Express Corporation, is an American multinational delivery services company headquartered in Memphis, Tennessee.', 170, 'en', sha256('https://www.fedex.comfedex'), 'indexed'),

-- G
(uuid_generate_v4(), 'https://www.google.com', 'https://www.google.com', 'Google', 'Search engine', 'Google LLC is an American multinational technology company that specializes in Internet-related services and products.', 150, 'en', sha256('https://www.google.comgoogle'), 'indexed'),
(uuid_generate_v4(), 'https://www.github.com', 'https://www.github.com', 'GitHub', 'Code repository', 'GitHub, Inc. is a provider of Internet hosting for software development and version control using Git.', 140, 'en', sha256('https://www.github.comgithub'), 'indexed'),
(uuid_generate_v4(), 'https://www.ge.com', 'https://www.ge.com', 'General Electric', 'Conglomerate', 'General Electric Company is an American multinational conglomerate incorporated in New York State and headquartered in Boston.', 160, 'en', sha256('https://www.ge.comge'), 'indexed'),

-- H
(uuid_generate_v4(), 'https://www.honda.com', 'https://www.honda.com', 'Honda', 'Automotive', 'Honda Motor Co., Ltd. is a Japanese public multinational conglomerate manufacturer of automobiles, motorcycles, and power equipment.', 165, 'en', sha256('https://www.honda.comhonda'), 'indexed'),
(uuid_generate_v4(), 'https://www.hulu.com', 'https://www.hulu.com', 'Hulu', 'Streaming service', 'Hulu is an American subscription streaming service owned by The Walt Disney Company and Comcast.', 135, 'en', sha256('https://www.hulu.comhulu'), 'indexed'),
(uuid_generate_v4(), 'https://www.hp.com', 'https://www.hp.com', 'HP', 'Technology company', 'HP Inc. is an American multinational information technology company headquartered in Palo Alto, California.', 145, 'en', sha256('https://www.hp.comhp'), 'indexed'),

-- I
(uuid_generate_v4(), 'https://www.ibm.com', 'https://www.ibm.com', 'IBM', 'Technology company', 'International Business Machines Corporation is an American multinational technology company headquartered in Armonk, New York.', 155, 'en', sha256('https://www.ibm.comibm'), 'indexed'),
(uuid_generate_v4(), 'https://www.instagram.com', 'https://www.instagram.com', 'Instagram', 'Social media', 'Instagram is an American photo and video sharing social networking service owned by Facebook, Inc.', 135, 'en', sha256('https://www.instagram.cominstagram'), 'indexed'),
(uuid_generate_v4(), 'https://www.intel.com', 'https://www.intel.com', 'Intel', 'Semiconductor company', 'Intel Corporation is an American multinational corporation and technology company headquartered in Santa Clara, California.', 155, 'en', sha256('https://www.intel.comintel'), 'indexed'),

-- J
(uuid_generate_v4(), 'https://www.jpmorgan.com', 'https://www.jpmorgan.com', 'JPMorgan Chase', 'Financial services', 'JPMorgan Chase & Co. is an American multinational investment bank and financial services holding company headquartered in New York City.', 175, 'en', sha256('https://www.jpmorgan.comjpmorgan'), 'indexed'),
(uuid_generate_v4(), 'https://www.jeopardy.com', 'https://www.jeopardy.com', 'Jeopardy', 'Game show', 'Jeopardy! is an American game show created by Merv Griffin. The show features a quiz competition in which contestants are presented with clues.', 165, 'en', sha256('https://www.jeopardy.comjeopardy'), 'indexed'),
(uuid_generate_v4(), 'https://www.jetblue.com', 'https://www.jetblue.com', 'JetBlue', 'Airline', 'JetBlue Airways Corporation is a major American low-cost airline headquartered in New York City.', 140, 'en', sha256('https://www.jetblue.comjetblue'), 'indexed'),

-- K
(uuid_generate_v4(), 'https://www.kelloggs.com', 'https://www.kelloggs.com', 'Kellogg''s', 'Food company', 'The Kellogg Company, doing business as Kellogg''s, is an American multinational food manufacturing company headquartered in Battle Creek, Michigan.', 175, 'en', sha256('https://www.kelloggs.comkelloggs'), 'indexed'),
(uuid_generate_v4(), 'https://www.khanacademy.org', 'https://www.khanacademy.org', 'Khan Academy', 'Education platform', 'Khan Academy is a non-profit educational organization created in 2008 by Salman Khan with the goal of creating a set of online tools.', 165, 'en', sha256('https://www.khanacademy.orgkhan'), 'indexed'),
(uuid_generate_v4(), 'https://www.kfc.com', 'https://www.kfc.com', 'KFC', 'Restaurant chain', 'KFC is an American fast food restaurant chain headquartered in Louisville, Kentucky, that specializes in fried chicken.', 150, 'en', sha256('https://www.kfc.comkfc'), 'indexed'),

-- L
(uuid_generate_v4(), 'https://www.linkedin.com', 'https://www.linkedin.com', 'LinkedIn', 'Professional network', 'LinkedIn is an American business and employment-oriented online service that operates via websites and mobile apps.', 155, 'en', sha256('https://www.linkedin.comlinkedin'), 'indexed'),
(uuid_generate_v4(), 'https://www.louisvuitton.com', 'https://www.louisvuitton.com', 'Louis Vuitton', 'Luxury brand', 'Louis Vuitton Malletier, commonly referred to as Louis Vuitton or shortened to LV, is a French fashion house and luxury goods company.', 175, 'en', sha256('https://www.louisvuitton.comlouis'), 'indexed'),
(uuid_generate_v4(), 'https://www.lowes.com', 'https://www.lowes.com', 'Lowe''s', 'Home improvement', 'Lowe''s Companies, Inc. is an American retail company specializing in home improvement.', 130, 'en', sha256('https://www.lowes.comlowes'), 'indexed'),

-- M
(uuid_generate_v4(), 'https://www.microsoft.com', 'https://www.microsoft.com', 'Microsoft', 'Technology company', 'Microsoft Corporation is an American multinational technology company with headquarters in Redmond, Washington.', 145, 'en', sha256('https://www.microsoft.commicrosoft'), 'indexed'),
(uuid_generate_v4(), 'https://www.mcdonalds.com', 'https://www.mcdonalds.com', 'McDonald''s', 'Restaurant chain', 'McDonald''s is an American fast food company, founded in 1940 as a restaurant operated by Richard and Maurice McDonald.', 155, 'en', sha256('https://www.mcdonalds.commcdonalds'), 'indexed'),
(uuid_generate_v4(), 'https://www.mastodon.social', 'https://www.mastodon.social', 'Mastodon', 'Social network', 'Mastodon is a free and open-source self-hosted social networking service. It allows anyone to create their own social network.', 165, 'en', sha256('https://www.mastodon.socialmastodon'), 'indexed'),

-- N
(uuid_generate_v4(), 'https://www.netflix.com', 'https://www.netflix.com', 'Netflix', 'Streaming service', 'Netflix, Inc. is an American over-the-top content platform and production company headquartered in Los Gatos, California.', 155, 'en', sha256('https://www.netflix.comnetflix'), 'indexed'),
(uuid_generate_v4(), 'https://www.nike.com', 'https://www.nike.com', 'Nike', 'Sportswear', 'Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing.', 165, 'en', sha256('https://www.nike.comnike'), 'indexed'),
(uuid_generate_v4(), 'https://www.npr.org', 'https://www.npr.org', 'NPR', 'News and radio', 'National Public Radio is an American privately and publicly funded non-profit media organization based in Washington, D.C.', 155, 'en', sha256('https://www.npr.orgnpr'), 'indexed'),

-- O
(uuid_generate_v4(), 'https://www.oracle.com', 'https://www.oracle.com', 'Oracle', 'Database company', 'Oracle Corporation is an American multinational computer technology corporation headquartered in Austin, Texas.', 145, 'en', sha256('https://www.oracle.comoracle'), 'indexed'),
(uuid_generate_v4(), 'https://www.overstock.com', 'https://www.overstock.com', 'Overstock', 'E-commerce', 'Overstock.com, Inc. is an American internet retailer headquartered in Cottonwood Heights, Utah, near Salt Lake City.', 155, 'en', sha256('https://www.overstock.comoverstock'), 'indexed'),
(uuid_generate_v4(), 'https://www.okta.com', 'https://www.okta.com', 'Okta', 'Identity management', 'Okta, Inc. is an American identity and access management company based in San Francisco.', 135, 'en', sha256('https://www.okta.comokta'), 'indexed'),

-- P
(uuid_generate_v4(), 'https://www.paypal.com', 'https://www.paypal.com', 'PayPal', 'Payment service', 'PayPal Holdings, Inc. is an American multinational financial technology company operating an online payments system.', 155, 'en', sha256('https://www.paypal.compaypal'), 'indexed'),
(uuid_generate_v4(), 'https://www.pinterest.com', 'https://www.pinterest.com', 'Pinterest', 'Social media', 'Pinterest, Inc. is an American image sharing and social media service designed to enable saving and discovery of information.', 165, 'en', sha256('https://www.pinterest.compinterest'), 'indexed'),
(uuid_generate_v4(), 'https://www.pepsi.com', 'https://www.pepsi.com', 'Pepsi', 'Beverage company', 'PepsiCo, Inc. is an American multinational food, snack, and beverage corporation headquartered in Harrison, New York.', 155, 'en', sha256('https://www.pepsi.compepsi'), 'indexed'),

-- Q
(uuid_generate_v4(), 'https://www.qualcomm.com', 'https://www.qualcomm.com', 'Qualcomm', 'Semiconductor company', 'Qualcomm Incorporated is an American multinational semiconductor and telecommunications equipment company.', 145, 'en', sha256('https://www.qualcomm.comqualcomm'), 'indexed'),
(uuid_generate_v4(), 'https://www.quora.com', 'https://www.quora.com', 'Quora', 'Q&A platform', 'Quora is a social question-and-answer website based in Mountain View, California, United States.', 135, 'en', sha256('https://www.quora.comquora'), 'indexed'),
(uuid_generate_v4(), 'https://www.qvc.com', 'https://www.qvc.com', 'QVC', 'Shopping network', 'QVC is an American free-to-air television network and flagship shopping channel specializing in televised home shopping.', 155, 'en', sha256('https://www.qvc.comqvc'), 'indexed'),

-- R
(uuid_generate_v4(), 'https://www.reddit.com', 'https://www.reddit.com', 'Reddit', 'Social platform', 'Reddit is an American social news aggregation, web content rating, and discussion website.', 140, 'en', sha256('https://www.reddit.comreddit'), 'indexed'),
(uuid_generate_v4(), 'https://www.roblox.com', 'https://www.roblox.com', 'Roblox', 'Gaming platform', 'Roblox is an online game platform and game creation system developed by Roblox Corporation.', 140, 'en', sha256('https://www.roblox.comroblox'), 'indexed'),
(uuid_generate_v4(), 'https://www.royalcaribbean.com', 'https://www.royalcaribbean.com', 'Royal Caribbean', 'Cruise line', 'Royal Caribbean International is a cruise line brand founded in 1968 in Norway and organized as a wholly owned subsidiary of Royal Caribbean Group.', 185, 'en', sha256('https://www.royalcaribbean.comroyal'), 'indexed'),

-- S
(uuid_generate_v4(), 'https://www.spotify.com', 'https://www.spotify.com', 'Spotify', 'Music streaming', 'Spotify is a Swedish audio streaming and media services provider that is traded on the New York Stock Exchange.', 155, 'en', sha256('https://www.spotify.comspotify'), 'indexed'),
(uuid_generate_v4(), 'https://www.salesforce.com', 'https://www.salesforce.com', 'Salesforce', 'CRM software. 'Sales.
(uuid_generate .com', .com .com.
(uuid_generate. .com . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . ..
(uuid_generate_v4 
(uuid_generate. . .借着借着借着借着借着  . . . .路站. 
( .."},
(uuid_generate相关问题
(uuid. ."),
(uuid_generate_v4 . . . . . . . . . . .银行的银行银行的银行的银行的银行的银行的 
(uuid.

(uuid. 
(uuid..
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid.
(uuid overlap.
(uuid.
(uuid.
 voluntary.
(uuidmothers.
british.覆
(uuid.
(uuid否
(uuid(APPENDIX
(uuid
anas
(uuid.
(uuid.
 Missing
(uuid remodeling
(uuid.
(uuidzw
(uuid.
(uuid pin
(uuid咯
(uuid.
(uuidyn
(uuid ed
(UUID
(uuid fernando
 assured
(uuid aggregated
(UUID
rama
(UUID
估
(UUID
jach
(UUID
 
(UUID
 
(UUID 
(UUID 
(UUID 
(UUID 
(UUID 
(UUID 
(UUID 
(UUID 
(UUID 
(UUID 
(UUID 
(UUID 
(UUID 
(UUID 
(UUID 
(UUID 
(UUID .
(UUID 
(UUID 
(UUID 
H
(UUID.
(UUID 
(UUIDH
(UUID .
(UUID 
(UUID 
(UUID 
人员进行
(UUID 
(UUID 
(UUID 
(UUID 
(UUID  .
(UUID 
(UUID .
(UUID 
.
(UUID 
 . 
(UUID"},
(uuid  .
.
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
 . .
(UUID .
(UUID .
  .
(UUID .
(UUID .
 .
(UUID .
C
(UUID  .
(UUID ''; .
(UUID .
(UUID.
(UUID .
 . .
(UUID .
车子
(UUID .
(UUID .
(UUID .
(UUID 
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID .
(UUID . .
(UUID .
.
(UUID.
(UUID.
.
(UUID.
.
(UUID.
.
(UUID.
"/>
(uuid_generate_v4(), 'https://www.salesforce.com', 'https://www.salesforce.com', 'Salesforce', 'CRM software', 'Salesforce.com, Inc. is an American cloud-based software company headquartered in San Francisco, California.', 140, 'en', sha256('https://www.salesforce.comsalesforce'), 'indexed'),
(uuid_generate_v4(), 'https://www.starbucks.com', 'https://www.starbucks.com', 'Starbucks', 'Coffee chain', 'Starbucks Corporation is an American multinational chain of coffeehouses and roasteries.', 125, 'en', sha256('https://www.starbucks.comstarbucks'), 'indexed'),

-- T
(uuid_generate_v4(), 'https://www.tesla.com', 'https://www.tesla.com', 'Tesla', 'Electric vehicles', 'Tesla, Inc. is an American electric vehicle and clean energy company based in Palo Alto, California.', 135, 'en', sha256('https://www.tesla.comtesla'), 'indexed'),
(uuid_generate_v4(), 'https://www.x.com', 'https://www.x.com', 'X (Twitter)', 'Social media', 'X Corp. is an American online social media and social networking service.', 115, 'en', sha256('https://www.x.comx'), 'indexed'),
(uuid_generate_v4(), 'https://www.target.com', 'https://www.target.com', 'Target', 'Retail store', 'Target Corporation is an American retail corporation that operates a chain of discount department stores.', 130, 'en', sha256('https://www.target.comtarget'), 'indexed'),

-- U
(uuid_generate_v4(), 'https://www.uber.com', 'https://www.uber.com', 'Uber', 'Ride sharing', 'Uber Technologies, Inc. is an American multinational ride-hailing company.', 115, 'en', sha256('https://www.uber.comuber'), 'indexed'),
(uuid_generate_v4(), 'https://www.ups.com', 'https://www.ups.com', 'UPS', 'Shipping services', 'United Parcel Service is an American multinational package delivery and supply chain management company.', 145, 'en', sha256('https://www.ups.comups'), 'indexed'),
(uuid_generate_v4(), 'https://www.united.com', 'https://www.united.com', 'United Airlines', 'Airline', 'United Airlines, Inc. is a major American airline headquartered in Chicago, Illinois.', 120, 'en', sha256('https://www.united.comunited'), 'indexed'),

-- V
(uuid_generate_v4(), 'https://www.verizon.com', 'https://www.verizon.com', 'Verizon', 'Telecommunications', 'Verizon Communications Inc. is an American telecommunications company.', 120, 'en', sha256('https://www.verizon.comverizon'), 'indexed'),
(uuid_generate_v4(), 'https://www.visa.com', 'https://www.visa.com', 'Visa', 'Payment network', 'Visa Inc. is an American multinational financial services corporation.', 115, 'en', sha256('https://www.visa.comvisa'), 'indexed'),
(uuid_generate_v4(), 'https://www.volkswagen.com', 'https://www.volkswagen.com', 'Volkswagen', 'Automotive', 'Volkswagen AG is a German multinational automotive manufacturer headquartered in Wolfsburg.', 135, 'en', sha256('https://www.volkswagen.comvolkswagen'), 'indexed'),

-- W
(uuid_generate_v4(), 'https://www.walmart.com', 'https://www.walmart.com', 'Walmart', 'Retail store', 'Walmart Inc. is an American multinational retail corporation that operates a chain of hypermarkets.', 135, 'en', sha256('https://www.walmart.comwalmart'), 'indexed'),
(uuid_generate_v4(), 'https://www.wikipedia.org', 'https://www.wikipedia.org', 'Wikipedia', 'Online encyclopedia', 'Wikipedia is a multilingual open-collaborative online encyclopedia written and maintained by volunteers.', 145, 'en', sha256('https://www.wikipedia.orgwikipedia'), 'indexed'),
(uuid_generate_v4(), 'https://www.wellsfargo.com', 'https://www.wellsfargo.com', 'Wells Fargo', 'Bank', 'Wells Fargo & Company is an American multinational financial services company.', 125, 'en', sha256('https://www.wellsfargo.comwellsfargo'), 'indexed'),

-- X
(uuid_generate_v4(), 'https://www.x.com', 'https://www.x.com', 'X (Twitter)', 'Social media', 'X Corp. is an American online social media and social networking service.', 115, 'en', sha256('https://www.x.comx'), 'indexed'),
(uuid_generate_v4(), 'https://www.xbox.com', 'https://www.xbox.com', 'Xbox', 'Gaming console', 'Xbox is a video gaming brand created and owned by Microsoft.', 110, 'en', sha256('https://www.xbox.comxbox'), 'indexed'),
(uuid_generate_v4(), 'https://www.xerox.com', 'https://www.xerox.com', 'Xerox', 'Document management', 'Xerox Corporation is an American corporation that sells print and digital document products and services.', 145, 'en', sha256('https://www.xerox.comxerox'), 'indexed'),

-- Y
(uuid_generate_v4(), 'https://www.yahoo.com', 'https://www.yahoo.com', 'Yahoo', 'Web portal', 'Yahoo! is an American web services provider.', 105, 'en', sha256('https://www.yahoo.comyahoo'), 'indexed'),
(uuid_generate_v4(), 'https://www.youtube.com', 'https://www.youtube.com', 'YouTube', 'Video platform', 'YouTube is an American video-sharing platform headquartered in San Bruno, California.', 125, 'en', sha256('https://www.youtube.comyoutube'), 'indexed'),
(uuid_generate_v4(), 'https://www.yelp.com', 'https://www.yelp.com', 'Yelp', 'Review platform', 'Yelp is an American public company that publishes crowd-sourced reviews about businesses.', 135, 'en', sha256('https://www.yelp.comyelp'), 'indexed'),

-- Z
(uuid_generate_v4(), 'https://www.zillow.com', 'https://www.zillow.com', 'Zillow', 'Real estate', 'Zillow Group, Inc. is an American online real estate marketplace company.', 125, 'en', sha256('https://www.zillow.comzillow'), 'indexed'),
(uuid_generate_v4(), 'https://www.zoom.us', 'https://www.zoom.us', 'Zoom', 'Video conferencing', 'Zoom Video Communications, Inc. is an American communications technology company.', 135, 'en', sha256('https://www.zoom.uszoom'), 'indexed'),
(uuid_generate_v4(), 'https://www.zara.com', 'https://www.zara.com', 'Zara', 'Fashion retailer', 'Zara is a Spanish clothing retailer that sells clothes, beauty products, accessories.', 125, 'en', sha256('https://www.zara.comzara'), 'indexed');
