import React from "react";
import { motion } from "framer-motion";

export default function HealthcareNews() {
  const articles = [
    {
      title: "Nigeria Launches New National Health Policy",
      date: "October 2025",
      summary:
        "The government introduces new measures to improve healthcare access and patient care across all states.",
    },
    {
      title: "Advancements in Dental Technology",
      date: "September 2025",
      summary:
        "Modern tools and techniques are transforming dental practice efficiency and patient outcomes.",
    },
    {
      title: "Healthcare Workforce Trends in 2025",
      date: "August 2025",
      summary:
        "An overview of job opportunities, career growth, and demand in the healthcare sector.",
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
        Healthcare News
      </motion.h1>

      <div className="max-w-6xl mx-auto grid gap-6">
        {articles.map((article, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              {article.title}
            </h3>
            <p className="text-sm text-gray-500 mb-2">{article.date}</p>
            <p className="text-gray-700">{article.summary}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
