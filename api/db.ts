import sql from 'mssql';
import * as dotenv from 'dotenv';

/**
 * Database connection configuration for SQL Server
 */
dotenv.config();

/**
 * SQL Server connection configuration
 */
const config: sql.config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT || '1433', 10),
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};

/**
 * Creates a connection pool to SQL Server
 */
export const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('Database connection failed', err);
        throw err;
    });