import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Hero({ onFindJobsClick, onPostJobClick }) {
  const fullText = "Connect Healthcare Professionals with Leading Hospitals";
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Typing effect
  useEffect(() => {
    let index = 0;
    const typing = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(typing);
        setIsTyping(false);
      }
    }, 50);
    return () => clearInterval(typing);
  }, []);

  // Button floating animation
  const floatVariants = {
    initial: { y: 0 },
    animate: { y: [0, -5, 0] },
  };

  return (
    <motion.section
      className="text-white py-20 text-center"
      style={{
        background: "linear-gradient(-45deg, #1e3a8a, #2563eb, #3b82f6, #1e40af)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="max-w-6xl mx-auto px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Heading with typing effect and hover underline */}
        <h1 className="text-6xl font-bold mb-6 leading-tight inline-block relative min-h-[6rem] group">
          <span className="inline-block relative">
            {typedText}
            <span
              className={`border-r-4 border-teal-400 ml-1 transition-opacity duration-1000 ${
                isTyping ? "animate-pulse" : "opacity-0"
              }`}
            ></span>
          </span>
          <span className="absolute left-0 -bottom-1 w-0 h-1 bg-teal-400 transition-all duration-500 group-hover:w-full"></span>
        </h1>

        {/* Subtext */}
        <motion.p
          className="text-xl mb-10 opacity-90 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isTyping ? 0 : 1, y: isTyping ? 20 : 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Nigeria's premier platform for medical careers. Find your dream job or
          discover exceptional talent.
        </motion.p>

        {/* Buttons with floating effect */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isTyping ? 0 : 1, y: isTyping ? 20 : 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.button
            onClick={onFindJobsClick}
            className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-semibold text-lg transition-all transform hover:-translate-y-1 hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={floatVariants}
            animate="animate"
            transition={{ duration: 2, repeat: Infinity }}
          >
            Find Healthcare Jobs
          </motion.button>
          <motion.button
            onClick={onPostJobClick}
            className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-900 rounded-lg font-semibold text-lg transition-all transform hover:-translate-y-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={floatVariants}
            animate="animate"
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          >
            Post a Job
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Gradient animation keyframes */}
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </motion.section>
  );
}
