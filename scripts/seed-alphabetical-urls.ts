/**
 * Alphabetical URL Seed Script
 * 
 * Seeds the database with 6 URLs for each sector for each letter of the alphabet
 * Sectors: Tech, Science, Business, Health, Education, AI
 */

import pool from '../lib/db';
import { v4 as uuidv4 } from 'uuid';

const SECTORS = ['Tech', 'Science', 'Business', 'Health', 'Education', 'AI'] as const;
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// High-quality URL patterns for each sector
const SECTOR_PATTERNS: Record<typeof SECTORS[number], string[]> = {
    Tech: [
        'https://techcrunch.com/{letter}/{topic}',
        'https://arstechnica.com/{letter}/{topic}',
        'https://theverge.com/{letter}/{topic}',
        'https://wired.com/{letter}/{topic}',
        'https://zdnet.com/{letter}/{topic}',
        'https://cnet.com/{letter}/{topic}'
    ],
    Science: [
        'https://nature.com/articles/{letter}/{topic}',
        'https://sciencedirect.com/{letter}/{topic}',
        'https://scientificamerican.com/{letter}/{topic}',
        'https://nasa.gov/{letter}/{topic}',
        'https://newscientist.com/{letter}/{topic}',
        'https://popsci.com/{letter}/{topic}'
    ],
    Business: [
        'https://bloomberg.com/{letter}/{topic}',
        'https://forbes.com/{letter}/{topic}',
        'https://wsj.com/{letter}/{topic}',
        'https://ft.com/{letter}/{topic}',
        'https://economist.com/{letter}/{topic}',
        'https://businessinsider.com/{letter}/{topic}'
    ],
    Health: [
        'https://nih.gov/{letter}/{topic}',
        'https://mayoclinic.org/{letter}/{topic}',
        'https://webmd.com/{letter}/{topic}',
        'https://healthline.com/{letter}/{topic}',
        'https://medlineplus.gov/{letter}/{topic}',
        'https://cdc.gov/{letter}/{topic}'
    ],
    Education: [
        'https://khanacademy.org/{letter}/{topic}',
        'https://coursera.org/{letter}/{topic}',
        'https://edx.org/{letter}/{topic}',
        'https://mit.edu/{letter}/{topic}',
        'https://stanford.edu/{letter}/{topic}',
        'https://harvard.edu/{letter}/{topic}'
    ],
    AI: [
        'https://openai.com/{letter}/{topic}',
        'https://deepmind.com/{letter}/{topic}',
        'https://arxiv.org/{letter}/{topic}',
        'https://ai.google/{letter}/{topic}',
        'https://research.facebook.com/{letter}/{topic}',
        'https://microsoft.com/ai/{letter}/{topic}'
    ]
};

// Topic words for each letter
const TOPICS: Record<string, string[]> = {
    A: ['analytics', 'automation', 'algorithms', 'architecture', 'applications', 'analysis'],
    B: ['blockchain', 'biotechnology', 'big-data', 'business-models', 'brain-science', 'benchmarks'],
    C: ['cloud-computing', 'cybersecurity', 'chemistry', 'commerce', 'cognition', 'computational'],
    D: ['deep-learning', 'design', 'data-science', 'development', 'diagnostics', 'discovery'],
    E: ['engineering', 'economics', 'evolution', 'enterprise', 'epidemiology', 'experiments'],
    F: ['frameworks', 'finance', 'fundamentals', 'forecasting', 'features', 'findings'],
    G: ['graphics', 'genomics', 'growth', 'genetics', 'governance', 'global'],
    H: ['hardware', 'healthcare', 'history', 'human-factors', 'hypothesis', 'hybrid'],
    I: ['infrastructure', 'innovation', 'immunology', 'investment', 'intelligence', 'integration'],
    J: ['javascript', 'journals', 'jobs', 'justice', 'journalism', 'joint-research'],
    K: ['knowledge', 'kernels', 'kinetics', 'key-metrics', 'k-means', 'keynotes'],
    L: ['language-models', 'logistics', 'learning', 'laboratory', 'leadership', 'latest'],
    M: ['machine-learning', 'management', 'medicine', 'microservices', 'molecular', 'models'],
    N: ['networks', 'neuroscience', 'nanotechnology', 'natural-language', 'nutrition', 'neural'],
    O: ['optimization', 'operations', 'oncology', 'online-learning', 'organizations', 'observability'],
    P: ['programming', 'physics', 'platforms', 'pharmacology', 'pedagogy', 'prediction'],
    Q: ['quantum-computing', 'quality', 'quantitative', 'queries', 'questionnaires', 'quantum'],
    R: ['robotics', 'research', 'regulations', 'radiology', 'resources', 'reinforcement'],
    S: ['software', 'statistics', 'strategy', 'surgery', 'systems', 'security'],
    T: ['technology', 'therapeutics', 'trading', 'training', 'tutorials', 'transformation'],
    U: ['ui-ux', 'updates', 'universities', 'urban-planning', 'usability', 'user-research'],
    V: ['virtualization', 'visualization', 'vaccines', 'venture-capital', 'video', 'validation'],
    W: ['web-development', 'wireless', 'wellness', 'workflows', 'writing', 'worldwide'],
    X: ['xml', 'x-ray', 'xr-extended-reality', 'experimental', 'x-axis-analysis', 'xenobiology'],
    Y: ['yield-optimization', 'youth-education', 'year-review', 'yeast-research', 'yoga', 'yearly-trends'],
    Z: ['zero-day', 'zoology', 'zones', 'zoning', 'zeitgeist', 'z-score']
};

