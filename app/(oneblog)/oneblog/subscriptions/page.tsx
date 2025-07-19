import React, { Suspense } from "react";
import { eq } from "drizzle-orm";

import type { Session } from "@/lib/types";
import { getSession } from "@/lib/session";
import SubscriptionList from "../../../components/subscription-list";
import db from "@/lib/db";
import { blogsTable, subscriptionsTable } from "@/lib/db/schema";
import type { Blog, Subscription } from "@/lib/db/schema.types";

type Props = {};

const OneBlogSubscriptions = async (props: Props) => {
  // const blogRes = fetch("localhost:3001/api/blogs");
  const session = await getSession();

  if (!session) {
    return <div>You are not logged in</div>;
  }

  const blogs: Promise<Blog[]> = db.select().from(blogsTable);
  const subscriptions: Promise<Subscription[]> = db
    .select()
    .from(subscriptionsTable)
    .where(eq(subscriptionsTable.userId, session.id));

  return (
    <div className="pt-8 px-2">
      <Suspense fallback={<div />}>
        <SubscriptionList
          userId={session.id}
          blogs={blogs}
          subscriptions={subscriptions}
        />
      </Suspense>
    </div>
  );
};

export default OneBlogSubscriptions;
