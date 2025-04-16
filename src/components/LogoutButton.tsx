"use client";

import { Button } from "./ui/button";
import { toast } from "sonner";
// import { useRouter } from "next/navigation";
import { useGeneralContext } from "./Context";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const router = useRouter();
  const { setUser } = useGeneralContext();
  const logout = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {}, // no payload
        {
          withCredentials: true, // 👈 put it here
        }
      );
      console.log(res);
      if (res?.status === 200) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("user"); // Access localStorage only in the browser
        }
        setUser(null);
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
      <span className=" text-sm">Logout</span>
    </Button>
  );
};

export default LogoutButton;
