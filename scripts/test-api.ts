import fetch from 'node-fetch';

async function testApi() {
    console.log('🧪 Testing Search API Endpoint...\n');

    try {
        const response = await fetch('http://localhost:3000/api/v1/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: 'GitHub',
                page: 1,
                page_size: 5
            }),
        });

        if (!response.ok) {
            console.error(`❌ API Error: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error('Response:', text);
            return;
        }

        const data = await response.json();
        console.log(`✅ API Success! Found ${data.total_results} results.`);
        console.log('Results:', JSON.stringify(data.results, null, 2));

    } catch (error) {
        console.error('❌ Request failed:', error);
        console.log('Note: Ensure the dev server is running on localhost:3000');
    }
}

testApi();
