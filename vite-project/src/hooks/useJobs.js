import { useState, useEffect, useCallback } from "react";
import { jobData } from "../data/jobData";

/**
 * @typedef {object} Job
 * @property {number} id
 * @property {string} title
 * @property {string} hospital
 * @property {string} location
 * @property {string} jobType
 * @property {string} salary
 * @property {string} description
 * @property {string} postedDate
 * @property {string} specialty
 * @property {string} experience
 */

/**
 * @typedef {object} FilterState
 * @property {string} search
 * @property {string} location
 * @property {string} specialty
 * @property {string[]} jobTypes
 * @property {string[]} experienceLevels
 * @property {string[]} salaryRanges
 */

export function useJobs() {
  const [jobs, setJobs] = useState(jobData.slice(0, 5));
  const [allJobs] = useState(jobData);
  const [filteredJobs, setFilteredJobs] = useState(jobData);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    specialty: "",
    jobTypes: [],
    experienceLevels: [],
    salaryRanges: [],
  });

  const applyFilters = useCallback(() => {
    let filtered = allJobs;

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          job.hospital.toLowerCase().includes(filters.search.toLowerCase()) ||
          job.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Specialty filter
    if (filters.specialty) {
      filtered = filtered.filter((job) => job.specialty === filters.specialty);
    }

    // Job type filter
    if (filters.jobTypes.length > 0) {
      filtered = filtered.filter((job) =>
        filters.jobTypes.includes(job.jobType)
      );
    }

    // Experience filter
    if (filters.experienceLevels.length > 0) {
      filtered = filtered.filter((job) =>
        filters.experienceLevels.includes(job.experience)
      );
    }

    // Salary filter (simplified)
    /*  if (filters.salaryRanges.length > 0) {
      // This is a simplified implementation - in a real app you'd parse the salary strings
      filtered = filtered.filter(job => {
        // For demo purposes, we'll just filter by some basic criteria
        return true;
      });
    }*/

    setFilteredJobs(filtered);
    setJobs(filtered.slice(0, 5));
  }, [allJobs, filters]);

  const searchJobs = () => {
    applyFilters();
  };

  const loadMoreJobs = () => {
    const currentLength = jobs.length;
    const nextJobs = filteredJobs.slice(0, currentLength + 3);
    setJobs(nextJobs);
  };

  const clearFilters = () => {
    const emptyFilters = {
      search: "",
      location: "",
      specialty: "",
      jobTypes: [],
      experienceLevels: [],
      salaryRanges: [],
    };
    setFilters(emptyFilters);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, applyFilters]);

  return {
    jobs,
    filters,
    setFilters,
    searchJobs,
    loadMoreJobs,
    clearFilters,
    showLoadMore: jobs.length < filteredJobs.length,
  };
}
