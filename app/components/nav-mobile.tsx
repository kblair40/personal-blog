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
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

import type { NavItems, NavItem } from "./nav-client";

type Props = {
  navItems: NavItems;
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

  let mainItems: [string, NavItem][];
  let footerItems: [string, NavItem][] | null = null;
  if (isAuthenticated) {
    mainItems = Object.entries(navItems);
  } else {
    mainItems = Object.entries(navItems).slice(0, 3);
    footerItems = Object.entries(navItems).slice(3);
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
            {mainItems.map(([path, { name }]) => {
              return (
                <Link key={name} href={path}>
                  <Button
                    variant="ghost"
                    className={cn("w-full text-2xl justify-start")}
                  >
                    {name}
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
              footerItems.map(([path, { name }]) => {
                return (
                  <Link key={name} href={path}>
                    <Button
                      variant="ghost"
                      className={cn("w-full text-xl justify-start")}
                    >
                      {name}
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
