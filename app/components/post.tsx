import React from "react";
import type { Item } from "rss-parser";

type Props = {
  post: Item;
};

const Post = ({ post }: Props) => {
  return (
    <div className="w-fit group">
      <a
        target="_blank"
        href={post.link}
        className="underline-offset-2 hover:underline"
      >
        <h3 className="font-semibold text-lg">{post.title}</h3>
      </a>

      <div className="flex gap-x-3">
        <p className="opacity-70">{post.creator || "?"}</p>
        <p className="opacity-70">
          {post.isoDate ? new Date(post.isoDate).toLocaleDateString() : "?"}
        </p>
      </div>
    </div>
  );
};

export default Post;
