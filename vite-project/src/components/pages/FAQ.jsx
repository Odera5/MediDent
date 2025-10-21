import React from "react";
import { motion } from "framer-motion";

export default function FAQ() {
  const faqs = [
    {
      question: "How do I create a profile on LumiaGlobe?",
      answer:
        "Click on 'Create Profile', fill in your personal and professional information, and save your profile.",
    },
    {
      question: "Can I download my resume from the site?",
      answer:
        "Yes! Use our Resume Builder to create your resume and download it as a PDF.",
    },
    {
      question: "How do I browse healthcare job listings?",
      answer:
        "Navigate to the 'Browse Jobs' section to filter and view available positions across Nigeria.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Absolutely. We follow strict data protection protocols to ensure your information remains private.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-6 sm:px-10">
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-semibold text-blue-900 text-center mb-8"
      >
        Frequently Asked Questions
      </motion.h1>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-blue-800 mb-2">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
