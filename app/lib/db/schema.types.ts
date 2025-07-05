import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod/v4";

import * as schema from "./schema";

const blogSelectSchema = createSelectSchema(schema.blogsTable);
const blogInsertSchema = createInsertSchema(schema.blogsTable);
const blogUpdateSchema = createUpdateSchema(schema.blogsTable);
export type Blog = z.infer<typeof blogSelectSchema>;
export type BlogInsert = z.infer<typeof blogInsertSchema>;
export type BlogUpdate = z.infer<typeof blogUpdateSchema>;

const userSelectSchema = createSelectSchema(schema.usersTable);
const userInsertSchema = createInsertSchema(schema.usersTable);
const userUpdateSchema = createUpdateSchema(schema.usersTable);
export type User = z.infer<typeof userSelectSchema>;
export type UserInsert = z.infer<typeof userInsertSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
