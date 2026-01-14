import { NextRequest, NextResponse } from 'next/server';
import { crawlerService } from '@/lib/services/crawler-service';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ job_id: string }> }
) {
    const { job_id } = await params;
    try {
        const status = await crawlerService.getJobStatus(job_id);
        return NextResponse.json(status);
    } catch (error) {
        console.error('Crawl status error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
