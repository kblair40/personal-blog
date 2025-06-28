import React from "react";
import type { Item } from "rss-parser";

type Props = {
  post: Item;
};

const Post = ({ post }: Props) => {
  return (
    <div className="">
      <a target="_blank" href={post.link}>
        <h3 className="font-medium">{post.title}</h3>
      </a>
      <p>{post.creator || "?"}</p>
    </div>
  );
};

export default Post;
