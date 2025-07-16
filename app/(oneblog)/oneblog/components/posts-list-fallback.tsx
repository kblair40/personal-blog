import React from "react";
import { Loader } from "lucide-react";

import PostFiltersFallback from "./post-filters-fallback";

type Props = {};

const PostsListFallback = (props: Props) => {
  return (
    <div className="w-full flex flex-col relative gap-y-4 child-border">
      <section className="w-full h-[136px] sm:h-[88px] md:h-10">
        <div className="sm:w-[412px] md:w-[572px] absolute left-1/2 -translate-x-1/2 flex flex-col sm:flex-row gap-y-2 flex-wrap md:flex-nowrap">
          <PostFiltersFallback />
        </div>
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
