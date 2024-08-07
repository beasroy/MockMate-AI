import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockinterview',{
    id: serial("id").primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    jobPosition: varchar('jobPosition').notNull(),
    jobDesc: varchar('jobDesc').notNull(),
    jobExperience: varchar('jobExperience').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar("created_at"),
    mockId: varchar("mockId").notNull()

})