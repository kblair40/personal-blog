import Parser from "rss-parser";

const parser = new Parser();

const blogData = {
  "Kevin Blair": {
    rss: "http://localhost:3001/rss",
    meta: {
      creator: "Kevin Blair",
    },
  },
  OlegWock: {
    rss: "https://sinja.io/rss",
    meta: {
      creator: "Oleh Wock",
    },
  },
  "Josh W. Comeau": {
    rss: "https://www.joshwcomeau.com/rss.xml",
    meta: {
      creator: "Josh W. Comeau",
    },
  },
};

// NOT IN USE

export async function GET() {
  const data = await Promise.all(
    Object.entries(blogData).map(async ([blog, data]) => {
      const feed = await parser.parseURL(data.rss);
      feed.creator = feed.items[0]?.creator || data.meta.creator;

      for (let item of feed.items) {
        item.creator = item.creator || data.meta.creator;
      }

      return feed;
    })
  );
  console.log("\nData:", data, "\n");

  return Response.json(data, { status: 200 });
}
