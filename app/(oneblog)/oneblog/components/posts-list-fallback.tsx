import React from "react";
import { Loader } from "lucide-react";

import PostFiltersFallback from "./post-filters-fallback";
import clsx from "clsx";

type Props = {};

const sectionPadding = "px-6 md:px-8 lg:px-10";

const PostsListFallback = (props: Props) => {
  return (
    // <div className="w-full flex flex-col relative gap-y-4 child-border">
    <div className={clsx("w-full h-full posts-grid relative")}>
      <section
        className={clsx("w-full h-[136px] sm:h-[88px] md:h-10", sectionPadding)}
      >
        {/* <div className="sm:w-[412px] md:w-[572px] absolute left-1/2 -translate-x-1/2 flex flex-col sm:flex-row gap-y-2 flex-wrap md:flex-nowrap"> */}
        <div className="w-full sm:w-[412px] md:w-[572px] flex flex-col sm:flex-row gap-y-2 flex-wrap md:flex-nowrap">
          <PostFiltersFallback />
        </div>
      </section>

      <section className={clsx("h-6", sectionPadding)}>
        <p className="font-light text-neutral-600">
          Showing {"-"} of {"-"} Posts
        </p>
      </section>

      {/* <section className=""> */}
      <section
        className={clsx(
          "w-full flex flex-col gap-y-6 border-t max-h-full overflow-y-auto pb-10 pt-2",
          sectionPadding
        )}
      >
        <Loader className="animate-spin" />
      </section>
    </div>
  );
};

export default PostsListFallback;
