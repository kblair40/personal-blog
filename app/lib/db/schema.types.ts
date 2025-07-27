import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod/v4";

import * as schema from "./schema";

export const blogSelectSchema = createSelectSchema(schema.blogsTable);
export const blogInsertSchema = createInsertSchema(schema.blogsTable);
export const blogUpdateSchema = createUpdateSchema(schema.blogsTable);
export type Blog = z.infer<typeof blogSelectSchema>;
export type BlogInsert = z.infer<typeof blogInsertSchema>;
export type BlogUpdate = z.infer<typeof blogUpdateSchema>;

export const userSelectSchema = createSelectSchema(schema.usersTable);
export const userInsertSchema = createInsertSchema(schema.usersTable);
export const userUpdateSchema = createUpdateSchema(schema.usersTable);
export type User = z.infer<typeof userSelectSchema>;
export type UserInsert = z.infer<typeof userInsertSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;

export const subscriptionSelectSchema = createSelectSchema(
  schema.subscriptionsTable
);
export const subscriptionInsertSchema = createInsertSchema(
  schema.subscriptionsTable
);
export const subscriptionUpdateSchema = createUpdateSchema(
  schema.subscriptionsTable
);
export type Subscription = z.infer<typeof subscriptionSelectSchema>;
export type SubscriptionInsert = z.infer<typeof subscriptionInsertSchema>;
export type SubscriptionUpdate = z.infer<typeof subscriptionUpdateSchema>;

export const blogRequestSelectSchema = createSelectSchema(
  schema.blogRequestsTable
);
export const blogRequestInsertSchema = createInsertSchema(
  schema.blogRequestsTable
)
  .omit({ blogUrl: true, rssUrl: true })
  .extend({ blogUrl: z.url(), rssUrl: z.url() });
export const blogRequestUpdateSchema = createUpdateSchema(
  schema.blogRequestsTable
)
  .omit({ blogUrl: true, rssUrl: true })
  .extend({ blogUrl: z.url(), rssUrl: z.url() });
export type BlogRequest = z.infer<typeof blogRequestSelectSchema>;
export type BlogRequestInsert = z.infer<typeof blogRequestInsertSchema>;
export type BlogRequestUpdate = z.infer<typeof blogRequestUpdateSchema>;
