import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';
import { resolve } from 'path';


config({ path: resolve(__dirname, '.env.local') });


export default defineConfig({
  schema: "./utils/schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
