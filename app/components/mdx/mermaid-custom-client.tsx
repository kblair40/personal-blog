"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { MermaidConfig } from "mermaid";

const Mermaid = dynamic(() => import("./mermaid-custom"), { ssr: false });

export type MermaidProps = React.PropsWithChildren &
  Pick<MermaidConfig, "theme" | "look"> & { className?: string };

const MermaidCustomClient = (props: MermaidProps) => {
  return (
    <React.Suspense fallback={<div />}>
      <Mermaid {...props} />
    </React.Suspense>
  );
};

export default MermaidCustomClient;
