"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { useUser } from "@/store/userStore";

type NavItem = Record<"name", string>;
type NavItems = Record<string, NavItem>;

const myBlogRoutes: NavItems = {
  "/": {
    name: "home",
  },
  "/blog": {
    name: "blog",
  },
  "/oneblog": {
    name: "one-blog",
  },
};

const oneBlogRoutes: NavItems = {
  "/": {
    name: "kb blog",
  },
  "/oneblog": {
    name: "one-blog",
  },
  "/oneblog/subscriptions": {
    name: "subscriptions",
  },
};

const oneBlogNotAuthenticatedRoutes: NavItems = {
  "/oneblog/signup": {
    name: "signup",
  },
  "/oneblog/login": {
    name: "login",
  },
};

// const oneBlogAuthenticatedRoutes: NavItems = {
//   "/oneblog/logout": {
//     name: "logout",
//   },
// };

export function NavbarClient() {
  const pathname = usePathname();
  console.log("pathname:", pathname);

  const { isAuthenticated, setIsAuthenticated } = useUser();

  const [navItems, setNavItems] = useState<NavItems>(getNavItems());

  function getNavItems() {
    const isOneBlog = pathname.startsWith("/oneblog");
    if (!isOneBlog) {
      console.log("ROUTES:", myBlogRoutes);
      return myBlogRoutes;
    } else {
      console.log("ROUTES:", {
        ...oneBlogRoutes,
        ...(isAuthenticated
          ? {}
          : //   ? oneBlogAuthenticatedRoutes
            oneBlogNotAuthenticatedRoutes),
      });
      return {
        ...oneBlogRoutes,
        ...(isAuthenticated
          ? {}
          : //   ? oneBlogAuthenticatedRoutes
            oneBlogNotAuthenticatedRoutes),
      };
    }
  }

  useEffect(() => {
    console.log("\nPATHNAME CHANGE:", pathname, isAuthenticated, "\n");
    setNavItems(getNavItems());
  }, [pathname]);

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

            {isAuthenticated && (
              <Link
                key="logout"
                href={pathname}
                className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
              >
                logout
              </Link>
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
}
