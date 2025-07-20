"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { useUser } from "@/store/userStore";
import { Button } from "@/components/ui/button";
import NavMobile from "./nav-mobile";
import { cn } from "@/lib/utils";

export type NavItem = { path: string; label: string };
// export type NavItem = Record<"name", string>;
// export type NavItems = Record<string, NavItem>;

const LINKS = [
  { path: "/", label: "Home" },
  { path: "/subscriptions", label: "Subscriptions" },
];
const NOT_AUTH_ROUTES = [
  { path: "/signup", label: "Sign Up" },
  { path: "/login", label: "Login" },
];

export function NavbarClient() {
  const router = useRouter();
  const pathname = usePathname();

  const { getSession, session } = useUser();

  const isAuthenticated = !!session;

  const [navItems, setNavItems] = useState<NavItem[]>();
  const [loggingOut, setLoggingOut] = useState(false);

  function getNavItems() {
    return [...LINKS, ...NOT_AUTH_ROUTES];
    // if (isAuthenticated) {
    //   return LINKS;
    // } else {
    //   return [...LINKS, ...NOT_AUTH_ROUTES];
    //   // return [LINKS[0], ...NOT_AUTH_ROUTES];
    // }
  }

  async function handleClickLogout() {
    setLoggingOut(true);

    const logoutRes = await fetch("http://localhost:3001/api/session/delete", {
      method: "POST",
    });
    console.log("Logout Res:", logoutRes.status);

    if (logoutRes.status === 200) {
      await getSession();
      router.replace("/");
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
            {navItems && (
              <NavMobile
                onClickLogout={handleClickLogout}
                loggingOut={loggingOut}
                navItems={[...LINKS, ...NOT_AUTH_ROUTES]}
                isAuthenticated={isAuthenticated}
              />
            )}
          </div>

          <div className="flex items-center justify-between w-full">
            <section className="space-x-0 hidden sm:flex sm:flex-row">
              {LINKS.map(({ path, label }) => {
                return (
                  <Button variant="link" key={path}>
                    <Link
                      href={path}
                      className={cn(
                        path === pathname ? "underline" : ""
                        //
                      )}
                    >
                      {label}
                    </Link>
                  </Button>
                );
              })}
            </section>

            <section className="space-x-0 hidden sm:flex sm:flex-row">
              {isAuthenticated ? (
                <Button
                  variant="link"
                  disabled={loggingOut}
                  onClick={handleClickLogout}
                  key="logout"
                >
                  Log Out
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
              {/* </div> */}

              {/* <div>isAuthenticated: {String(isAuthenticated)}</div> */}
            </section>
          </div>
        </nav>
      </div>
    </aside>
  );
}
