import Link from "next/link";
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { MdAssuredWorkload } from "react-icons/md";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MdAssuredWorkload className="text-blue-600 text-2xl" />
              <h1 className="text-xl font-bold">Connect</h1>
            </div>
            <p className="text-gray-600 text-sm">
              Connecting talented professionals with innovative companies
              worldwide.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link
                href="#"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <FaTwitter className="text-lg" />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <FaLinkedin className="text-lg" />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <FaFacebook className="text-lg" />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <FaInstagram className="text-lg" />
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/jobs"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/companies"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Stay Updated</h3>
            <p className="text-gray-600 text-sm">
              Subscribe to our newsletter for the latest job opportunities and
              updates.
            </p>
            <div className="flex mt-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            Copyright © {currentYear} Connect. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-gray-500 hover:text-blue-600 transition-colors text-sm"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-blue-600 transition-colors text-sm"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-blue-600 transition-colors text-sm"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
