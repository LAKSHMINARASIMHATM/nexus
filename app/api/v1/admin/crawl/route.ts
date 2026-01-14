import { NextRequest, NextResponse } from 'next/server';
import { crawlerService } from '@/lib/services/crawler-service';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { urls, priority } = body;

        if (!urls || !Array.isArray(urls)) {
            return NextResponse.json({ error: 'Invalid URLs provided' }, { status: 400 });
        }

        const jobId = await crawlerService.queueUrls(urls, priority === 'high' ? 10 : 5);

        return NextResponse.json({
            job_id: jobId,
            status: 'queued',
            urls_queued: urls.length,
            estimated_time_minutes: urls.length * 0.5, // Mock estimation
        });
    } catch (error) {
        console.error('Crawl API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
