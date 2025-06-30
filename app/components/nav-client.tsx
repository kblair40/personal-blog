"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const myBlogRoutes = {
  "/": {
    name: "home",
  },
  "/blog": {
    name: "blog",
  },
  "/oneblog": {
    name: "one-blog",
  },
  //   "/oneblog/signup": {
  //     name: "Signup",
  //   },
  //   "/oneblog/login": {
  //     name: "Login",
  //   },
  //   "/oneblog/subscriptions": {
  //     name: "OneBlog Subscriptions",
  //   },
};

const oneBlogRoutes = {
  "/": {
    name: "kb blog",
  },
  "/oneblog": {
    name: "home",
  },
  "/oneblog/subscriptions": {
    name: "subscriptions",
  },
};

const oneBlogNotAuthenticatedRoutes = {
  "/oneblog/signup": {
    name: "signup",
  },
  "/oneblog/login": {
    name: "login",
  },
};

const oneBlogAuthenticatedRoutes = {
  "/oneblog/logout": {
    name: "logout",
  },
};

export function NavbarClient() {
  const pathname = usePathname();
  console.log("pathname:", pathname);

  const navItems = pathname.startsWith("/oneblog")
    ? oneBlogRoutes
    : myBlogRoutes;

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
