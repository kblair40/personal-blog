"use client";

import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Blog } from "@/lib/db/schema.types";
import { cn } from "@/lib/utils";

type Props = {
  subscribedToBlogs: Blog[];
  onChangeSelectedBlog: (value: number | undefined) => void;
  selectedBlog: undefined | number;
};

const PostFilters = ({
  subscribedToBlogs,
  selectedBlog,
  onChangeSelectedBlog,
}: Props) => {
  // Just for triggering re-render when value is set to undefined
  const [key, setKey] = useState(+new Date());

  const blogOptions = subscribedToBlogs.map((b) => {
    return { label: [b.name, b.creator].join(" - "), value: b.id };
  });

  function handleChange(value: string | undefined) {
    console.log("Selected Blog:", value);
    if (value === undefined) {
      onChangeSelectedBlog(value);
      setKey(+new Date()); // Triggers re-render, making the placeholder visible
      return;
    }

    onChangeSelectedBlog(parseInt(value));
  }

  return (
    <Select
      key={key}
      value={selectedBlog ? selectedBlog.toString() : undefined}
      onValueChange={(v) => handleChange(v)}
    >
      <SelectTrigger className={cn("min-h-10 w-72")}>
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
          className="w-full px-2"
          variant="secondary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleChange(undefined);
          }}
        >
          Clear
        </Button>
      </SelectContent>
    </Select>
  );
};

export default PostFilters;
