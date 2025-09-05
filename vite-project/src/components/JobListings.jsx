import React from "react";
import { JobCard } from "./JobCard";

export function JobListings({ jobs, onApply, onLoadMore, showLoadMore }) {
  return (
    <section className="bg-white">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-blue-900 text-3xl font-semibold">
          Latest Job Opportunities
        </h2>
        <span className="text-gray-600">Showing {jobs.length} jobs</span>
      </div>

      <div>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onApply={onApply} />
        ))}
      </div>

      {showLoadMore && (
        <div className="text-center mt-8">
          <button
            onClick={onLoadMore}
            className="bg-gray-200 hover:bg-gray-300 text-blue-900 px-8 py-3 rounded-lg font-medium transition-all transform hover:-translate-y-0.5"
          >
            Load More Jobs
          </button>
        </div>
      )}
    </section>
  );
}
