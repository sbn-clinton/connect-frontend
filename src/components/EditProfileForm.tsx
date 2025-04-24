"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Save, Mail, Phone, User2 } from "lucide-react";
import { skills, qualifications } from "@/lib/constants";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useGeneralContext } from "./Context";

// Define the validation schema using Zod
const profileSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
  skills: z.array(z.string()),
  qualifications: z.array(z.string()),
  socialLinks: z.object({
    linkedIn: z
      .string()
      .url("Please enter a valid URL")
      .or(z.literal(""))
      .optional(),
    github: z
      .string()
      .url("Please enter a valid URL")
      .or(z.literal(""))
      .optional(),
    portfolio: z
      .string()
      .url("Please enter a valid URL")
      .or(z.literal(""))
      .optional(),
  }),
});

// Define the form data type from the schema
type ProfileFormData = z.infer<typeof profileSchema>;

const EditProfileForm = ({ initialData }: { initialData: ProfileFormData }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { UpdateUser } = useGeneralContext();

  // Setup React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: initialData.fullName || "",
      email: initialData.email || "",
      phoneNumber: initialData.phoneNumber || "",
      bio: initialData.bio || "",
      skills: initialData.skills || [],
      qualifications: initialData.qualifications || [],
      socialLinks: {
        linkedIn: initialData.socialLinks?.linkedIn || "",
        github: initialData.socialLinks?.github || "",
        portfolio: initialData.socialLinks?.portfolio || "",
      },
    },
  });

  // Watch for bio field to display character count
  const bioValue = watch("bio");

  // Handle skill toggle
  const handleSkillToggle = (skill: string) => {
    const currentSkills = watch("skills");
    const updatedSkills = currentSkills.includes(skill)
      ? currentSkills.filter((item) => item !== skill)
      : [...currentSkills, skill];

    setValue("skills", updatedSkills);
  };

  // Handle qualification toggle
  const handleQualificationToggle = (qualification: string) => {
    const currentQualifications = watch("qualifications");
    const updatedQualifications = currentQualifications.includes(qualification)
      ? currentQualifications.filter((item) => item !== qualification)
      : [...currentQualifications, qualification];

    setValue("qualifications", updatedQualifications);
  };

  // Form submission handler
  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);

    // Simulate API request
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/update-profile`,
        data,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        UpdateUser(res.data.user);
        toast.success("Profile updated successfully!");
        router.push("/profile");
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to update profile.");
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Edit Profile Button */}
      <button
        onClick={() => setIsDialogOpen(true)}
        className="flex items-center justify-center px-3 py-1 text-sm md:text-base md:px-4 md:py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <User2 className="md:w-4 md:h-4 h-3 w-3 mr-2" />
        Edit Profile
      </button>

      {/* Modal Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center md:p-4 p-3">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Dialog Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
              <div>
                <h2 className="text-lg md:text-2xl font-bold text-gray-800">
                  Edit Profile
                </h2>
                <p className="text-sm md:text-base text-gray-500 mt-1">
                  Update your personal information and preferences
                </p>
              </div>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="md:w-6 md:h-6 h-5 w-5" />
              </button>
            </div>

            {/* Form Content */}
            <div className="overflow-y-auto p-5 md:p-6  max-h-[calc(90vh-130px)]">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className=" space-y-3 md:space-y-6"
              >
                {/* Personal Information Section */}
                <div>
                  <div className="flex items-center mb-4">
                    <h3 className="md:text-lg font-medium text-gray-800">
                      Personal Information
                    </h3>
                    <div className="md:h-1 h-0.5 w-16 bg-gradient-to-r from-blue-400 to-purple-500 ml-4 rounded-full"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <User2 className="md:h-5 md:w-5 h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          id="fullName"
                          {...register("fullName")}
                          placeholder="John Doe"
                          className={`pl-10 w-full text-sm md:text-base px-4 py-2 border ${
                            errors.fullName
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          } rounded-lg shadow-sm`}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Mail className="md:h-5 md:w-5 h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          id="email"
                          type="email"
                          {...register("email")}
                          placeholder="example@email.com"
                          className={`pl-10 w-full text-sm md:text-base px-4 py-2 border ${
                            errors.email
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          } rounded-lg shadow-sm`}
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Phone className="md:h-5 md:w-5 h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          id="phoneNumber"
                          type="tel"
                          {...register("phoneNumber")}
                          placeholder="+1 234 567 8900"
                          className={`pl-10 w-full text-sm md:text-base px-4 py-2 border ${
                            errors.phoneNumber
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          } rounded-lg shadow-sm`}
                        />
                      </div>
                      {errors.phoneNumber && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.phoneNumber.message}
                        </p>
                      )}
                    </div>

                    {/* Bio */}
                    <div className="md:col-span-2">
                      <label
                        htmlFor="bio"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        {...register("bio")}
                        rows={4}
                        placeholder="Tell us a little bit about yourself"
                        className={`w-full px-4 py-2 border ${
                          errors.bio
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        } rounded-lg shadow-sm`}
                      />
                      <div className="flex justify-between mt-1">
                        <p
                          className={`text-sm ${
                            bioValue?.length || 0 > 500
                              ? "text-red-600"
                              : "text-gray-500"
                          }`}
                        >
                          {bioValue?.length || 0}/500 characters
                        </p>
                        {errors.bio && (
                          <p className="text-sm text-red-600">
                            {errors.bio.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Details Section */}
                <div>
                  <div className="flex items-center mb-4">
                    <h3 className="md:text-lg font-medium text-gray-800">
                      Professional Details
                    </h3>
                    <div className="h-0.5 md:h-1 w-16 bg-gradient-to-r from-blue-400 to-purple-500 ml-4 rounded-full"></div>
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Skills
                    </label>
                    <div className="border border-gray-300 rounded-lg p-4 max-h-40 overflow-y-auto shadow-sm bg-gray-50">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {skills.map((skill) => (
                          <div key={skill} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`skill-${skill}`}
                              checked={watch("skills")?.includes(skill)}
                              onChange={() => handleSkillToggle(skill)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label
                              htmlFor={`skill-${skill}`}
                              className="ml-2 text-sm text-gray-700 cursor-pointer"
                            >
                              {skill}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {watch("skills")?.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleSkillToggle(skill)}
                            className="ml-1.5 inline-flex text-blue-400 hover:text-blue-600 focus:outline-none"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    {errors.skills && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.skills.message}
                      </p>
                    )}
                  </div>

                  {/* Qualifications */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Qualifications
                    </label>
                    <div className="border border-gray-300 rounded-lg p-4 max-h-40 overflow-y-auto shadow-sm bg-gray-50">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {qualifications.map((qualification) => (
                          <div
                            key={qualification}
                            className="flex items-center"
                          >
                            <input
                              type="checkbox"
                              id={`qualification-${qualification}`}
                              checked={watch("qualifications")?.includes(
                                qualification
                              )}
                              onChange={() =>
                                handleQualificationToggle(qualification)
                              }
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label
                              htmlFor={`qualification-${qualification}`}
                              className="ml-2 text-sm text-gray-700 cursor-pointer"
                            >
                              {qualification}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {watch("qualifications")?.map((qualification) => (
                        <span
                          key={qualification}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                        >
                          {qualification}
                          <button
                            type="button"
                            onClick={() =>
                              handleQualificationToggle(qualification)
                            }
                            className="ml-1.5 inline-flex text-purple-400 hover:text-purple-600 focus:outline-none"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    {errors.qualifications && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.qualifications.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Social Links Section */}
                <div>
                  <div className="flex items-center mb-4">
                    <h3 className="md:text-lg font-medium text-gray-800">
                      Social Links
                    </h3>
                    <div className="md:h-1 h-0.5 w-16 bg-gradient-to-r from-blue-400 to-purple-500 ml-4 rounded-full"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* LinkedIn */}
                    <div>
                      <label
                        htmlFor="socialLinksLinkedIn"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        LinkedIn
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                          </svg>
                        </div>
                        <input
                          id="socialLinksLinkedIn"
                          type="url"
                          {...register("socialLinks.linkedIn")}
                          placeholder="https://linkedin.com/in/your-profile"
                          className={`pl-10 w-full text-sm md:text-base px-4 py-2 border ${
                            errors.socialLinks?.linkedIn
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          } rounded-lg shadow-sm`}
                        />
                      </div>
                      {errors.socialLinks?.linkedIn && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.socialLinks.linkedIn.message}
                        </p>
                      )}
                    </div>

                    {/* GitHub */}
                    <div>
                      <label
                        htmlFor="socialLinksGithub"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        GitHub
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          id="socialLinksGithub"
                          type="url"
                          {...register("socialLinks.github")}
                          placeholder="https://github.com/your-profile"
                          className={`pl-10 w-full text-sm md:text-base px-4 py-2 border ${
                            errors.socialLinks?.github
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          } rounded-lg shadow-sm`}
                        />
                      </div>
                      {errors.socialLinks?.github && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.socialLinks.github.message}
                        </p>
                      )}
                    </div>

                    {/* Portfolio */}
                    <div className="md:col-span-2">
                      <label
                        htmlFor="socialLinksPortfolio"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Portfolio
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm6.2 4.2L8.9 11.5 5.8 8.4a1 1 0 0 0-1.4 1.4l4 4a1 1 0 0 0 1.4 0l8-8a1 1 0 0 0-1.4-1.4z" />
                          </svg>
                        </div>
                        <input
                          id="socialLinksPortfolio"
                          type="url"
                          {...register("socialLinks.portfolio")}
                          placeholder="https://your-portfolio.com"
                          className={`pl-10 w-full text-sm md:text-base px-4 py-2 border ${
                            errors.socialLinks?.portfolio
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          } rounded-lg shadow-sm`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Dialog Footer - Fixed the p-24 padding issue */}
            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                className="md:px-5 px-3 py-2 border border-gray-300 text-gray-700  text-sm md:text-base font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-5 py-2 bg-blue-600 text-white  text-sm md:text-base font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfileForm;
