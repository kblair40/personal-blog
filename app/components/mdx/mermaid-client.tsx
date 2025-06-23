"use client";

import React from "react";
import dynamic from "next/dynamic";

import type { MermaidDiagramProps } from "./mermaid-server";

const Mermaid = dynamic(() => import("./mermaid-server"), { ssr: false });

const MermaidClient = (props: MermaidDiagramProps) => {
  const { children, ...rest } = props;
  return (
    <React.Suspense fallback={<div />}>
      <Mermaid {...rest}>{children as string}</Mermaid>
    </React.Suspense>
  );
};

// const MermaidClient = ({ children }: React.PropsWithChildren) => {
//   return (
//     <React.Suspense fallback={<div />}>
//       <Mermaid>{children as string}</Mermaid>
//     </React.Suspense>
//   );
// };

export default MermaidClient;
