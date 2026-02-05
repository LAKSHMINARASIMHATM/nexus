import { NextRequest, NextResponse } from 'next/server';
import { safetyDetectionService } from '@/lib/services/safety-detection-service';
import { withRateLimit, rateLimitConfigs } from '@/lib/middleware/rate-limit';
import { z } from 'zod';

/**
 * Safety Check API Endpoint
 * POST /api/v1/safety/check
 * 
 * Features:
 * - Check single or multiple URLs for safety
 * - Returns threat types, safety scores, and detailed analysis
 * - Implements caching for performance
 * - Rate limiting (120 req/min per IP)
 */

const safetyCheckSchema = z.object({
    urls: z.array(z.string().url()).min(1).max(100), // Max 100 URLs per request
});

async function safetyCheckHandler(req: NextRequest) {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    try {
        // Parse and validate request body
        const body = await req.json();
        const validation = safetyCheckSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    error: 'VALIDATION_ERROR',
                    message: 'Invalid request parameters',
                    details: validation.error.errors,
                    requestId,
                },
                { status: 400 }
            );
        }

        const { urls } = validation.data;

        // Check URLs
        const startTime = Date.now();
        const results = await safetyDetectionService.checkUrls(urls);
        const executionTime = Date.now() - startTime;

        // Add response headers
        const headers = new Headers();
        headers.set('X-Request-ID', requestId);
        headers.set('X-Execution-Time-Ms', executionTime.toString());

        return NextResponse.json(
            {
                results,
                meta: {
                    requestId,
                    urlsChecked: urls.length,
                    executionTimeMs: executionTime,
                },
            },
            { headers }
        );
    } catch (error: any) {
        console.error('Safety check API error:', error);

        return NextResponse.json(
            {
                error: 'INTERNAL_ERROR',
                message: 'An internal server error occurred',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined,
                requestId,
            },
            { status: 500 }
        );
    }
}

// Export with rate limiting (more generous than search)
export const POST = withRateLimit(safetyCheckHandler, {
    ...rateLimitConfigs.search,
    maxRequests: 120, // 120 requests per minute
});
