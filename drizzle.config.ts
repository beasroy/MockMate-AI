import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: "./utils/schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://ai-interview_owner:vmJa6cRl8Oug@ep-sweet-limit-a1ahkvxa.ap-southeast-1.aws.neon.tech/ai-interview?sslmode=require", 
  },
  verbose: true,
  strict: true,
});
