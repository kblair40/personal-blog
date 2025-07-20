"use client";

import React from "react";

import { UserContextProvider } from "@/store/userStore";

const Providers = ({ children }: React.PropsWithChildren) => {
  return (

    <UserContextProvider>{children}</UserContextProvider>
    
  )
};

export default Providers;
