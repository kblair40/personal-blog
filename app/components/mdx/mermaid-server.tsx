"use client";

import React from "react";
import type { ComponentProps } from "react";
import { MermaidDiagram } from "@lightenna/react-mermaid-diagram";

export type MermaidDiagramProps = ComponentProps<typeof MermaidDiagram>;

const MermaidServer = (props: MermaidDiagramProps) => {
  const { children, ...rest } = props;
  return (
    <MermaidDiagram theme={props.theme || "neutral"} {...props}>
      {children}
    </MermaidDiagram>
  );
};
// const MermaidServer = ({ children }: React.PropsWithChildren) => {
//   return <MermaidDiagram theme="neutral">{children as string}</MermaidDiagram>;
// };

export default MermaidServer;
// base, dark, default, forest, neutral, null
