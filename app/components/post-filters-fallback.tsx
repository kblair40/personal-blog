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
        <SelectTrigger className={cn("min-h-10 w-full sm:max-w-72 md:mr-4")}>
          <SelectValue placeholder="Select Blog" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem key={1} value={" "}>
            {" "}
          </SelectItem>

          <div className="pt-2 pb-1 px-1">
            <Button className="px-2 w-full" variant="secondary" size="sm">
              Clear
            </Button>
          </div>
        </SelectContent>
      </Select>

      <Input
        placeholder="Search Posts"
        className={cn("w-full sm:w-60 md:w-72 h-10")}
      />
    </>
  );
};

export default PostFiltersFallback;
