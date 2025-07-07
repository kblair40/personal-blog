"use client";

import React, { use, useState } from "react";
import Parser from "rss-parser";
import type { Item } from "rss-parser";
import { CalendarArrowDown, CalendarArrowUp } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Post from "./post";
import PostFilters from "./post-filters";
import type { Blog } from "@/lib/db/schema.types";

type Posts = ({
  [key: string]: any;
} & Parser.Output<{
  [key: string]: any;
}>)[];

type Props = {
  posts: Promise<Posts>;
  subscribedToBlogs: Blog[];
};

const PostsList = ({ posts, subscribedToBlogs }: Props) => {
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [selectedBlog, setSelectedBlog] = useState<undefined | number>(
    undefined
  );

  const postArrays = use(posts);
  console.log("POSTS:", postArrays);

  function handleChangeSelectedBlog(value: number | undefined) {
    setSelectedBlog(value);
    if (typeof value === "number") {
      //
    }
  }

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
    <div className="flex flex-col gap-y-4 w-fit">
      <section className="flex gap-x-4">
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button
              onClick={() =>
                setSortDir((prev) => (prev === "desc" ? "asc" : "desc"))
              }
              size="lg"
              className="p-0 text-base"
              variant="secondary"
            >
              Date{" "}
              {sortDir === "asc" ? <CalendarArrowUp /> : <CalendarArrowDown />}
            </Button>
          </TooltipTrigger>

          <TooltipContent side="right">
            <p>{sortDir === "asc" ? "Oldest at top" : "Newest at top"}</p>
          </TooltipContent>
        </Tooltip>

        <PostFilters
          subscribedToBlogs={subscribedToBlogs}
          value={selectedBlog}
          onChange={handleChangeSelectedBlog}
        />
      </section>

      <section className="flex flex-col gap-y-6">
        {sortedPosts.map((post, i) => {
          return <Post key={i} post={post} />;
        })}
      </section>
    </div>
  );
};

export default PostsList;
