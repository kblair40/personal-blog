"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { useUser } from "@/store/userStore";
import { Button } from "@/components/ui/button";
import NavMobile from "./nav-mobile";

export type _NavItem = { path: string; label: string };
export type NavItem = Record<"name", string>;
export type NavItems = Record<string, NavItem>;

const ROUTES = [
  { path: "/", label: "home" },
  { path: "/subscriptions", label: "subscriptions" },
];
const NOT_AUTH_ROUTES = [
  { path: "/signup", label: "signup" },
  { path: "/login", label: "login" },
];

const routes: NavItems = {
  "/": {
    name: "home",
  },
  "/subscriptions": {
    name: "subscriptions",
  },
};

const notAuthRoutes: NavItems = {
  "/oneblog/signup": {
    name: "signup",
  },
  "/oneblog/login": {
    name: "login",
  },
};

const NavLabels: (keyof typeof routes | keyof typeof notAuthRoutes)[] = [];

export function NavbarClient() {
  const router = useRouter();

  const pathname = usePathname();
  console.log("pathname:", pathname);

  const { getSession, session } = useUser();
  const isAuthenticated = !!session;

  const [navItems, setNavItems] = useState<NavItems>(getNavItems);
  const [loggingOut, setLoggingOut] = useState(false);

  function getNavItems() {
    const authRoutes = !isAuthenticated ? notAuthRoutes : {};
    return { ...routes, ...authRoutes };
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
    <aside className="-ml-[8px] tracking-tight w-full">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-6 sm:px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="sm:hidden">
            <NavMobile
              onClickLogout={handleClickLogout}
              loggingOut={loggingOut}
              navItems={navItems}
              isAuthenticated={isAuthenticated}
            />
          </div>

          <div className="flex items-center justify-between w-full">
            <div className="space-x-0 hidden sm:flex sm:flex-row">
              {ROUTES.map(({ path, label }) => {
                return (
                  <Button variant="link" key={path}>
                    <Link
                      href={path}
                      className={path === pathname ? "underline" : ""}
                    >
                      {label}
                    </Link>
                  </Button>
                );
              })}

              <div className="flex items-center">
                {isAuthenticated ? (
                  <Button
                    variant="link"
                    disabled={loggingOut}
                    onClick={handleClickLogout}
                    key="logout"
                  >
                    logout
                  </Button>
                ) : (
                  <>
                    {NOT_AUTH_ROUTES.map(({ path, label }) => {
                      return (
                        <Button variant="link" key={path}>
                          <Link
                            href={path}
                            className={path === pathname ? "underline" : ""}
                          >
                            {label}
                          </Link>
                        </Button>
                      );
                    })}
                  </>
                )}
              </div>

              {/* <div>isAuthenticated: {String(isAuthenticated)}</div> */}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
