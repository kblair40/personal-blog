"use client";

import React from "react";
import { MermaidDiagram } from "@lightenna/react-mermaid-diagram";

type Props = {};

const Diagram = (props: Props) => {
  const diagram_text = "graph TD\nA-->B;\nB-->C;\n";
  const diagram_text2 = `
  graph TD
  A-->B;
  B-->C;`;
  const diagram_text3 = `
flowchart LR
A[Request]-->B[Node Server]
B-->C[Response]`;

  return <MermaidDiagram theme="neutral">{diagram_text3}</MermaidDiagram>;
  //   return <MermaidDiagram>{diagram_text}</MermaidDiagram>;
};

export default Diagram;
