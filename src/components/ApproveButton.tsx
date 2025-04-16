"use client";

import axios from "axios";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Check } from "lucide-react";

const ApproveButton = ({ appId }: { appId: string }) => {
  const handleApprove = async () => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/applications/${appId}/approve`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      toast.success("Application approved successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to approve application");
    }
  };
  return (
    <Button
      onClick={handleApprove}
      className="flex items-center gap-2 font-medium bg-green-100 text-green-800 border border-green-400 hover:bg-green-300 transition-all duration-300"
    >
      <Check className="h-4 w-4" />
      <span className="hidden md:block text-sm">Approve</span>
    </Button>
  );
};

export default ApproveButton;
