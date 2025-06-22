import React from "react";
import { ArrowDown } from "lucide-react";
import type { LucideProps } from "lucide-react";

import { cn } from "app/lib/cn";

type Props = {
  blocks: (string | React.ReactNode)[];
  wrapperClassName?: string;
  blockClassName?: string;
  blockWrapperClassName?: string;
  iconProps?: LucideProps;
};

const ArrowDiagram = ({
  blocks,
  wrapperClassName = "",
  blockWrapperClassName = "",
  blockClassName = "",
  iconProps = {},
}: Props) => {
  const { className: iconClassName, ...rest } = iconProps;
  const arrows: React.ReactNode[] = Array(blocks.length - 1).fill(
    <ArrowDown size={20} className={cn("mt-2", iconClassName)} {...rest} />
  );

  return (
    <div
      className={cn(
        "flex flex-col items-center w-full space-y-2",
        wrapperClassName
      )}
    >
      {blocks.map((block, i) => {
        return (
          <div
            key={i}
            className={cn(
              "flex flex-col items-center w-full",
              blockWrapperClassName
            )}
          >
            <div
              className={cn(
                "w-full border border-neutral-500 flex items-center justify-center",
                "py-1 px-4 rounded-sm text-center",
                blockClassName
              )}
            >
              {block}
            </div>

            {arrows[i] && arrows[i]}
          </div>
        );
      })}
    </div>
  );
};

export default ArrowDiagram;
