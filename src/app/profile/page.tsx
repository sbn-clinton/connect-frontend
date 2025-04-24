"use client";

import { useGeneralContext } from "@/components/Context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Linkedin,
  Github,
  Globe,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Award,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { FaEdit, FaCamera } from "react-icons/fa";
import { toast } from "sonner";
import EditProfileForm from "@/components/EditProfileForm";
import MyJobs from "@/components/MyJobs";
import MyApplications from "@/components/MyApplications";
import { MdNotificationAdd, MdNotificationImportant } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";

const ProfilePage = () => {
  const { user } = useGeneralContext();
  const router = useRouter();
  const [imageUpdated, setImageUpdated] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    if (!user) router.push("/sign-in");
    console.log(user?.jobs);
  }, [router, user]);

  if (!user) return null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const onChangeImage = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please upload a profile picture before submitting.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/profile-picture`,
        formData,
        { withCredentials: true }
      );
      console.log(res.data);
      setImageUpdated(!imageUpdated); // Toggle to force re-render of image
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      setFile(null);
      console.error("Error uploading profile image:", error);
      toast.error("Failed to upload profile picture.");
    } finally {
      setLoading(false);
    }
  };

  // Generate a unique URL with timestamp to prevent caching of the image
  const profileImageUrl =
    user && user._id
      ? `${process.env.NEXT_PUBLIC_API_URL}/users-picture/${user._id}?${
          imageUpdated ? "v=" + new Date().getTime() : ""
        }`
      : "";

  const initialData = {
    fullName: user.fullName || "",
    email: user.email || "",
    phoneNumber: user.phoneNumber || "",

    location: user.location || "",
    bio: user.bio || "",
    skills: user.skills || [],
    qualifications: user.qualifications || [],
    socialLinks: {
      linkedIn: user.socialLinks.linkedIn,
      github: user.socialLinks.github,
      portfolio: user.socialLinks.portfolio,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 md:24 w-full">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="relative mb-8">
          {/* Cover Photo */}
          <div className="h-48 md:h-64 w-full rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 overflow-hidden shadow-lg">
            <div className="w-full h-full flex items-center justify-center opacity-20">
              <svg
                className="w-64 h-64 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </div>
          </div>

          {/* Profile Info Card */}
          <div className="flex flex-col md:flex-row items-start md:items-end absolute -bottom-32 md:-bottom-16 left-0 right-0 px-4 md:px-8">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-white shadow-lg overflow-hidden bg-white flex items-center justify-center">
                {!user.profilePicture && !file ? (
                  <h1 className="text-5xl md:text-6xl font-bold text-blue-500">
                    {user.fullName.slice(0, 2).toUpperCase()}
                  </h1>
                ) : (
                  <Image
                    src={profileImageUrl}
                    alt="Profile"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                )}
              </div>
              <form onSubmit={onChangeImage}>
                <label
                  htmlFor="profile-image"
                  className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center cursor-pointer shadow-md transition-colors duration-200"
                >
                  <FaCamera className="text-white text-sm" />
                </label>
                <input
                  id="profile-image"
                  type="file"
                  accept="image/jpeg, image/png, image/jpg"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </form>
            </div>

            {/* Name and Role */}
            <div className="mt-4 md:mt-0 md:ml-6">
              <h1 className="text-xl md:text-3xl font-bold text-gray-900">
                {user.fullName}
              </h1>
              <div className="flex items-center mt-1">
                <Badge
                  className={`${
                    user.role === "employer" ? "bg-purple-600" : "bg-blue-600"
                  } text-white px-3 py-1 text-sm md:text-base`}
                >
                  {user.role === "employer" ? "Employer" : "Job Seeker"}
                </Badge>
                <span className="text-gray-500 text-sm ml-4">
                  <MapPin className="inline-block h-3 w-3 md:w-4 md:h-4 mr-1" />
                  {user.location}
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <div className="md:ml-auto mt-4 md:mt-0 flex gap-3">
              {file && (
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 px-3 py-1 text-sm md:text-base md:px-4 md:py-2"
                  onClick={onChangeImage}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Photo"}
                </Button>
              )}

              <EditProfileForm initialData={initialData} />
              {user.role === "employer" && (
                <Link href="/create-job">
                  <Button
                    variant="default"
                    className="bg-purple-600 text-white hover:bg-purple-700 px-3 py-1 text-sm md:text-base md:px-4 md:py-2"
                  >
                    <Briefcase className="mr-2 h-3 w-3 md:w-4 md:h-4" /> Post a
                    Job
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Main Content - with space for the absolute positioned elements above */}
        <div className="pt-32 md:pt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Sidebar */}
            <div className="md:col-span-1">
              <Card className="shadow-md border-0 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-100">
                  <CardTitle className="text-lg font-medium text-blue-900">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mr-3" />
                      <div>
                        <p className="text-xs md:text-sm text-gray-500">
                          Email
                        </p>
                        <p className="font-medium text-sm md:text-base">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mr-3" />
                      <div>
                        <p className="text-xs md:text-sm text-gray-500">
                          Phone
                        </p>
                        <p className="font-medium text-sm md:text-base">
                          {user.phoneNumber || "Not provided"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mr-3" />
                      <div>
                        <p className="text-xs md:text-sm text-gray-500">
                          Location
                        </p>
                        <p className="font-medium text-sm md:text-base">
                          {user.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 my-6 pt-6">
                    <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                      <LinkIcon className="w-4 h-4 mr-2 text-blue-600" />
                      Social Profiles
                    </h3>
                    <div className="flex flex-col space-y-3">
                      {user.socialLinks?.linkedIn && (
                        <a
                          href={user.socialLinks.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-700 hover:text-blue-600 transition-colors text-sm md:text-base"
                        >
                          <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mr-2" />
                          LinkedIn Profile
                        </a>
                      )}
                      {user.socialLinks?.github && (
                        <a
                          href={user.socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-700 hover:text-gray-900 transition-colors text-sm md:text-base"
                        >
                          <Github className="w-4 h-4 md:w-5 md:h-5text-gray-900 mr-2" />
                          GitHub Profile
                        </a>
                      )}
                      {user.socialLinks?.portfolio && (
                        <a
                          href={user.socialLinks.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-700 hover:text-green-600 transition-colors text-sm md:text-base"
                        >
                          <Globe className="w-4 h-4 md:w-5 md:h-5 text-green-600 mr-2" />
                          Portfolio Website
                        </a>
                      )}
                      {!user.socialLinks?.linkedIn &&
                        !user.socialLinks?.github &&
                        !user.socialLinks?.portfolio && (
                          <p className="text-gray-500 text-sm italic">
                            No social profiles added yet
                          </p>
                        )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2">
              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
                <div className="grid grid-cols-3 border-b  items-center justify-center  text-wrap px-2 md:px-4">
                  <button
                    onClick={() => setActiveTab("about")}
                    className={`py-2 md:px-6 md:py-3 font-medium text-xs md:text-sm  md:flex-none ${
                      activeTab === "about"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    About
                  </button>
                  <button
                    onClick={() => setActiveTab("experience")}
                    className={`py-2 md:px-6 md:py-3 font-medium text-xs md:text-sm  md:flex-none ${
                      activeTab === "experience"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Experience
                  </button>
                  <button
                    onClick={() => setActiveTab("skills")}
                    className={` py-2 md:px-6 md:py-3 font-medium text-xs md:text-sm  md:flex-none ${
                      activeTab === "skills"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Skills
                  </button>
                  <button
                    onClick={() => setActiveTab("notifications")}
                    className={` py-2 md:px-6 md:py-3 font-medium text-xs md:text-sm  md:flex-none ${
                      activeTab === "notifications"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Notifications
                  </button>
                  {user.role === "employer" ? (
                    <button
                      onClick={() => setActiveTab("myjobs")}
                      className={` py-2 md:px-6 md:py-3 font-medium text-xs md:text-sm  md:flex-none ${
                        activeTab === "myjobs"
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      My Jobs
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveTab("myapplications")}
                      className={` py-2 md:px-6 md:py-3 font-medium text-xs md:text-sm  md:flex-none ${
                        activeTab === "myapplications"
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      My Applications
                    </button>
                  )}
                </div>

                <div className="p-6">
                  {/* About Tab */}
                  {activeTab === "about" && (
                    <div>
                      <h3 className="md:text-lg font-medium text-gray-900 mb-2 md:mb-4">
                        About Me
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                        {user.bio || "No bio information provided yet."}
                      </p>

                      <div className="mt-8">
                        <h3 className="md:text-lg font-medium text-gray-900 mb-2 md:mb-4 flex items-center">
                          <GraduationCap className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-600" />
                          Qualifications
                        </h3>
                        {user.qualifications &&
                        user.qualifications.length > 0 ? (
                          <ul className="space-y-3">
                            {user.qualifications.map(
                              (qualification: string, index: number) => (
                                <li key={index} className="flex items-start">
                                  <div className="flex-shrink-0 md:h-5 md:w-5 w-4 h-4 flex items-center justify-center mt-1">
                                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                                  </div>
                                  <span className="ml-2 md:ml-3 text-gray-700 text-sm md:text-base">
                                    {qualification}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          <p className="text-gray-500 italic">
                            No qualifications added yet
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Experience Tab */}
                  {activeTab === "experience" && (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="md:text-lg font-medium text-gray-900 flex items-center">
                          <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                          Work Experience
                        </h3>
                      </div>

                      {user.experience && user.experience.length > 0 ? (
                        <div className="space-y-6">
                          {user.experience.map((exp, index: number) => (
                            <div
                              key={index}
                              className="relative pl-8 pb-6 border-l-2 border-blue-100 last:border-0 last:pb-0"
                            >
                              <div className="absolute left-0 top-0 transform -translate-x-1/2 bg-white">
                                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-blue-600"></div>
                              </div>
                              <div className="mb-1">
                                <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
                                  {exp.years}{" "}
                                  {exp.years === 1 ? "year" : "years"}
                                </span>
                              </div>
                              <h4 className="md:text-lg font-medium text-gray-900">
                                {exp.title}
                              </h4>
                              <p className="text-gray-600">{exp.company}</p>
                              <p className="text-gray-500 text-xs md:text-sm mt-2">
                                {exp.description || ""}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-blue-50 rounded-lg p-6 text-center">
                          <p className="text-gray-600 mb-3">
                            You haven&lsquo;t added any work experience yet
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-600 text-blue-600"
                          >
                            <FaEdit className="mr-2" /> Add Your First
                            Experience
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Skills Tab */}
                  {activeTab === "skills" && (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="md:text-lg font-medium text-gray-900 flex items-center">
                          <Award className="md:w-5 md:h-5 w-4 h-4 mr-2 text-blue-600" />
                          Skills & Expertise
                        </h3>
                        {/* <Button variant="outline" size="sm" className="text-xs">
                          <FaEdit className="mr-1" /> Add Skills
                        </Button> */}
                      </div>

                      {user.skills && user.skills.length > 0 ? (
                        <>
                          <div className="flex flex-wrap gap-2 mb-8">
                            {user.skills.map((skill: string, index: number) => (
                              <Badge
                                key={index}
                                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-1 px-2 md:py-2 md:px-3 text-xs md:text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          <div className="bg-blue-50 rounded-lg p-4 text-blue-800 md:text-sm text-xs">
                            <p>
                              Having accurate skills helps employers find your
                              profile and match you with relevant opportunities.
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="bg-blue-50 rounded-lg p-6 text-center">
                          <p className="text-gray-600 mb-3">
                            You haven&lsquo;t added any skills yet
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-600 text-blue-600"
                          >
                            <FaEdit className="mr-2" /> Add Your Skills
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* My Notifications Tab */}
                  {activeTab === "notifications" && (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="md:text-lg font-medium text-gray-900 flex items-center">
                          <MdNotificationImportant className="md:w-5 md:h-5 w-4 h-4 mr-2 text-blue-600" />
                          Latest Notifications
                        </h3>
                      </div>
                      <>
                        {user.notifications && user.notifications.length > 0 ? (
                          <div className="md:space-y-6 space-y-4">
                            {[...user.notifications]
                              .sort(
                                (a, b) =>
                                  new Date(b?.createdAt).getTime() -
                                  new Date(a?.createdAt).getTime()
                              )

                              .map((job, index) => (
                                <div
                                  key={index}
                                  className={`relative md:pl-8 pl-4 pb-2 md:pb-4 border-l-2 ${
                                    job.read
                                      ? "border-blue-100"
                                      : "border-blue-400"
                                  } last:border-0 last:pb-0 hover:bg-blue-50 transition rounded-md p-2`}
                                >
                                  {/* Blue dot for unread */}
                                  {!job.read && (
                                    <div className="absolute left-0 top-0 transform -translate-x-1/2 bg-white">
                                      <div className="w-4 h-4 rounded-full bg-blue-600 animate-pulse"></div>
                                    </div>
                                  )}

                                  <div className="mb-1">
                                    <span className="inline-block px-4 py-2 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                      {job.message}
                                    </span>
                                  </div>

                                  <h4 className="md:text-sm text-xs text-gray-600">
                                    {formatDistanceToNow(
                                      new Date(job.createdAt),
                                      { addSuffix: true }
                                    )}
                                  </h4>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <div className="bg-blue-50 rounded-lg p-6 text-center flex items-center justify-center flex-col gap-2">
                            <MdNotificationAdd className="h-8 w-8 text-blue-600 mb-4" />
                            <p className="text-gray-600 mb-3">
                              You dont&lsquo;t have any notifications yet
                            </p>
                          </div>
                        )}
                      </>
                    </div>
                  )}
                  {/* My Jobs Tab */}
                  {activeTab === "myjobs" && (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="md:text-lg font-medium text-gray-900 flex items-center">
                          <Briefcase className="md:w-5 md:h-5 h-4 w-4 mr-2 text-blue-600" />
                          My Jobs
                        </h3>
                      </div>

                      <MyJobs />
                    </div>
                  )}

                  {/* My Applications Tab */}
                  {activeTab === "myapplications" && (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="md:text-lg font-medium text-gray-900 flex items-center">
                          <Briefcase className="md:w-5 md:h-5 h-4 w-4 mr-2 text-blue-600" />
                          My Applications
                        </h3>
                      </div>

                      <MyApplications />
                    </div>
                  )}
                </div>
              </div>

              {user.role === "employer" && (
                <Card className="shadow-md mb-6 border-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b">
                    <CardTitle className="md:text-lg font-medium text-gray-900 flex items-center">
                      <Briefcase className="md:w-5 md:h-5 w-4 h-4 mr-2 text-purple-600" />
                      Company Jobs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-center py-6">
                      <p className="text-gray-600 mb-4">
                        Create and manage job listings to find the perfect
                        candidates.
                      </p>
                      <Link href="/create-job">
                        <Button
                          variant="default"
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          <Briefcase className="mr-2 w-4 h-4" /> Post a New Job
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
