import React from "react";

type Props = {
  blocks: (string | React.ReactNode)[];
};

const ArrowDiagram = ({ blocks }: Props) => {
  return (
    <div>
      {blocks.map((block, i) => {
        if (typeof block === "string") {
          return (
            <div className="flex items-center justify-center">{block}</div>
          );
        } else {
          return block;
        }
      })}
    </div>
  );
};

export default ArrowDiagram;
