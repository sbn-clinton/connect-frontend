"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DeleteJob = ({ jobId }: { jobId: string }) => {
  const router = useRouter();

  const handleDeleteJob = async () => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/jobs/${jobId}`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        toast.success("Job deleted successfully!");
        router.push("/jobs");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job.");
    }
  };
  return (
    <div
      onClick={handleDeleteJob}
      className="px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-800 flex items-center gap-1"
    >
      <Trash className="h-4 w-4" />
      <span className="hidden md:block">Delete Job</span>
    </div>
  );
};

export default DeleteJob;
