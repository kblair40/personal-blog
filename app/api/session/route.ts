import type { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

import { verify } from "@/lib/jwt";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const cookieStore = await cookies();
  const token = cookieStore.get("session");
  console.log("\nALL COOKIES:", token, "\n");

  if (token) {
    const session = await verify(token.value);
    console.log("\nSERVER SESSION:", session, "\n");
    return Response.json(session, { status: 200 });
  }

  return new Response(null, { status: 500 });
}
