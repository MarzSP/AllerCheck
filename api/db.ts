import dotenv from 'dotenv';
dotenv.config();

import {Pool} from 'pg';

// Default to 'postgres' in Docker
const DB_HOST = process.env.DB_HOST || process.env.DB_SERVER || 'postgres';
const DB_PORT = Number(process.env.DB_PORT || 5432);
const DB_USER = process.env.DB_USER || 'dbuser';
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE || 'allercheck';

console.log('Creating PG Pool with config:', {
    user: DB_USER,
    host: DB_HOST,
    database: DB_DATABASE,
    port: DB_PORT
});

export const pool = new Pool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    connectionTimeoutMillis: 5000
});

// Check connectivity
pool.query('select 1 as ok')
    .then(r => console.log('Connected to PostgreSQL:', r.rows[0]))
    .catch(err => console.error('PG connect error:', err.message));
