"use client";

import React, { use } from "react";
import Parser from "rss-parser";
// import type { Item } from "rss-parser";

import Post from "./post";

type Posts = ({
  [key: string]: any;
} & Parser.Output<{
  [key: string]: any;
}>)[];

type Props = {
  //   posts: Item[][];
  posts: Promise<Posts>;
};

const PostsList = ({ posts }: Props) => {
  const postArrays = use(posts);

  for (let arr of postArrays) {
    console.log("First post:", arr.items[0], {
      title: arr.title,
      description: arr.description,
      feedUrl: arr.feedUrl,
      link: arr.link
    });
  }

  return (
    <div className="flex flex-col gap-y-4">
      {postArrays.map((arr, i) => {
        return arr.items.map((post, j) => {
          return <Post key={`${i}-${j}`} post={post} />;
        });
      })}
    </div>
  );
};

export default PostsList;
