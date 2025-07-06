import React from "react";

import type { Session } from "@/lib/types";
import { getSession } from "@/lib/session";
import SubscriptionList from "../components/subscription-list";
import db from "@/lib/db";
import { blogsTable } from "@/lib/db/schema";
import type { Blog } from "@/lib/db/schema.types";

type Props = {};

const OneBlogSubscriptions = async (props: Props) => {
  // const blogRes = fetch("localhost:3001/api/blogs");
  const session = await getSession();

  const blogs: Promise<Blog[]> = db.select().from(blogsTable);
  // const subscriptions =

  if (!session) {
    return <div>You are not logged in</div>;
  }

  return (
    <div>
      <SubscriptionList userId={session.id} blogs={blogs} />
    </div>
  );
};

export default OneBlogSubscriptions;
