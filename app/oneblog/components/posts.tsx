import React from "react";
import Parser, { type Item } from "rss-parser";

import Post from "./post";

type Output = Parser.Output<{
  [key: string]: any;
}>;
type PostsOutput = {
  [key: string]: any;
};

type Posts = ({
  [key: string]: any;
} & Parser.Output<{
  [key: string]: any;
}>)[];

type Props = {
  //   posts: (PostsOutput & Output)[];
  //   posts: Posts;
  posts: Item[][];
};

const PostsList = (props: Props) => {
  return <div>posts</div>;
};

export default PostsList;
