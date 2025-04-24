"use client";

import axios from "axios";
import { Button } from "./ui/button";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Job } from "@/config/types";

const MyJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/jobs/my-job`,
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          setJobs(res.data);
          setLoading(false);
          console.log(res.data);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  console.log(jobs);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {jobs && jobs.length > 0 ? (
            <div className="space-y-6">
              {jobs.map((job: Job) => (
                <Link key={job._id} href={`/jobs/${job._id}`} className="block">
                  <div className="relative pl-6 md:pl-8 pb-4 md:pb-6 border-l-2 border-blue-100 last:border-0 last:pb-0 hover:bg-blue-50 transition rounded-md p-2">
                    <div className="absolute left-0 top-0 transform -translate-x-1/2 bg-white">
                      <div className="md:w-4 md:h-4 h-3 w-3 rounded-full bg-blue-600"></div>
                    </div>
                    <div className="mb-1">
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {job.location}
                      </span>
                    </div>
                    <h4 className="md:text-lg font-medium text-gray-900">
                      {job.title}
                    </h4>
                    <p className="text-sm md:text-base text-gray-600">
                      {job.company}
                    </p>
                    <p className="text-gray-500 text-xs md:text-sm mt-2">
                      {job.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-blue-50 rounded-lg p-4 md:p-6 text-center">
              <p className="text-gray-600 mb-3">
                You haven&lsquo;t added any jobs yet
              </p>
              <Link href="/create-job">
                <Button
                  variant="outline"
                  asChild
                  size="sm"
                  className="border-blue-600 text-blue-600"
                >
                  <FaEdit className="mr-2" /> Add Your First Job
                </Button>
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MyJobs;
