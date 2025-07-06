import React, { Suspense } from "react";
import Parser from "rss-parser";
import { eq } from "drizzle-orm";

import { blogData } from "./utils/blogs";
import PostsList from "./components/posts-list";
import db from "@/lib/db";
import { subscriptionsTable, blogsTable } from "@/lib/db/schema";
import type { Subscription, Blog } from "@/lib/db/schema.types";
import { getSession } from "@/lib/session";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const parser = new Parser();

const OneBlog = async () => {
  const session = await getSession();

  if (!session) return <div>Error Fetching Current Session</div>;

  const [subscriptions, blogs] = await Promise.all([
    db
      .select()
      .from(subscriptionsTable)
      .where(eq(subscriptionsTable.userId, session.id)),
    db.select().from(blogsTable),
  ]);

  const subscribedToBlogIds = subscriptions.map((s) => s.blogId);
  const subscribedToBlogs = blogs.filter((b) =>
    subscribedToBlogIds.includes(b.id)
  );

  const posts =
    subscribedToBlogs.length === 0
      ? null
      : Promise.all(
          subscribedToBlogs.map(async (b) => {
            const feed = await parser.parseURL(b.rssUrl);
            feed.creator = feed.items[0]?.creator || b.creator;
            for (let item of feed.items) {
              item.creator = item.creator || b.creator;
            }
            return feed;
          })
        );

  return (
    <div className="pt-6 px-2">
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <Suspense fallback={<div>Temp Fallback Placeholder</div>}>
        {posts !== null ? (
          <PostsList posts={posts} />
        ) : (
          <div className="flex flex-col items-center gap-y-2 w-fit">
            <p className="font-medium">You don't have any subscriptions</p>
            <Link href="/oneblog/subscriptions">
              <Button>Add Some Here</Button>
            </Link>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default OneBlog;
