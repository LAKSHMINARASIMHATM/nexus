import { Pool } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config({ path: '.env.local' });
// Also load .env if .env.local doesn't exist or for fallback
dotenv.config({ path: '.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

async function setup() {
    try {
        console.log('Connecting to database...');
        const client = await pool.connect();
        console.log('Connected. Reading schema files...');

        const authSchemaPath = path.join(__dirname, 'auth-schema.sql');
        const authSchema = fs.readFileSync(authSchemaPath, 'utf8');

        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        console.log('Initializing auth schema...');
        await client.query(authSchema);

        console.log('Initializing main schema...');
        await client.query(schema);
        console.log('Schemas initialized successfully.');
        client.release();
    } catch (err) {
        console.error('Error initializing database:', err);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

setup();
