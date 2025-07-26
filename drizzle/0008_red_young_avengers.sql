CREATE TABLE "blog_requests" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "blog_requests_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"blogUrl" text NOT NULL,
	"rssUrl" text NOT NULL,
	"details" text,
	"created_at" timestamp DEFAULT now()
);
