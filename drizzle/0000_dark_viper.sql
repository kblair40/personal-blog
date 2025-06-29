CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"firstName" varchar(30) NOT NULL,
	"lastName" varchar(30) NOT NULL,
	"email" varchar(50) NOT NULL,
	"password" varchar(80) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_password_unique" UNIQUE("password")
);
