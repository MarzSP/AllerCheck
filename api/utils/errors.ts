import {Response} from "express";

/** Base HTTP-style error with status code */
export class HttpError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.name = new.target.name;
        this.status = status;
    }
}


/** 400 Bad Request */
export class ValidationError extends HttpError {
    constructor(message = "Validation failed") {
        super(400, message);
    }
}

/** 404 Not Found */
export class NotFoundError extends Error {
    status = 404;

    constructor(message = "Not found") {
        super(message);
        this.name = "NotFoundError";
    }
}

/**
 * Handle errors in Express routes.
 * @param err
 * @param res
 */
export function handleError(err: unknown, res: Response) {
    if (err instanceof HttpError) {
        return res.status(err.status).json({error: err.message});
    }

    console.error("Unexpected error:", err);
    return res.status(500).json({error: "Internal Server Error"});
}
