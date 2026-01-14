import pool from '../lib/db';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

async function seedSuggestions() {
    console.log('🌱 Seeding Query Suggestions...');

    const suggestions = [
        { text: 'github', freq: 100 },
        { text: 'git', freq: 50 },
        { text: 'gitlab', freq: 30 },
        { text: 'javascript', freq: 90 },
        { text: 'java', freq: 85 },
        { text: 'react', freq: 80 },
        { text: 'react native', freq: 60 },
        { text: 'node.js', freq: 75 },
        { text: 'nodejs', freq: 40 },
        { text: 'next.js', freq: 70 },
        { text: 'python', freq: 95 },
        { text: 'typescript', freq: 65 },
        { text: 'rust', freq: 55 },
        { text: 'go', freq: 50 },
        { text: 'docker', freq: 60 },
        { text: 'kubernetes', freq: 55 },
        { text: 'aws', freq: 70 },
        { text: 'azure', freq: 45 },
        { text: 'google cloud', freq: 40 },
        { text: 'openai', freq: 85 },
        { text: 'ai', freq: 80 },
        { text: 'machine learning', freq: 75 }
    ];

    try {
        // Create table if not exists (just in case)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS query_suggestions (
                id SERIAL PRIMARY KEY,
                query_text TEXT UNIQUE NOT NULL,
                frequency INTEGER DEFAULT 1,
                last_updated TIMESTAMP DEFAULT NOW()
            );
        `);

        for (const s of suggestions) {
            await pool.query(`
                INSERT INTO query_suggestions (query_text, frequency)
                VALUES ($1, $2)
                ON CONFLICT (query_text) 
                DO UPDATE SET frequency = query_suggestions.frequency + $2
            `, [s.text, s.freq]);
        }

        console.log(`✅ Seeded ${suggestions.length} suggestions.`);

    } catch (error) {
        console.error('❌ Seeding failed:', error);
    } finally {
        await pool.end();
    }
}

seedSuggestions();
