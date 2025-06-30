"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

type UserContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

const UserContext = createContext<UserContextType>({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {},
});

export function UserContextProvider({ children }: React.PropsWithChildren) {
  const pathname = usePathname();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("\nPATHNAME CHANGE:", pathname, isAuthenticated, "\n");
    async function fetchSession() {
      const sessionRes = await fetch("http://localhost:3001/api/session");
      console.log("\nSession Result:", sessionRes);
      console.log('status:', sessionRes.status);
    }
    fetchSession();
  }, [pathname]);

  return (
    <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error(
      "useCurrentUser has to be used within <CurrentUserContext.Provider>"
    );
  }

  return userContext;
};
