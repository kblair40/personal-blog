"use client";

import React, { useState, type FormEvent } from "react";
import clsx from "clsx";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  // SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { addBlogRequest } from "@/actions/request-blog";
import type { BlogRequestInsert } from "@/lib/db/schema.types";

type FormInputElement = HTMLInputElement | HTMLTextAreaElement;

type Props = {
  userId: number;
};

const SubscriptionRequestSheet = ({ userId }: Props) => {
  const [formData, setFormData] = useState<BlogRequestInsert>({
    userId,
    blogUrl: "",
    rssUrl: "",
    details: "",
  });
  const [saving, setSaving] = useState(false);

  function handleChange(e: React.ChangeEvent<FormInputElement>) {
    const {
      target: { name, value },
    } = e;
    console.log("change:", { name, value });

    setFormData((cur) => {
      return { ...cur, [name]: value };
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    console.log("submit");
    setSaving(true);

    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    //
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Request a Blog</Button>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className={clsx("pb-20 px-2 sm:px-6 md:px-12")}
      >
        <SheetHeader>
          <SheetTitle>Request a Blog</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit}>
          <div className="px-4 flex flex-col gap-y-4">
            <section className="grid grid-rows-2 gap-y-4 md:grid-cols-2 md:grid-rows-1 md:gap-y-0 md:gap-x-8">
              <div className="w-full">
                <Label className="mb-1" htmlFor="blogUrl">
                  Homepage URL
                </Label>
                <Input
                  id="blogUrl"
                  name="blogUrl"
                  placeholder="www.blogilike.com"
                  value={formData.blogUrl}
                  onChange={handleChange}
                />
              </div>

              <div className="w-full">
                <Label className="mb-1" htmlFor="rssUrl">
                  RSS Feed URL
                </Label>
                <Input
                  id="rssUrl"
                  name="rssUrl"
                  placeholder="www.blogilike.com/rss.xml"
                  value={formData.rssUrl}
                  onChange={handleChange}
                />
              </div>
            </section>

            <section>
              <Label className="mb-1" htmlFor="details">
                Anything we should know?
              </Label>
              <Textarea
                id="details"
                name="details"
                value={formData.details as string}
                onChange={handleChange}
              />
            </section>
          </div>

          <div className="flex items-center justify-end mt-6 gap-x-4">
            <Button type="button" variant="secondary">
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default SubscriptionRequestSheet;
