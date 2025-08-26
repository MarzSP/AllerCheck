/**
 *  Logger utility
 *  Use: import { logger } from './utils/logger';
 *  logger.info('info message');
 *  logger.error('error message', { errorDetails: '...' });
 */
type LogLevel = "debug" | "info" | "warn" | "error";

function log(level: LogLevel, message: string, meta?: unknown) {
    const timestamp = new Date().toISOString();
    const formatted = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    if (meta) {
        console[level === "debug" ? "log" : level](formatted, meta);
    } else {
        console[level === "debug" ? "log" : level](formatted);
    }
}

export const logger = {
    debug: (msg: string, meta?: unknown) => log("debug", msg, meta),
    info: (msg: string, meta?: unknown) => log("info", msg, meta),
    warn: (msg: string, meta?: unknown) => log("warn", msg, meta),
    error: (msg: string, meta?: unknown) => log("error", msg, meta),
};
