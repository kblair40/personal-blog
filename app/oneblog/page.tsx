import React from "react";
import Parser from "rss-parser";

import Post from "./components/post";

type Props = {};

const parser = new Parser();

const OneBlog = async (props: Props) => {
  //   const feed = await parser.parseURL("http://localhost:3001/rss");
  //   console.log("\nFeed:", feed.items[0], "\n");

  //   const comeau = await parser.parseURL("https://www.joshwcomeau.com/rss.xml");
  //   console.log("\nComeau:", comeau.items[0], "\n");

  const postArrays = await Promise.all([
    parser.parseURL("http://localhost:3001/rss"),
    parser.parseURL("https://www.joshwcomeau.com/rss.xml"),
  ]);
  console.log(0, postArrays[0]);

  return (
    <div className="flex flex-col gap-y-4">
      {/* <pre>{JSON.stringify({ feed, comeau }, null, 2)}</pre> */}

      {postArrays.map((arr, i) => {
        return arr.items.map((post, j) => {
          return <Post key={`${i}-${j}`} post={post} />;
        });
      })}
    </div>
  );
};

export default OneBlog;
