import "server-only";

import { SignJWT, jwtVerify } from "jose";

import type { Session } from "./types";

const JWT_SECRET = process.env.JWT_SECRET;

const secret = new TextEncoder().encode(JWT_SECRET);

export async function encrypt(
  data: Record<string, string | number | null | undefined>
) {
  const jwt = await new SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1w")
    .sign(secret);

  return jwt;
}

export async function verify(jwt: string) {
  const { payload } = await jwtVerify(jwt, secret);

  if (new Date().getTime() / 1000 < (payload.exp || 0)) {
    return payload;
  }

  return null;
}

export async function decrypt(
  session: string | undefined = ""
): Promise<Session | undefined> {
  console.log("\nDecrypt input:", session);

  if (!session) return undefined;

  try {
    const { payload } = await jwtVerify(session, secret, {
      algorithms: ["HS256"],
    });
    console.log("\nDecrypt payload:", payload, "\n");
    return payload as Session;
  } catch (error) {
    console.log("Failed to verify session");
  }
}
