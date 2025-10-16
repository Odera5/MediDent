import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function About() {
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "About LumiaGlobe Jobs";

  // Typing effect (runs once)
  useEffect(() => {
    let index = 0;
    const typing = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(typing);
        setIsTyping(false); // stop cursor animation after typing
      }
    }, 100);
    return () => clearInterval(typing);
  }, []);

  const testimonials = [
    { quote: "LumiaGlobe Jobs helped me land my dream job at a top hospital!", author: "— Dr. Ada" },
    { quote: "Recruiting through LumiaGlobe was efficient and transparent.", author: "— General Hospital Admin" },
    { quote: "I love how easy it is to track applications and get updates.", author: "— Nurse Chinedu" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Looping testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const teamMembers = [
    { name: "Dr. Ani", role: "CEO & Founder", image: "/images/team1.jpg" },
    { name: "Mr. John", role: "CTO", image: "/images/team2.jpg" },
    { name: "Mrs. Ada Okafor", role: "COO", image: "/images/team3.jpg" },
  ];

  return (
    <section className="bg-white text-blue-900 py-20">
      <div className="max-w-6xl mx-auto px-8">
        {/* Header with typing effect and animated underline */}
        <div className="flex flex-col items-center relative group mb-6">
          <h1 className="text-5xl font-bold text-center text-blue-900 min-h-[3.5rem]">
            {typedText}
            <span
              className={`border-r-4 border-teal-500 ml-1 transition-opacity duration-1000 ${
                isTyping ? "animate-pulse" : "opacity-0"
              }`}
            ></span>
          </h1>
          {/* Animated underline */}
          <span className="block w-0 h-1 bg-teal-500 transition-all duration-500 group-hover:w-full mt-1"></span>
        </div>

        <p className="text-lg mb-6 leading-relaxed text-center opacity-90 max-w-3xl mx-auto">
          LumiaGlobe Jobs is Nigeria’s leading healthcare recruitment platform,
          connecting skilled medical professionals with trusted hospitals across
          the country. We aim to make healthcare hiring simple, transparent, and
          impactful for both employers and job seekers.
        </p>

        {/* Vision & Mission */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-blue-50 p-8 rounded-xl shadow-md hover:shadow-lg transition"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-3 text-teal-600">Our Vision</h3>
            <p className="opacity-90">
              To be the most trusted and efficient healthcare recruitment
              platform in Nigeria, empowering hospitals and professionals to
              thrive together.
            </p>
          </motion.div>
          <motion.div
            className="bg-blue-50 p-8 rounded-xl shadow-md hover:shadow-lg transition"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-3 text-teal-600">Our Mission</h3>
            <p className="opacity-90">
              To bridge the gap between medical institutions and healthcare
              talent through technology, transparency, and trust.
            </p>
          </motion.div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-10 text-center text-blue-900">
            Why Choose LumiaGlobe Jobs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Verified Hospitals",
                text: "Every hospital listed on our platform is verified to ensure a secure and trustworthy recruitment process.",
              },
              {
                title: "Seamless Applications",
                text: "Our intuitive system lets job seekers apply and track applications effortlessly in one place.",
              },
              {
                title: "Career Growth",
                text: "We provide career tools, insights, and updates to help healthcare professionals reach their goals.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-2 text-teal-600">{item.title}</h3>
                <p className="opacity-90">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Meet Our Team */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="mx-auto w-32 h-32 rounded-full mb-4 shadow-md object-cover"
                />
                <h3 className="font-semibold text-xl text-blue-900">{member.name}</h3>
                <p className="opacity-90">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20 bg-blue-50 p-8 rounded-xl shadow-inner overflow-hidden relative h-56 flex justify-center items-center">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
            className="absolute text-center px-6 max-w-2xl"
          >
            <p className="text-lg italic opacity-90">“{testimonials[currentIndex].quote}”</p>
            <footer className="mt-4 font-semibold text-teal-600">{testimonials[currentIndex].author}</footer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
