import express from 'express';
import dotenv from 'dotenv';

/**
 * Main entry point for the API server
 * Uses Express to create a server and load env variables
 * Routes are imported and mounted here
 * @module api/index.ts
 * @author Marianne Peterson
 * @version 1.0.0
 * @license MIT
 */
// load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware to parse JSON bodies
app.use(express.json());

// example root route
app.get('/', (_req, res) => {
    res.send('API is running ');
});

// import and mount your routes
import menuRouter from './routes/menuRouter';

app.use('/api/menu', menuRouter);

app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});
