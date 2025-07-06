"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { Blog, Subscription } from "@/lib/db/schema.types";
import { createSubscription } from "@/actions/create-subscription";

type Props = {
  userId: number;
  blogs: Promise<Blog[]>;
  subscriptions: Promise<Subscription[]>;
};

const SubscriptionList = ({
  userId,
  blogs: _blogs,
  subscriptions: _subscriptions,
}: Props) => {
  const blogs = use(_blogs);
  const subscriptions = use(_subscriptions);

  const [loading, setLoading] = useState(false);

  async function toggleSubscription(blogId: number) {
    // const subRes = await createSubscription({ userId, blogId });
    // console.log("\nSubscription Res:", subRes);
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
