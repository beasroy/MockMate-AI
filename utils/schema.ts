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

export const UserAnswers = pgTable('userAnswer',{
    id: serial("id").primaryKey(),
    mockIdRef: varchar("mockIdRef").notNull(),
    question: varchar("question").notNull(),
    correctAns: text("correctAns").notNull(),
    userAns: text("userAns"),
    feedback: text("feedback"),
    rating: varchar("rating"),
    userEmail: varchar("userEmail"),
    createdAt: varchar("created_at"),
})