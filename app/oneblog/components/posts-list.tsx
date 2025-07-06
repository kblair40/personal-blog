"use client";

import React, { use, useState } from "react";
import Parser from "rss-parser";
import type { Item } from "rss-parser";
import { CalendarArrowDown, CalendarArrowUp } from "lucide-react";

import Post from "./post";
import { Button } from "@/components/ui/button";

type Posts = ({
  [key: string]: any;
} & Parser.Output<{
  [key: string]: any;
}>)[];

type Props = {
  posts: Promise<Posts>;
};

const PostsList = ({ posts }: Props) => {
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const postArrays = use(posts);

  console.log("POSTS:", postArrays);

  let _posts: Item[] = [];
  for (let postArr of postArrays) {
    _posts = _posts.concat(postArr.items);
  }

  const sortedPosts =
    sortDir === "asc"
      ? _posts.sort(
          (a, b) =>
            new Date(a.isoDate!).getTime() - new Date(b.isoDate!).getTime()
        )
      : _posts.sort(
          (a, b) =>
            new Date(b.isoDate!).getTime() - new Date(a.isoDate!).getTime()
        );

  return (
    <div className="flex flex-col gap-y-4">
      <section className="">
        <Button
          onClick={() =>
            setSortDir((prev) => (prev === "desc" ? "asc" : "desc"))
          }
          size="lg"
          className="p-0 text-base"
          variant="secondary"
        >
          Date {sortDir === "asc" ? <CalendarArrowUp /> : <CalendarArrowDown />}
        </Button>
      </section>

      <section className="flex flex-col gap-y-4">
        {sortedPosts.map((post, i) => {
          return <Post key={i} post={post} />;
        })}
      </section>
    </div>
  );
};

export default PostsList;
