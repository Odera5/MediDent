import { JobCard } from "./JobCard";
import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { SearchSection } from "./SearchSection";
import { Sidebar } from "./Sidebar";

console.log("joblisting.jsx component is being listed");

export function JobListings({ onApply }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    specialty: "",
    jobTypes: [],
    experienceLevels: [],
    salaryRanges: [],
  });

  // Extra trigger for search button
  const [searchTriggered, setSearchTriggered] = useState(false);

  // Fetch jobs from Firestore
  useEffect(() => {
    const q = query(collection(db, "jobs"), orderBy("postedDate", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const jobsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched jobs:", jobsData);
      setJobs(jobsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Apply filters to jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      filters.search === "" ||
      job.jobTitle?.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.hospital?.toLowerCase().includes(filters.search.toLowerCase());

    const matchesLocation =
      filters.location === "" ||
      job.location?.toLowerCase().includes(filters.location.toLowerCase());

    const matchesSpecialty =
      filters.specialty === "" ||
      job.specialty?.toLowerCase().includes(filters.specialty.toLowerCase());

    const matchesJobType =
      filters.jobTypes.length === 0 ||
      filters.jobTypes.includes(job.jobType?.toLowerCase());

    const matchesExperience =
      filters.experienceLevels.length === 0 ||
      filters.experienceLevels.includes(job.experienceLevel?.toLowerCase());

    const matchesSalary =
      filters.salaryRanges.length === 0 ||
      filters.salaryRanges.some((range) => job.salaryRange?.includes(range));

    return (
      matchesSearch &&
      matchesLocation &&
      matchesSpecialty &&
      matchesJobType &&
      matchesExperience &&
      matchesSalary
    );
  });

  // Clear all filters handler
  const handleClearFilters = () => {
    setFilters({
      search: "",
      location: "",
      specialty: "",
      jobTypes: [],
      experienceLevels: [],
      salaryRanges: [],
    });
    setSearchTriggered(false);
  };

  return (
    <section className="bg-white flex flex-col gap-6">
      {/* Job content first */}
      <div className="flex-1">
        {/* Search & filter bar */}
        <SearchSection
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={() => setSearchTriggered(true)}
        />

        <div className="flex justify-between items-center mb-8 mt-6">
          <h2 className="text-blue-900 text-3xl font-semibold">
            Latest Job Opportunities
          </h2>
          <span className="text-gray-600">
            Showing {filteredJobs.length} jobs
          </span>
        </div>

        <div className="space-y-6">
          {loading ? (
            <p>Loading jobs...</p>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} onApply={onApply} />
            ))
          ) : (
            <p>No jobs found.</p>
          )}
        </div>
      </div>

      {/* Sidebar now always below jobs (desktop + mobile) */}
      <div className="w-full">
        <Sidebar
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={handleClearFilters}
        />
      </div>
    </section>
  );
}
