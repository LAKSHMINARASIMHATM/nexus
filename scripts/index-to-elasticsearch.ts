import pool from '../lib/db';
import { elasticsearchService } from '../lib/services/elasticsearch-service';

async function indexAllDocuments() {
  console.log('Starting to index all documents from PostgreSQL to Elasticsearch...');

  try {
    // First, ensure Elasticsearch index exists
    await elasticsearchService.createIndex();
    
    // Get all documents from PostgreSQL
    const query = `
      SELECT doc_id, url, canonical_url, title, meta_description, body, 
             body_length, language, content_hash, pagerank, crawl_timestamp,
             inbound_links, outbound_links
      FROM documents 
      WHERE index_status = 'indexed'
      ORDER BY crawl_timestamp DESC
    `;
    
    const result = await pool.query(query);
    const documents = result.rows;
    
    console.log(`Found ${documents.length} documents to index`);
    
    if (documents.length === 0) {
      console.log('No documents found in database to index');
      return;
    }
    
    // Process documents in batches of 50 to avoid overwhelming Elasticsearch
    const batchSize = 50;
    let indexedCount = 0;
    
    for (let i = 0; i < documents.length; i += batchSize) {
      const batch = documents.slice(i, i + batchSize);
      
      try {
        await elasticsearchService.bulkIndex(batch);
        indexedCount += batch.length;
        console.log(`Indexed batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(documents.length / batchSize)} (${indexedCount}/${documents.length} documents)`);
      } catch (error) {
        console.error(`Error indexing batch ${Math.floor(i / batchSize) + 1}:`, error);
        // Try individual documents if bulk fails
        for (const doc of batch) {
          try {
            await elasticsearchService.indexDocument(doc);
            indexedCount++;
            console.log(`Indexed individual document: ${doc.title.substring(0, 50)}...`);
          } catch (individualError) {
            console.error(`Failed to index document ${doc.doc_id}:`, individualError);
          }
        }
      }
    }
    
    // Refresh the index to make documents searchable
    try {
      // Access the client through a public method or make it public in the service
      // For now, skip refresh as it's not critical
      console.log('Skipping index refresh (client not accessible)');
    } catch (error) {
      console.error('Error refreshing index:', error);
    }
    
    console.log(`Indexing completed! Successfully indexed ${indexedCount} documents to Elasticsearch`);
    
    // Get Elasticsearch stats
    try {
      const stats = await elasticsearchService.getStats();
      console.log('Elasticsearch index stats:', {
        documentCount: (stats.index as any)?.docs?.count || 0,
        storeSize: (stats.index as any)?.store?.size_in_bytes || 0,
        clusterStatus: stats.cluster?.status || 'unknown'
      });
    } catch (error) {
      console.error('Error getting Elasticsearch stats:', error);
    }
    
  } catch (error) {
    console.error('Indexing failed:', error);
  } finally {
    await pool.end();
  }
}

// Run the indexing
indexAllDocuments().catch(console.error);
