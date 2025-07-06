"use client";

import React, { useState, use } from "react";
import { ExternalLink } from "lucide-react";
// import type { CheckedState } from "@radix-ui/react-checkbox";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { Blog, Subscription } from "@/lib/db/schema.types";
import { updateSubscription } from "@/actions/update-subscription";

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

  const [loading, setLoading] = useState(false);
  const [toggling, setToggling] = useState<number | null>(null);

  async function toggleSubscription(
    { blogId, name }: { blogId: number; name: string },
    add: boolean
  ) {
    console.group("Toggle Subscription");
    console.log({ blogId, blogName: name, userId, add });

    if (add) {
      console.log("Adding");

      const newSub = await updateSubscription({
        userId,
        blogId,
        action: "add",
      });
      console.log("\nNew Subscription:", newSub, "\n");

      if (newSub) setSubs([...subs, newSub]);
    } else {
      console.log("Removing");

      const idx = subs.findIndex((sub) => sub.blogId === blogId);
      if (idx === -1) {
        console.error("\nSubscription not found\n");
        return;
      }

      const removedSub = await updateSubscription({
        subscriptionId: subs[idx].id,
        action: "remove",
      });
      console.log("\nRemoved Subscription:", removedSub, "\n");

      if (removedSub) {
        const _subs = [...subs];
        _subs.splice(idx, 1);
        setSubs(_subs);
      }
    }
    console.groupEnd();
  }

  const subscribedToBlogs = subs.map((s) => s.blogId);

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
              checked={subscribedToBlogs.includes(id)}
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
