"use client";

import React from "react";
import { CalendarArrowDown } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

      <Select disabled value={undefined}>
        <SelectTrigger className={cn("min-h-10 w-72 md:mr-4")}>
          <SelectValue placeholder="Select Blog" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem key={1} value={" "}>
            {" "}
          </SelectItem>

          <Button className="w-full px-2" variant="secondary" size="sm">
            Clear
          </Button>
        </SelectContent>
      </Select>

      <Input placeholder="Search Posts" className={cn("w-40 h-10")} />
    </>
  );
};

export default PostFiltersFallback;
