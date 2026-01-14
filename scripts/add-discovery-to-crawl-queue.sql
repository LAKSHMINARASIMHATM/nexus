-- Insert Discovery Page Documents into Crawl Queue
-- This script adds all discovery page URLs to the crawl queue for processing by the crawler

-- Clear existing discovery documents from crawl queue (optional)
DELETE FROM crawl_queue WHERE url LIKE '%arxiv.org%' 
   OR url LIKE '%nature.com%' 
   OR url LIKE '%ieee.org%'
   OR url LIKE '%sciencedirect.com%'
   OR url LIKE '%nasa.gov%'
   OR url LIKE '%dl.acm.org%'
   OR url LIKE '%neurallink.com%';

-- Insert Neural Architecture Category Documents
INSERT INTO crawl_queue (url, priority, depth, status, metadata) VALUES
('https://arxiv.org/abs/2301.07041', 10, 0, 'pending', '{"category": "Neural Architecture", "type": "Research Paper", "author": "Dr. Elena Rodriguez", "institution": "MIT AI Lab"}'),
('https://www.nature.com/articles/s41586-023-06748-0', 10, 0, 'pending', '{"category": "Deep Space Bio", "type": "Scientific Report", "author": "Prof. James Chen", "institution": "NASA Research Center"}'),
('https://ieeexplore.ieee.org/document/10123456', 10, 0, 'pending', '{"category": "Web3 Ecosystems", "type": "Technical Guide", "author": "Alex Thompson", "institution": "Blockchain Security Institute"}'),
('https://www.sciencedirect.com/science/article/pii/S0160795X23004567', 10, 0, 'pending', '{"category": "Sustainable Cities", "type": "Technical Guide", "author": "Maria Garcia", "institution": "Urban Planning Institute"}'),
('https://www.nature.com/articles/s41534-023-00001-2', 10, 0, 'pending', '{"category": "Quantum Computing", "type": "Research Paper", "author": "Dr. Robert Kim", "institution": "Quantum Computing Institute"}'),
('https://dl.acm.org/doi/10.1145/3571234', 10, 0, 'pending', '{"category": "Ethical AI", "type": "Research Paper", "author": "Dr. Sarah Williams", "institution": "Stanford AI Lab"}');

-- Insert Trending Neural Link Protocol Documents
INSERT INTO crawl_queue (url, priority, depth, status, metadata) VALUES
('https://neuralink.com/tech/protocol-v1-integration', 15, 0, 'pending', '{"category": "Trending", "type": "Integration Guide", "version": "V1.0", "author": "Neural Link Team"}'),
('https://neuralink.com/tech/protocol-v2-integration', 15, 0, 'pending', '{"category": "Trending", "type": "Integration Guide", "version": "V2.0", "author": "Neural Link Team"}'),
('https://neuralink.com/tech/protocol-v3-integration', 15, 0, 'pending', '{"category": "Trending", "type": "Integration Guide", "version": "V3.0", "author": "Neural Link Team"}'),
('https://neuralink.com/tech/protocol-v4-integration', 15, 0, 'pending', '{"category": "Trending", "type": "Integration Guide", "version": "V4.0", "author": "Neural Link Team"}'),
('https://neuralink.com/tech/protocol-v5-integration', 15, 0, 'pending', '{"category": "Trending", "type": "Integration Guide", "version": "V5.0", "author": "Neural Link Team"}');

-- Insert Popular Documents
INSERT INTO crawl_queue (url, priority, depth, status, metadata) VALUES
('https://arxiv.org/abs/2201.04123', 12, 0, 'pending', '{"category": "Popular", "type": "Tutorial", "title": "Quantum Computing Basics", "views": "45.2k", "rating": 4.8}'),
('https://www.sciencedirect.com/science/article/pii/S0264833723004567', 12, 0, 'pending', '{"category": "Popular", "type": "Guide", "title": "Sustainable Urban Planning", "views": "38.7k", "rating": 4.7}'),
('https://www.aaai.org/library/ethics/ai-ethics-framework', 12, 0, 'pending', '{"category": "Popular", "type": "Framework", "title": "AI Ethics Framework", "views": "32.1k", "rating": 4.9}'),
('https://www.blockchainresearch.org/web3-infrastructure', 12, 0, 'pending', '{"category": "Popular", "type": "Infrastructure", "title": "Web3 Infrastructure", "views": "28.9k", "rating": 4.6}');

-- Insert Recent Documents
INSERT INTO crawl_queue (url, priority, depth, status, metadata) VALUES
('https://arxiv.org/abs/2401.02345', 13, 0, 'pending', '{"category": "Recent", "type": "Research Paper", "title": "Neural Architecture Optimization", "author": "Dr. Jennifer Liu", "institution": "MIT AI Lab"}'),
('https://www.nasa.gov/astrobiology/deep-space-findings', 13, 0, 'pending', '{"category": "Recent", "type": "Scientific Report", "title": "Deep Space Biology Findings", "author": "Prof. Carlos Martinez", "institution": "NASA Research Center"}'),
('https://www.ieee.org/security/web3-protocols', 13, 0, 'pending', '{"category": "Recent", "type": "Technical Guide", "title": "Web3 Security Protocols", "author": "Alexandra Chen", "institution": "Blockchain Security Institute"}'),
('https://www.epa.gov/sustainable-energy', 13, 0, 'pending', '{"category": "Recent", "type": "Case Study", "title": "Sustainable Energy Solutions", "author": "Dr. Robert Green", "institution": "Environmental Research Group"}'),
('https://www.quantumcomputing.institute/applications', 13, 0, 'pending', '{"category": "Recent", "type": "Tutorial", "title": "Quantum Computing Applications", "author": "Dr. Maria Rodriguez", "institution": "Quantum Computing Institute"}');

-- Insert Featured Documents
INSERT INTO crawl_queue (url, priority, depth, status, metadata) VALUES
('https://www.nature.com/articles/s41586-023-04567-8', 20, 0, 'pending', '{"category": "Featured", "type": "Research Paper", "title": "The Future of Neural Networks", "author": "Dr. Sarah Chen", "institution": "Stanford AI Lab", "featured_reason": "Groundbreaking research on next-generation neural architectures", "rating": 4.9}'),
('https://www.sustainablecomputing.org/guide', 20, 0, 'pending', '{"category": "Featured", "type": "Technical Guide", "title": "Sustainable Computing Practices", "author": "Tech Sustainability Lab", "institution": "Green Computing Initiative", "featured_reason": "Essential reading for environmentally conscious developers", "rating": 4.8}');

-- Set scheduled_at to immediate for all discovery documents
UPDATE crawl_queue SET scheduled_at = NOW() WHERE metadata::text LIKE '%discovery%' OR metadata::text LIKE '%Neural%' OR metadata::text LIKE '%Quantum%' OR metadata::text LIKE '%AI%' OR metadata::text LIKE '%Sustainable%';

-- Log the insertion
SELECT 'Discovery documents added to crawl queue' as status, COUNT(*) as count FROM crawl_queue 
WHERE metadata::text LIKE '%Neural%' OR metadata::text LIKE '%Quantum%' OR metadata::text LIKE '%AI%' OR metadata::text LIKE '%Sustainable%' OR metadata::text LIKE '%Web3%' OR metadata::text LIKE '%Deep Space%';
