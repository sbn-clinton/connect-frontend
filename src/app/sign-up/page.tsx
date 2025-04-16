import SignUpForm from "@/components/SignUpForm";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 md:py-24 w-full ">
      <div className="flex flex-col gap-8 md:gap-14 justify-center items-center w-full md:max-w-6xl md:mx-auto px-4">
        <div className="flex flex-col gap-4 items-center text-center">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
            Register with Us
          </h1>
          <p className="text-gray-600 max-w-md mt-2">
            Join our community and get access to exclusive features and content.
          </p>
        </div>

        <div className="w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
          <div className="p-6 md:p-8">
            <SignUpForm />
          </div>
        </div>

        <div className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
