-- Add Categories Table and Document Categories
-- This script creates category management for discovery page documents

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    color VARCHAR(20) DEFAULT 'blue',
    document_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create document_categories junction table
CREATE TABLE IF NOT EXISTS document_categories (
    doc_id UUID REFERENCES documents(doc_id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(category_id) ON DELETE CASCADE,
    PRIMARY KEY (doc_id, category_id)
);

-- Insert categories from discovery page
INSERT INTO categories (name, description, color) VALUES
('Neural Architecture', 'Advanced neural network architectures, deep learning models, and AI research papers', 'blue'),
('Deep Space Bio', 'Astrobiology, space exploration research, and extraterrestrial biology findings', 'purple'),
('Web3 Ecosystems', 'Blockchain technology, decentralized finance, and cryptocurrency ecosystems', 'emerald'),
('Sustainable Cities', 'Urban planning, green infrastructure, and sustainable development initiatives', 'orange'),
('Quantum Computing', 'Quantum mechanics, quantum algorithms, and quantum computing applications', 'cyan'),
('Ethical AI', 'AI ethics, responsible AI development, and machine learning governance', 'pink'),
('Technology', 'General technology topics, software development, and digital innovation', 'blue'),
('Environment', 'Environmental science, climate change, and sustainability research', 'green'),
('Philosophy', 'Philosophical concepts, ethics, and theoretical frameworks', 'purple'),
('Finance', 'Financial systems, economics, and monetary policy', 'amber'),
('Research Paper', 'Academic research papers and scholarly articles', 'indigo'),
('Scientific Report', 'Scientific research reports and findings', 'teal'),
('Technical Guide', 'Technical documentation and implementation guides', 'gray'),
('Case Study', 'Case studies and practical implementation examples', 'brown'),
('Tutorial', 'Educational tutorials and learning materials', 'orange');

-- Associate documents with categories
-- Neural Architecture documents
WITH neural_arch_docs AS (
    SELECT doc_id FROM documents 
    WHERE title LIKE '%Neural%' OR title LIKE '%Transformer%' OR title LIKE '%Architecture%'
)
INSERT INTO document_categories (doc_id, category_id)
SELECT doc_id, (SELECT category_id FROM categories WHERE name = 'Neural Architecture')
FROM neural_arch_docs;

-- Deep Space Bio documents
WITH space_docs AS (
    SELECT doc_id FROM documents 
    WHERE title LIKE '%Mars%' OR title LIKE '%Space%' OR title LIKE '%Astrobiology%'
)
INSERT INTO document_categories (doc_id, category_id)
SELECT doc_id, (SELECT category_id FROM categories WHERE name = 'Deep Space Bio')
FROM space_docs;

-- Web3 Ecosystems documents
WITH web3_docs AS (
    SELECT doc_id FROM documents 
    WHERE title LIKE '%DeFi%' OR title LIKE '%Web3%' OR title LIKE '%Blockchain%'
)
INSERT INTO document_categories (doc_id, category_id)
SELECT doc_id, (SELECT category_id FROM categories WHERE name = 'Web3 Ecosystems')
FROM web3_docs;

-- Sustainable Cities documents
WITH city_docs AS (
    SELECT doc_id FROM documents 
    WHERE title LIKE '%Sustainable Urban%' OR title LIKE '%Smart City%'
)
INSERT INTO document_categories (doc_id, category_id)
SELECT doc_id, (SELECT category_id FROM categories WHERE name = 'Sustainable Cities')
FROM city_docs;

-- Quantum Computing documents
WITH quantum_docs AS (
    SELECT doc_id FROM documents 
    WHERE title LIKE '%Quantum%' AND title NOT LIKE '%Quantum Supremacy%'
)
INSERT INTO document_categories (doc_id, category_id)
SELECT doc_id, (SELECT category_id FROM categories WHERE name = 'Quantum Computing')
FROM quantum_docs;

-- Ethical AI documents
WITH ai_docs AS (
    SELECT doc_id FROM documents 
    WHERE title LIKE '%AI Ethics%' OR title LIKE '%AI Bias%'
)
INSERT INTO document_categories (doc_id, category_id)
SELECT doc_id, (SELECT category_id FROM categories WHERE name = 'Ethical AI')
FROM ai_docs;

-- Update document counts for categories
UPDATE categories SET document_count = (
    SELECT COUNT(*) FROM document_categories dc 
    WHERE dc.category_id = categories.category_id
);

-- Add additional metadata to documents (author, institution, etc.)
-- You might want to create a document_metadata table for this
CREATE TABLE IF NOT EXISTS document_metadata (
    doc_id UUID PRIMARY KEY REFERENCES documents(doc_id) ON DELETE CASCADE,
    author VARCHAR(255),
    institution VARCHAR(255),
    word_count INTEGER,
    read_time VARCHAR(20),
    publish_date DATE,
    category VARCHAR(100),
    rating DECIMAL(3,2),
    views INTEGER DEFAULT 0,
    abstract TEXT,
    keywords TEXT[],
    featured_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert metadata for all documents
INSERT INTO document_metadata (doc_id, author, institution, word_count, read_time, publish_date, category, rating, abstract) VALUES
-- Neural Architecture documents
((SELECT doc_id FROM documents WHERE title LIKE '%Transformer Architecture Evolution%'), 
 'Dr. Elena Rodriguez', 'MIT AI Lab', 15420, '45 min', '2024-01-12', 'Research Paper', 4.8,
 'A comprehensive survey of transformer architecture evolution, covering attention mechanisms, encoder-decoder designs, and recent innovations in neural network architectures.'),

((SELECT doc_id FROM documents WHERE title LIKE '%Mars Colonization%'), 
 'Prof. James Chen', 'NASA Research Center', 8750, '28 min', '2024-01-10', 'Scientific Report', 4.7,
 'Comprehensive analysis of biological challenges for Mars colonization including radiation exposure, low gravity effects, and psychological factors for long-duration space missions.'),

((SELECT doc_id FROM documents WHERE title LIKE '%DeFi Protocol Security%'), 
 'Alex Thompson', 'Blockchain Security Institute', 12300, '38 min', '2024-01-11', 'Technical Guide', 4.6,
 'Detailed analysis of security vulnerabilities in decentralized finance protocols, including smart contract exploits, oracle attacks, and mitigation strategies for building secure DeFi applications.'),

-- Continue with other documents...
((SELECT doc_id FROM documents WHERE title LIKE '%Smart City Integration%'), 
 'Maria Garcia', 'Urban Planning Institute', 9800, '32 min', '2024-01-09', 'Technical Guide', 4.5,
 'Comprehensive guide to implementing IoT systems in smart cities, covering sensor networks, data analytics platforms, and integration frameworks for urban infrastructure management.'),

((SELECT doc_id FROM documents WHERE title LIKE '%Quantum Supremacy%'), 
 'Dr. Robert Kim', 'Quantum Computing Institute', 11200, '35 min', '2024-01-08', 'Research Paper', 4.9,
 'Analysis of quantum computing supremacy achievements, practical applications in cryptography, optimization, and scientific computing, along with current limitations and future research directions.'),

((SELECT doc_id FROM documents WHERE title LIKE '%AI Bias Detection%'), 
 'Dr. Sarah Williams', 'Stanford AI Lab', 7600, '24 min', '2024-01-07', 'Research Paper', 4.7,
 'Comprehensive framework for detecting and mitigating bias in AI systems, including algorithmic fairness metrics, bias detection methodologies, and practical mitigation strategies.'),

-- Featured documents
((SELECT doc_id FROM documents WHERE title LIKE '%The Future of Neural Networks%'), 
 'Dr. Sarah Chen', 'Stanford AI Lab', 12500, '15 min', '2024-01-08', 'Research Paper', 4.9,
 'An in-depth analysis of emerging trends and breakthrough technologies in neural network architecture, including transformers, graph neural networks, and neuromorphic computing.'),

((SELECT doc_id FROM documents WHERE title LIKE '%Sustainable Computing Practices%'), 
 'Tech Sustainability Lab', 'Green Computing Initiative', 9800, '12 min', '2024-01-07', 'Technical Guide', 4.8,
 'Comprehensive guide to implementing eco-friendly solutions in modern computing infrastructure, including green data centers, energy-efficient algorithms, and carbon footprint reduction.'),

-- Add keywords for documents
UPDATE document_metadata SET keywords = ARRAY['neural networks', 'transformers', 'attention mechanisms', 'deep learning']
WHERE doc_id = (SELECT doc_id FROM documents WHERE title LIKE '%Transformer Architecture Evolution%');

UPDATE document_metadata SET keywords = ARRAY['mars colonization', 'space biology', 'radiation', 'low gravity', 'astrobiology']
WHERE doc_id = (SELECT doc_id FROM documents WHERE title LIKE '%Mars Colonization%');

UPDATE document_metadata SET keywords = ARRAY['defi', 'blockchain', 'smart contracts', 'security', 'cryptocurrency']
WHERE doc_id = (SELECT doc_id FROM documents WHERE title LIKE '%DeFi Protocol Security%');

UPDATE document_metadata SET keywords = ARRAY['smart cities', 'iot', 'urban planning', 'sensors', 'data analytics']
WHERE doc_id = (SELECT doc_id FROM documents WHERE title LIKE '%Smart City Integration%');

UPDATE document_metadata SET keywords = ARRAY['quantum computing', 'quantum supremacy', 'cryptography', 'optimization', 'algorithms']
WHERE doc_id = (SELECT doc_id FROM documents WHERE title LIKE '%Quantum Supremacy%');

UPDATE document_metadata SET keywords = ARRAY['ai ethics', 'bias detection', 'fairness', 'machine learning', 'responsible ai']
WHERE doc_id = (SELECT doc_id FROM documents WHERE title LIKE '%AI Bias Detection%');

-- Set featured reasons for featured documents
UPDATE document_metadata SET featured_reason = 'Groundbreaking research on next-generation neural architectures'
WHERE doc_id = (SELECT doc_id FROM documents WHERE title LIKE '%The Future of Neural Networks%');

UPDATE document_metadata SET featured_reason = 'Essential reading for environmentally conscious developers'
WHERE doc_id = (SELECT doc_id FROM documents WHERE title LIKE '%Sustainable Computing Practices%');
