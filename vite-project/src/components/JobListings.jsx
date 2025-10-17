import { JobCard } from "./JobCard";
import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { SearchSection } from "./SearchSection";
import { Sidebar } from "./Sidebar";
import { motion } from "framer-motion";

export function JobListings({ onApply }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    location: "",
    specialty: "",
    jobTypes: [],
    experienceLevels: [],
    salaryRanges: [],
  });

  // Fetch jobs in real-time
  useEffect(() => {
    const q = query(collection(db, "jobs"), orderBy("postedAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const jobsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      !filters.search ||
      job.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.hospitalName?.toLowerCase().includes(filters.search.toLowerCase());

    const matchesLocation =
      !filters.location ||
      job.location?.toLowerCase().includes(filters.location.toLowerCase());

    const matchesSpecialty =
      !filters.specialty ||
      job.specialty?.toLowerCase().includes(filters.specialty.toLowerCase());

    const matchesJobType =
      filters.jobTypes.length === 0 ||
      filters.jobTypes.some(
        (type) => type.toLowerCase() === job.jobType?.toLowerCase()
      );

    const matchesExperience =
      filters.experienceLevels.length === 0 ||
      filters.experienceLevels.some(
        (level) => level.toLowerCase() === job.experience?.toLowerCase()
      );

    const matchesSalary =
      filters.salaryRanges.length === 0 ||
      filters.salaryRanges.some((range) => {
        if (!range.includes("-")) return false;
        const [min, max] = range.split("-").map(Number);
        const jobMin = Number(job.minSalary);
        const jobMax = Number(job.maxSalary);
        return jobMax >= min && jobMin <= max;
      });

    return (
      matchesSearch &&
      matchesLocation &&
      matchesSpecialty &&
      matchesJobType &&
      matchesExperience &&
      matchesSalary
    );
  });

  const handleClearFilters = () => {
    setFilters({
      search: "",
      location: "",
      specialty: "",
      jobTypes: [],
      experienceLevels: [],
      salaryRanges: [],
    });
  };

  // Animation Variants
  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="bg-white flex flex-col gap-6">
      {/* 🔹 Search Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <SearchSection
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={() => {}}
        />
      </motion.div>

      {/* 🔹 Job Listings Header */}
      <motion.div
        className="flex justify-between items-center mb-8 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-blue-900 text-3xl font-semibold">
          Latest Job Opportunities
        </h2>
        <span className="text-gray-600">Showing {filteredJobs.length} jobs</span>
      </motion.div>

      {/* 🔹 Job Cards Container */}
      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="show" // animate all cards immediately on desktop
      >
        {loading ? (
          <p>Loading jobs...</p>
        ) : filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                y: -3,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
              }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }} // fixes scroll-up issue
            >
              <JobCard
                job={job}
                onApply={() =>
                  onApply(job.id, job.title, job.hospitalName || "Unknown")
                }
              />
            </motion.div>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </motion.div>

      {/* 🔹 Sidebar */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Sidebar
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={handleClearFilters}
        />
      </motion.div>
    </section>
  );
}
