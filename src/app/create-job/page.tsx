"use client";

import { motion } from "framer-motion";
import JobForm from "@/components/JobForm";
import { BsBriefcase } from "react-icons/bs";

const CreateJob = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-20 md:pt-24 pb-10 md:pb-16 px-4 w-full">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center gap-8 mb-10">
          <div className="bg-blue-50 p-3 md:p-4 rounded-full">
            <BsBriefcase className="text-blue-600 text-xl md:text-3xl" />
          </div>

          <div className="text-center space-y-2 md:space-y-3">
            <h1 className="text-xl md:text-4xl font-bold text-gray-800">
              Create a Job Post
            </h1>
            <p className="text-sm md:text-lg text-gray-600 max-w-xl mx-auto">
              Tell us about your job opening and we&lsquo;ll get back to you as
              soon as possible.
            </p>
          </div>

          <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
            <div className="bg-blue-600 h-2 w-full"></div>
            <div className="p-6">
              <JobForm />
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

export default CreateJob;
