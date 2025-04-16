"use client";

import axios from "axios";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { X } from "lucide-react";

const RejectButton = ({ appId }: { appId: string }) => {
  const handleReject = async () => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/applications/${appId}/reject`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      toast.success("Application rejected successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to reject application");
    }
  };
  return (
    <Button
      onClick={handleReject}
      className="flex items-center gap-2 font-medium bg-red-100 text-red-800 border border-red-400 hover:bg-red-300 transition-all duration-300"
    >
      <X className="h-4 w-4" />
      <span className="hidden md:block text-sm">Reject</span>
    </Button>
  );
};

export default RejectButton;
