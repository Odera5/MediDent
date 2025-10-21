import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";

export default function BrowseJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Example jobs 
    setJobs([
      {
        id: 1,
        title: "Dental Officer",
        location: "Lagos, Nigeria",
        hospital: "SmileCare Clinic",
        type: "Full-time",
      },
      {
        id: 2,
        title: "Medical Laboratory Scientist",
        location: "Abuja, Nigeria",
        hospital: "LifeBridge Hospital",
        type: "Part-time",
      },
      {
        id: 3,
        title: "Registered Nurse",
        location: "Enugu, Nigeria",
        hospital: "HealingTouch Medical Centre",
        type: "Full-time",
      },
    ]);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <motion.h1
        className="text-4xl font-bold text-blue-900 mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Browse Available Jobs
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <motion.div
            key={job.id}
            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center mb-3 text-teal-600">
              <Briefcase className="mr-2" />
              <h2 className="text-xl font-semibold">{job.title}</h2>
            </div>
            <p className="text-gray-700 mb-2">
              <strong>Hospital:</strong> {job.hospital}
            </p>
            <p className="text-gray-600 flex items-center mb-2">
              <MapPin className="w-4 h-4 mr-1 text-teal-500" /> {job.location}
            </p>
            <p className="text-sm text-teal-600 mb-4">{job.type}</p>
            <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-medium transition-all">
              View Details
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
