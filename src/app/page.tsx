"use client";

import { useState } from "react";
// import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Search,
  Briefcase,
  Users,
  TrendingUp,
  CheckCircle,
  MessageSquare,
  Award,
  Star,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("jobSeeker");

  return (
    <div className="w-full bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight">
                Connect With Your{" "}
                <span className="text-blue-600">Dream Career</span>
              </h1>
              <p className="mt-6  md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0">
                Where top talent meets opportunity. Join thousands of
                professionals finding their perfect match in the job market.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-lg px-6 py-4 md:py-6 rounded-lg flex items-center gap-2">
                  <Search size={20} />
                  Find Jobs
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 text-sm md:text-lg px-6 py-4 md:py-6 rounded-lg flex items-center gap-2"
                >
                  <Briefcase size={20} />
                  Post a Job
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="w-full md:w-1/2 mt-12 md:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative h-64 md:h-96"
            >
              <div className="absolute inset-0 bg-blue-600 rounded-xl transform rotate-3 opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-500 rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b0398b46-2d81-451f-a9ad-b2f60fe1b2df.png"
                  alt="Job Platform"
                  width={600}
                  height={500}
                  className="w-full h-full object-cover mix-blend-overlay opacity-90"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center px-4">
                    <h2 className="text-xl md:text-4xl font-bold mb-2">
                      JobConnect
                    </h2>
                    <p className=" md:text-xl">
                      Building Careers, Connecting Futures
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-xl md:text-4xl font-bold text-blue-600">
                5,000+
              </p>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                Active Jobs
              </p>
            </div>
            <div className="text-center">
              <p className="text-xl md:text-4xl font-bold text-blue-600">
                10k+
              </p>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                Job Seekers
              </p>
            </div>
            <div className="text-center">
              <p className="text-xl md:text-4xl font-bold text-blue-600">
                2,500+
              </p>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                Companies
              </p>
            </div>
            <div className="text-center">
              <p className="text-xl md:text-4xl font-bold text-blue-600">8k+</p>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                Successful Hires
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-4xl font-bold text-blue-900">
              How It Works
            </h2>
            <p className="text-sm md:text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Our platform simplifies the job search and hiring process with
              powerful tools for both job seekers and employers.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
              <button
                className={`px-2 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-md ${
                  activeTab === "jobSeeker"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("jobSeeker")}
              >
                For Job Seekers
              </button>
              <button
                className={`px-2 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-md ${
                  activeTab === "employer"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("employer")}
              >
                For Employers
              </button>
            </div>
          </div>

          {/* Job Seeker Features */}
          {activeTab === "jobSeeker" && (
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-4">
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
                <div className="md:w-12 md:h-12 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="md:w-6 md:h-6 w-4 h-4 text-blue-600" />
                </div>
                <h3 className="md:text-xl font-semibold text-blue-900">
                  Smart Job Search
                </h3>
                <p className="text-gray-600 mt-2 text-sm  md:text-base">
                  Find the perfect job with our AI-powered search that matches
                  your skills and preferences.
                </p>
              </div>
              <div className="bg-white  p-4 md:p-6 rounded-xl shadow-md">
                <div className="md:w-12 md:h-12 w-8 h-8  bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="md:w-6 md:h-6 w-4 h-4 text-blue-600" />
                </div>
                <h3 className="md:text-xl font-semibold text-blue-900">
                  Skill Showcase
                </h3>
                <p className="text-gray-600 mt-2 text-sm md:text-base">
                  Highlight your qualifications and expertise with a
                  comprehensive professional profile.
                </p>
              </div>
              <div className="bg-white  p-4 md:p-6 rounded-xl shadow-md">
                <div className="md:w-12 md:h-12 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="md:w-6 md:h-6 w-4 h-4  text-blue-600" />
                </div>
                <h3 className="md:text-xl font-semibold text-blue-900">
                  Direct Communication
                </h3>
                <p className="text-gray-600 mt-2 text-sm  md:text-base">
                  Connect directly with employers and receive interview requests
                  through our messaging system.
                </p>
              </div>
            </div>
          )}

          {/* Employer Features */}
          {activeTab === "employer" && (
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-4">
              <div className="bg-white  p-4 md:p-6  rounded-xl shadow-md">
                <div className="md:w-12 md:h-12 w-8 h-8  bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="md:w-6 md:h-6 w-4 h-4  text-blue-600" />
                </div>
                <h3 className="md:text-xl font-semibold text-blue-900">
                  Talent Discovery
                </h3>
                <p className="text-gray-600 mt-2 text-sm  md:text-base">
                  Browse our database of qualified candidates and filter by
                  skills, experience, and location.
                </p>
              </div>
              <div className="bg-white  p-4 md:p-6 rounded-xl shadow-md">
                <div className="md:w-12 md:h-12 w-8 h-8  bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="md:w-6 md:h-6 w-4 h-4  text-blue-600" />
                </div>
                <h3 className="md:text-xl font-semibold text-blue-900">
                  Job Visibility
                </h3>
                <p className="text-gray-600 mt-2  text-sm  md:text-base">
                  Post job listings that reach thousands of qualified candidates
                  with our promotion tools.
                </p>
              </div>
              <div className="bg-white  p-4 md:p-6  rounded-xl shadow-md">
                <div className="md:w-12 md:h-12 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="md:w-6 md:h-6 w-4 h-4 text-blue-600" />
                </div>
                <h3 className="md:text-xl font-semibold text-blue-900">
                  Applicant Tracking
                </h3>
                <p className="text-gray-600 mt-2 text-sm  md:text-base">
                  Manage applications, schedule interviews, and track hiring
                  progress all in one place.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-12 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-4xl font-bold text-blue-900">
              Popular Job Categories
            </h2>
            <p className="text-sm md:text-lg text-gray-600 mt-4">
              Explore opportunities across various industries and
              specializations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 md:gap-6 gap-4">
            {[
              { name: "Technology", icon: "💻", count: "1,234" },
              { name: "Finance", icon: "📊", count: "867" },
              { name: "Healthcare", icon: "🏥", count: "753" },
              { name: "Marketing", icon: "📱", count: "621" },
              { name: "Education", icon: "🎓", count: "542" },
              { name: "Design", icon: "🎨", count: "496" },
              { name: "Hospitality", icon: "🏨", count: "389" },
              { name: "Engineering", icon: "⚙️", count: "902" },
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-all hover:border-blue-300"
              >
                <div className="md:text-3xl text-2xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-blue-900 text-sm md:text-base">
                  {category.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  {category.count} jobs
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 text-sm md:text-base">
              Browse All Categories
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-24 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-4xl font-bold text-blue-900">
              Success Stories
            </h2>
            <p className="md:text-lg text-gray-600 mt-4">
              See what our users say about their experience with our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Software Developer",
                text: "I found my dream job at a tech startup within 2 weeks of creating my profile. The matching algorithm is impressive!",
              },
              {
                name: "Sophia Chen",
                role: "HR Manager",
                text: "As a recruiter, this platform has made finding qualified candidates so much easier. The talent pool is diverse and skilled.",
              },
              {
                name: "Marcus Williams",
                role: "Graphic Designer",
                text: "The portfolio showcase feature helped me stand out. I received multiple interview requests from top companies.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-4 md:p-6 rounded-xl shadow-md"
              >
                <div className="flex mb-3 md:mb-4">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className="md:w-5 md:h-5 w-3 h-3 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                </div>
                <p className="text-gray-600 italic mb-4 text-sm md:text-base">
                  &ldquo;{testimonial.text}&ldquo;
                </p>
                <div className="flex items-center">
                  <div className="md:w-10 md:h-10 w-7 h-7 bg-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-sm md:text-base text-blue-900">
                      {testimonial.name}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className=" md:text-4xl font-bold mb-4">
              Ready to Take the Next Step?
            </h2>
            <p className="text-sm md:text-xl mb-8 max-w-2xl mx-auto">
              Whether you&ldquo;re looking for your next career opportunity or
              searching for top talent, join our platform today and connect with
              possibilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 md:px-6 px-4 py-2 md:py-3 text-sm md:text-lg font-medium">
                Sign Up as Job Seeker
              </Button>
              <Button className="bg-blue-900 text-white hover:bg-blue-950  md:px-6 px-4 py-2 md:py-3 text-sm md:text-lg font-medium">
                Sign Up as Employer
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Employers */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-lg md:text-3xl font-bold text-blue-900">
              Trusted by Leading Companies
            </h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="w-24 h-12 bg-gray-100 rounded flex items-center justify-center"
                >
                  <div className="text-gray-400 font-semibold">
                    Logo {i + 1}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
