"use client";

import { Button } from "./ui/button";
import { toast } from "sonner";
import { useGeneralContext } from "./Context";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import Cookies from "js-cookie"; // Import js-cookie library for cookie management

const LogoutButton = () => {
  const router = useRouter();
  const { setUser } = useGeneralContext();

  const logout = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {}, // no payload
        {
          withCredentials: true, // Send cookies with the request
        }
      );

      console.log(res);

      if (res?.status === 200) {
        // Clear user from localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("user");
        }
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("user");
        }

        // Clear all cookies if you want to be extra thorough
        // This gets all cookies and removes them one by one
        const allCookies = Cookies.get();
        Object.keys(allCookies).forEach((cookieName) => {
          Cookies.remove(cookieName);
        });

        // Update app state
        setUser(null);

        // Notify user and redirect
        toast.success("Logged out successfully!");
        router.push("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <Button
      onClick={logout}
      className="flex items-center gap-2 font-medium bg-red-100 text-red-800 border border-red-400 hover:bg-red-300 transition-all duration-300"
    >
      <LogOut className="h-4 w-4" />
      <span className="text-sm">Logout</span>
    </Button>
  );
};

export default LogoutButton;
