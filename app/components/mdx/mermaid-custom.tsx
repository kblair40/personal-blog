"use client";

import React, { useEffect } from "react";
import mermaid from "mermaid";

import type { MermaidProps } from "./mermaid-custom-client";
import { cn } from "app/lib/cn";

const MermaidCustom = (props: MermaidProps) => {
  const { children, className, ...rest } = props;

  console.log("mermaid children:", children);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      //   look: "handDrawn",
      //   theme: "forest",
      // todo: figure out how to spread these props ('look' and 'theme') without updating every diagram on the page.
      ...rest,
    });
    mermaid.contentLoaded();
  }, [children]);

  return <pre className={cn("mermaid", className)}>{children as string}</pre>;
};

export default MermaidCustom;
