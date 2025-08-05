/**
 * Main entry point for the API server
 * Uses Express to create a server and load env variables
 * Routes are imported and mounted here
 * @module api/index.ts
 * @author Marianne Peterson
 * @version 1.0.0
 * @license MIT
 */
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';

import menuRouter from './routes/menuRouter';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Optional: serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/menu', menuRouter);

app.get('/ping', (_req, res) => {
    console.log('PING received');
    res.json({message: 'pong'});
});

app.listen(PORT, () => {
    console.log(`✅ Backend server running at http://localhost:${PORT}`);
});
