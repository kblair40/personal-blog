"use client";

import React, { useState, use } from "react";
import { ExternalLink } from "lucide-react";
// import type { CheckedState } from "@radix-ui/react-checkbox";

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

  const [subs, setSubs] = useState(() => subscriptions);
  // const [subs, setSubs] = useState(subscriptions);
  // const [subs, setSubs] = useState(use(_subscriptions));

  const [loading, setLoading] = useState(false);

  async function toggleSubscription(
    { blogId, name }: { blogId: number; name: string },
    add: boolean
  ) {
    console.group("Toggle Subscription");
    console.log({ blogId, blogName: name, userId, add });
    // const subRes = await createSubscription({ userId, blogId });
    // console.log("\nSubscription Res:", subRes);

    if (add) {
      console.log("Adding");
      setSubs([
        ...subs,
        {
          id: Math.floor(Math.random() * 10_000),
          blogId,
          userId,
          created_at: null,
          updated_at: null,
          isActive: true,
        },
      ]);
    } else {
      console.log("Removing");
      const _subs = [...subs];
      const idx = subs.findIndex((sub) => sub.blogId === blogId);
      if (idx === -1) {
        console.error("\nSubscription not found\n");
        return;
      }

      _subs.splice(idx, 1);
      setSubs(_subs);
    }
    console.groupEnd();
  }

  return (
    <div className="flex flex-col gap-y-2">
      <pre>{JSON.stringify(subs, null, 2)}</pre>
      {blogs.map(({ id, name, blogUrl, creator }) => {
        return (
          <div key={id} className="flex items-center">
            <Checkbox
              name={name}
              id={name}
              onCheckedChange={(checked) =>
                toggleSubscription({ blogId: id, name }, !!checked)
              }
            />
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
