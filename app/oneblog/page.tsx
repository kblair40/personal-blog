import React, { Suspense } from "react";
import Parser from "rss-parser";

import PostsList from "./components/posts-list";

const parser = new Parser();

const urls = [
  "http://localhost:3001/rss",
  "https://sinja.io/rss",
  "https://www.joshwcomeau.com/rss.xml",
];

const OneBlog = async () => {
  const postArrays = Promise.all(
    urls.map((url) => {
      return parser.parseURL(url);
    })
  );

  return (
    <div>
      <Suspense fallback={<div>Temp Fallback Placeholder</div>}>
        <PostsList posts={postArrays} />
      </Suspense>
    </div>
  );
};

export default OneBlog;
