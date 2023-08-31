import { json } from "@remix-run/node";

/**
 * This helper function helps us to renturn the accurate HTTP status,
 * 400 BAD REQUEST, to the client
 */

export const badRequest = <T>(data: T) => json<T>(data, { status: 400 });