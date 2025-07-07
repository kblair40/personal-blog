"use client";

import React from "react";

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

type Props = {};

const PostFiltersFallback = (props: Props) => {
  return (
    <>
      <Select disabled value={undefined}>
        <SelectTrigger className={cn("min-h-10 w-72")}>
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
