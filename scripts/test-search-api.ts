import { hybridSearchService } from '../lib/services/hybrid-search-service';

async function testSearch() {
  console.log('Testing search functionality with PostgreSQL...\n');

  const testQueries = [
    // Multi-word queries
    'apple',
    'google', 
    'microsoft',
    'amazon',
    'technology',
    'news',
    'social media',
    
    // Single character/variable tests
    'a',
    'b', 
    'c',
    'g',
    'm',
    't',
    'x',
    'z'
  ];

  for (const query of testQueries) {
    try {
      console.log(`\n--- Testing query: "${query}" ---`);
      
      const results = await hybridSearchService.search({
        query,
        page: 1,
        pageSize: 5,
        useCache: false, // Don't use cache for testing
        preferElasticsearch: false, // Use PostgreSQL directly
      });

      console.log(`Found ${results.total_results} total results`);
      console.log(`Returned ${results.results.length} results on page ${results.page}`);
      
      if (results.results.length > 0) {
        console.log('Top results:');
        results.results.forEach((result, index) => {
          console.log(`  ${index + 1}. ${result.title} - ${result.url}`);
          console.log(`     Score: ${result.score.toFixed(2)}`);
          console.log(`     Snippet: ${result.snippet.substring(0, 100)}...`);
          if (result.highlights.length > 0) {
            console.log(`     Highlights: ${result.highlights.join(' | ')}`);
          }
        });
      } else {
        console.log('No results found');
      }
      
      console.log(`Query time: ${results.query_time_ms}ms`);
      
    } catch (error) {
      console.error(`Error testing query "${query}":`, error);
    }
  }
}

testSearch().catch(console.error);
