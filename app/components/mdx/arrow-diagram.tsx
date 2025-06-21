import React from "react";
import clsx from "clsx";
import { ArrowDown } from "lucide-react";
import type { LucideProps } from "lucide-react";

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
    <ArrowDown size={20} className={clsx("mt-2", iconClassName)} {...rest} />
  );

  return (
    <div
      className={clsx(
        "flex flex-col items-center w-full space-y-2",
        wrapperClassName
      )}
    >
      {blocks.map((block, i) => {
        return (
          <div
            key={i}
            className={clsx(
              "flex flex-col items-center w-full",
              blockWrapperClassName
            )}
          >
            <div
              className={clsx(
                "w-full border flex items-center justify-center",
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
