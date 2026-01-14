import fetch from 'node-fetch';
import pool from '../lib/db';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

async function testInteraction() {
    console.log('🧪 Testing Interaction Logging...\n');

    try {
        // 1. Perform Search
        console.log('1. Performing Search...');
        const searchRes = await fetch('http://localhost:3000/api/v1/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-session-id': 'test-session-123' },
            body: JSON.stringify({ query: 'AI', page: 1, page_size: 5 }),
        });

        if (!searchRes.ok) throw new Error(`Search failed: ${searchRes.statusText}`);
        const searchData = await searchRes.json();
        const searchEventId = searchData.meta?.search_event_id;

        console.log(`   ✅ Search successful. Event ID: ${searchEventId}`);

        if (!searchEventId) {
            console.error('   ❌ Missing search_event_id in response meta!');
            return;
        }

        // 2. Verify Search Log in DB
        const dbSearch = await pool.query('SELECT * FROM search_events WHERE event_id = $1', [searchEventId]);
        if (dbSearch.rows.length > 0) {
            console.log('   ✅ Search event found in DB.');
        } else {
            console.error('   ❌ Search event NOT found in DB!');
        }

        // 3. Perform Click
        console.log('\n2. Performing Click...');
        const docId = searchData.results[0]?.doc_id;
        if (!docId) {
            console.warn('   ⚠️ No results found to click on. Skipping click test.');
            return;
        }

        const clickRes = await fetch('http://localhost:3000/api/v1/click', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-session-id': 'test-session-123' },
            body: JSON.stringify({
                search_event_id: searchEventId,
                doc_id: docId,
                url: searchData.results[0]?.url,
                position: 1
            }),
        });

        if (!clickRes.ok) throw new Error(`Click failed: ${clickRes.statusText}`);
        const clickData = await clickRes.json();
        console.log(`   ✅ Click successful. Click ID: ${clickData.click_id}`);

        // 4. Verify Click Log in DB
        const dbClick = await pool.query('SELECT * FROM click_events WHERE click_id = $1', [clickData.click_id]);
        if (dbClick.rows.length > 0) {
            console.log('   ✅ Click event found in DB.');
        } else {
            console.error('   ❌ Click event NOT found in DB!');
        }

    } catch (error) {
        console.error('❌ Test failed:', error);
    } finally {
        await pool.end();
    }
}

testInteraction();
