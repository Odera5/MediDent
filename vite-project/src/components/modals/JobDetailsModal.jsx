import React from "react";
import { X, MapPin, Briefcase, Clock } from "lucide-react";
import { format } from "date-fns"; //  Import date-fns

export function JobDetailsModal({ job, isOpen, onClose, onApply }) {
  if (!isOpen || !job) return null;

  // Format postedAt timestamp if it exists
  const formattedDate = job.postedAt
    ? format(job.postedAt.toDate(), "dd MMM yyyy")
    : "Date not available";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-blue-900 text-2xl font-semibold">{job.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl transition-colors"
          >
            <X />
          </button>
        </div>

        <p className="text-gray-600 font-medium mb-2">
          {job.hospitalName || "Unknown Hospital"}
        </p>
        <p className="text-gray-500 text-sm mb-4">Posted on: {formattedDate}</p>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {job.location || "Not specified"}
          </div>

          <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700 flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            {job.jobType
              ? job.jobType.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
              : "Not specified"}
          </div>

          <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {job.experience || "Not specified"}
          </div>

          <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700">
            Specialty: {job.specialty || "Not specified"}
          </div>

          <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700">
            ₦{job.minSalary || "?"} - ₦{job.maxSalary || "?"}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-blue-900 font-semibold mb-2">Job Description</h3>
          <p className="text-gray-600 leading-relaxed">
            {job.description || "No description provided."}
          </p>
        </div>

        {/* Requirements */}
        <div className="mb-6">
          <h3 className="text-blue-900 font-semibold mb-2">Requirements</h3>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {job.requirements || "No requirements specified."}
          </p>
        </div>

        {/* Action */}
        <button
          onClick={() => onApply(job.id)}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition-all"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}
