"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { Blog } from "@/lib/db/schema.types";

type Props = {
  userId: number;
  blogs: Promise<Blog[]>;
};

const SubscriptionList = ({ userId, blogs: _blogs }: Props) => {
  const blogs = use(_blogs);

  const [loading, setLoading] = useState(false);

  async function toggleSubscription() {
    //
  }

  return (
    <div className="flex flex-col gap-y-2">
      {blogs.map(({ id, name, blogUrl, creator }) => {
        return (
          <div key={id} className="flex items-center">
            <Checkbox name={name} id={name} />
            <Label className="ml-2" htmlFor={name}>
              {name} - {creator || name}
            </Label>

            <a className="ml-4" href={blogUrl} target="_blank">
              <ExternalLink size={18} />
            </a>
          </div>
        );
      })}

      {/* {Object.entries(blogData).map(([title, meta], i) => {
        return (
          <div key={i} className="flex items-center gap-x-2">
            <Checkbox name={title} id={title} />
            <Label htmlFor={title}>
              {title} - {meta.creator || title}
            </Label>
          </div>
        );
      })} */}
    </div>
  );
};

export default SubscriptionList;
