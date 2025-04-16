"use client";

import { useGeneralContext } from "@/components/Context";
import JobCard from "@/components/JobCard";
import { Job } from "@/config/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, Briefcase, ArrowRight, Filter } from "lucide-react";
import { motion } from "framer-motion";

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useGeneralContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
    fetchJobs();
  }, [user, router]);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
        withCredentials: true,
      });
      console.log(res.data);
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white w-full">
      <div className="max-w-6xl mx-auto px-4 py-20 md:py-24">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Briefcase className="inline-block text-blue-600 mb-4" size={40} />
            <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              {user?.fullName}&lsquo;s Job Connect
            </h1>
            <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
              Discover opportunities that match your skills and aspirations.
              Your next career move starts here.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden border border-gray-200">
              <Search className="ml-4 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for jobs, companies, or locations..."
                className="w-full py-4 px-3 outline-none text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 transition duration-300">
                Search
              </button>
            </div>
          </motion.div>
        </div>

        {/* Filter Options */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          <button className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm hover:shadow-md border border-gray-200 flex items-center gap-2 transition duration-300">
            <Filter size={16} />
            All Jobs
          </button>
          <button className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm hover:shadow-md border border-gray-200 transition duration-300">
            Remote
          </button>
          <button className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm hover:shadow-md border border-gray-200 transition duration-300">
            Full-time
          </button>
          <button className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm hover:shadow-md border border-gray-200 transition duration-300">
            Part-time
          </button>
          <button className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm hover:shadow-md border border-gray-200 transition duration-300">
            Contract
          </button>
        </motion.div>

        {/* Job Listings */}
        <div className="mb-16">
          <motion.div
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-800">
              Available Positions
            </h2>
            <p className="text-blue-600 font-medium">
              {filteredJobs.length} Jobs Found
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500 text-lg">
                No jobs matching your search criteria.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-blue-600 font-medium hover:underline"
              >
                Clear search and show all jobs
              </button>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredJobs.map((job) => (
                <motion.div key={job._id} variants={itemVariants}>
                  <JobCard job={job} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Not finding what you&lsquo;re looking for?
          </h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Create a job alert and we&lsquo;ll notify you when new opportunities
            match your criteria.
          </p>
          <button className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition duration-300 flex items-center gap-2 mx-auto">
            Create Job Alert
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
