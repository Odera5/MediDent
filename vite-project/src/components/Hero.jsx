import React from "react";
export function Hero({ onFindJobsClick, onPostJobClick }) {
  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-800 text-white py-20 text-center">
      <div className="max-w-6xl mx-auto px-8">
        <h1 className="text-6xl font-bold mb-6 leading-tight">
          Connect Healthcare Professionals with{" "}
          <span className="text-teal-400">Leading Hospitals</span>
        </h1>
        <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto">
          Nigeria's premier platform for medical careers. Find your dream job or
          discover exceptional talent.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
          <button
            onClick={onFindJobsClick}
            className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-semibold text-lg transition-all transform hover:-translate-y-1 hover:shadow-xl"
          >
            Find Healthcare Jobs
          </button>
          <button
            onClick={onPostJobClick}
            className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-900 rounded-lg font-semibold text-lg transition-all transform hover:-translate-y-1"
          >
            Post a Job
          </button>
        </div>
      </div>
    </section>
  );
}
