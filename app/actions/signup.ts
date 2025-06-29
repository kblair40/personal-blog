"use server";

import { z } from "zod/v4";
import { cookies } from "next/headers";

import { usersTable } from "@/lib/db/schema";
import db from "@/lib/db";
import { encrypt } from "@/lib/jwt";

const signupInput = z.object({
  firstName: z
    .string({})
    .trim()
    .regex(/^[a-z]*$/i)
    .nullish(),
  lastName: z
    .string({})
    .trim()
    .regex(/^[a-z]*$/i)
    .nullish(),
  email: z.email().trim(),
  password: z
    .string({})
    .trim()
    .regex(/^[a-z0-9]+$/i),
  confirmPassword: z
    .string({})
    .trim()
    .regex(/^[a-z]+$/i),
});

export type SignupInput = z.infer<typeof signupInput>;

export async function signup(data: FormData) {
  const result = signupInput.safeParse({
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    email: data.get("email"),
    password: data.get("password"),
    confirmPassword: data.get("confirmPassword"),
  });

  if (result.success) {
    try {
      const { confirmPassword, ...tokenData } = result.data;
      const createdUser = await db
        .insert(usersTable)
        .values(result.data)
        .returning();
      console.log("\nCreated User:", createdUser, "\n");

      if (!createdUser) {
        return null;
      }

      const cookieStore = await cookies();
      const session = await encrypt(createdUser[0]);

      const oneDay = 24 * 60 * 60 * 1000;
      const expiresAt = new Date(Date.now() + oneDay * 7); // 1week
      if (session) {
        cookieStore.set("session", session, {
          httpOnly: true,
          secure: true,
          expires: expiresAt,
          sameSite: "lax",
          path: "/",
        });
      }
    } catch (e) {
      console.log("Insert user failed:", e);
    }
  }

  return result;
}
