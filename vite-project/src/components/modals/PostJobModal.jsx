import React, { useState } from "react";
import { X } from "lucide-react";

export function PostJobModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    jobTitle: "",
    hospital: "",
    location: "",
    jobType: "",
    specialty: "",
    experience: "",
    minSalary: "",
    maxSalary: "",
    description: "",
    requirements: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job posted:", formData);
    onClose();
    // Show success notification
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-blue-900 text-2xl font-semibold">
            Post a New Job
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl transition-colors"
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-blue-900 font-medium mb-2">
              Job Title
            </label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) =>
                setFormData({ ...formData, jobTitle: e.target.value })
              }
              className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              placeholder="e.g., Senior Cardiologist"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-blue-900 font-medium mb-2">
              Hospital/Organization
            </label>
            <input
              type="text"
              value={formData.hospital}
              onChange={(e) =>
                setFormData({ ...formData, hospital: e.target.value })
              }
              className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              placeholder="Hospital name"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-blue-900 font-medium mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                placeholder="City, State"
                required
              />
            </div>
            <div>
              <label className="block text-blue-900 font-medium mb-2">
                Job Type
              </label>
              <select
                value={formData.jobType}
                onChange={(e) =>
                  setFormData({ ...formData, jobType: e.target.value })
                }
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                required
              >
                <option value="">Select Type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="locum">Locum</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-blue-900 font-medium mb-2">
                Specialty
              </label>
              <select
                value={formData.specialty}
                onChange={(e) =>
                  setFormData({ ...formData, specialty: e.target.value })
                }
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                required
              >
                <option value="">Select Specialty</option>
                <option value="cardiology">Cardiology</option>
                <option value="emergency">Emergency Medicine</option>
                <option value="nursing">Nursing</option>
                <option value="surgery">Surgery</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="radiology">Radiology</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-blue-900 font-medium mb-2">
                Experience Required
              </label>
              <select
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                required
              >
                <option value="">Select Experience</option>
                <option value="entry">Entry Level (0-2 years)</option>
                <option value="mid">Mid-Level (3-5 years)</option>
                <option value="senior">Senior Level (6-10 years)</option>
                <option value="consultant">Consultant (10+ years)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-blue-900 font-medium mb-2">
                Minimum Salary (₦)
              </label>
              <input
                type="number"
                value={formData.minSalary}
                onChange={(e) =>
                  setFormData({ ...formData, minSalary: e.target.value })
                }
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                placeholder="e.g., 5000000"
              />
            </div>
            <div>
              <label className="block text-blue-900 font-medium mb-2">
                Maximum Salary (₦)
              </label>
              <input
                type="number"
                value={formData.maxSalary}
                onChange={(e) =>
                  setFormData({ ...formData, maxSalary: e.target.value })
                }
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                placeholder="e.g., 8000000"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-blue-900 font-medium mb-2">
              Job Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 h-40 resize-y"
              placeholder="Describe the role, responsibilities, and what makes this opportunity special..."
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-blue-900 font-medium mb-2">
              Requirements
            </label>
            <textarea
              value={formData.requirements}
              onChange={(e) =>
                setFormData({ ...formData, requirements: e.target.value })
              }
              className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 h-32 resize-y"
              placeholder="List education, certifications, and skill requirements..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition-all"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
}
