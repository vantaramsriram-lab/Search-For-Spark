/**
 * Vercel serverless entry — reuses the same Express app.
 * vercel.json rewrites /api/* here. Env vars come from Vercel project settings.
 */
import 'dotenv/config';
export { app as default } from '../server/app.js';
