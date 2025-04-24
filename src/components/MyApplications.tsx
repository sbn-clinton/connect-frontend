"use client";

import { FaEdit } from "react-icons/fa";
import { Trash2 } from "lucide-react"; // Import trash icon
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Application } from "@/config/types";
import { toast } from "sonner";

const MyApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/applications/my-applications`,
          {
            withCredentials: true,
          }
        );
        const data = res.data;
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleDeleteApplication = async (id: string) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/applications/${id}`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        console.log(res.data);
        // Update the UI by removing the deleted application
        setApplications(applications.filter((app) => app._id !== id));
        toast.success("Application deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting application:", error);
      toast.error("Failed to delete application.");
    }
  };

  // Delete button component
  const DeleteButton = ({ id }: { id: string }) => (
    <Button
      variant="destructive"
      size="sm"
      onClick={() => handleDeleteApplication(id)}
      className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-1 font-medium"
    >
      <Trash2 className="w-4 h-4" />
      <span className="text-sm hidden md:inline">Delete</span>
    </Button>
  );

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-7 w-7 md:h-12 md:w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {applications && applications.length > 0 ? (
            <div className="space-y-6">
              {applications.map((app: Application) => (
                <div
                  key={app._id}
                  className="relative pl-4 pb-3 md:pl-8 md:pb-6 border-l-2 border-blue-100 last:border-0 last:pb-0"
                >
                  <div className="absolute left-0 top-0 transform -translate-x-1/2 bg-white">
                    <div className="md:w-4 md:h-4 h-3 w-3 rounded-full bg-blue-600"></div>
                  </div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
                      {app.status}
                    </span>
                    <div className="flex space-x-2">
                      <DeleteButton id={app._id} />
                    </div>
                  </div>
                  <h4 className="md:text-lg font-medium text-gray-900">
                    {app.job.title}
                  </h4>
                  <p className="text-sm md:text-base text-gray-600">
                    {app.job.company}
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm mt-2">
                    {app.job.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-blue-50 rounded-lg p-3 md:p-6 text-center">
              <p className="text-gray-600 mb-3">
                You haven&lsquo;t applied to any jobs yet
              </p>
              <Link href="/jobs">
                <Button
                  variant="outline"
                  asChild
                  size="sm"
                  className="border-blue-600 text-blue-600"
                >
                  <span className="flex items-center">
                    <FaEdit className="mr-2" /> Apply to a Job
                  </span>
                </Button>
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MyApplications;
