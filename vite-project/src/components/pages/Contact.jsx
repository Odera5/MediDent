import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "Contact Us";

  // Typing effect (runs once)
  useEffect(() => {
    let index = 0;
    const typing = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(typing);
        setIsTyping(false); // stop cursor animation
      }
    }, 120);
    return () => clearInterval(typing);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return toast.error("Please enter a valid email address.");
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "contactMessages"), {
        ...formData,
        submittedAt: serverTimestamp(),
      });

      toast.success("Your message has been sent!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-800 text-white py-20 flex justify-center items-center">
      <div className="w-full max-w-3xl px-8 flex flex-col items-center">
        {/* Header with typing effect and hover underline */}
        <h1 className="text-5xl font-bold mb-6 text-center min-h-[3.5rem] inline-block relative group">
          <span className="inline-block relative">
            {typedText}
            <span
              className={`border-r-4 border-teal-500 ml-1 transition-opacity duration-1000 ${
                isTyping ? "animate-pulse" : "opacity-0"
              }`}
            ></span>
          </span>
          {/* Hover underline */}
          <span className="absolute left-0 -bottom-1 w-0 h-1 bg-teal-500 transition-all duration-500 group-hover:w-full"></span>
        </h1>

        {/* Description */}
        <motion.p
          className="text-lg mb-12 opacity-90 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Have questions or need support? Reach out to us using the form below.
        </motion.p>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="w-full bg-white text-blue-900 p-8 rounded-xl shadow-lg flex flex-col"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Name */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block font-medium mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Your name"
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-300/50 transition-shadow duration-300"
              required
            />
          </motion.div>

          {/* Email */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="you@example.com"
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-300/50 transition-shadow duration-300"
              required
            />
          </motion.div>

          {/* Message */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <label className="block font-medium mb-2">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Your message..."
              className="w-full py-3 px-4 border border-gray-300 rounded-lg h-32 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-300/50 transition-shadow duration-300 resize-y"
              required
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-teal-500 hover:bg-teal-600"
            }`}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
