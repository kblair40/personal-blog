import db from "@/lib/db";
import { blogData } from "@/oneblog/utils/blogs";
import { blogsTable } from "@/lib/db/schema";

async function updateBlogs() {
    // Send blogs that were prevented from updating to 'unique' constraint here
}

async function addBlogs() {
  for (const name in blogData) {
    const { rss: rssUrl, blogHome: blogUrl, creator } = blogData[name];

    const blog = { creator, name, blogUrl, rssUrl };

    try {
      const insertedBlog = await db.insert(blogsTable).values(blog).returning();

      console.log("\nInserted Blog:", insertedBlog, "\n");
    } catch (e) {
      console.log("\nInsert failed:", e, { keys: Object.keys(e || {}) });
      // @ts-ignore
      const cause = e.cause as Record<string, any>;
      console.log("\nCAUSE:", {
        detail: cause.detail,
        name: cause.name,
        code: cause.code,
        routine: cause.routine,
        constraint: cause.constraint,
      });

      //   if ("cause" in (e as Record<string, any>)) {
        if (e instanceof Error) {
          // @ts-ignore
        if (e.cause.constraint === "blogs_name_unique") {
          console.log("ALREADY INSERTED:", JSON.stringify(blog, null, 2));
        }
      }
    }
  }
}


addBlogs();
