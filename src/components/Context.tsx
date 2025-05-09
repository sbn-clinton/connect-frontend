"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/config/types";

type GeneralContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  session: boolean;
  setSession: React.Dispatch<React.SetStateAction<boolean>>;
  UpdateUser: (user: User) => void;
};

const GeneralContext = createContext<GeneralContextType | null>(null);

export const Context = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const UpdateUser = (user: User) => {
    setUser(user);

    // Save user data in both localStorage (persistent) and sessionStorage (session-only)
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Try to get user from sessionStorage first (for current session)
      let storedUser = JSON.parse(sessionStorage.getItem("user") || "null");

      // If not in sessionStorage, try localStorage (for returning users)
      if (!storedUser) {
        storedUser = JSON.parse(localStorage.getItem("user") || "null");

        // If found in localStorage but not in sessionStorage, also save to sessionStorage
        if (storedUser) {
          sessionStorage.setItem("user", JSON.stringify(storedUser));
        }
      }

      setUser(storedUser);
    }
  }, []);

  return (
    <GeneralContext.Provider
      value={{ session, setSession, user, setUser, UpdateUser }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error("useGeneralContext must be used within a GeneralProvider");
  }
  return context;
};
