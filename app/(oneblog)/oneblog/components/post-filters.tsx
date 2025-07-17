"use client";

import React, { useState } from "react";
import { CalendarArrowDown, CalendarArrowUp } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Blog } from "@/lib/db/schema.types";
import { cn } from "@/lib/utils";

type Props = {
  subscribedToBlogs: Blog[];
  onChangeSelectedBlog: (value: number | undefined) => void;
  selectedBlog: undefined | number;
  postSearchValue: string;
  onChangePostSearchValue: (value: string) => void;
  sortDir: "asc" | "desc";
  onChangeSortDir: (value: "asc" | "desc") => void;
};

const PostFilters = ({
  subscribedToBlogs,
  selectedBlog,
  onChangeSelectedBlog,
  postSearchValue,
  onChangePostSearchValue,
  sortDir,
  onChangeSortDir,
}: Props) => {
  // Just for triggering re-render when value is set to undefined
  const [key, setKey] = useState(+new Date());

  const blogOptions = subscribedToBlogs.map((b) => {
    return { label: [b.name, b.creator].join(" - "), value: b.id };
  });

  function handleChangeBlog(value: string | undefined) {
    console.log("Selected Blog:", value);
    if (value === undefined) {
      onChangeSelectedBlog(value);
      setKey(+new Date()); // Triggers re-render, making the placeholder visible
      return;
    }

    onChangeSelectedBlog(parseInt(value));
  }

  return (
    <>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            onClick={() => onChangeSortDir(sortDir === "desc" ? "asc" : "desc")}
            size="lg"
            className="w-full sm:w-fit p-0 text-base mr-4"
            variant="secondary"
          >
            Date{" "}
            {sortDir === "asc" ? <CalendarArrowUp /> : <CalendarArrowDown />}
          </Button>
        </TooltipTrigger>

        <TooltipContent side="right">
          <p>{sortDir === "asc" ? "Oldest at top" : "Newest at top"}</p>
        </TooltipContent>
      </Tooltip>

      <Select
        key={key}
        value={selectedBlog ? selectedBlog.toString() : undefined}
        onValueChange={(v) => handleChangeBlog(v)}
      >
        <SelectTrigger className={cn("min-h-10 w-full sm:w-72 md:mr-4")}>
          <SelectValue placeholder="Select Blog" />
        </SelectTrigger>

        <SelectContent>
          {blogOptions.map((o) => {
            return (
              <SelectItem key={o.value} value={o.value.toString()}>
                {o.label}
              </SelectItem>
            );
          })}

          <Button
            className="px-2"
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleChangeBlog(undefined);
            }}
          >
            Clear
          </Button>
        </SelectContent>
      </Select>

      <Input
        placeholder="Search Posts"
        className={cn("w-full sm:w-60 h-10")}
        value={postSearchValue}
        onChange={(e) => onChangePostSearchValue(e.target.value)}
      />
    </>
  );
};

export default PostFilters;
