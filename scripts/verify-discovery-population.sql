-- Test script to verify discovery page documents were populated correctly
-- Run this after the population scripts to verify data integrity

-- Check total document count
SELECT 'Total Documents' as metric, COUNT(*) as count FROM documents;

-- Check categories
SELECT 'Categories' as metric, COUNT(*) as count FROM categories;

-- Check document metadata
SELECT 'Document Metadata' as metric, COUNT(*) as count FROM document_metadata;

-- Check document categories relationships
SELECT 'Document Categories' as metric, COUNT(*) as count FROM document_categories;

-- Sample documents with metadata
SELECT 
    d.title,
    dm.author,
    dm.institution,
    dm.word_count,
    dm.read_time,
    dm.rating,
    c.name as category_name
FROM documents d
LEFT JOIN document_metadata dm ON d.doc_id = dm.doc_id
LEFT JOIN document_categories dc ON d.doc_id = dc.doc_id
LEFT JOIN categories c ON dc.category_id = c.category_id
ORDER BY d.crawl_timestamp DESC
LIMIT 5;

-- Category document counts
SELECT 
    c.name,
    c.color,
    c.document_count,
    COUNT(dc.doc_id) as actual_count
FROM categories c
LEFT JOIN document_categories dc ON c.category_id = dc.category_id
GROUP BY c.category_id, c.name, c.color, c.document_count
ORDER BY c.name;

-- Featured documents
SELECT 
    d.title,
    dm.author,
    dm.featured_reason,
    dm.rating,
    dm.views
FROM documents d
JOIN document_metadata dm ON d.doc_id = dm.doc_id
WHERE dm.featured_reason IS NOT NULL
ORDER BY dm.rating DESC;

-- Recent documents (last 48 hours)
SELECT 
    d.title,
    dm.author,
    dm.publish_date,
    dm.read_time,
    d.crawl_timestamp
FROM documents d
JOIN document_metadata dm ON d.doc_id = dm.doc_id
WHERE d.crawl_timestamp >= NOW() - INTERVAL '48 hours'
ORDER BY d.crawl_timestamp DESC;

-- Documents by category
SELECT 
    c.name as category,
    COUNT(d.doc_id) as document_count,
    AVG(dm.rating) as avg_rating,
    SUM(dm.views) as total_views
FROM categories c
JOIN document_categories dc ON c.category_id = dc.category_id
JOIN documents d ON dc.doc_id = d.doc_id
JOIN document_metadata dm ON d.doc_id = dm.doc_id
GROUP BY c.category_id, c.name
ORDER BY document_count DESC;

-- Search for specific discovery page terms
SELECT 
    d.title,
    d.url,
    dm.author,
    dm.abstract,
    c.name as category
FROM documents d
JOIN document_metadata dm ON d.doc_id = dm.doc_id
JOIN document_categories dc ON d.doc_id = dc.doc_id
JOIN categories c ON dc.category_id = c.category_id
WHERE d.title ILIKE '%Neural%' 
   OR d.title ILIKE '%Quantum%'
   OR d.title ILIKE '%Sustainable%'
   OR d.title ILIKE '%AI%'
ORDER BY d.pagerank DESC
LIMIT 10;
