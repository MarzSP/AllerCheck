import {pool} from './db';

(async () => {
    try {
        const result = await pool.query('SELECT datname FROM pg_database');
        console.log('Connected! Databases:', result.rows);
        await pool.end();
    } catch (err) {
        console.error('Connection failed:', err);
    }
})();
