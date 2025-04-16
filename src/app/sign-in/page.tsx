"use client";

import { useGeneralContext } from "@/components/Context";
import SignInForm from "@/components/SignInForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { LockKeyhole, User, ArrowRight } from "lucide-react";
import Link from "next/link";

const SignInPage = () => {
  const { user } = useGeneralContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 md:py-24 w-full">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row rounded-3xl shadow-2xl overflow-hidden">
          {/* Left Panel - Decorative Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 lg:p-12 text-white hidden lg:flex flex-col justify-between"
          >
            <div>
              <h2 className="text-3xl font-bold mb-6">Welcome Back</h2>
              <p className="text-blue-100 mb-8">
                Sign in to access your account and explore job opportunities
                tailored just for you.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <LockKeyhole className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Secure Access</h3>
                    <p className="text-blue-100 text-sm">
                      Your data is protected with industry-standard encryption.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Personalized Experience
                    </h3>
                    <p className="text-blue-100 text-sm">
                      Get job recommendations based on your skills and
                      preferences.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <p className="text-blue-100 text-sm">
                &ldquo;Finding the right job has never been easier with this
                platform.&ldquo;
              </p>
              <div className="flex items-center mt-4">
                <div className="w-10 h-10 bg-blue-400 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-blue-200 text-sm">Software Engineer</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 bg-white p-8 lg:p-12 flex flex-col justify-center"
          >
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                <LockKeyhole className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                Sign in to your account
              </h1>
              <p className="text-gray-500">
                Enter your credentials to access your account
              </p>
            </div>

            <div className="w-full max-w-md mx-auto">
              <SignInForm />

              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">
                  Don&apos;t have an account yet?
                </p>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Create an account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="mt-12 text-center text-gray-500 text-sm">
              <p>© 2025 JobConnect. All rights reserved.</p>
              <div className="flex justify-center space-x-4 mt-2">
                <Link
                  href="/terms"
                  className="hover:text-blue-600 transition-colors"
                >
                  Terms
                </Link>
                <Link
                  href="/privacy"
                  className="hover:text-blue-600 transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="/help"
                  className="hover:text-blue-600 transition-colors"
                >
                  Help
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
