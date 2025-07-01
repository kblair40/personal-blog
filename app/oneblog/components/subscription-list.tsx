"use client";

import React from "react";

import { blogData } from "../utils/blogs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {};

const SubscriptionList = (props: Props) => {
  return (
    <div className="flex flex-col gap-y-1">
      {Object.entries(blogData).map(([title, meta], i) => {
        return (
          <div key={i} className="flex items-center gap-x-2">
            {/* {title} - {meta.creator || title} */}
            <Checkbox name={title} id={title} />
            <Label htmlFor={title}>
              {title} - {meta.creator || title}
            </Label>
          </div>
        );
      })}
    </div>
  );
};

export default SubscriptionList;
