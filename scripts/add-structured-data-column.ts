import pool from '../lib/db';

async function addStructuredDataColumn() {
    const client = await pool.connect();
    try {
        console.log('Running migration: Add structured_data column to documents table...');
        await client.query(`
      ALTER TABLE documents 
      ADD COLUMN IF NOT EXISTS structured_data JSONB;
    `);
        console.log('✅ Migration successful: structured_data column added.');
    } catch (error) {
        console.error('❌ Migration failed:', error);
    } finally {
        client.release();
        await pool.end();
    }
}

addStructuredDataColumn();
