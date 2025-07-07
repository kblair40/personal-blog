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
  onChange: (value: number | undefined) => void;
  value: undefined | number;
};

const PostFilters = ({ subscribedToBlogs, value, onChange }: Props) => {
  // Just for triggering re-render when value is set to undefined
  const [key, setKey] = useState(+new Date());

  const blogOptions = subscribedToBlogs.map((b) => {
    return { label: [b.name, b.creator].join(" - "), value: b.id };
  });

  function handleChange(value: string | undefined) {
    console.log("Selected Blog:", value);
    if (value === undefined) {
      onChange(value);
      setKey(+new Date());
      return;
    }

    onChange(parseInt(value));
  }

  return (
    <Select
      key={key}
      value={value ? value.toString() : undefined}
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
