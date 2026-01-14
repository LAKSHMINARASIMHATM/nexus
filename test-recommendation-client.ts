/**
 * Quick test script for the RecommendationClient
 */

import { RecommendationClient } from './lib/services/recommendation-client';

async function testClient() {
    console.log('🚀 Testing RecommendationClient...\n');

    const client = new RecommendationClient('https://ai-recommendation-system-lt3w.onrender.com');

    try {
        // Test 1: Health Check
        console.log('1️⃣ Testing health check...');
        const health = await client.healthCheck();
        console.log('✅ Health check passed:', health);
        console.log('');

        // Test 2: API Info
        console.log('2️⃣ Testing API info...');
        const info = await client.getInfo();
        console.log('✅ API Info:', info);
        console.log('');

        // Test 3: Get Recommendations
        console.log('3️⃣ Testing getRecommendations for user 1...');
        const recommendations = await client.getRecommendations(1, 10);
        console.log(`✅ Got ${recommendations.recommendations.length} recommendations for user ${recommendations.user_id}`);
        console.log('Top 5 recommendations:');
        recommendations.recommendations.slice(0, 5).forEach((rec, idx) => {
            console.log(`   ${idx + 1}. Item ${rec.item_id} - Score: ${rec.score.toFixed(4)}`);
        });
        console.log('');

        // Test 4: Predict
        console.log('4️⃣ Testing predict for user 1 with items [1, 2, 3, 4, 5]...');
        const predictions = await client.predict(1, [1, 2, 3, 4, 5]);
        console.log(`✅ Got predictions for ${predictions.recommendations.length} items`);
        predictions.recommendations.forEach((pred) => {
            console.log(`   Item ${pred.item_id}: ${pred.score.toFixed(4)}`);
        });
        console.log('');

        console.log('🎉 All tests passed!');
    } catch (error) {
        console.error('❌ Test failed:', error);
        process.exit(1);
    }
}

testClient();
