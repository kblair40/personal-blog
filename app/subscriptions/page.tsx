import React, { Suspense } from "react";
import Link from "next/link";
import { eq } from "drizzle-orm";

import type { Session } from "@/lib/types";
import { getSession } from "@/lib/session";
import SubscriptionList from "../components/subscription-list";
import db from "@/lib/db";
import { blogsTable, subscriptionsTable } from "@/lib/db/schema";
import type { Blog, Subscription } from "@/lib/db/schema.types";
import clsx from "clsx";

type Props = {};

const OneBlogSubscriptions = async (props: Props) => {
  // const blogRes = fetch("localhost:3001/api/blogs");
  const session = await getSession();

  if (!session) {
    return (
      <div className={clsx("page-wrapper centered-col")}>
        <div>You are not logged in</div>
        <div className="mt-6">
          <Link className="font-semibold hover:underline" href="/signup">Create an account</Link> or{" "}
          <Link className="font-semibold hover:underline" href="/login">login</Link> to manage subscriptions
        </div>
      </div>
    );
  }

  const blogs: Promise<Blog[]> = db.select().from(blogsTable);
  const subscriptions: Promise<Subscription[]> = db
    .select()
    .from(subscriptionsTable)
    .where(eq(subscriptionsTable.userId, session.id));

  return (
    <div
      className="h-fillpage max-h-fillpage overflow-hidden pt-8"
      // className={clsx(
      //   // "pt-8",
      //   !!session
      //     ? "h-fillpage max-h-fillpage overflow-hidden pt-8"
      //     : "page-wrapper"
      // )}
    >
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
