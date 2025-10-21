import React from "react";
import { motion } from "framer-motion";

export default function TermsOfService() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-6 sm:px-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-semibold text-blue-900 mb-6 text-center">
        Terms of Service
      </h1>

      <div className="max-w-4xl mx-auto text-gray-700 space-y-6">
        <p>
          Welcome to LumiaGlobe. By accessing or using our platform, you agree to comply with and be bound by these Terms of Service.
        </p>
        <p>
          <strong>Use of Services:</strong> You may use our platform for lawful purposes only. You agree not to misuse our services or interfere with the normal operation of the platform.
        </p>
        <p>
          <strong>Account Responsibility:</strong> You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
        </p>
        <p>
          <strong>Limitation of Liability:</strong> LumiaGlobe is not liable for any damages or losses resulting from your use of our platform or third-party services linked to it.
        </p>
        <p>
          By continuing to use LumiaGlobe, you acknowledge and agree to these terms.
        </p>
      </div>
    </motion.div>
  );
}
