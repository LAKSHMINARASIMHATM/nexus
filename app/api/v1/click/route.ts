import { NextRequest, NextResponse } from 'next/server';
import { interactionService } from '@/lib/services/interaction-service';
import { clickEventSchema, createErrorResponse } from '@/lib/validation/schemas';
import { withRateLimit, rateLimitConfigs } from '@/lib/middleware/rate-limit';

/**
 * Click Tracking API endpoint
 * POST /api/v1/click
 * 
 * Features:
 * - Input validation
 * - Rate limiting (100 req/min per IP)
 * - Async logging (fire and forget)
 */

async function clickHandler(req: NextRequest) {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    try {
        const body = await req.json();
        
        // Validate request body
        const validation = clickEventSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                createErrorResponse(
                    'VALIDATION_ERROR',
                    'Invalid click event data',
                    validation.error.errors,
                    requestId
                ),
                { status: 400 }
            );
        }

        const { search_event_id, doc_id, position, url } = validation.data;
        const sessionId = req.headers.get('x-session-id') || 'anonymous';
        const userId = req.headers.get('x-user-id') || undefined;

        // Log click event asynchronously (don't block response)
        interactionService.logClickEvent({
            search_event_id,
            doc_id,
            position,
            session_id: sessionId,
            user_id: userId,
        }).catch((error) => {
            console.error('Failed to log click event:', error);
        });

        // Return success immediately
        return NextResponse.json({
            success: true,
            request_id: requestId,
        });
    } catch (error: any) {
        console.error('Click API error:', error);
        return NextResponse.json(
            createErrorResponse(
                'INTERNAL_ERROR',
                'Failed to process click event',
                process.env.NODE_ENV === 'development' ? error.message : undefined,
                requestId
            ),
            { status: 500 }
        );
    }
}

// Export with rate limiting
export const POST = withRateLimit(clickHandler, rateLimitConfigs.click);
