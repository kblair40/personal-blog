"use client";

import React from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { UserContextProvider } from "@/store/userStore";

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <NuqsAdapter>
      <UserContextProvider>{children}</UserContextProvider>;
    </NuqsAdapter>
  );
};

export default Providers;
