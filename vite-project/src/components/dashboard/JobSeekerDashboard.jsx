import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function JobSeekerDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { path: "/dashboard/jobseeker/saved", label: "Saved Jobs" },
    { path: "/dashboard/jobseeker/applications", label: "Applied Jobs" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar (slides in when scrolled into view) */}
      <motion.aside
        className="w-full md:w-1/4 sticky top-24 h-fit bg-white p-4 shadow rounded-lg"
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-blue-900">
          Job Seeker Menu
        </h2>

        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.li
                key={item.path}
                whileHover={{ x: 5 }}
                className={`relative ${
                  isActive ? "text-blue-900 font-semibold" : "text-teal-500"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-4 bg-blue-900 rounded"
                    transition={{ duration: 0.3 }}
                  />
                )}

                <button
                  className={`hover:underline ${
                    isActive ? "text-blue-900" : "text-teal-500"
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </button>
              </motion.li>
            );
          })}
        </ul>
      </motion.aside>

      {/* Main Content (fades in on scroll) */}
      <motion.main
        className="w-full md:w-3/4 flex flex-col gap-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Animated title */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={location.pathname.split("/").pop()}
            className="text-4xl font-bold mb-6 text-blue-900"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.5 }}
          >
            Job Seeker Dashboard
          </motion.h1>
        </AnimatePresence>

        {/* Nested route animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </motion.main>
    </div>
  );
}
