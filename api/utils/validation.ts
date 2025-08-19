import {ValidationError} from "./errors";

/**
 * Validate a name string.
 * - Must be string
 * - Not empty after trim
 * - Max length 120
 */
export function validateName(name: unknown): string {
    if (typeof name !== "string") {
        throw new ValidationError("Name must be a string");
    }
    const trimmed = name.trim();
    if (trimmed.length === 0) {
        throw new ValidationError("Name cannot be empty");
    }
    if (trimmed.length > 120) {
        throw new ValidationError("Name is too long (max 120)");
    }
    return trimmed;
}

/**
 * Validate an optional description string.
 * - Allows null or undefined
 * - Must be string if present
 * - Max length 1000
 */
export function validateDescription(desc: unknown): string | null {
    // allow nullish (null or undefined)normalize to null
    if (desc == null) return null;

    if (typeof desc !== "string") {
        throw new ValidationError("Description must be a string or null");
    }

    const trimmed = desc.trim();
    if (trimmed.length > 1000) {
        throw new ValidationError("Description is too long (max 1000)");
    }

    return trimmed;
}


/** Asserts a positive integer id. Returns the id to enable chaining. */
export function ensureId(id: unknown, field = "id"): number {
    if (typeof id !== "number" || !Number.isInteger(id) || id <= 0) {
        throw new ValidationError(`Invalid ${field}`);
    }
    return id;
}
