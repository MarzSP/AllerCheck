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
import {logger} from './utils/logger';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import * as path from 'path';
import cors from 'cors';

import menuRouter from './routes/menuRouter';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// CORS - Vite dev server
app.use(
    cors({
        origin: ['http://localhost:5173'],
        credentials: true,
    })
);

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

//serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/menu', menuRouter);

app.get('/ping', (_req, res) => {
    logger.debug("PING received");
    res.json({message: 'pong'});
});

app.listen(PORT, () => {
    logger.info(`Backend server listening on port ${PORT}`);

});
