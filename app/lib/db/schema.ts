import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar({ length: 30 }).notNull(),
  lastName: varchar({ length: 30 }).notNull(),
  email: varchar({ length: 50 }).notNull().unique(),
  password: varchar({ length: 80 }).notNull().unique(),
});
