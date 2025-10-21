import React from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function Footer() {
  const footerSections = [
    {
      title: "For Job Seekers",
      links: [
        { name: "Browse Jobs", path: "/jobs" },
        { name: "Create Profile", path: "/profile/create" },
        { name: "Resume Builder", path: "/resume-builder" },
        { name: "Career Tips", path: "/career-tips" },
      ],
    },
    {
      title: "For Employers",
      links: [
        { name: "Post a Job", path: "/employers/post-job" },
        { name: "Search Candidates", path: "/employers/search" },
        { name: "Employer Dashboard", path: "/employers/dashboard" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Healthcare News", path: "/news" },
        { name: "Blog", path: "/blog" },
        { name: "FAQ", path: "/faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Contact Support", path: "/contact" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
      ],
    },
  ];

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    hover: { scale: 1.05, color: "#14B8A6" },
  };

  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-8">
        {/* Footer Links */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {footerSections.map((section, index) => (
            <motion.div key={index} variants={sectionVariants}>
              <h3 className="font-semibold text-xl mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    variants={linkVariants}
                    whileHover="hover"
                  >
                    <Link
                      to={link.path}
                      className="text-white/80 hover:text-teal-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Branding + Copyright */}
        <motion.div
          className="border-t border-white/20 pt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="flex items-center justify-center mb-4"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <motion.div
              className="w-8 h-8 bg-teal-500 rounded-full mr-2 flex items-center justify-center"
              whileHover={{ rotate: 20, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Heart className="w-5 h-5" />
            </motion.div>
            <span className="text-2xl font-semibold">LumiaGlobe</span>
          </motion.div>
          <p className="text-white/80">
            &copy; {new Date().getFullYear()} LumiaGlobe. All rights reserved.
            Empowering healthcare careers across Nigeria.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
