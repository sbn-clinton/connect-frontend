"use client";

import { Job } from "@/config/types";
import Link from "next/link";
import ApplyForJob from "./ApplyForJob";
import { Button } from "./ui/button";
import { useGeneralContext } from "./Context";
import {
  MapPin,
  Briefcase,
  Globe,
  Calendar,
  CheckCircle,
  ClipboardList,
  ChevronRight,
  Building,
} from "lucide-react";

const JobCard = ({ job }: { job: Job }) => {
  const { user } = useGeneralContext();

  // Function to truncate text with a "Read more" option
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  // Format date (assuming job has a postedDate field)
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300">
              {job.title}
            </h2>
            <div className="flex items-center mt-2 text-gray-600">
              <Building size={16} className="mr-1" />
              <span className="text-xs md:text-sm font-medium">
                {job.company || "Company"}
              </span>
            </div>
          </div>

          {/* Company Logo Placeholder */}
          <div className="bg-white p-1 md:p-2 rounded-lg shadow-sm">
            <div className="h-7 w-7 md:w-10 md:h-10 bg-blue-100 rounded-md flex items-center justify-center text-blue-600 font-bold">
              {(job.company?.[0] || "C").toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5">
        {/* Description */}
        <div className="mb-4">
          <p className="text-gray-600 text-xs md:text-sm">
            {truncateText(job.description || "", 150)}
          </p>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-1 md:mr-2 text-blue-500" />
            <span className="text-xs md:text-sm">
              {job.location || "Remote"}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <Briefcase size={16} className="mr-1 md:mr-2 text-blue-500" />
            <span className="text-xs md:text-sm">
              {job.jobType || "Full-time"}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <Globe size={16} className="mr-1 md:mr-2 text-blue-500" />
            <span className="text-xs md:text-sm">
              {job.employmentMode || "On-site"}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar size={16} className="mr-1 md:mr-2 text-blue-500" />
            <span className="text-xs md:text-sm">
              Posted {formatDate(job.createdAt)}
            </span>
          </div>
        </div>

        {/* Requirements & Responsibilities Collapsible Sections */}
        <div className="space-y-3 mb-6">
          {/* Requirements Section */}
          <details className="group">
            <summary className="flex items-center cursor-pointer text-gray-700 font-medium text-sm md:text-base">
              <CheckCircle size={16} className="mr-2 text-green-500" />
              Requirements
              <ChevronRight className="ml-2 transition-transform duration-300 group-open:rotate-90 w-3 h-3 md:h-4 md:w-4" />
            </summary>
            <div className="mt-2 ml-6 pl-2 border-l-2 border-gray-200">
              <ul className="list-disc pl-4 space-y-1">
                {job.requirements && job.requirements.length > 0 ? (
                  job.requirements.map((requirement, index) => (
                    <li
                      key={index}
                      className="text-xs md:text-sm text-gray-600"
                    >
                      {requirement}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-500">
                    No specific requirements listed
                  </li>
                )}
              </ul>
            </div>
          </details>

          {/* Responsibilities Section */}
          <details className="group">
            <summary className="flex items-center cursor-pointer text-gray-700 font-medium text-sm md:text-base">
              <ClipboardList size={16} className="mr-2 text-blue-500" />
              Responsibilities
              <ChevronRight className="ml-2 transition-transform duration-300 group-open:rotate-90 w-3 h-3 md:h-4 md:w-4" />
            </summary>
            <div className="mt-2 ml-6 pl-2 border-l-2 border-gray-200">
              <ul className="list-disc pl-4 space-y-1">
                {job.responsibilities && job.responsibilities.length > 0 ? (
                  job.responsibilities.map((responsibility, index) => (
                    <li
                      key={index}
                      className="text-xs md:text-sm text-gray-600"
                    >
                      {responsibility}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-500">
                    No specific responsibilities listed
                  </li>
                )}
              </ul>
            </div>
          </details>
        </div>

        {/* Card Footer with Actions */}
        <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-100">
          {/* Salary Range or Applied Count */}
          <div className="text-sm text-gray-500">
            {job.benefits ? (
              <span className="font-medium text-green-600">{job.benefits}</span>
            ) : (
              <span>{job.applications.length} applications</span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {user?.email === job.postedBy?.email && (
              <Link href={`/jobs/${job._id}`}>
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-600 hover:bg-blue-50 text-sm md:text-base px-2 md:px-4 py-2 md:py-3"
                >
                  View Details
                </Button>
              </Link>
            )}
            {user?.role === "jobseeker" && (
              <ApplyForJob jobId={job._id} jobTitle={job.title} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
