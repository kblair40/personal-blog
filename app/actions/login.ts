"use server";

import { z } from "zod/v4";
import { cookies } from "next/headers";

import { usersTable } from "@/lib/db/schema";
import db from "@/lib/db";
import { encrypt, verify } from "@/lib/jwt";
import { signupInput } from "./signup";

const loginInput = signupInput.pick({ email: true, password: true });

export type LoginInput = z.infer<typeof loginInput>;

export async function login(data: FormData) {
  const result = loginInput.safeParse({
    email: data.get("email"),
    password: data.get("password"),
  });
  //   console.log("\nParse Result:", result, { e: result.error }, "\n");

  if (result.success) {
    try {
      const foundUser = await db.select().from(usersTable);
      console.log("\nFound User:", foundUser, "\n");

      const session = await encrypt(result.data);
      //   console.log("\nSign Result:", session, "\n");

      const cookieStore = await cookies();

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
