import React from "react";
import Parser from "rss-parser";

type Props = {};

const parser = new Parser();

const OneBlog = async (props: Props) => {
  const feed = await parser.parseURL("http://localhost:3001/rss");
  console.log("\nFeed:", feed, "\n");
  const comeau = await parser.parseURL("https://www.joshwcomeau.com/rss.xml");
  console.log("\nComeau:", comeau, "\n");

  return (
    <div className="border absolute left-4 right-4 top-20">
      <pre>{JSON.stringify({ feed, comeau }, null, 2)}</pre>
    </div>
  );
};

export default OneBlog;
