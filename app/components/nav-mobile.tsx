"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

import type { NavItems } from "./nav-client";

type Props = {
  navItems: NavItems;
};

const NavMobile = ({ navItems }: Props) => {
  return (
    <Sheet open={true}>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>

      <SheetContent className="pt-12 border">
        <div className="flex flex-col gap-y-1">
          {Object.entries(navItems).map(([path, { name }]) => {
            return (
              <Link key={name} href={path}>
                <Button variant="ghost" className="w-full">
                  {name}
                </Button>
              </Link>
            );
          })}
        </div>
        "
      </SheetContent>
    </Sheet>
  );
};

export default NavMobile;
