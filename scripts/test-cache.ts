import { localRecommendationService } from '../lib/services/local-recommendation-service';

async function testCache() {
    console.log('🧪 Testing Recommendation Cache\n');

    try {
        console.log('🔥 1. Warming up cache...');
        await localRecommendationService.warmup();

        console.log('\n⏱️ 2. Testing retrieval speed (should be near instant)...');

        const start1 = performance.now();
        const docs1 = await localRecommendationService.getTrendingDocuments({ limit: 5 });
        const end1 = performance.now();
        console.log(`   Attempt 1: ${docs1.length} docs, Time: ${(end1 - start1).toFixed(2)}ms`);

        const start2 = performance.now();
        const docs2 = await localRecommendationService.getTrendingDocuments({ limit: 5 });
        const end2 = performance.now();
        console.log(`   Attempt 2 (cached): ${docs2.length} docs, Time: ${(end2 - start2).toFixed(2)}ms`);

        if (end2 - start2 < 5) {
            console.log('\n✅ Cache hit suspected (sub-5ms response)');
        } else {
            console.log('\n⚠️ Cache hit speed not as expected');
        }

        console.log('\n🔍 3. Testing related documents cache...');
        const query = 'technology ai software';
        const start3 = performance.now();
        await localRecommendationService.getRelatedDocuments(query, { limit: 5 });
        const end3 = performance.now();
        console.log(`   Related search: Time: ${(end3 - start3).toFixed(2)}ms`);

        console.log('\n🎉 Cache verification complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Test failed:', error);
        process.exit(1);
    }
}

testCache();
