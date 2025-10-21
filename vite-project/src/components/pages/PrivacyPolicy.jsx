import React from "react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-6 sm:px-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-semibold text-blue-900 mb-6 text-center">
        Privacy Policy
      </h1>

      <div className="max-w-4xl mx-auto text-gray-700 space-y-6">
        <p>
          At LumiaGlobe, we respect your privacy and are committed to protecting your personal information.
          This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform.
        </p>
        <p>
          <strong>Information We Collect:</strong> We may collect personal information such as name, email, and
          professional details when you register or submit applications.
        </p>
        <p>
          <strong>How We Use Your Information:</strong> Your data is used to enhance your experience, provide
          relevant job opportunities, and improve our services.
        </p>
        <p>
          <strong>Data Security:</strong> We employ industry-standard security measures to protect your information.
        </p>
        <p>
          By using LumiaGlobe, you consent to the collection and use of your information as outlined in this policy.
        </p>
      </div>
    </motion.div>
  );
}
