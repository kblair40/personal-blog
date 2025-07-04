import { integer, pgTable, varchar, text, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { timestamps } from "./column-helpers";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar({ length: 30 }),
  lastName: varchar({ length: 30 }),
  email: varchar({ length: 50 }).notNull().unique(),
  password: varchar({ length: 80 }).notNull(),
  ...timestamps,
});

export const usersRelations = relations(usersTable, ({ one }) => ({
  subscriptionsTable: one(subscriptionsTable),
}));

export const blogsTable = pgTable("blogs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull().unique(),
  url: text().notNull().unique(),
});

export const blogsRelations = relations(blogsTable, ({ one }) => ({
  subscriptionsTable: one(subscriptionsTable),
}));

export const subscriptionsTable = pgTable("subscriptions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  blogId: integer()
    .notNull()
    .references(() => blogsTable.id),
  userId: integer()
    .notNull()
    .references(() => usersTable.id),
  isActive: boolean().default(true),
  ...timestamps,
});

export const subscriptionsRelations = relations(
  subscriptionsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [subscriptionsTable.userId],
      references: [usersTable.id],
    }),
    blog: one(blogsTable, {
      fields: [subscriptionsTable.blogId],
      references: [blogsTable.id],
    }),
  })
);
