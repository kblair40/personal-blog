"use client";

import React, { useState } from "react";
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

type Props = {};

const SubscriptionRequestSheet = (props: Props) => {
  const [formData, setFormData] = useState({
    homeUrl: "",
    rssUrl: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { name, value },
    } = e;
    console.log("change:", { name, value });

    setFormData((cur) => {
      return { ...cur, [name]: value };
    });
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

        <div className="px-4">
          <section className="grid grid-rows-2 gap-y-4 md:grid-cols-2 md:grid-rows-1 md:gap-y-0 md:gap-x-8">
            <div className="w-full">
              <Label className="mb-1" htmlFor="homeUrl">
                Homepage URL
              </Label>
              <Input
                id="homeUrl"
                name="homeUrl"
                placeholder="www.blogilike.com"
                value={formData.homeUrl}
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
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SubscriptionRequestSheet;
