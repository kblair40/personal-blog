"use client";

import React from "react";
import { blogData } from "../utils/blogs";

type Props = {};

const SubscriptionList = (props: Props) => {
  return (
    <div>
      {Object.entries(blogData).map(([title, meta], i) => {
        return <div key={i}>{title}</div>;
      })}
    </div>
  );
};

export default SubscriptionList;
