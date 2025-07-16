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
import PostsListFallback from "./components/posts-list-fallback";

const parser = new Parser();

const OneBlog = async () => {
  const session = await getSession();

  let subscriptions: Subscription[] = [];
  let blogs: Blog[] = [];

  // if (!session) return <div>Error Fetching Current Session</div>;

  if (session) {
    [subscriptions, blogs] = await Promise.all([
      db
        .select()
        .from(subscriptionsTable)
        .where(eq(subscriptionsTable.userId, session.id)),
      db.select().from(blogsTable),
    ]);
  } else {
    blogs = await db.select().from(blogsTable);
  }

  const subscribedToBlogIds = !session
    ? []
    : subscriptions.map((s) => s.blogId);

  const subscribedToBlogs = !session
    ? blogs
    : blogs.filter((b) => subscribedToBlogIds.includes(b.id));

  const posts =
    subscribedToBlogs.length === 0
      ? null
      : Promise.all(
          subscribedToBlogs.map(async (b) => {
            const feed = await parser.parseURL(b.rssUrl);
            feed.creator = feed.items[0]?.creator || b.creator;
            for (let item of feed.items) {
              item.creator = item.creator || b.creator;
              item.blogId = b.id;
              item.searchValue = (
                item.creator +
                " " +
                item.title
              ).toLowerCase();
              console.log("searchValue:", item.searchValue);
            }
            return feed;
          })
        );

  let showFallback = 0;
  return (
    <div className="pt-6 px-2 flex flex-col items-center w-full responsive-border">
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {/* <Suspense fallback={<div>Temp Fallback Placeholder</div>}> */}

      <div className="sm:w-[412px] md:w-[572px]">
        {!!showFallback ? (
          <PostsListFallback />
        ) : (
          <Suspense fallback={<PostsListFallback />}>
            {posts !== null ? (
              <PostsList subscribedToBlogs={subscribedToBlogs} posts={posts} />
            ) : (
              <div className="flex flex-col items-center gap-y-2 w-fit">
                <p className="font-medium">You don't have any subscriptions</p>
                <Link href="/oneblog/subscriptions">
                  <Button>Add Some Here</Button>
                </Link>
              </div>
            )}
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default OneBlog;
