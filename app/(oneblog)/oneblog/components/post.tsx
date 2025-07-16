import React from "react";
import type { Item } from "rss-parser";

type Props = {
  post: Item;
};

const Post = ({ post }: Props) => {
  return (
    <div className="w-fit">
      <a target="_blank" href={post.link}>
        <h3 className="font-semibold text-lg">{post.title}</h3>
      </a>
      <div className="flex gap-x-3">
        <p className="opacity-20">{post.creator || "?"}</p>
        <p className="opacity-20">
          {post.isoDate ? new Date(post.isoDate).toLocaleDateString() : "?"}
        </p>
      </div>
    </div>
  );
};

export default Post;
