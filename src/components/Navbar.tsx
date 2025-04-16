"use client";

import { useState } from "react";
import Link from "next/link";
import { MdAssuredWorkload } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";
import LogoutButton from "./LogoutButton";
import { useGeneralContext } from "./Context";

const Navbar = () => {
  const { user } = useGeneralContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
      setIsMenuOpen(false);
    });
  };

  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-inherit backdrop-blur-lg opacity-90 h-16 z-50 md:h-20 ">
      <div className="flex justify-between items-center h-full max-w-6xl mx-auto px-4">
        <Link href={"/"} className="flex items-center gap-3">
          <MdAssuredWorkload className="text-3xl text-blue-600" />
          <h1 className="text-xl font-bold md:text-2xl">Connect</h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <Link
                href={"/jobs"}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Jobs
              </Link>
              <Link
                href={"/profile"}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Profile
              </Link>
              <Link
                href={"/about-us"}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                About Us
              </Link>
              <Link
                href={"/contact-us"}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Contact Us
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href={"/about-us"}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                About Us
              </Link>
              <Link
                href={"/contact-us"}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Contact Us
              </Link>
              <Link
                href={"/sign-in"}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Sign In
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={openMenu}
          aria-label="Open menu"
        >
          {isMenuOpen ? (
            <HiX className="h-6 w-6" />
          ) : (
            <HiMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-16 left-0 w-full border-t border-gray-200 shadow-md">
          <div className="flex flex-col p-4 space-y-4">
            {user ? (
              <>
                <Link
                  href={"/jobs"}
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2 font-medium"
                  onClick={toggleMenu}
                >
                  Jobs
                </Link>
                <Link
                  href={"/profile"}
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2 font-medium"
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
                <Link
                  href={"/about-us"}
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2 font-medium"
                  onClick={toggleMenu}
                >
                  About Us
                </Link>
                <Link
                  href={"/contact-us"}
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2 font-medium"
                  onClick={toggleMenu}
                >
                  Contact Us
                </Link>
                <div className="pt-2">
                  <LogoutButton />
                </div>
              </>
            ) : (
              <>
                <Link
                  href={"/about-us"}
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2 font-medium"
                  onClick={toggleMenu}
                >
                  About Us
                </Link>
                <Link
                  href={"/contact-us"}
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2 font-medium"
                  onClick={toggleMenu}
                >
                  Contact Us
                </Link>

                <Link
                  href={"/sign-in"}
                  className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                  onClick={toggleMenu}
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
