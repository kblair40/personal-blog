"use server";

import { z } from "zod/v4";
import { eq, and } from "drizzle-orm";

import { subscriptionsTable } from "@/lib/db/schema";
import db from "@/lib/db";

const addSubscriptionInput = z.object({
  userId: z.int(),
  blogId: z.int(),
  action: z.literal("add"),
});
const removeSubscriptionInput = z.object({
  subscriptionId: z.int(),
  action: z.literal("remove"),
});

export type AddSubscriptionInput = z.infer<typeof addSubscriptionInput>;
export type RemoveSubscriptionInput = z.infer<typeof removeSubscriptionInput>;

export async function updateSubscription(
  input: AddSubscriptionInput | RemoveSubscriptionInput
) {
  const inputIsValid =
    input.action === "add"
      ? addSubscriptionInput.safeParse(input).success
      : removeSubscriptionInput.safeParse(input).success;

  if (!inputIsValid) {
    return null;
  }

  if (input.action === "add") {
    const insertRes = await db
      .insert(subscriptionsTable)
      .values(input)
      .returning();
    console.log("\nInsert Res:", insertRes, "\n");

    if (insertRes.length === 1) {
      return insertRes[0];
    }
    return null;
  } else {
    console.log("\nsubscriptionId:", input.subscriptionId);
    const deleteRes = await db
      .delete(subscriptionsTable)
      .where(eq(subscriptionsTable.id, input.subscriptionId))
      .returning();
    console.log("\nDELETE RES:", deleteRes);

    if (deleteRes.length === 1) {
      return deleteRes[0];
    }

    return null;
  }
}
