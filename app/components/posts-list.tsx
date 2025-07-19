"use client";

import React, { use, useState } from "react";
import Parser from "rss-parser";
import type { Item } from "rss-parser";
import { clsx } from "clsx";

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
  const postArrays = use(posts);
  console.log("POSTS:", postArrays);

  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [selectedBlog, setSelectedBlog] = useState<undefined | number>(
    undefined
  );
  const [postSearchValue, setPostSearchValue] = useState<string>("");

  function handleChangeSelectedBlog(value: number | undefined) {
    setSelectedBlog(value);
  }

  const totalPostsCount = postArrays.reduce(
    (count, postArr) => count + postArr.items.length,
    0
  );

  let _posts: Item[] = [];
  if (selectedBlog === undefined) {
    for (let postArr of postArrays) {
      _posts = _posts.concat(postArr.items);
    }
  } else {
    for (let postArr of postArrays) {
      if (postArr.items[0]?.blogId === selectedBlog) {
        _posts = _posts.concat(postArr.items);
      }
    }
  }

  if (postSearchValue) {
    _posts = _posts.filter((p) => {
      // @ts-ignore
      return (p.searchValue || "").includes(postSearchValue.toLowerCase());
    });
  }

  const visiblePostsCount = _posts.length;

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

  const sectionPadding = "px-6 md:px-8 lg:px-10";

  return (
    <div className="w-full h-full posts-grid relative">
      <section
        className={clsx("w-full h-[136px] sm:h-[88px] md:h-10", sectionPadding)}
      >
        <div
          className={clsx(
            "w-full flex flex-col sm:flex-row gap-y-2 flex-wrap md:flex-nowrap"
          )}
        >
          <PostFilters
            subscribedToBlogs={subscribedToBlogs}
            selectedBlog={selectedBlog}
            onChangeSelectedBlog={handleChangeSelectedBlog}
            postSearchValue={postSearchValue}
            onChangePostSearchValue={(value) => setPostSearchValue(value)}
            sortDir={sortDir}
            onChangeSortDir={(value: "asc" | "desc") => setSortDir(value)}
          />
        </div>
      </section>

      <section className={clsx("h-6", sectionPadding)}>
        <p className="font-light text-neutral-600">
          Showing {visiblePostsCount} of {totalPostsCount} Posts
        </p>
      </section>

      <section
        className={clsx(
          "w-full flex flex-col gap-y-6 border-t max-h-full overflow-y-auto pb-10 pt-2",
          sectionPadding
        )}
      >
        {sortedPosts.map((post, i) => {
          return <Post key={i} post={post} />;
        })}
      </section>
    </div>
  );
};

export default PostsList;
