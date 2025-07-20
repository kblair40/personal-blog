"use client";

import React, { useState } from "react";
import { CalendarArrowDown, CalendarArrowUp, ChevronDown } from "lucide-react";
import {
  useQueryState,
  parseAsStringLiteral,
  parseAsInteger,
  parseAsArrayOf,
} from "nuqs";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Blog } from "@/lib/db/schema.types";
import { cn } from "@/lib/utils";
import { sortOrder } from "@/components/posts-list";

type Props = {
  subscribedToBlogs: Blog[];
  postSearchValue?: string;
};

const PostFilters = ({ subscribedToBlogs }: Props) => {
  // Just for triggering re-render when value is set to undefined
  const [key, setKey] = useState(+new Date());

  const [selectedBlogs, setSelectedBlogs] = useQueryState(
    "blogs",
    parseAsArrayOf(parseAsInteger)
  );
  const [postSearchValue, setPostSearchValue] = useQueryState("search", {
    defaultValue: "",
  });
  const [sortDir, setSortDir] = useQueryState(
    "sort",
    parseAsStringLiteral(sortOrder).withDefault("desc")
  );

  const blogOptions = subscribedToBlogs.map((b) => {
    return { label: [b.name, b.creator].join(" - "), value: b.id };
  });

  function getSelectedBlogs() {
    const blogs: string[] = [];
    for (let blog of subscribedToBlogs) {
      if (selectedBlogs?.includes(blog.id)) {
        blogs.push(blog.name);
      }
    }
    return blogs.join(", ");
  }

  // function handleChangeBlog(value: string | undefined) {
  //   console.log("Selected Blog:", value);
  //   if (value === undefined) {
  //     setSelectedBlog(null);
  //     setKey(+new Date()); // Triggers re-render, making the placeholder visible
  //     return;
  //   }

  //   setSelectedBlog(parseInt(value));
  // }

  function handleSelectBlog(blogId: number) {
    setSelectedBlogs((cur) => {
      if (Array.isArray(cur)) {
        if (cur.includes(blogId)) {
          return cur.filter((val) => val !== blogId);
        } else {
          return [...cur, blogId];
        }
      }
      return [blogId];
    });
  }

  const blogIsSelected = !!selectedBlogs?.length;

  return (
    <>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            onClick={() =>
              setSortDir((cur) => (cur === "desc" ? "asc" : "desc"))
            }
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

      <DropdownMenu key={key}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "min-h-10 w-full sm:max-w-72 md:mr-4 justify-between",
              !blogIsSelected ? "text-muted-foreground font-normal" : "",
              "data-[state=open]:[&_svg]:rotate-180"
            )}
          >
            <span>{blogIsSelected ? getSelectedBlogs() : "Select Blog(s)"}</span>
            <ChevronDown className="transition-transform duration-200" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-full sm:w-72 sm:max-w-72">
          {blogOptions.map((o) => {
            return (
              <DropdownMenuCheckboxItem
                key={o.value}
                checked={selectedBlogs?.includes(o.value)}
                className="flex-reverse"
                onSelect={() => handleSelectBlog(o.value)}
              >
                {o.label}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <Select
        key={key}
        value={selectedBlog ? selectedBlog.toString() : undefined}
        onValueChange={(v) => handleChangeBlog(v)}
      >
        <SelectTrigger className={cn("min-h-10 w-full sm:max-w-72 md:mr-4")}>
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

          <div className="pt-2 pb-1 px-1">
            <Button
              className="px-2 w-full"
              variant="secondary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleChangeBlog(undefined);
              }}
            >
              Clear
            </Button>
          </div>
        </SelectContent>
      </Select> */}

      <Input
        placeholder="Search Posts"
        className={cn("w-full sm:w-60 md:w-72 h-10")}
        value={postSearchValue}
        onChange={(e) => setPostSearchValue(e.target.value)}
      />
    </>
  );
};

export default PostFilters;
