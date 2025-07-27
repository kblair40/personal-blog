"use server";

import z, { type ZodError } from "zod/v4";

import db from "@/lib/db";
import { blogRequestsTable } from "@/lib/db/schema";
import {
  blogRequestInsertSchema,
  type BlogRequestInsert,
} from "@/lib/db/schema.types";

function formatErrors(e: ZodError) {
  const { _errors, ...formattedErrors } = z.formatError(e);

  return formattedErrors;
}

export async function addBlogRequest(input: BlogRequestInsert) {
  const parseRes = blogRequestInsertSchema.safeParse(input);
  console.log("\nParse Res:", parseRes, "\n");

  if (!parseRes.success) {
    if (parseRes.error) {
      return formatErrors(parseRes.error);
    }

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
