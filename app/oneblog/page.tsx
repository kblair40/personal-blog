import React, { Suspense } from "react";
import Parser from "rss-parser";

import { blogData } from "./utils/blogs";
import PostsList from "./components/posts-list";

const parser = new Parser();

const OneBlog = async () => {
  const data = Promise.all(
    Object.values(blogData).map(async (data) => {
      const feed = await parser.parseURL(data.rss);
      feed.creator = feed.items[0]?.creator || data.meta.creator;
      for (let item of feed.items) {
        item.creator = item.creator || data.meta.creator;
      }

      return feed;
    })
  );

  return (
    <div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <Suspense fallback={<div>Temp Fallback Placeholder</div>}>
        <PostsList posts={data} />
        {/* <PostsList posts={postArrays} /> */}
      </Suspense>
    </div>
  );
};

export default OneBlog;
