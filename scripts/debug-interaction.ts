import { interactionService } from '../lib/services/interaction-service';
import * as dotenv from 'dotenv';
import pool from '../lib/db';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

async function debug() {
    console.log('🐞 Debugging InteractionService...');

    try {
        console.log('Attempting to log search event...');
        const id = await interactionService.logSearchEvent({
            session_id: 'debug-session',
            query: 'debug query',
            result_count: 5,
            execution_time_ms: 100
        });

        console.log(`Result ID: "${id}"`);

        if (!id) {
            console.error('❌ ID is empty! Check console for "Failed to log search event" errors.');
        } else {
            console.log('✅ Success!');
        }

    } catch (error) {
        console.error('❌ Unexpected error:', error);
    } finally {
        await pool.end();
    }
}

debug();
