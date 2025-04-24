"use client";

import ApproveButton from "@/components/ApproveButton";
import { useGeneralContext } from "@/components/Context";
import RejectButton from "@/components/RejectButton";
import axios from "axios";
import {
  Loader2,
  Briefcase,
  MapPin,
  Clock,
  Calendar,
  Check,
  Shield,
  Download,
  Gift,
  User,
  FileText,
  CalendarClock,
  Globe,
  Building,
  Edit,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DeleteJob from "@/components/DeleteJob";
import Link from "next/link";
import { Job } from "@/config/types";

const SingleJob = () => {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");
  const router = useRouter();
  const params = useParams();
  const jobId = params.jobId as string;

  const { user } = useGeneralContext();

  useEffect(() => {
    if (user?.role !== "employer") {
      router.push("/jobs");
    }

    const fetchSingleJob = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/jobs/${jobId}`,
          {
            withCredentials: true,
          }
        );
        setJob(res.data);
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleJob();
  }, [user, router, jobId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 w-full">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg flex flex-col items-center">
          <Loader2 className="h-8 w-8 md:h-12 md:w-12 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600 font-medium">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 w-full">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg flex flex-col items-center">
          <div className="md:w-16 md:h-16 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="md:h-8 md:w-8 w-6 h-6 text-red-500" />
          </div>
          <h2 className="md:text-xl font-bold text-gray-800 mb-2">
            Job Not Found
          </h2>
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            The job you&lsquo;re looking for doesn&lsquo;t exist or has been
            removed.
          </p>
          <button
            onClick={() => router.push("/jobs")}
            className="md:px-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 text-sm md:text-base"
          >
            Return to Jobs
          </button>
        </div>
      </div>
    );
  }

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
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 md:py-24 w-full">
      <motion.div
        className="max-w-6xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Job Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 md:mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-32 md:h-48 relative">
            <div className="absolute -bottom-16 left-8 bg-white p-4 rounded-xl shadow-lg flex items-center justify-center">
              <div className="md:w-24 md:h-24 w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-2xl">
                {(job.company?.[0] || "C").toUpperCase()}
              </div>
            </div>
          </div>

          <div className="pt-14 md:pt-20 px-6 md:px-8 pb-6 md:pb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
              <div>
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 my-2 md:my-0">
                  {job?.title}
                </h1>
                <div className="flex flex-wrap items-center md:gap-3 gap-2 text-gray-600">
                  <div className="flex items-center">
                    <Building className="w-5 h-5 mr-1 md:h-8 md:w-8" />
                    <span className="font-medium text-sm md:text-base">
                      {job.company}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="md:h-4 md:w-4 h-3 w-3 mr-1" />
                    <span className=" text-xs md:text-base">
                      {job.location}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="md:h-4 md:w-4 h-3 w-3 mr-1" />
                    <span className=" text-xs md:text-base">{job.jobType}</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="md:h-4 md:w-4 h-3 w-3 mr-1" />
                    <span className=" text-xs md:text-base">
                      {job.employmentMode}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex items-center gap-1 justify-between">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium 
                  ${
                    job.status === "Open"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {job.status}
                </span>
                <div className="flex items-center gap-1">
                  <Link
                    href={`/edit-job/${job._id}`}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 flex items-center gap-1"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="hidden md:block">Edit Job</span>
                  </Link>
                  <DeleteJob jobId={job._id} />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-500 mb-6">
              <div className="flex items-center mr-6">
                <User className="h-4 w-4 mr-1" />
                <span>Posted by: {job.postedBy?.email}</span>
              </div>
              {job.createdAt && (
                <div className="flex items-center mt-2 md:mt-0">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Posted on: {formatDate(job.createdAt)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 flex border-b">
          <button
            className={`px-6 py-3 font-medium text-sm transition-colors duration-300 
              ${
                activeTab === "details"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            onClick={() => setActiveTab("details")}
          >
            Job Details
          </button>
          {user?.email === job.postedBy?.email &&
            job.applications?.length > 0 && (
              <button
                className={`px-6 py-3 font-medium text-sm transition-colors duration-300 flex items-center
                ${
                  activeTab === "applications"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-800"
                }`}
                onClick={() => setActiveTab("applications")}
              >
                Applications
                <span className="ml-2 bg-blue-100 text-blue-600 text-xs rounded-full px-2 py-0.5">
                  {job.applications.length}
                </span>
              </button>
            )}
        </div>

        {/* Tab Content */}
        {activeTab === "details" ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Description */}
            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h2 className="md:text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FileText className="md:h-5 md:w-5 h-4 w-4 mr-2 text-blue-600" />
                Job Description
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm md:ext-base">
                {job.description}
              </p>
            </motion.div>

            {/* Requirements */}
            <motion.div
              variants={itemVariants}
              className="bg-white p-4 md:p-6 rounded-xl shadow-md"
            >
              <h2 className="md:text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Check className="md:h-5 md:w-5 h-4 w-4 mr-2 text-blue-600" />
                Requirements
              </h2>
              <ul className="text-gray-600 space-y-2">
                {job.requirements.map((req: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className=" w-4 h-4 bg-blue-100 rounded-full text-blue-600 flex items-center justify-center mr-2 mt-1 text-xs">
                      ✓
                    </span>
                    <span className="text-sm md:text-base">{req}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Responsibilities */}
            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h2 className="md:text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Briefcase className="md:h-5 md:w-5 h-4 w-4 mr-2 text-blue-600" />
                Responsibilities
              </h2>
              <ul className="text-gray-600 space-y-2">
                {job.responsibilities.map((item: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className=" w-4 h-4 bg-blue-100 rounded-full text-blue-600 flex items-center justify-center mr-2 mt-1 text-xs">
                      •
                    </span>
                    <span className="text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Benefits */}
            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h2 className="md:text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Gift className="md:h-5 md:w-5 h-4 w-4 mr-2 text-blue-600" />
                Benefits
              </h2>
              <ul className="text-gray-600 space-y-2">
                {job.benefits.map((benefit: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className=" w-4 h-4 bg-green-100 rounded-full text-green-600 flex items-center justify-center mr-2 mt-1 text-xs">
                      ★
                    </span>
                    <span className="text-sm md:text-base">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Applications ({job.applications.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {job.applications.map((app) => (
                <motion.div
                  key={app._id}
                  variants={itemVariants}
                  className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start mb-4">
                    <div className="md:w-12 md:h-12 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium mr-4">
                      {app.user?.email?.[0].toUpperCase() || "U"}
                    </div>
                    <div>
                      <Link href={`/profile/${app.user._id}`}>
                        <h3 className="font-bold text-gray-800 text-base md:text-lg">
                          {app.user?.fullName || "Anonymous Applicant"}
                        </h3>
                      </Link>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium 
                        ${
                          app.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : app.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <CalendarClock className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-xs md:text-sm">
                        Applied: {new Date(app.appliedAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <a
                        href={`http://localhost:5000/resume/${app._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 transition-colors duration-300 flex items-center text-sm font-medium"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        View Resume
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:pt-4 pt-2 border-t border-gray-100">
                    <ApproveButton appId={app._id} />
                    <RejectButton appId={app._id} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SingleJob;
