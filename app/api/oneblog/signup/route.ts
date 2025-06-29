import type { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  console.log("\nData:", data, "\n");

  return Response.json(data, { status: 200 });
}
