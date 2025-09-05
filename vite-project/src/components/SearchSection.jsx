import React from "react";
import { Search } from "lucide-react";

export function SearchSection({ filters, onFiltersChange, onSearch }) {
  const updateFilter = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <section className="bg-gray-50 py-8 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-8">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="flex flex-col">
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

            <div className="flex flex-col">
              <label className="font-medium text-blue-900 mb-2">Location</label>
              <select
                value={filters.location}
                onChange={(e) => updateFilter("location", e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              >
                <option value="">All Locations</option>
                <option value="lagos">Lagos</option>
                <option value="abuja">Abuja</option>
                <option value="kano">Kano</option>
                <option value="port-harcourt">Port Harcourt</option>
                <option value="ibadan">Ibadan</option>
                <option value="kaduna">Kaduna</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-blue-900 mb-2">
                Specialty
              </label>
              <select
                value={filters.specialty}
                onChange={(e) => updateFilter("specialty", e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              >
                <option value="">All Specialties</option>
                <option value="cardiology">Cardiology</option>
                <option value="emergency">Emergency Medicine</option>
                <option value="nursing">Nursing</option>
                <option value="surgery">Surgery</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="radiology">Radiology</option>
              </select>
            </div>

            <button
              onClick={onSearch}
              className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-all transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              Search Jobs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
