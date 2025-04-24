"use client";

import { motion } from "framer-motion";
import EditJobForm from "@/components/EditJobForm";
import { BsBriefcase } from "react-icons/bs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

const EditJob = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`,
          {
            withCredentials: true,
          }
        );
        if (!res.data) {
          router.push("/jobs");
          return;
        }
        setJob(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        router.push("/jobs");
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 w-full">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg flex flex-col items-center">
          <Loader2 className="md:h-12 md:w-12 h-8 w-8 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600 font-medium text-sm md:text-base">
            Loading job details...
          </p>
        </div>
      </div>
    );
  }

  if (!job) {
    router.push("/jobs");
    return null;
  }

  console.log(job);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 md:pt-24 pt-20 md:pb-16 pb-10 px-3 md:px-4 w-full">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center gap-8 mb-10">
          <div className="bg-blue-50 p-3 md:p-4 rounded-full">
            <BsBriefcase className="text-blue-600 text-2xl md:text-3xl" />
          </div>

          <div className="text-center space-y-3">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
              Edit Your Job Post
            </h1>
            <p className="text-sm md:text-lg text-gray-600 max-w-xl mx-auto">
              Modify your job posting details and we&lsquo;ll get back to you as
              soon as possible.
            </p>
          </div>

          <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
            <div className="bg-blue-600 h-2 w-full"></div>
            <div className="p-4 md:p-6">
              <EditJobForm job={job} />
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Need help? Contact our support team at support@connect.com</p>
        </div>
      </motion.div>
    </div>
  );
};

export default EditJob;
