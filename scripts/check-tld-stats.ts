import pool from '../lib/db';

async function checkTldStats() {
    const client = await pool.connect();
    try {
        const tlds = ['.org', '.me', '.app', '.dev', '.in', '.gov'];
        console.log('--- 📊 Indexed TLD Stats ---');

        for (const tld of tlds) {
            const res = await client.query(`SELECT COUNT(*) FROM documents WHERE url LIKE $1`, [`%${tld}%`]);
            console.log(`${tld}: ${res.rows[0].count} documents`);
        }

        console.log('\n--- 📝 Recent Examples ---');
        const recent = await client.query(`
      SELECT url, title FROM documents 
      WHERE url LIKE '%.org%' OR url LIKE '%.me%' OR url LIKE '%.app%' OR url LIKE '%.dev%' OR url LIKE '%.in%' OR url LIKE '%.gov%'
      ORDER BY created_at DESC LIMIT 10
    `);

        recent.rows.forEach(row => {
            console.log(`- ${row.url} (${row.title.substring(0, 30)}...)`);
        });

    } catch (error) {
        console.error('Error checking stats:', error);
    } finally {
        client.release();
        await pool.end();
    }
}

checkTldStats();
