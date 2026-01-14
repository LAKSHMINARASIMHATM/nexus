/**
 * Simple script to test the local recommendation service
 */

import { localRecommendationService } from './lib/services/local-recommendation-service';

async function testRecommendations() {
    console.log('🧪 Testing Local Recommendation Service\n');

    try {
        // Test 1: Get document count
        console.log('1️⃣ Getting document count...');
        const count = await localRecommendationService.getDocumentCount();
        console.log(`✅ Total indexed documents: ${count}\n`);

        if (count === 0) {
            console.log('⚠️  No indexed documents found!');
            console.log('   Run the crawler to index some documents first.\n');
            return;
        }

        // Test 2: Get popular documents
        console.log('2️⃣ Getting popular documents...');
        const popular = await localRecommendationService.getPopularDocuments({ limit: 5 });
        console.log(`✅ Got ${popular.length} popular documents:`);
        popular.forEach((doc, i) => {
            console.log(`   ${i + 1}. ${doc.title.substring(0, 50)}...`);
            console.log(`      URL: ${doc.url}`);
            console.log(`      PageRank: ${doc.pagerank.toFixed(4)}\n`);
        });

        // Test 3: Get trending documents
        console.log('3️⃣ Getting trending documents...');
        const trending = await localRecommendationService.getTrendingDocuments({ limit: 5 });
        console.log(`✅ Got ${trending.length} trending documents:`);
        trending.forEach((doc, i) => {
            console.log(`   ${i + 1}. ${doc.title.substring(0, 50)}...`);
            console.log(`      Created: ${new Date(doc.created_at).toLocaleDateString()}\n`);
        });

        // Test 4: Get random documents
        console.log('4️⃣ Getting random documents...');
        const random = await localRecommendationService.getRandomDocuments({ limit: 3 });
        console.log(`✅ Got ${random.length} random documents:`);
        random.forEach((doc, i) => {
            console.log(`   ${i + 1}. ${doc.title.substring(0, 50)}...`);
        });

        console.log('\n🎉 All tests passed!');
    } catch (error) {
        console.error('❌ Test failed:', error);
        if (error instanceof Error) {
            console.error('   Error message:', error.message);
            console.error('   Stack:', error.stack);
        }
        process.exit(1);
    }
}

testRecommendations();
