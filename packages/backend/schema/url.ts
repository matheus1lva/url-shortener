import {
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

export const urlTable = pgTable(
  'url',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    originalUrl: text('original_url').notNull(),
    slug: text('slug').notNull(),
    userId: text('user_id'),
    visits: integer('visits').default(0).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => {
    return [uniqueIndex('slug_idx').on(table.slug)];
  },
);

export type Url = typeof urlTable.$inferSelect;
export type UrlInsert = typeof urlTable.$inferInsert;
