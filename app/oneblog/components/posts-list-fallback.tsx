import React from "react";
import { CalendarArrowDown, Loader } from "lucide-react";

import PostFiltersFallback from "./post-filters-fallback";
import { Button } from "@/components/ui/button";

type Props = {};

const PostsListFallback = (props: Props) => {
  return (
    <div className="flex flex-col gap-y-4 w-fit">
      <section className="flex gap-x-4 gap-y-2 flex-wrap">
        <Button size="lg" className="p-0 text-base" variant="secondary">
          Date <CalendarArrowDown />
        </Button>

        <PostFiltersFallback />
      </section>

      <section>
        <p className="font-light text-neutral-600">
          Showing {"-"} of {"-"} Posts
        </p>
      </section>

      <section className="">
        <Loader className="animate-spin" />
      </section>
    </div>
  );
};

export default PostsListFallback;
