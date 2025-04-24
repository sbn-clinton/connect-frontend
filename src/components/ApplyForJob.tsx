"use client";

import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";

import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const ApplyForJob = ({
  jobId,
  jobTitle,
}: {
  jobId: string;
  jobTitle?: string;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "selected" | "success" | "error"
  >("idle");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
      setUploadStatus("selected");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (!file) {
      toast.error("Please upload a resume before submitting.");
      setErrorMessage("Please upload a resume before submitting.");
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file); // fix: safely add file with filename
      console.log(formData);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/applications/${jobId}/apply`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(res.data);
      if (res.status === 201) {
        setUploadStatus("success");
        setFile(null);
        setIsDialogOpen(false);
        setSuccessMessage(res.data.message);
        toast.success(res.data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      setUploadStatus("error");
      setErrorMessage(error.response.data.error);
      setIsSubmitting(false);
      toast.error(error.response.data.error);
    }
  };
  return (
    <div>
      {/* Dialog Trigger Button */}
      <button
        onClick={() => setIsDialogOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all"
      >
        Apply Now
      </button>

      {/* Modal Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md relative overflow-hidden">
            {/* Close button */}
            <button
              onClick={() => setIsDialogOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close dialog"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Dialog Header */}
            <div className="p-4 md:p-6 border-b border-gray-200">
              <h2 className="text-lg md:text-2xl font-bold text-gray-800">
                Apply for {jobTitle}
              </h2>
              <p className="text-sm md:text-base text-gray-500 mt-1">
                Upload your resume to submit your application
              </p>
            </div>

            {/* Dialog Content */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* Success message */}
                {successMessage && (
                  <div className="bg-green-50 border border-green-200 text-green-700 md:px-4 md:py-3 px-3 py-2 rounded-lg flex items-center">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    <span className="text-sm md:text-base">
                      {successMessage}
                    </span>
                  </div>
                )}

                {/* Error message */}
                {errorMessage && (
                  <div className="bg-red-50 border border-red-200 text-red-700  md:px-4 md:py-3 px-3 py-2 rounded-lg flex items-center">
                    <AlertCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    <span className="text-sm md:text-base">{errorMessage}</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* File Upload Area */}
                  <div
                    className={`
                      border-2 border-dashed rounded-lg p-4 md:p-6 transition-all flex flex-col items-center cursor-pointer
                      ${
                        uploadStatus === "selected"
                          ? "border-blue-400 bg-blue-50"
                          : uploadStatus === "success"
                          ? "border-green-400 bg-green-50"
                          : uploadStatus === "error"
                          ? "border-red-400 bg-red-50"
                          : "border-gray-300 hover:border-blue-300 bg-gray-50"
                      }
                    `}
                    onClick={() => document.getElementById("resume")?.click()}
                  >
                    {uploadStatus === "idle" && (
                      <Upload className="md:h-12 md:w-12 h-8 w-8 text-gray-400 mb-2" />
                    )}
                    {uploadStatus === "selected" && (
                      <FileText className="md:h-12 md:w-12 h-8 w-8  text-blue-500 mb-2" />
                    )}
                    {uploadStatus === "success" && (
                      <CheckCircle className="md:h-12 md:w-12 h-8 w-8  text-green-500 mb-2" />
                    )}
                    {uploadStatus === "error" && (
                      <AlertCircle className="md:h-12 md:w-12 h-8 w-8  text-red-500 mb-2" />
                    )}

                    <label
                      htmlFor="resume"
                      className="text-center block cursor-pointer"
                    >
                      <span className="font-medium text-gray-700 block mb-1 text-sm md:text-base">
                        {file ? file.name : "Upload your resume"}
                      </span>
                      <span className="text-xs md:text-sm text-gray-500 block">
                        {uploadStatus === "selected"
                          ? "File selected"
                          : uploadStatus === "success"
                          ? "Upload successful"
                          : uploadStatus === "error"
                          ? "Upload failed, please try again"
                          : "PDF, DOC or DOCX (max 5MB)"}
                      </span>
                    </label>

                    <input
                      id="resume"
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      required
                      className="hidden"
                    />
                  </div>

                  {/* File info */}
                  {file && (
                    <div className="flex items-center text-sm">
                      <FileText className="h-3 w-3 md:h-4 md:w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">
                        {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                  )}
                </div>

                {/* Dialog Footer */}
                <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-6 pt-3 md:pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsDialogOpen(false)}
                    className="w-full text-sm md:text-base sm:w-auto px-3 py-2 md:px-4 md:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={
                      !file || isSubmitting || uploadStatus === "success"
                    }
                    className={`w-full text-sm md:text-base sm:w-auto px-3 py-2 md:px-4 md:py-2 text-white font-medium rounded-lg ${
                      !file || isSubmitting || uploadStatus === "success"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="md:w-4 md:h-4 w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        <span>Submitting...</span>
                      </div>
                    ) : uploadStatus === "success" ? (
                      <div className="flex items-center justify-center">
                        <CheckCircle className="md:w-4 md:h-4 h-3 w-3 mr-2" />
                        <span className="text-sm md:text-base">Submitted</span>
                      </div>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyForJob;
