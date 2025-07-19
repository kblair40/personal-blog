"use client";

import React, { useState, use } from "react";
import { ExternalLink, Funnel, LoaderCircle } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { Blog, Subscription } from "@/lib/db/schema.types";
import { updateSubscription } from "@/actions/update-subscription";
import { cn } from "@/lib/utils";
import clsx from "clsx";

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
  const blogs = use(_blogs).map((b) => ({
    ...b,
    searchValue: b.name.toLowerCase() + " - " + b.creator.toLowerCase(),
  }));
  const subscriptions = use(_subscriptions);

  const [subs, setSubs] = useState(() => subscriptions);
  const [filterValue, setFilterValue] = useState("");

  const [toggling, setToggling] = useState<number | null>(null);

  async function toggleSubscription(
    { blogId, name }: { blogId: number; name: string },
    add: boolean
  ) {
    console.group("Toggle Subscription");
    console.log({ blogId, blogName: name, userId, add });

    setToggling(blogId);

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

    setToggling(null);
    console.groupEnd();
  }

  const subscribedToBlogs = subs.map((s) => s.blogId);
  const filteredBlogs = filterValue
    ? blogs.filter((b) => b.searchValue.includes(filterValue))
    : blogs;

  const sectionPadding = "px-4 sm:px-6 md:px-8 lg:px-10";

  return (
    <div
      className={clsx(
        "w-full h-full",
        "grid grid-cols-1 gap-y-6",
        "grid-rows-[32px_36px_1fr]"
      )}
    >
      {/*     grid-rows-[136px_24px_1fr] sm:grid-rows-[80px_24px_1fr] md:grid-rows-[40px_24px_1fr]
       */}
      <section className={"h-8 " + sectionPadding}>
        <p className="text-2xl font-semibold">Update Your Subscriptions</p>
      </section>

      <section
        className={"h-9 flex space-x-2 items-center w-fit " + sectionPadding}
      >
        <Funnel />
        <Input
          placeholder="Filter blogs..."
          onChange={(e) => setFilterValue(e.target.value)}
        />
      </section>

      <section
        className={
          "border-t pt-4 flex flex-col gap-y-2 max-h-full overflow-y-auto " +
          sectionPadding
        }
      >
        {filteredBlogs.map(({ id, name, blogUrl, creator }, i) => {
          return (
            <div key={i} className="flex items-center">
              {toggling !== id ? (
                <Checkbox
                  name={name}
                  id={name}
                  onCheckedChange={(checked) =>
                    toggleSubscription({ blogId: id, name }, !!checked)
                  }
                  checked={subscribedToBlogs.includes(id)}
                />
              ) : (
                <LoaderCircle size={16} className="animate-spin" />
              )}
              <Label
                className={cn(
                  "ml-2 text-base",
                  typeof toggling === "number"
                    ? "opacity-80 pointer-events-none"
                    : ""
                )}
                htmlFor={name}
              >
                {name} - {creator || name}
              </Label>

              <a className="ml-4" href={blogUrl} target="_blank">
                <ExternalLink size={15} />
              </a>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default SubscriptionList;
