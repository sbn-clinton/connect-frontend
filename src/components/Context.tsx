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

const COOKIE_NAME = "user";

const setCookie = (name: string, value: string, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; path=/; expires=${expires}`;
};

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
};

export const Context = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const UpdateUser = (user: User) => {
    setUser(user);

    if (typeof window !== "undefined") {
      const userString = JSON.stringify(user);

      // Store in both storage and cookie
      sessionStorage.setItem("user", userString);
      localStorage.setItem("user", userString);
      setCookie(COOKIE_NAME, userString, 7); // Cookie valid for 7 days
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      let storedUser = JSON.parse(sessionStorage.getItem("user") || "null");

      if (!storedUser) {
        storedUser = JSON.parse(localStorage.getItem("user") || "null");

        if (storedUser) {
          sessionStorage.setItem("user", JSON.stringify(storedUser));
        }
      }

      if (!storedUser) {
        const cookieUser = getCookie(COOKIE_NAME);
        if (cookieUser) {
          storedUser = JSON.parse(cookieUser);
          sessionStorage.setItem("user", JSON.stringify(storedUser));
          localStorage.setItem("user", JSON.stringify(storedUser));
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
