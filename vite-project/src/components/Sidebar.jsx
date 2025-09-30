import React from "react";

export function Sidebar({ filters, onFiltersChange, onClearFilters }) {
  const updateArrayFilter = (key, value, checked) => {
    const currentArray = filters[key] || [];
    let newArray;

    if (checked) {
      newArray = [...currentArray, value];
    } else {
      newArray = currentArray.filter((item) => item !== value);
    }

    onFiltersChange({
      ...filters,
      [key]: newArray,
    });
  };

  return (
    <aside className="bg-gray-50 p-8 rounded-xl border border-gray-200 h-fit">
      <h3 className="text-blue-900 text-xl font-semibold mb-6">Filter Jobs</h3>

      {/* Job Type */}
      <div className="mb-8">
        <div className="text-blue-900 font-semibold mb-4 text-lg">Job Type</div>
        <div className="space-y-3">
          {[
            { value: "full-time", label: "Full-time" },
            { value: "part-time", label: "Part-time" },
            { value: "contract", label: "Contract" },
            { value: "locum", label: "Locum" },
          ].map(({ value, label }) => (
            <label
              key={value}
              className="flex items-center gap-3 cursor-pointer hover:text-blue-900 transition-colors"
            >
              <input
                type="checkbox"
                checked={filters.jobTypes?.includes(value) || false}
                onChange={(e) =>
                  updateArrayFilter("jobTypes", value, e.target.checked)
                }
                className="w-5 h-5 accent-teal-500"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div className="mb-8">
        <div className="text-blue-900 font-semibold mb-4 text-lg">
          Experience Level
        </div>
        <div className="space-y-3">
          {[
            { value: "entry", label: "Entry Level (0-2 years)" },
            { value: "mid", label: "Mid-Level (3-5 years)" },
            { value: "senior", label: "Senior Level (6-10 years)" },
            { value: "consultant", label: "Consultant (10+ years)" },
          ].map(({ value, label }) => (
            <label
              key={value}
              className="flex items-center gap-3 cursor-pointer hover:text-blue-900 transition-colors"
            >
              <input
                type="checkbox"
                checked={filters.experienceLevels?.includes(value) || false}
                onChange={(e) =>
                  updateArrayFilter("experienceLevels", value, e.target.checked)
                }
                className="w-5 h-5 accent-teal-500"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Salary Range */}
      <div className="mb-8">
        <div className="text-blue-900 font-semibold mb-4 text-lg">
          Salary Range
        </div>
        <div className="space-y-3">
          {[
            { value: "2-5", label: "₦2M - ₦5M" },
            { value: "5-8", label: "₦5M - ₦8M" },
            { value: "8-12", label: "₦8M - ₦12M" },
            { value: "12+", label: "₦12M+" },
          ].map(({ value, label }) => (
            <label
              key={value}
              className="flex items-center gap-3 cursor-pointer hover:text-blue-900 transition-colors"
            >
              <input
                type="checkbox"
                checked={filters.salaryRanges?.includes(value) || false}
                onChange={(e) =>
                  updateArrayFilter("salaryRanges", value, e.target.checked)
                }
                className="w-5 h-5 accent-teal-500"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="mt-6">
        <button
          onClick={onClearFilters}
          className="w-full bg-gray-200 hover:bg-gray-300 text-blue-900 py-3 rounded-lg font-medium transition-all transform hover:-translate-y-0.5"
        >
          Clear All Filters
        </button>
      </div>
    </aside>
  );
}
