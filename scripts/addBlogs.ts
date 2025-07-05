import db from "@/lib/db";
import { blogData } from "@/oneblog/utils/blogs";
import { blogsTable } from "@/lib/db/schema";

async function addBlogs() {
  for (const blogTitle in blogData) {
    const { rss, blogHome, creator } = blogData[blogTitle];

    const insertedBlog = await db.insert(blogsTable).values({
      creator,
      name: blogTitle,
      blogUrl: blogHome,
      rssUrl: rss,
    });

    console.log("\nInserted Blog:", insertedBlog, "\n");
  }
}
