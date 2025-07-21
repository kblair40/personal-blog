"use client";

import React from "react";
import { CalendarArrowDown, ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PostFiltersFallback = () => {
  return (
    <>
      <Button
        size="lg"
        className="p-0 text-base w-fit mr-4"
        variant="secondary"
      >
        Date <CalendarArrowDown />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "min-h-10 w-full sm:max-w-72 md:mr-4 justify-between",
              "text-muted-foreground font-normal"
            )}
          >
            <span>Select Blog(s)</span>
            <ChevronDown className="transition-transform duration-200" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-full sm:w-72 sm:max-w-72"
        >
          <DropdownMenuCheckboxItem>placeholder</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Input
        placeholder="Search Posts"
        className={cn("w-full sm:w-60 md:w-72 h-10")}
      />
    </>
  );
};

export default PostFiltersFallback;
