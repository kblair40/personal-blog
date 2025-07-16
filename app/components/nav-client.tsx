"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { useUser } from "@/store/userStore";
import { Button } from "./ui/button";
import NavMobile from "./nav-mobile";

type NavItem = Record<"name", string>;
export type NavItems = Record<string, NavItem>;

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

export function NavbarClient() {
  const router = useRouter();

  const pathname = usePathname();
  console.log("pathname:", pathname);
  const isOneBlog = pathname.startsWith("/oneblog");

  const { getSession, session } = useUser();
  const isAuthenticated = session === undefined ? null : !!session;

  const [navItems, setNavItems] = useState<NavItems>(getNavItems());
  const [loggingOut, setLoggingOut] = useState(false);

  function getNavItems() {
    if (!isOneBlog) {
      return myBlogRoutes;
    } else {
      const authRoutes = session === null ? oneBlogNotAuthenticatedRoutes : {};
      // isAuthenticated === false ? oneBlogNotAuthenticatedRoutes : {};
      return { ...oneBlogRoutes, ...authRoutes };
    }
  }

  async function handleClickLogout() {
    setLoggingOut(true);

    const logoutRes = await fetch("http://localhost:3001/api/session/delete", {
      method: "POST",
    });
    console.log("Logout Res:", logoutRes.status);

    if (logoutRes.status === 200) {
      await getSession();
      router.replace("/oneblog");
      router.refresh();
    } else {
      console.warn("Logout failed");
    }

    setLoggingOut(false);
  }

  useEffect(() => {
    // console.log("\nPATHNAME CHANGE:", pathname, isAuthenticated, "\n");
    setNavItems(getNavItems());
  }, [pathname, isAuthenticated]);

  return (
    <aside className="-ml-[8px] tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="space-x-0 hidden sm:flex sm:flex-row sm:pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Button variant="link" key={path}>
                  <Link
                    href={path}
                    className={path === pathname ? "underline" : ""}
                  >
                    {name}
                  </Link>
                </Button>
              );
            })}

            {isAuthenticated === true && (
              <Button
                variant="link"
                disabled={loggingOut}
                onClick={handleClickLogout}
                key="logout"
              >
                logout
              </Button>
            )}

            {/* <div>isAuthenticated: {String(isAuthenticated)}</div> */}
          </div>
        </nav>
      </div>
    </aside>
  );
}
