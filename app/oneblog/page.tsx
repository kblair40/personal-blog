import React from "react";
import Parser from "rss-parser";

import PostsList from "./components/posts-list";

const parser = new Parser();

const OneBlog = async () => {
  const postArrays = Promise.all([
    parser.parseURL("http://localhost:3001/rss"),
    parser.parseURL("https://www.joshwcomeau.com/rss.xml"),
  ]);
  console.log(0, postArrays[0]);

  return (
    <div>
      <PostsList posts={postArrays} />
    </div>
  );
};

export default OneBlog;
