import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema"
import { config } from 'dotenv';
import { resolve } from 'path';


config({ path: resolve(__dirname, '.env.local') });

const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL!); 
export const db = drizzle(sql,{schema});
