/**
 * Next.js API Route for AI Recommendations
 * 
 * This demonstrates how to integrate the RecommendationClient
 * into your Next.js application
 */

import { NextRequest, NextResponse } from 'next/server';
import { RecommendationClient, RecommendationAPIError } from '@/lib/services/recommendation-client';

// Initialize the client (reuse across requests)
const recommendationClient = new RecommendationClient({
    baseUrl: 'https://ai-recommendation-system-lt3w.onrender.com',
    timeout: 30000,
    retries: 3,
});

/**
 * GET /api/recommendations
 * 
 * Query parameters:
 * - userId: number (required) - The user ID to get recommendations for
 * - k: number (optional, default: 10) - Number of recommendations to return
 * 
 * Example: /api/recommendations?userId=1&k=20
 */
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        // Parse query parameters
        const userIdParam = searchParams.get('userId');
        const kParam = searchParams.get('k');

        // Validate userId
        if (!userIdParam) {
            return NextResponse.json(
                { error: 'Missing required parameter: userId' },
                { status: 400 }
            );
        }

        const userId = parseInt(userIdParam);
        if (isNaN(userId)) {
            return NextResponse.json(
                { error: 'Invalid userId: must be a number' },
                { status: 400 }
            );
        }

        // Parse k parameter (default to 10)
        const k = kParam ? parseInt(kParam) : 10;
        if (isNaN(k) || k < 1 || k > 100) {
            return NextResponse.json(
                { error: 'Invalid k: must be a number between 1 and 100' },
                { status: 400 }
            );
        }

        // Get recommendations
        const recommendations = await recommendationClient.getRecommendations(userId, k);

        return NextResponse.json({
            success: true,
            data: recommendations,
        });
    } catch (error) {
        console.error('Error fetching recommendations:', error);

        if (error instanceof RecommendationAPIError) {
            return NextResponse.json(
                {
                    success: false,
                    error: error.message,
                    details: error.details,
                },
                { status: error.statusCode || 500 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch recommendations',
            },
            { status: 500 }
        );
    }
}

/**
 * POST /api/recommendations
 * 
 * Request body:
 * {
 *   userId: number,
 *   itemIds: number[]
 * }
 * 
 * Returns predictions for specific items
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate request body
        if (!body.userId || typeof body.userId !== 'number') {
            return NextResponse.json(
                { error: 'Missing or invalid userId' },
                { status: 400 }
            );
        }

        if (!Array.isArray(body.itemIds) || body.itemIds.length === 0) {
            return NextResponse.json(
                { error: 'Missing or invalid itemIds: must be a non-empty array' },
                { status: 400 }
            );
        }

        // Validate all item IDs are numbers
        if (!body.itemIds.every((id: any) => typeof id === 'number')) {
            return NextResponse.json(
                { error: 'All itemIds must be numbers' },
                { status: 400 }
            );
        }

        // Get predictions
        const predictions = await recommendationClient.predict(body.userId, body.itemIds);

        return NextResponse.json({
            success: true,
            data: predictions,
        });
    } catch (error) {
        console.error('Error getting predictions:', error);

        if (error instanceof RecommendationAPIError) {
            return NextResponse.json(
                {
                    success: false,
                    error: error.message,
                    details: error.details,
                },
                { status: error.statusCode || 500 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to get predictions',
            },
            { status: 500 }
        );
    }
}
