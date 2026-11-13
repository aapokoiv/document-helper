import { bigint, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const documents = pgTable("documents", {
  id: uuid("id").primaryKey(),
  filename: text("filename").notNull(),
  contentType: text("content_type").notNull(),
  expectedSizeBytes: bigint("expected_size_bytes", { mode: "number" }).notNull(),
  storageKey: text("storage_key").notNull().unique(),
  status: text("status", { enum: ["pending_upload"] }).notNull().default("pending_upload"),
  uploadExpiresAt: timestamp("upload_expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type PendingDocument = typeof documents.$inferInsert;

export interface DocumentRepository {
  create(document: PendingDocument): Promise<void>;
}
