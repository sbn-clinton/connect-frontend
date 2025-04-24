"use client";

import React from "react";
import {
  Users,
  Briefcase,
  Globe,
  Shield,
  Award,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const AboutUsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen w-full">
      {/* Hero Section */}
      <div
        className="text-white bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/841d228e-168b-4eb9-90e8-d7697fe4c1f1.png')",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(37, 99, 235, 0.7)",
        }}
      >
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-2xl md:text-5xl font-bold mb-6"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Connecting Talent With Opportunity
            </motion.h1>

            <motion.p
              className=" md:text-2xl mb-8"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We&apos;re bridging the gap between employers and job seekers to
              create meaningful career connections.
            </motion.p>

            <motion.button
              className="bg-white text-blue-600 font-semibold md:px-6 md:py-3 px-4 py-2 rounded-lg hover:bg-blue-50 transition duration-300 text-sm md:text-base"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join Connect Today
            </motion.button>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl md:text-3xl font-bold text-center mb-12 text-gray-800">
            Our Story
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="bg-blue-600 rounded-lg p-2 md:w-16 md:h-16 w-10 h-10 flex items-center justify-center mb-4">
                <Globe className="text-white md:w-14 md:h-14 w-6 h-6" />
              </div>
              <h3 className="md:text-2xl font-bold mb-4 text-gray-800">
                Transforming Career Connections
              </h3>
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                Founded in 2023, Connect was born from a simple observation: the
                job market needed a more efficient, human-centered approach to
                matching talented professionals with the right opportunities.
              </p>
              <p className="text-gray-600">
                Our team of industry experts and technology innovators came
                together with a shared mission to reimagine how employers and
                job seekers find each other in today&apos;s dynamic job market.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <div className="bg-gray-200 rounded-lg p-8 h-64 relative flex  w-full">
                <Image
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9eaec55e-8d07-47b7-ad76-7200ffe29295.png"
                  alt="Team collaboration"
                  className="rounded-lg shadow-lg object-cover w-full h-full"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl md:text-3xl font-bold mb-6 text-gray-800">
              Our Mission
            </h2>
            <p className="text-sm md:text-xl text-gray-700 mb-8">
              We&apos;re on a mission to make job matching more intelligent,
              transparent, and personal. By leveraging cutting-edge technology
              with a human touch, we aim to create meaningful connections that
              benefit both employers and job seekers alike.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-3 w-full md:w-auto">
                <Users className="text-blue-600 w-4 h-4 md:w-6 md:h-6" />
                <span className="font-medium text-gray-800 text-sm md:text-base">
                  10,000+ Connections Made
                </span>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-3 w-full md:w-auto">
                <Briefcase className="text-blue-600 w-4 h-4 md:w-6 md:h-6" />
                <span className="font-medium text-gray-800 text-sm md:text-base">
                  5,000+ Companies
                </span>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-3 w-full md:w-auto">
                <Globe className="text-blue-600 w-4 h-4 md:w-6 md:h-6" />
                <span className="font-medium text-gray-800 text-sm md:text-base">
                  Global Reach
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-xl md:text-3xl font-bold text-center mb-12 text-gray-800">
          What Sets Us Apart
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="bg-blue-100 rounded-full p-3 md:w-14 md:h-14 h-10 w-10 flex items-center justify-center mb-4">
              <Shield className="text-blue-600 w-5 h-5 md:w-8 md:h-8" />
            </div>
            <h3 className="md:text-xl font-bold mb-3 text-gray-800">
              Smart Matching Technology
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              Our proprietary algorithm goes beyond keywords to understand
              skills, culture fit, and career aspirations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="bg-blue-100 rounded-full p-3 md:w-14 md:h-14 h-10 w-10 flex items-center justify-center mb-4">
              <Award className="text-blue-600 w-5 h-5 md:w-8 md:h-8" />
            </div>
            <h3 className="md:text-xl font-bold mb-3 text-gray-800">
              Quality Over Quantity
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              We focus on meaningful connections rather than overwhelming you
              with irrelevant opportunities or candidates.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="bg-blue-100 rounded-full p-3 md:w-14 md:h-14 h-10 w-10 flex items-center justify-center mb-4">
              <MessageSquare className="text-blue-600 w-5 h-5 md:w-8 md:h-8" />
            </div>
            <h3 className="md:text-xl font-bold mb-3 text-gray-800">
              Transparent Communication
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              Our platform facilitates clear, direct communication between
              employers and job seekers at every stage.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="bg-blue-100 rounded-full p-3 md:w-14 md:h-14 h-10 w-10 flex items-center justify-center mb-4">
              <Users className="text-blue-600 w-5 h-5 md:w-8 md:h-8" />
            </div>
            <h3 className="md:text-xl font-bold mb-3 text-gray-800">
              Community Support
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              Access career resources, networking opportunities, and expert
              advice from industry professionals.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="bg-blue-100 rounded-full p-3 md:w-14 md:h-14 h-10 w-10 flex items-center justify-center mb-4">
              <Globe className="text-blue-600 w-5 h-5 md:w-8 md:h-8" />
            </div>
            <h3 className="md:text-xl font-bold mb-3 text-gray-800">
              Global Network
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              Connect with opportunities and talent worldwide, with support for
              multiple languages and regions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="bg-blue-100 rounded-full p-3 md:w-14 md:h-14 h-10 w-10 flex items-center justify-center mb-4">
              <Briefcase className="text-blue-600 w-5 h-5 md:w-8 md:h-8" />
            </div>
            <h3 className="md:text-xl font-bold mb-3 text-gray-800">
              Inclusive Hiring
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              Tools and resources designed to support diversity, equity, and
              inclusion in hiring practices.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-3xl font-bold text-center mb-12 text-gray-800">
            Our Leadership Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
              <div className="h-48 relative w-full">
                <Image
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/45c42520-6d5e-4a8d-b922-d7040a62fb26.png"
                  alt="Team member"
                  className="object-top absolute"
                  fill
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold md:text-xl mb-1 text-gray-800">
                  Sarah Johnson
                </h3>
                <p className="text-blue-600 mb-3 text-sm md:text-base">
                  CEO & Co-Founder
                </p>
                <p className="text-gray-600 text-xs md:text-sm">
                  Former HR Director with 15+ years experience in talent
                  acquisition and workforce development.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
              <div className="h-48 relative w-full">
                <Image
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a02b5209-1100-4dd8-855f-7fe6896386c1.png"
                  alt="Team member"
                  className="object-top absolute"
                  fill
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold md:text-xl mb-1 text-gray-800">
                  Michael Chen
                </h3>
                <p className="text-blue-600 mb-3 text-sm md:text-base">
                  CTO & Co-Founder
                </p>
                <p className="text-gray-600 text-xs md:text-sm">
                  Tech innovator specializing in AI-driven solutions with
                  previous exits in the HR tech space.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
              <div className="h-48 relative w-full">
                <Image
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4da0d2b6-a69c-4e3d-b35b-464af11ee3a9.png"
                  alt="Team member"
                  className="object-top absolute"
                  fill
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold md:text-xl mb-1 text-gray-800">
                  Aisha Patel
                </h3>
                <p className="text-blue-600 text-sm md:text-base mb-3">
                  Chief Product Officer
                </p>
                <p className="text-gray-600 text-xs md:text-sm">
                  Product visionary focused on creating intuitive, accessible
                  digital experiences for diverse users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl md:text-3xl font-bold mb-6">
            Ready to Transform Your Hiring Process?
          </h2>
          <p className="md:text-xl mb-8 max-w-2xl mx-auto">
            Whether you&apos;re seeking talent or your next career move, Connect
            offers the tools and support you need to succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={"/create-job"}
              className="bg-white text-sm md:text-base text-blue-600 font-semibold px-6 py-2 md:py-3 rounded-lg hover:text-white hover:bg-gradient-to-r from-indigo-700 to-blue-600 hover:border-white transition duration-300 hover:border-2"
            >
              For Employers
            </Link>
            <Link
              href={"/jobs"}
              className="border-2 border-white text-white font-semibold px-6 py-2 md:py-3  text-sm md:text-base rounded-lg hover:text-blue-600 hover:border-blue-600 hover:bg-white hover:bg-opacity-10 transition duration-300"
            >
              For Job Seekers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
