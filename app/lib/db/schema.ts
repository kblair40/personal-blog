import { integer, pgTable, varchar, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { timestamps } from "./column-helpers";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar({ length: 30 }),
  lastName: varchar({ length: 30 }),
  email: varchar({ length: 50 }).notNull().unique(),
  password: varchar({ length: 80 }).notNull(),
});

export const blogsTable = pgTable("blogs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull().unique(),
  url: text().notNull().unique(),
});

export const subscriptionsTable = pgTable("subscriptions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  blogId: integer().notNull(),
  userId: integer().notNull(),
  ...timestamps,
});
