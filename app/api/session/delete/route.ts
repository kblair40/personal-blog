import type { NextApiRequest, NextApiResponse } from "next";

import { logout } from "@/actions/logout";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const logoutRes = await logout();

  return new Response(null, { status: !!logoutRes ? 200 : 500 });
}
