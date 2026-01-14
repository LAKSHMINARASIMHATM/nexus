import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function DELETE(req: NextRequest) {
    const client = await pool.connect();
    try {
        console.log('🗑️  Clearing crawl queue via API...');
        const res = await client.query('DELETE FROM crawl_queue');
        console.log(`✅ Deleted ${res.rowCount} items from the crawl queue.`);

        return NextResponse.json({
            message: 'Crawl queue cleared successfully',
            deleted_count: res.rowCount
        });
    } catch (error) {
        console.error('Error clearing crawl queue:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        client.release();
    }
}
