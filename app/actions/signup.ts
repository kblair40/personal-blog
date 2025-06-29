"use server";

import { z } from "zod/v4";

const signupInput = z.object({
  firstName: z
    .string({})
    .trim()
    .regex(/^[a-z]*$/i)
    .nullish(),
    // .nullable(),
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
  console.log("\nParse Result:", result, { e: result.error }, "\n");

  return result;
}
