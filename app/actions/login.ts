"use server";

import { z } from "zod/v4";
import { cookies } from "next/headers";
import { eq, and } from "drizzle-orm";

import { usersTable } from "@/lib/db/schema";
import db from "@/lib/db";
import { encrypt, verify } from "@/lib/jwt";
// import { signupInput } from "./signup";

// const loginInput = signupInput.pick({ email: true, password: true });
const loginInput = z.object({
  email: z.email().trim(),
  password: z
    .string({})
    .trim()
    .regex(/^[a-z0-9]+$/i),
});

export type LoginInput = z.infer<typeof loginInput>;

export async function login(data: FormData) {
  const result = loginInput.safeParse({
    email: data.get("email"),
    password: data.get("password"),
  });
  console.log("\nParse Login Result:", result, { e: result.error }, "\n");

  if (result.success) {
    try {
      const foundUsers = await db
        .select()
        .from(usersTable)
        .where(
          and(
            eq(usersTable.password, result.data.password),
            eq(usersTable.email, result.data.email)
          )
        );
      console.log("\nFound User:", foundUsers, "\n");

      if (foundUsers.length !== 1) {
        throw new Error("Invalid number of users found");
      }

      const cookieStore = await cookies();
      const session = await encrypt(foundUsers[0]);

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
