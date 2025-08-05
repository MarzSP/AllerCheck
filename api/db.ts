import {Pool} from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

console.log('🌐 Creating PG Pool with config:', {
    user: process.env.DB_USER,
    host: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    connectionTimeoutMillis: 3000
});

// Test the connection
pool.connect()
    .then(() => {
        console.log('Connected to PostgreSQL');
    })
    .catch((err) => {
        console.error('Failed to connect to PostgreSQL:', err.message);
    });
