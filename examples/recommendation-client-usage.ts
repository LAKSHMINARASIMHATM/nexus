/**
 * Example Usage of RecommendationClient
 * 
 * This file demonstrates various ways to use the RecommendationClient
 * to interact with the AI Recommendation System API
 */

import { RecommendationClient, createRecommendationClient } from '../lib/services/recommendation-client';

// ============================================================================
// Basic Usage Examples
// ============================================================================

async function basicUsageExample() {
    console.log('=== Basic Usage Example ===\n');

    // Create a client instance
    const client = new RecommendationClient('https://ai-recommendation-system-lt3w.onrender.com');

    try {
        // 1. Check API health
        console.log('1. Checking API health...');
        const health = await client.healthCheck();
        console.log('Health status:', health);
        console.log('');

        // 2. Get API information
        console.log('2. Getting API information...');
        const info = await client.getInfo();
        console.log('API Info:', info);
        console.log('');

        // 3. Get top-10 recommendations for a user
        console.log('3. Getting top-10 recommendations for user 1...');
        const recommendations = await client.getRecommendations(1, 10);
        console.log(`User ID: ${recommendations.user_id}`);
        console.log(`Number of recommendations: ${recommendations.recommendations.length}`);
        console.log('Top 5 recommendations:');
        recommendations.recommendations.slice(0, 5).forEach((rec, idx) => {
            console.log(`  ${idx + 1}. Item ${rec.item_id} - Score: ${rec.score.toFixed(4)}`);
        });
        console.log('');

        // 4. Get predictions for specific items
        console.log('4. Getting predictions for specific items...');
        const predictions = await client.predict(1, [1, 2, 3, 4, 5]);
        console.log(`User ID: ${predictions.user_id}`);
        console.log('Predictions:');
        predictions.recommendations.forEach((pred) => {
            console.log(`  Item ${pred.item_id}: ${pred.score.toFixed(4)}`);
        });
        console.log('');

    } catch (error) {
        console.error('Error:', error);
    }
}

// ============================================================================
// Advanced Configuration Example
// ============================================================================

async function advancedConfigExample() {
    console.log('=== Advanced Configuration Example ===\n');

    // Create client with custom configuration
    const client = new RecommendationClient({
        baseUrl: 'https://ai-recommendation-system-lt3w.onrender.com',
        timeout: 60000, // 60 seconds
        retries: 5, // Retry up to 5 times
        retryDelay: 2000, // 2 seconds between retries
        headers: {
            'X-Custom-Header': 'my-value',
            'User-Agent': 'MyApp/1.0',
        },
    });

    try {
        const recommendations = await client.getRecommendations(42, 20);
        console.log(`Got ${recommendations.recommendations.length} recommendations`);
    } catch (error) {
        console.error('Error:', error);
    }
}

// ============================================================================
// Batch Processing Example
// ============================================================================

async function batchProcessingExample() {
    console.log('=== Batch Processing Example ===\n');

    const client = createRecommendationClient('https://ai-recommendation-system-lt3w.onrender.com');

    // Get recommendations for multiple users
    const userIds = [1, 2, 3, 4, 5];

    try {
        console.log(`Getting recommendations for ${userIds.length} users...`);

        const results = await Promise.all(
            userIds.map(async (userId) => {
                const recs = await client.getRecommendations(userId, 5);
                return {
                    userId,
                    topItem: recs.recommendations[0],
                    count: recs.recommendations.length,
                };
            })
        );

        console.log('\nResults:');
        results.forEach((result) => {
            console.log(
                `User ${result.userId}: Top item = ${result.topItem.item_id} (score: ${result.topItem.score.toFixed(4)})`
            );
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// ============================================================================
// Error Handling Example
// ============================================================================

async function errorHandlingExample() {
    console.log('=== Error Handling Example ===\n');

    const client = new RecommendationClient('https://ai-recommendation-system-lt3w.onrender.com');

    try {
        // This might fail if the user doesn't exist
        const recommendations = await client.getRecommendations(999999, 10);
        console.log('Recommendations:', recommendations);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);

            // You can check for specific error types
            if (error.name === 'RecommendationAPIError') {
                console.error('This is an API error');
            } else if (error.name === 'RecommendationNetworkError') {
                console.error('This is a network error');
            }
        }
    }
}

// ============================================================================
// Real-time Recommendation Example (for web apps)
// ============================================================================

async function realtimeRecommendationExample() {
    console.log('=== Real-time Recommendation Example ===\n');

    const client = new RecommendationClient('https://ai-recommendation-system-lt3w.onrender.com');

    // Simulate a user browsing items
    const userId = 1;
    const viewedItems = [10, 25, 42, 88, 156];

    try {
        console.log(`User ${userId} is viewing items: ${viewedItems.join(', ')}`);

        // Get predictions for the items they're viewing
        const predictions = await client.predict(userId, viewedItems);

        console.log('\nPredicted interest levels:');
        predictions.recommendations
            .sort((a, b) => b.score - a.score)
            .forEach((pred) => {
                const interest = pred.score > 0.7 ? 'High' : pred.score > 0.4 ? 'Medium' : 'Low';
                console.log(`  Item ${pred.item_id}: ${interest} (${pred.score.toFixed(4)})`);
            });

        // Get additional recommendations
        console.log('\nSuggested items to show next:');
        const recommendations = await client.getRecommendations(userId, 5);
        recommendations.recommendations.forEach((rec, idx) => {
            console.log(`  ${idx + 1}. Item ${rec.item_id} (score: ${rec.score.toFixed(4)})`);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// ============================================================================
// Metrics Monitoring Example
// ============================================================================

async function metricsMonitoringExample() {
    console.log('=== Metrics Monitoring Example ===\n');

    const client = new RecommendationClient('https://ai-recommendation-system-lt3w.onrender.com');

    try {
        const metrics = await client.getMetrics();
        console.log('Prometheus Metrics:');
        console.log(metrics);
    } catch (error) {
        console.error('Error fetching metrics:', error);
    }
}

// ============================================================================
// Run Examples
// ============================================================================

async function runAllExamples() {
    try {
        await basicUsageExample();
        console.log('\n' + '='.repeat(60) + '\n');

        await advancedConfigExample();
        console.log('\n' + '='.repeat(60) + '\n');

        await batchProcessingExample();
        console.log('\n' + '='.repeat(60) + '\n');

        await errorHandlingExample();
        console.log('\n' + '='.repeat(60) + '\n');

        await realtimeRecommendationExample();
        console.log('\n' + '='.repeat(60) + '\n');

        await metricsMonitoringExample();
    } catch (error) {
        console.error('Fatal error:', error);
    }
}

// Run if this file is executed directly
if (require.main === module) {
    runAllExamples().then(() => {
        console.log('\n✅ All examples completed!');
    });
}

// Export for use in other files
export {
    basicUsageExample,
    advancedConfigExample,
    batchProcessingExample,
    errorHandlingExample,
    realtimeRecommendationExample,
    metricsMonitoringExample,
};
