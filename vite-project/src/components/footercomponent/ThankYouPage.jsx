import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 text-center">
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 12 }}
        className="mb-6"
      >
        <CheckCircle className="w-20 h-20 text-teal-500" />
      </motion.div>

      {/* Title & Message */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-semibold text-blue-900 mb-3"
      >
        Thank You!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 max-w-md mb-8"
      >
        Your profile has been successfully created. Start exploring healthcare
        opportunities tailored just for you.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex gap-4"
      >
        <Link
          to="/jobs"
          className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-6 py-3 rounded-full transition-all"
        >
          Browse Jobs
        </Link>
        <Link
          to="/profile"
          className="border border-teal-500 text-teal-600 hover:bg-teal-50 font-medium px-6 py-3 rounded-full transition-all"
        >
          View My Profile
        </Link>
      </motion.div>
    </div>
  );
}
