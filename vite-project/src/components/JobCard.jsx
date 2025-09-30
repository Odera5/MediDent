import React from "react";
import { MapPin, Clock, Briefcase, } from "lucide-react";
import { useState } from "react";
import { JobDetailsModal } from "./modals/JobDetailsModal";

export function JobCard({ job, onApply }) {
  const [openDetails, setOpenDetails] = useState(false);
  return (
    <>

     <div className="bg-white border border-gray-200 rounded-xl p-8 mb-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-teal-500 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-teal-500 transform scale-y-0 transition-transform duration-300 group-hover:scale-y-100"></div>

      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-blue-900 text-xl font-semibold mb-2">
            {job.jobTitle}
          </h3>
          <p className="text-gray-600 font-medium">{job.hospital}</p>
        </div>
        <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
          {job.postedDate}
        </span>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {job.location}
        </div>
        <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700 flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          {job.jobType
            .replace("-", " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())}
        </div>
        <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700 flex items-center gap-2">
           ₦ {job.minSalary} - ₦ {job.maxSalary}
        </div>
      </div>

      <p className="text-gray-600 mb-6 leading-relaxed">{job.description}</p>

      <div className="flex justify-between items-center">
        <button
          onClick={() => onApply(job.id)}
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

     {/* Details Modal */}
      <JobDetailsModal
        job={job}
        isOpen={openDetails}
        onClose={() => setOpenDetails(false)}
      />
      </>
  );
}
