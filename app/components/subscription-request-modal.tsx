"use client";

import React, { useState, useRef, type FormEvent } from "react";
import clsx from "clsx";
import { ZodError } from "zod/v4";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  // SheetDescription,
  SheetFooter,
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

const DEFAULT_FORM_DATA = {
  // userId,
  blogUrl: "",
  rssUrl: "",
  details: "",
};

const SubscriptionRequestSheet = ({ userId }: Props) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<BlogRequestInsert>({
    userId,
    ...DEFAULT_FORM_DATA,
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<null | Record<string, any>>(null);

  const formRef = useRef<HTMLFormElement>(null);

  function resetForm() {
    setFormData({ userId, ...DEFAULT_FORM_DATA });
  }

  function handleChange(e: React.ChangeEvent<FormInputElement>) {
    const {
      target: { name, value },
    } = e;
    console.log("change:", { name, value });

    if (errors && !!errors[name]) {
      errors[name] = null;
    }

    setFormData((cur) => {
      return { ...cur, [name]: value };
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    console.log("submit");
    setSaving(true);

    e.preventDefault();

    try {
      const res = await addBlogRequest(formData);
      console.log("\nAdd Blog Res:", res, "\n");

      if (res && "errors" in res) {
        console.log("KEYS:", Object.keys(res));
        console.log("errors:", res.errors);
        setErrors(res.errors);
      } else {
        setOpen(false);
        resetForm();
      }
    } catch (e) {
      console.log("Add blog failed:", e);
    }
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        if (!open) resetForm();
        setOpen(open);
      }}
    >
      <SheetTrigger asChild>
        <Button variant="secondary">Request a Blog</Button>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className={clsx("pb-8 px-2 sm:px-6 md:px-12")}
      >
        <SheetHeader>
          <SheetTitle>Request a Blog</SheetTitle>
        </SheetHeader>

        <form ref={formRef} onSubmit={handleSubmit}>
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
                <p
                  className={clsx(
                    "text-red-600 text-xs",
                    errors?.blogUrl ? "" : "hidden"
                  )}
                >
                  {errors && errors.blogUrl ? errors.blogUrl._errors[0] : ""}
                </p>
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

                <p
                  className={clsx(
                    "text-red-600 text-xs",
                    errors?.rssUrl ? "" : "hidden"
                  )}
                >
                  {errors && errors.rssUrl ? errors.rssUrl._errors[0] : ""}
                </p>
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

          <SheetFooter>
            <div className="flex flex-col-reverse mt-2 gap-y-4 md:flex-row md:items-center md:justify-center md:gap-x-4 lg:justify-end">
              <Button
                type="button"
                variant="secondary"
                className="md:w-1/3 lg:w-1/5"
              >
                Cancel
              </Button>
              <Button type="submit" className="md:w-1/3 lg:w-1/5">
                Submit
              </Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default SubscriptionRequestSheet;
