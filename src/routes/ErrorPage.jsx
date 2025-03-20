// src/pages/ErrorPage.js
import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-indigo-50 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-2xl shadow-2xl border border-purple-100 max-w-md mx-auto">
        {/* Icon or Illustration */}
        <div className="flex justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-purple-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Oops! Page Not Found
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Call-to-Action Button */}
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;