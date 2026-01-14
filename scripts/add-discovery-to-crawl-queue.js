// Node.js script to add discovery page documents to crawl queue
// This adds URLs to the crawler system instead of direct database insertion

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Parse DATABASE_URL if available
function parseDatabaseUrl(url) {
    if (!url) return {};
    
    try {
        const urlObj = new URL(url);
        return {
            host: urlObj.hostname,
            port: urlObj.port || 5432,
            database: urlObj.pathname.substring(1),
            user: urlObj.username,
            password: urlObj.password,
            ssl: urlObj.searchParams.has('sslmode')
        };
    } catch (error) {
        console.error('❌ Invalid DATABASE_URL format:', error.message);
        return {};
    }
}

async function addToCrawlQueue() {
    console.log('🚀 Adding Discovery Documents to Crawl Queue...');
    
    // Check for DATABASE_URL first
    const databaseUrl = process.env.DATABASE_URL;
    let connectionConfig;
    
    if (databaseUrl) {
        connectionConfig = parseDatabaseUrl(databaseUrl);
        console.log('🔗 Using DATABASE_URL configuration');
        console.log(`   Host: ${connectionConfig.host}`);
        console.log(`   Database: ${connectionConfig.database}`);
        console.log(`   User: ${connectionConfig.user}`);
        console.log(`   SSL: ${connectionConfig.ssl ? 'enabled' : 'disabled'}`);
    } else {
        connectionConfig = {
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 5432,
            database: process.env.DB_NAME || 'nexus_search',
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || ''
        };
        console.log('🔗 Using individual environment variables');
    }
    
    const pool = new Pool({
        ...connectionConfig,
        ssl: connectionConfig.ssl ? { rejectUnauthorized: false } : false,
        connectionTimeoutMillis: 10000,
        idleTimeoutMillis: 30000
    });

    try {
        // Test connection
        await pool.query('SELECT 1');
        console.log('✅ Database connection successful');
        
        // Clear existing discovery documents (optional)
        console.log('🧹 Clearing existing discovery documents from crawl queue...');
        await pool.query(`
            DELETE FROM crawl_queue WHERE url LIKE '%arxiv.org%' 
               OR url LIKE '%nature.com%' 
               OR url LIKE '%ieee.org%'
               OR url LIKE '%sciencedirect.com%'
               OR url LIKE '%nasa.gov%'
               OR url LIKE '%dl.acm.org%'
               OR url LIKE '%neurallink.com%'
        `);
        
        // Add discovery documents to crawl queue
        const discoveryUrls = [
            // Neural Architecture Category
            {
                url: 'https://arxiv.org/abs/2301.07041',
                priority: 10,
                metadata: { category: 'Neural Architecture', type: 'Research Paper', author: 'Dr. Elena Rodriguez', institution: 'MIT AI Lab' }
            },
            {
                url: 'https://www.nature.com/articles/s41586-023-06748-0',
                priority: 10,
                metadata: { category: 'Deep Space Bio', type: 'Scientific Report', author: 'Prof. James Chen', institution: 'NASA Research Center' }
            },
            {
                url: 'https://ieeexplore.ieee.org/document/10123456',
                priority: 10,
                metadata: { category: 'Web3 Ecosystems', type: 'Technical Guide', author: 'Alex Thompson', institution: 'Blockchain Security Institute' }
            },
            {
                url: 'https://www.sciencedirect.com/science/article/pii/S0160795X23004567',
                priority: 10,
                metadata: { category: 'Sustainable Cities', type: 'Technical Guide', author: 'Maria Garcia', institution: 'Urban Planning Institute' }
            },
            {
                url: 'https://www.nature.com/articles/s41534-023-00001-2',
                priority: 10,
                metadata: { category: 'Quantum Computing', type: 'Research Paper', author: 'Dr. Robert Kim', institution: 'Quantum Computing Institute' }
            },
            {
                url: 'https://dl.acm.org/doi/10.1145/3571234',
                priority: 10,
                metadata: { category: 'Ethical AI', type: 'Research Paper', author: 'Dr. Sarah Williams', institution: 'Stanford AI Lab' }
            },
            
            // Trending Neural Link Protocol Documents
            {
                url: 'https://neuralink.com/tech/protocol-v1-integration',
                priority: 15,
                metadata: { category: 'Trending', type: 'Integration Guide', version: 'V1.0', author: 'Neural Link Team' }
            },
            {
                url: 'https://neuralink.com/tech/protocol-v2-integration',
                priority: 15,
                metadata: { category: 'Trending', type: 'Integration Guide', version: 'V2.0', author: 'Neural Link Team' }
            },
            {
                url: 'https://neuralink.com/tech/protocol-v3-integration',
                priority: 15,
                metadata: { category: 'Trending', type: 'Integration Guide', version: 'V3.0', author: 'Neural Link Team' }
            },
            {
                url: 'https://neuralink.com/tech/protocol-v4-integration',
                priority: 15,
                metadata: { category: 'Trending', type: 'Integration Guide', version: 'V4.0', author: 'Neural Link Team' }
            },
            {
                url: 'https://neuralink.com/tech/protocol-v5-integration',
                priority: 15,
                metadata: { category: 'Trending', type: 'Integration Guide', version: 'V5.0', author: 'Neural Link Team' }
            },
            
            // Popular Documents
            {
                url: 'https://arxiv.org/abs/2201.04123',
                priority: 12,
                metadata: { category: 'Popular', type: 'Tutorial', title: 'Quantum Computing Basics', views: '45.2k', rating: 4.8 }
            },
            {
                url: 'https://www.sciencedirect.com/science/article/pii/S0264833723004567',
                priority: 12,
                metadata: { category: 'Popular', type: 'Guide', title: 'Sustainable Urban Planning', views: '38.7k', rating: 4.7 }
            },
            {
                url: 'https://www.aaai.org/library/ethics/ai-ethics-framework',
                priority: 12,
                metadata: { category: 'Popular', type: 'Framework', title: 'AI Ethics Framework', views: '32.1k', rating: 4.9 }
            },
            {
                url: 'https://www.blockchainresearch.org/web3-infrastructure',
                priority: 12,
                metadata: { category: 'Popular', type: 'Infrastructure', title: 'Web3 Infrastructure', views: '28.9k', rating: 4.6 }
            },
            
            // Recent Documents
            {
                url: 'https://arxiv.org/abs/2401.02345',
                priority: 13,
                metadata: { category: 'Recent', type: 'Research Paper', title: 'Neural Architecture Optimization', author: 'Dr. Jennifer Liu', institution: 'MIT AI Lab' }
            },
            {
                url: 'https://www.nasa.gov/astrobiology/deep-space-findings',
                priority: 13,
                metadata: { category: 'Recent', type: 'Scientific Report', title: 'Deep Space Biology Findings', author: 'Prof. Carlos Martinez', institution: 'NASA Research Center' }
            },
            {
                url: 'https://www.ieee.org/security/web3-protocols',
                priority: 13,
                metadata: { category: 'Recent', type: 'Technical Guide', title: 'Web3 Security Protocols', author: 'Alexandra Chen', institution: 'Blockchain Security Institute' }
            },
            {
                url: 'https://www.epa.gov/sustainable-energy',
                priority: 13,
                metadata: { category: 'Recent', type: 'Case Study', title: 'Sustainable Energy Solutions', author: 'Dr. Robert Green', institution: 'Environmental Research Group' }
            },
            {
                url: 'https://www.quantumcomputing.institute/applications',
                priority: 13,
                metadata: { category: 'Recent', type: 'Tutorial', title: 'Quantum Computing Applications', author: 'Dr. Maria Rodriguez', institution: 'Quantum Computing Institute' }
            },
            
            // Featured Documents
            {
                url: 'https://www.nature.com/articles/s41586-023-04567-8',
                priority: 20,
                metadata: { 
                    category: 'Featured', 
                    type: 'Research Paper', 
                    title: 'The Future of Neural Networks', 
                    author: 'Dr. Sarah Chen', 
                    institution: 'Stanford AI Lab',
                    featured_reason: 'Groundbreaking research on next-generation neural architectures',
                    rating: 4.9
                }
            },
            {
                url: 'https://www.sustainablecomputing.org/guide',
                priority: 20,
                metadata: { 
                    category: 'Featured', 
                    type: 'Technical Guide', 
                    title: 'Sustainable Computing Practices', 
                    author: 'Tech Sustainability Lab', 
                    institution: 'Green Computing Initiative',
                    featured_reason: 'Essential reading for environmentally conscious developers',
                    rating: 4.8
                }
            }
        ];
        
        console.log(`📝 Adding ${discoveryUrls.length} discovery documents to crawl queue...`);
        
        // Insert all URLs into crawl queue
        for (const doc of discoveryUrls) {
            await pool.query(`
                INSERT INTO crawl_queue (url, priority, depth, status, metadata, scheduled_at)
                VALUES ($1, $2, 0, 'pending', $3, NOW())
                ON CONFLICT (url) DO UPDATE SET
                    priority = EXCLUDED.priority,
                    metadata = EXCLUDED.metadata,
                    scheduled_at = NOW()
            `, [doc.url, doc.priority, JSON.stringify(doc.metadata)]);
            
            console.log(`✅ Added to queue: ${doc.url} (${doc.metadata.category})`);
        }
        
        // Get statistics
        const [queueCount] = await pool.query(`
            SELECT COUNT(*) as count FROM crawl_queue 
            WHERE metadata::text LIKE '%Neural%' 
               OR metadata::text LIKE '%Quantum%' 
               OR metadata::text LIKE '%AI%' 
               OR metadata::text LIKE '%Sustainable%'
               OR metadata::text LIKE '%Web3%'
               OR metadata::text LIKE '%Deep Space%'
        `);
        
        console.log('📊 Discovery documents added to crawl queue successfully!');
        console.log('');
        console.log('📈 Summary:');
        console.log(`  - Documents added to queue: ${queueCount.rows[0].count}`);
        console.log('');
        console.log('🔄 Next steps:');
        console.log('  1. Start the crawler service');
        console.log('  2. Monitor crawl progress');
        console.log('  3. Documents will be automatically processed and indexed');
        console.log('');
        console.log('🎉 Discovery documents are now queued for crawling!');
        
    } catch (error) {
        console.error('❌ Database Error:', error.message);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

// Run the script
addToCrawlQueue().catch(console.error);
