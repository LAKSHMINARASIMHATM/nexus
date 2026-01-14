// Node.js script to populate discovery page documents
// Run this with: node scripts/populate-discovery-documents.js

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
            database: urlObj.pathname.substring(1), // Remove leading slash
            user: urlObj.username,
            password: urlObj.password,
            ssl: urlObj.searchParams.has('sslmode')
        };
    } catch (error) {
        console.error('❌ Invalid DATABASE_URL format:', error.message);
        return {};
    }
}

async function runSQLFile(pool, filePath) {
    try {
        const sql = fs.readFileSync(filePath, 'utf8');
        await pool.query(sql);
        console.log(`✅ Successfully executed: ${path.basename(filePath)}`);
        return true;
    } catch (error) {
        console.error(`❌ Error executing ${path.basename(filePath)}:`, error.message);
        return false;
    }
}

async function populateDiscoveryDocuments() {
    console.log('🚀 Populating Discovery Page Documents...');
    
    // Check for DATABASE_URL first
    const databaseUrl = process.env.DATABASE_URL;
    let connectionConfig;
    
    if (databaseUrl) {
        // Parse DATABASE_URL for Neon PostgreSQL
        connectionConfig = parseDatabaseUrl(databaseUrl);
        console.log('🔗 Using DATABASE_URL configuration');
        console.log(`   Host: ${connectionConfig.host}`);
        console.log(`   Database: ${connectionConfig.database}`);
        console.log(`   User: ${connectionConfig.user}`);
        console.log(`   SSL: ${connectionConfig.ssl ? 'enabled' : 'disabled'}`);
    } else {
        // Use individual environment variables
        connectionConfig = {
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 5432,
            database: process.env.DB_NAME || 'nexus_search',
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || ''
        };
        console.log('🔗 Using individual environment variables');
    }
    
    // Database connection with better error handling
    const pool = new Pool({
        ...connectionConfig,
        // Add SSL configuration for Neon
        ssl: connectionConfig.ssl ? { rejectUnauthorized: false } : false,
        // Add connection timeout and retry logic
        connectionTimeoutMillis: 10000,
        idleTimeoutMillis: 30000
    });

    try {
        // Test connection
        await pool.query('SELECT 1');
        console.log('✅ Database connection successful');
        
        // Run SQL files
        const scriptsDir = __dirname;
        const sqlFiles = [
            'insert-discovery-documents.sql',
            'add-document-metadata.sql'
        ];
        
        for (const file of sqlFiles) {
            const filePath = path.join(scriptsDir, file);
            const success = await runSQLFile(pool, filePath);
            if (!success) {
                throw new Error(`Failed to execute ${file}`);
            }
        }
        
        // Update statistics
        console.log('📈 Updating document statistics...');
        await pool.query(`
            UPDATE categories SET document_count = (
                SELECT COUNT(*) FROM document_categories dc 
                WHERE dc.category_id = categories.category_id
            );
            
            UPDATE documents SET body_length = COALESCE(LENGTH(body), 0) 
            WHERE body_length IS NULL;
        `);
        
        // Get statistics
        const [docCount] = await pool.query(`
            SELECT COUNT(*) as count 
            FROM documents 
            WHERE title ILIKE '%Neural%' OR title ILIKE '%Quantum%' OR title ILIKE '%AI%' OR title ILIKE '%Sustainable%'
        `);
        
        const [catCount] = await pool.query('SELECT COUNT(*) as count FROM categories');
        const [metaCount] = await pool.query('SELECT COUNT(*) as count FROM document_metadata');
        
        console.log('📊 Database population complete!');
        console.log('');
        console.log('📈 Summary:');
        console.log(`  - Documents inserted: ${docCount.rows[0].count}`);
        console.log(`  - Categories created: ${catCount.rows[0].count}`);
        console.log(`  - Document metadata added: ${metaCount.rows[0].count}`);
        console.log('');
        console.log('🎉 Discovery page documents are now ready for search!');
        
    } catch (error) {
        console.error('❌ Database Error:', error.message);
        
        if (error.message.includes('password authentication failed') || error.message.includes('authentication failed')) {
            console.log('');
            console.log('💡 Authentication failed. Try these solutions:');
            console.log('');
            console.log('1. Your DATABASE_URL looks correct for Neon PostgreSQL');
            console.log('   Make sure the password is correct in the connection string');
            console.log('');
            console.log('2. If using individual environment variables:');
            console.log('   set DB_PASSWORD=your_password');
            console.log('   set DB_USER=your_username');
            console.log('   set DB_HOST=localhost');
            console.log('   set DB_PORT=5432');
            console.log('   set DB_NAME=nexus_search');
            console.log('');
            console.log('3. Try the batch file instead:');
            console.log('   cd scripts');
            console.log('   populate-discovery-documents.bat');
            console.log('');
            console.log('4. Or run SQL directly:');
            console.log('   "C:\\Program Files\\PostgreSQL\\16\\bin\\psql.exe" -h ep-orange-glitter-ahhlheca-pooler.c-3.us-east-1.aws.neon.tech -U neondb_owner -d neondb -f insert-discovery-documents.sql');
        }
        
        process.exit(1);
    } finally {
        await pool.end();
    }
}

// Run the script
populateDiscoveryDocuments().catch(console.error);
