import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar({ length: 30 }),
  lastName: varchar({ length: 30 }),
  email: varchar({ length: 50 }).notNull().unique(),
  password: varchar({ length: 80 }).notNull(),
});
