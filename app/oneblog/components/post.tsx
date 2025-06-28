import React from "react";
import type { Item } from "rss-parser";

type Props = {
  post: Item;
};

const Post = ({ post }: Props) => {
  return (
    <div className="">
      <h3 className="font-medium">{post.title}</h3>
      <p>{post.creator || "?"}</p>
    </div>
  );
};

export default Post;
