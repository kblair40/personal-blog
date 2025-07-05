import { eq } from "drizzle-orm";

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

async function updateBlog(blog: Blog): Promise<Blog | undefined> {
  // Send blogs that were prevented from updating to 'unique' constraint here
  try {
    const updatedBlog: Blog[] = await db
      .update(blogsTable)
      .set(blog)
      .where(eq(blogsTable.name, blog.name))
      .returning();

    return updatedBlog[0];
  } catch (e) {
    logError(e, blog, "update");
  }
}

function makeBlogMap(blogs: Blog[]): Record<string, Blog> {
  return blogs.reduce((acc: Record<string, Blog>, blog) => {
    acc[blog.name] = blog;
    return acc;
  }, {});
}

async function addBlogs() {
  const blogs: Blog[] = await db.select().from(blogsTable);
  const blogMap = makeBlogMap(blogs);

  console.log("\nAll blogs:", blogs, "\n");
  for (const name in blogData) {
    const { rss: rssUrl, blogHome: blogUrl, creator } = blogData[name];

    const blog: Blog = { creator, name, blogUrl, rssUrl };

    if (name in blogMap) {
      const updatedBlog = await updateBlog(blog);
      console.log("\nUpdated Blog:", updatedBlog);
      continue;
    }

    try {
      const insertedBlog = await db.insert(blogsTable).values(blog).returning();
      console.log("\nInserted Blog:", insertedBlog);
    } catch (e) {
      logError(e, blog, "insert");
    }
  }
}

function logError(e: unknown, blog: Blog, type: "insert" | "update") {
  // @ts-ignore
  if (e instanceof Error && e.cause?.constraint?.endsWith("unique")) {
    console.log("ALREADY INSERTED:", JSON.stringify(blog, null, 2));
  } else {
    console.log(`\n${type.toUpperCase()} failed (UNHANDLED):`, e, "\n");
  }
}

addBlogs();
