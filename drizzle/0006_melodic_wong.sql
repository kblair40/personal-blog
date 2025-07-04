ALTER TABLE "blogs" RENAME COLUMN "url" TO "blogUrl";--> statement-breakpoint
ALTER TABLE "blogs" DROP CONSTRAINT "blogs_url_unique";--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "rssUrl" text NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_blogUrl_unique" UNIQUE("blogUrl");--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_rssUrl_unique" UNIQUE("rssUrl");