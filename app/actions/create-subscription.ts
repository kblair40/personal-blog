"use server";

import { z } from "zod/v4";
import { eq, and } from "drizzle-orm";

import { subscriptionsTable } from "@/lib/db/schema";
import db from "@/lib/db";

const subscriptionInput = z.object({
  userId: z.int(),
  blogId: z.int(),
});

export type SubscriptionInput = z.infer<typeof subscriptionInput>;

export async function createSubscription(input: SubscriptionInput) {
  const result = subscriptionInput.safeParse(input);
  console.log(
    "\nParse Subscription Result:",
    result,
    { e: result.error },
    "\n"
  );

  if (!result.success) {
    return null;
  }

  const insertRes = await db
    .insert(subscriptionsTable)
    .values(input)
    .returning();
  console.log("\nInsert Res:", insertRes, "\n");

  return insertRes;
}
