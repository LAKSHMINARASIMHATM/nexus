import { searchService } from '../lib/services/search-service';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

async function test() {
    console.log('🧪 Testing SearchService Class...\n');

    try {
        const q = 'AI';
        console.log(`🔎 Searching for: "${q}"`);
        const response = await searchService.search({ query: q });

        console.log(`✅ Found ${response.total_results} results.`);
        response.results.forEach(r => {
            console.log(`   - [${r.score.toFixed(2)}] ${r.title}`);
            console.log(`     Snippet: ${r.snippet}`);
        });

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }

    process.exit(0);
}

test();
