import { NextRequest, NextResponse } from 'next/server';
import { searchService } from '@/lib/services/search-service';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    if (!query) {
        return NextResponse.json(
            {
                query: '',
                suggestions: [],
            },
            { status: 200 }
        );
    }

    const suggestions = await searchService.suggest(query, limit);

    return NextResponse.json({
        query,
        suggestions: suggestions.map((text) => ({
            text,
            frequency: 0, // Mock frequency if not available
        })),
    });
}
