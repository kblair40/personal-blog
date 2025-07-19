"use client";

import React, { useState } from "react";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

import type { NavItem } from "./nav-client";

type Props = {
  navItems: NavItem[];
  isAuthenticated: boolean;
  onClickLogout: () => Promise<void>;
  loggingOut: boolean;
};

const NavMobile = ({
  navItems,
  isAuthenticated,
  onClickLogout,
  loggingOut,
}: Props) => {
  const [open, setOpen] = useState(false);
  let mainItems: NavItem[];
  let footerItems: NavItem[] | null = null;
  if (isAuthenticated) {
    mainItems = navItems;
  } else {
    mainItems = navItems.slice(0, 3);
    footerItems = navItems.slice(3);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>

      <SheetContent className="pt-20 pl-0 border">
        <SheetHeader className="border hidden">
          <SheetTitle></SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <div className="flex flex-col gap-y-1.5">
            {mainItems.map(({ path, label }) => {
              return (
                <Link key={path} href={path}>
                  <Button
                    variant="ghost"
                    className={cn("w-full text-2xl justify-start")}
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Button>
                </Link>
              );
            })}
          </div>

          <SheetFooter className="pl-0">
            {!footerItems && isAuthenticated ? (
              <div>
                <Button
                  variant="ghost"
                  className={cn("w-full text-2xl justify-start")}
                  disabled={loggingOut}
                  onClick={onClickLogout}
                  key="logout"
                >
                  logout
                </Button>
              </div>
            ) : (
              footerItems &&
              footerItems.map(({ path, label }) => {
                return (
                  <Link key={label} href={path}>
                    <Button
                      variant="ghost"
                      className={cn("w-full text-xl justify-start")}
                      onClick={() => setOpen(false)}
                    >
                      {label}
                    </Button>
                  </Link>
                );
              })
            )}
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavMobile;
