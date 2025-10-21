import React from "react";
import { motion } from "framer-motion";

export default function Blog() {
  const posts = [
    {
      title: "5 Tips for Healthcare Career Growth",
      summary:
        "Learn practical strategies to advance your career in healthcare, from networking to certifications.",
    },
    {
      title: "Maintaining Mental Health as a Healthcare Worker",
      summary:
        "Explore ways to balance work stress and personal life for long-term professional wellbeing.",
    },
    {
      title: "Top Skills Employers Look For in Nurses",
      summary:
        "Discover the key skills that healthcare employers value most when hiring nurses and medical staff.",
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
        Blog
      </motion.h1>

      <div className="max-w-6xl mx-auto grid gap-6">
        {posts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              {post.title}
            </h3>
            <p className="text-gray-700">{post.summary}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
