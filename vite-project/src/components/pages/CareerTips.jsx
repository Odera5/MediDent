import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Briefcase, Users, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function CareerTips() {
  const tips = [
    {
      icon: <Briefcase className="text-teal-600 w-8 h-8 mb-3" />,
      title: "Ace Your Healthcare Interviews",
      description:
        "Prepare by researching the hospital or clinic, reviewing common healthcare interview questions, and reflecting on your clinical experiences. Always emphasize patient-centered care.",
    },
    {
      icon: <Lightbulb className="text-teal-600 w-8 h-8 mb-3" />,
      title: "Craft a Strong Resume",
      description:
        "Keep your resume concise and focused. Highlight your clinical skills, certifications, and measurable achievements. Use our Resume Builder for a professional healthcare layout.",
    },
    {
      icon: <Users className="text-teal-600 w-8 h-8 mb-3" />,
      title: "Build a Professional Network",
      description:
        "Connect with other healthcare professionals on platforms like LinkedIn. Attend medical seminars and online webinars to build relationships that open future opportunities.",
    },
    {
      icon: <Heart className="text-teal-600 w-8 h-8 mb-3" />,
      title: "Maintain Work-Life Balance",
      description:
        "Healthcare careers can be demanding. Prioritize self-care, mental health, and adequate rest. A balanced lifestyle enhances your effectiveness and career longevity.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-6 sm:px-10">
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-semibold text-blue-900 text-center mb-4"
      >
        Career Tips for Healthcare Professionals
      </motion.h1>

      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Whether you’re just starting your healthcare career or looking to advance,
        these expert-backed tips will help you build confidence, improve your
        professional image, and stand out in the job market.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {tips.map((tip, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition"
          >
            <div className="flex flex-col items-center text-center">
              {tip.icon}
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                {tip.title}
              </h3>
              <p className="text-sm text-gray-700">{tip.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-14 text-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/resources"
            className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg shadow-md transition"
          >
            Explore More Career Resources
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
