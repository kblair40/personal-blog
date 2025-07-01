"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

type UserContextType = {
  isAuthenticated: null | boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  session: Session | null;
};

type Session = {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  iat: number;
  exp: number;
};

const UserContext = createContext<UserContextType>({
  isAuthenticated: null,
  setIsAuthenticated: (value: boolean) => {},
  session: null,
});

export function UserContextProvider({ children }: React.PropsWithChildren) {
  const pathname = usePathname();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [session, setSession] = useState<null | Session>(null);

  useEffect(() => {
    console.log("\nPATHNAME CHANGE:", pathname, isAuthenticated, "\n");
    async function fetchSession() {
      const sessionRes = await fetch("http://localhost:3001/api/session");
      console.log("session result:", sessionRes.status);
      if (sessionRes.status === 200) {
        const session = await sessionRes.json();
        console.log("\nSession:", session);
        setSession(session);
        setIsAuthenticated(true);
      } else {
        setSession(null);
        setIsAuthenticated(false);
      }
    }
    fetchSession();
  }, [pathname]);

  return (
    <UserContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, session }}
    >
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
