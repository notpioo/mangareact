import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const readingHistory = pgTable("reading_history", {
  id: serial("id").primaryKey(),
  mangaId: text("manga_id").notNull(),
  chapterId: text("chapter_id").notNull(),
  userId: text("user_id").notNull(),
  readAt: timestamp("read_at").defaultNow(),
});

export const insertReadingHistorySchema = createInsertSchema(readingHistory).omit({
  id: true,
  readAt: true,
});

export type InsertReadingHistory = z.infer<typeof insertReadingHistorySchema>;
export type ReadingHistory = typeof readingHistory.$inferSelect;

// MangaDex API Types
export interface Manga {
  id: string;
  type: string;
  attributes: {
    title: Record<string, string>;
    description: Record<string, string>;
    status: string;
    year: number;
    contentRating: string;
    tags: Array<{
      id: string;
      type: string;
      attributes: {
        name: Record<string, string>;
      };
    }>;
  };
  relationships: Array<{
    id: string;
    type: string;
  }>;
}

export interface Chapter {
  id: string;
  type: string;
  attributes: {
    volume: string;
    chapter: string;
    title: string;
    pages: number;
  };
}
