"use client";

import React, { useEffect } from "react";
import mermaid from "mermaid";

import type { MermaidProps } from "./mermaid-custom-client";

const MermaidCustom = (props: MermaidProps) => {
  const { children, ...rest } = props;

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      look: "handDrawn",
      theme: "forest",
      // todo: figure out how to spread these props ('look' and 'theme') without updating every diagram on the page.
      ...rest,
    });
    mermaid.contentLoaded();
  }, []);

  return <pre className="mermaid">{children as string}</pre>;
};

export default MermaidCustom;