async function seedAlphabeticalURLs() {
    console.log('🌱 Starting alphabetical URL seeding...');

    const client = await pool.connect();
    let totalAdded = 0;

    try {
        await client.query('BEGIN');

        for (const letter of ALPHABET) {
            console.log(`\n📝 Processing letter: ${letter}`);
            const topics = TOPICS[letter];

            for (const sector of SECTORS) {
                const patterns = SECTOR_PATTERNS[sector];

                for (let i = 0; i < 6; i++) {
                    const pattern = patterns[i];
                    const topic = topics[i];
                    const url = pattern
                        .replace('{letter}', letter.toLowerCase())
                        .replace('{topic}', topic);

                    const title = `${sector}: ${topic.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} - ${letter}`;
                    const description = `Comprehensive guide to ${topic.replace(/-/g, ' ')} in the ${sector.toLowerCase()} sector. Curated content starting with ${letter}.`;

                    try {
                        const result = await client.query(`
                            INSERT INTO documents (
                                doc_id,
                                url,
                                title,
                                body,
                                meta_description,
                                pagerank,
                                index_status,
                                created_at,
                                updated_at
                           ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
                            ON CONFLICT (url) DO NOTHING
                            RETURNING doc_id
                        `, [
                            uuidv4(),
                            url,
                            title,
                            `${description} This is high-quality content covering ${topic.replace(/-/g, ' ')} with in-depth analysis and expert insights.`,
                            description,
                            Math.random() * 0.5 + 0.5, // PageRank between 0.5 and 1.0
                            'indexed'
                        ]);

                        if (result.rowCount && result.rowCount > 0) {
                            totalAdded++;
                            if (totalAdded % 50 === 0) {
                                console.log(`   ✓ Added ${totalAdded} URLs so far...`);
                            }
                        }
                    } catch (error) {
                        console.error(`   ⚠ Error adding URL for ${letter}-${sector}-${topic}:`, (error as Error).message);
                    }
                }
            }

            console.log(`   ✓ Completed ${letter}: Added ${SECTORS.length * 6} URLs across all sectors`);
        }

        await client.query('COMMIT');
        console.log(`\n✅ Successfully seeded ${totalAdded} URLs across all sectors and alphabet letters!`);

        // Show summary
        const stats = await client.query(`
            SELECT 
                COUNT(*) as total_docs,
                COUNT(DISTINCT title) as unique_titles,
                AVG(pagerank) as avg_pagerank
            FROM documents
            WHERE index_status = 'indexed'
        `);

        console.log('\n📊 Database Statistics:');
        console.log(`   Total Documents: ${stats.rows[0].total_docs}`);
        console.log(`   Unique Titles: ${stats.rows[0].unique_titles}`);
        console.log(`   Average PageRank: ${parseFloat(stats.rows[0].avg_pagerank).toFixed(3)}`);

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Error seeding URLs:', error);
        throw error;
    } finally {
        client.release();
    }
}

// Run the seeding
seedAlphabeticalURLs()
    .then(() => {
        console.log('\n✨ Alphabetical URL seeding complete!');
        process.exit(0);
    })
    .catch((error: Error) => {
        console.error('\n💥 Seeding failed:', error);
        process.exit(1);
    });
