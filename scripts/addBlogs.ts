import db from "@/lib/db";
import { blogData } from "@/oneblog/utils/blogs";
import { blogsTable } from "@/lib/db/schema";

type Blog = {
  id?: number;
  creator: string;
  name: string;
  blogUrl: string;
  rssUrl: string;
};

async function updateBlog(blog: Blog) {
  // Send blogs that were prevented from updating to 'unique' constraint here
}

async function addBlogs() {
  const blogs = await db.select().from(blogsTable);
  console.log('\nAll blogs:', blogs, '\n')
  return;
  for (const name in blogData) {
    const { rss: rssUrl, blogHome: blogUrl, creator } = blogData[name];

    const blog: Blog = { creator, name, blogUrl, rssUrl };

    try {
      const insertedBlog = await db.insert(blogsTable).values(blog).returning();
      console.log("\nInserted Blog:", insertedBlog, "\n");
    } catch (e) {
      logError(e, blog);
    }
  }
}

function logError(e: unknown, blog: Blog) {
  // @ts-ignore
  if (e instanceof Error && e.cause?.constraint === "blogs_name_unique") {
    console.log("ALREADY INSERTED:", JSON.stringify(blog, null, 2));
  } else {
    console.log("\nInsert failed (UNHANDLED):", e, "\n");
  }
}

addBlogs();
