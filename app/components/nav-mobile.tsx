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

import type { NavItems } from "./nav-client";

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
            {Object.entries(navItems).map(([path, { name }]) => {
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
            {isAuthenticated && (
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
            )}
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavMobile;
