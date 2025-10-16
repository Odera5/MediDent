import React, { useState } from "react";
import { MapPin, Briefcase, Clock } from "lucide-react";
import { JobDetailsModal } from "./modals/JobDetailsModal";

export function JobCard({ job, onApply }) {
  const [openDetails, setOpenDetails] = useState(false);

  const formatPostedAt = (timestamp) => {
    if (!timestamp) return "N/A";
    try {
      const date =
        typeof timestamp.toDate === "function" ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Invalid Date";
    }
  };

  const formatSalary = (salary) =>
    salary ? Number(salary).toLocaleString() : "?";

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl p-8 mb-6 hover:shadow-xl hover:-translate-y-1 transition-transform relative group">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-blue-900 text-xl font-semibold mb-2">
              {job.title || "No title"}
            </h3>
            <p className="text-gray-600 font-medium">
              {job.hospitalName || "Unknown Hospital"}
            </p>
          </div>
          <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
            {formatPostedAt(job.postedAt)}
          </span>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {job.location || "Not specified"}
          </div>

          <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700 flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            {job.jobType || "Not specified"}
          </div>

          <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700">
            ₦{formatSalary(job.minSalary)} - ₦{formatSalary(job.maxSalary)}
          </div>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {job.description || "No description provided."}
        </p>

        <div className="flex justify-between items-center">
          <button
            onClick={() => onApply(job.id, job.title, job.hospitalName)}
            className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
          >
            Apply Now
          </button>

          <button
            onClick={() => setOpenDetails(true)}
            className="text-blue-900 hover:text-teal-500 font-medium transition-colors"
          >
            View Details
          </button>
        </div>
      </div>

      <JobDetailsModal
        job={job}
        isOpen={openDetails}
        onClose={() => setOpenDetails(false)}
        onApply={() => onApply(job.id, job.title, job.hospitalName)}
      />
    </>
  );
}
