"use server";

import db from "@/lib/db";
import { blogRequestsTable } from "@/lib/db/schema";
import {
  blogRequestInsertSchema,
  type BlogRequestInsert,
} from "@/lib/db/schema.types";

export async function addBlogRequest(input: BlogRequestInsert) {
  const inputIsValid = blogRequestInsertSchema.safeParse(input).success;

  if (!inputIsValid) {
    return null;
  }

  const insertRes = await db
    .insert(blogRequestsTable)
    .values(input)
    .returning();
  console.log("\nInsert Res:", insertRes, "\n");

  if (insertRes.length === 1) {
    return insertRes[0];
  }

  return null;
}
