import type { NextApiRequest, NextApiResponse } from "next";

import db from "@/lib/db";
import { blogsTable } from "@/lib/db/schema";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const blogs = await db.select().from(blogsTable);

  return Response.json(blogs, { status: 200 });
}
