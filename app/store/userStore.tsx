"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { usePathname } from "next/navigation";

import type { Session } from "@/lib/types";

type UserContextType = {
  session?: Session | null;
  getSession: () => Promise<Session | null>;
};

const UserContext = createContext<UserContextType>({
  session: undefined,
  getSession: async () => null,
});

export function UserContextProvider({ children }: React.PropsWithChildren) {
  const pathname = usePathname();

  /**
   * Session object means there is a session
   * null means there is no session active
   * undefined means the session (or null) has not yet been returned from '/api/session' route
   */
  const [session, setSession] = useState<null | Session>();

  const getSession = useCallback(async (): Promise<Session | null> => {
    let session: Session | null;
    try {
      const response = await fetch("http://localhost:3001/api/session");
      session = await response.json();
    } catch (e) {
      console.log("Error fetching session:", e);
      session = null;
    }

    if (session) {
      // const session = await res.json();
      console.log("\nSession:", session);
      setSession(session);
      return session;
    } else {
      setSession(null);
      return null;
    }
  }, []);

  useEffect(() => {
    console.log("PATHNAME CHANGE:", pathname);
    getSession();
  }, [pathname]);

  return (
    <UserContext.Provider value={{ session, getSession }}>
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
