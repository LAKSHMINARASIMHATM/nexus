import fetch from 'node-fetch';

async function testSuggest() {
    console.log('🧪 Testing Auto-Suggest API Endpoint...\n');

    const queries = ['git', 'java', 'reac', 'nod'];

    for (const q of queries) {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/suggest?q=${q}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                console.error(`❌ API Error for "${q}": ${response.status}`);
                continue;
            }

            const data = await response.json();
            console.log(`✅ Suggestions for "${q}":`, JSON.stringify(data.suggestions));

        } catch (error) {
            console.error(`❌ Request failed for "${q}":`, error);
        }
    }
}

testSuggest();
