"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Briefcase,
  Users,
  MessageSquare,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userType: "job-seeker",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        userType: "job-seeker",
        subject: "",
        message: "",
      });
      setIsSubmitted(false);
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const formItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen py-20 md:py-24 px-4 w-full">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-11 md:mb-16"
          variants={itemVariants}
        >
          <motion.h1
            className="text-2xl md:text-5xl font-bold text-blue-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Connect With Us
          </motion.h1>
          <motion.p
            className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Whether you&lsquo;re looking for talent or seeking new
            opportunities, we&lsquo;re here to help bridge the gap between
            employers and job seekers.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Contact Info */}
          <motion.div className="md:col-span-1" variants={containerVariants}>
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8 h-full"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <h2 className="text-lg md:text-2xl font-bold text-blue-700 mb-6">
                Get in Touch
              </h2>

              <div className="space-y-4 md:space-y-6">
                <motion.div
                  className="flex items-start space-x-4"
                  variants={itemVariants}
                >
                  <div className="bg-blue-100 p-2 md:p-3 rounded-full">
                    <Mail className="md:h-6 h-4 w-4 md:w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 text-sm md:text-base">
                      Email
                    </h3>
                    <p className="text-blue-600 text-xs md:text-sm">
                      support@connect.com
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-4"
                  variants={itemVariants}
                >
                  <div className="bg-blue-100 p-2 md:p-3 rounded-full">
                    <Phone className="md:h-6 h-4 w-4 md:w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 text-sm md:text-base">
                      Phone
                    </h3>
                    <p className="text-blue-600 text-xs md:text-sm">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-4"
                  variants={itemVariants}
                >
                  <div className="bg-blue-100 p-2 md:p-3 rounded-full">
                    <MapPin className="md:h-6 h-4 w-4 md:w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 text-sm md:text-base">
                      Office
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm">
                      123 Innovation Drive
                      <br />
                      Tech Valley, CA 94103
                    </p>
                  </div>
                </motion.div>
              </div>

              <motion.div className="mt-12" variants={itemVariants}>
                <h3 className="md:text-lg font-semibold text-gray-800 mb-4">
                  Connect with us
                </h3>
                <div className="flex space-x-4">
                  {[
                    {
                      name: "twitter",
                      icon: <FaTwitter className="h-4 w-4 md:h-6 md:w-6" />,
                      href: "#",
                    },
                    {
                      name: "linkedin",
                      icon: <FaLinkedin className="h-4 w-4 md:h-6 md:w-6" />,
                      href: "#",
                    },
                    {
                      name: "facebook",
                      icon: <FaFacebook className="h-4 w-4 md:h-6 md:w-6" />,
                      href: "#",
                    },
                    {
                      name: "instagram",
                      icon: <FaInstagram className="h-4 w-4 md:h-6 md:w-6" />,
                      href: "#",
                    },
                  ].map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      className="bg-blue-100 p-2 md:p-3 rounded-full hover:bg-blue-200 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div className="md:col-span-2" variants={containerVariants}>
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8"
              variants={itemVariants}
            >
              <h2 className="text-lg md:text-2xl font-bold text-blue-700 mb-6">
                Send us a message
              </h2>

              {isSubmitted ? (
                <motion.div
                  className="text-center py-16"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="inline-flex items-center justify-center h-16 w-16 bg-green-100 rounded-full mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <Send className="h-6 w-6md:h-8 md:w-8 text-green-600" />
                  </motion.div>
                  <h3 className="md:text-xl font-bold text-gray-800 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Thank you for reaching out. We&lsquo;ll get back to you
                    shortly.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-6"
                  variants={containerVariants}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div variants={formItemVariants}>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 md:px-4 md:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="John Doe"
                      />
                    </motion.div>

                    <motion.div variants={formItemVariants}>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full  px-3 py-2 md:px-4 md:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="john@example.com"
                      />
                    </motion.div>
                  </div>

                  <motion.div variants={formItemVariants}>
                    <label
                      htmlFor="userType"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      I am a
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label
                        className={`flex items-center gap-3 md:p-4 p-2 border ${
                          formData.userType === "job-seeker"
                            ? "bg-blue-50 border-blue-300"
                            : "bg-white border-gray-200"
                        } rounded-lg cursor-pointer transition-all`}
                      >
                        <input
                          type="radio"
                          name="userType"
                          value="job-seeker"
                          checked={formData.userType === "job-seeker"}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <Users className="md:h-5 md:w-5 h-4 w-4 text-blue-600" />
                        <span className="font-medium text-sm md:text-base">
                          Job Seeker
                        </span>
                      </label>

                      <label
                        className={`flex items-center gap-3 md:p-4 p-2 border ${
                          formData.userType === "employer"
                            ? "bg-blue-50 border-blue-300"
                            : "bg-white border-gray-200"
                        } rounded-lg cursor-pointer transition-all`}
                      >
                        <input
                          type="radio"
                          name="userType"
                          value="employer"
                          checked={formData.userType === "employer"}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <Briefcase className="md:h-5 md:w-5 h-4 w-4text-blue-600" />
                        <span className="font-medium text-sm md:text-base">
                          Employer
                        </span>
                      </label>
                    </div>
                  </motion.div>

                  <motion.div variants={formItemVariants}>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full   px-3 py-2 md:px-4 md:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="How can we help you?"
                    />
                  </motion.div>

                  <motion.div variants={formItemVariants}>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full   px-3 py-2 md:px-4 md:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Tell us more about your needs..."
                    ></textarea>
                  </motion.div>

                  <motion.div
                    className="flex justify-end"
                    variants={formItemVariants}
                  >
                    <motion.button
                      type="submit"
                      className="inline-flex text-sm md:text-base items-center   px-3 py-2 md:px-4 md:py-3 bg-blue-600 border border-transparent rounded-lg text-white font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MessageSquare className="mr-2 md:h-5 md:w-5 h-4 w-4" />
                      Send Message
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-3xl font-bold text-blue-800">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mt-2">
              Find quick answers to common questions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {[
              {
                question: "How does Connect match employers with job seekers?",
                answer:
                  "Our advanced AI algorithm analyzes skills, experience, and preferences to create perfect matches between candidates and companies.",
              },
              {
                question: "Is it free to create an account?",
                answer:
                  "Yes! Creating a basic account is completely free for both job seekers and employers. Premium features are available with paid subscriptions.",
              },
              {
                question: "How quickly will I hear back after applying?",
                answer:
                  "Response times vary by employer, but our platform encourages timely responses. Most candidates hear back within 5-7 business days.",
              },
              {
                question: "Can employers search for candidates directly?",
                answer:
                  "Yes, employers with premium accounts can search and filter our talent database to find candidates matching their specific requirements.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3 className="font-bold text-gray-800 md:text-lg mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactUsPage;
