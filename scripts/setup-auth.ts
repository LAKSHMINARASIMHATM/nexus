import pool from '../lib/db';
import * as fs from 'fs';
import * as path from 'path';

async function setupAuth() {
  console.log('Setting up authentication schema...');
  
  try {
    // Read the SQL schema file
    const schemaPath = path.join(__dirname, 'auth-schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Execute the schema
    await pool.query(schema);
    
    console.log('Authentication schema created successfully!');
    
    // Verify tables were created
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('users', 'user_sessions', 'password_reset_tokens', 'email_verification_tokens')
    `);
    
    console.log('Created tables:');
    tables.rows.forEach(row => {
      console.log(`  - ${row.table_name}`);
    });
    
  } catch (error) {
    console.error('Error setting up authentication:', error);
  } finally {
    await pool.end();
  }
}

setupAuth().catch(console.error);
