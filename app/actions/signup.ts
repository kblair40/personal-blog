"use server";

import { z } from "zod/v4";

const SignupInput = z.object({
  firstName: z.string({}).nullable(),
  lastName: z.string({}).nullable(),
  email: z.email({
    //
  }),
  password: z.string({}),
  confirmPassword: z.string({}),
});

export async function signup(data: FormData) {
  const result = SignupInput.safeParse(data);
  console.log("\nParse Result:", result, "\n");
}
