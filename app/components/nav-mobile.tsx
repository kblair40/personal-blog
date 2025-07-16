import React from "react";
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
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
    </Sheet>
  );
};

export default NavMobile;
