import React from "react";
import { Search } from "lucide-react";

export function SearchSection({ filters, onFiltersChange, onSearch }) {
  const updateFilter = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      location: "",
      specialty: "",
    });
  };

  return (
    <section className="bg-gray-50 py-8 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-8">
        <div className="bg-white p-8 rounded-xl shadow-md">
          {/* Flex container instead of grid */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            
            {/* Job Title / Keywords */}
            <div className="flex flex-col flex-1">
              <label className="font-medium text-blue-900 mb-2">
                Job Title or Keywords
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => updateFilter("search", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                  placeholder="e.g., Cardiologist, Nurse, Surgeon"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* Location */}
            <div className="flex flex-col flex-1">
              <label className="font-medium text-blue-900 mb-2">Location</label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => updateFilter("location", e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                placeholder="e.g., Lagos, Abuja, Kano"
              />
            </div>

            {/* Specialty */}
            <div className="flex flex-col flex-1">
              <label className="font-medium text-blue-900 mb-2">Specialty</label>
              <input
                type="text"
                value={filters.specialty}
                onChange={(e) => updateFilter("specialty", e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                placeholder="e.g., Surgery, Nursing, Radiology"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col flex-1">
              <label className="font-medium text-blue-900 mb-2 invisible">
                Actions
              </label>
              <div className="flex gap-2">
                <button
                  onClick={onSearch}
                  className="flex-1 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-all transform hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Search Jobs
                </button>
                <button
                  onClick={clearFilters}
                  className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-blue-900 rounded-lg font-medium transition-all transform hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Clear
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
