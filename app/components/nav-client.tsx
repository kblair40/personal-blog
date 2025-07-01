"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { useUser } from "@/store/userStore";
// import { logout } from "@/actions/logout";
import { Button } from "./ui/button";

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
  const router = useRouter();

  const pathname = usePathname();
  console.log("pathname:", pathname);
  const isOneBlog = pathname.startsWith("/oneblog");

  const { isAuthenticated, setIsAuthenticated } = useUser();

  const [navItems, setNavItems] = useState<NavItems>(getNavItems());

  function getNavItems() {
    if (!isOneBlog) {
      console.log("NOT ONEBLOG ROUTES:", myBlogRoutes);
      return myBlogRoutes;
    } else {
      const authRoutes =
        isAuthenticated === false ? oneBlogNotAuthenticatedRoutes : {};
      console.log("ONEBLOG ROUTES:", { ...oneBlogRoutes, ...authRoutes });
      return { ...oneBlogRoutes, ...authRoutes };
    }
  }

  async function handleClickLogout() {
    // const logoutRes = await logout();
    // console.log("Logout Res:", logoutRes);
    // if (logoutRes) {
    //   router.push("/oneblog");
    // } else {
    //   console.warn("Logout failed");
    // }
  }

  useEffect(() => {
    console.log("\nPATHNAME CHANGE:", pathname, isAuthenticated, "\n");
    setNavItems(getNavItems());
  }, [pathname, isAuthenticated]);

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

            {isAuthenticated === true && (
              <Button
                onClick={handleClickLogout}
                key="logout"
                className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
              >
                logout
              </Button>
            )}

            <div>isAuthenticated: {String(isAuthenticated)}</div>
            {/* {isAuthenticated && (
              <Link
                key="logout"
                href={pathname}
                className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
              >
                logout
              </Link>
            )} */}
          </div>
        </nav>
      </div>
    </aside>
  );
}
