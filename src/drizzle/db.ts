import "dotenv/config";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'

export const client = neon(process.env.Database_URL as string) //!

const db = drizzle(client, { schema, logger: true });

export default db;