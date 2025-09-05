import React, { useState } from "react";
import { X, User, Building2 } from "lucide-react";

export function SignupModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("jobseeker");
  const [jobseekerData, setJobseekerData] = useState({
    fullName: "",
    email: "",
    password: "",
    profession: "",
    experience: "",
  });
  const [employerData, setEmployerData] = useState({
    contactName: "",
    email: "",
    password: "",
    organizationName: "",
    location: "",
    organizationType: "",
  });

  const handleJobseekerSubmit = (e) => {
    e.preventDefault();
    console.log("Jobseeker signup:", jobseekerData);
    onClose();
  };

  const handleEmployerSubmit = (e) => {
    e.preventDefault();
    console.log("Employer signup:", employerData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-blue-900 text-2xl font-semibold">
            Create Your Account
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl transition-colors"
          >
            <X />
          </button>
        </div>

        <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
          <button
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === "jobseeker"
                ? "bg-teal-500 text-white"
                : "text-blue-900 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("jobseeker")}
          >
            <User className="w-5 h-5" />
            Job Seeker
          </button>
          <button
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === "employer"
                ? "bg-teal-500 text-white"
                : "text-blue-900 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("employer")}
          >
            <Building2 className="w-5 h-5" />
            Hospital/Employer
          </button>
        </div>

        {activeTab === "jobseeker" && (
          <form onSubmit={handleJobseekerSubmit}>
            <div className="mb-6">
              <label className="block text-blue-900 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={jobseekerData.fullName}
                onChange={(e) =>
                  setJobseekerData({
                    ...jobseekerData,
                    fullName: e.target.value,
                  })
                }
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-blue-900 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={jobseekerData.email}
                onChange={(e) =>
                  setJobseekerData({ ...jobseekerData, email: e.target.value })
                }
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-blue-900 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={jobseekerData.password}
                onChange={(e) =>
                  setJobseekerData({
                    ...jobseekerData,
                    password: e.target.value,
                  })
                }
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                placeholder="Create a password"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-blue-900 font-medium mb-2">
                  Profession
                </label>
                <select
                  value={jobseekerData.profession}
                  onChange={(e) =>
                    setJobseekerData({
                      ...jobseekerData,
                      profession: e.target.value,
                    })
                  }
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                  required
                >
                  <option value="">Select Profession</option>
                  <option value="doctor">Doctor</option>
                  <option value="nurse">Nurse</option>
                  <option value="pharmacist">Pharmacist</option>
                  <option value="technician">Medical Technician</option>
                  <option value="therapist">Therapist</option>
                  <option value="administrator">
                    Healthcare Administrator
                  </option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-blue-900 font-medium mb-2">
                  Experience
                </label>
                <select
                  value={jobseekerData.experience}
                  onChange={(e) =>
                    setJobseekerData({
                      ...jobseekerData,
                      experience: e.target.value,
                    })
                  }
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                  required
                >
                  <option value="">Years of Experience</option>
                  <option value="0-2">0-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition-all"
            >
              Create Job Seeker Account
            </button>
          </form>
        )}

        {activeTab === "employer" && (
          <form onSubmit={handleEmployerSubmit}>
            <div className="mb-6">
              <label className="block text-blue-900 font-medium mb-2">
                Contact Name
              </label>
              <input
                type="text"
                value={employerData.contactName}
                onChange={(e) =>
                  setEmployerData({
                    ...employerData,
                    contactName: e.target.value,
                  })
                }
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                placeholder="Your full name"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-blue-900 font-medium mb-2">
                Work Email
              </label>
              <input
                type="email"
                value={employerData.email}
                onChange={(e) =>
                  setEmployerData({ ...employerData, email: e.target.value })
                }
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                placeholder="your.email@hospital.com"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-blue-900 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={employerData.password}
                onChange={(e) =>
                  setEmployerData({ ...employerData, password: e.target.value })
                }
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                placeholder="Create a secure password"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-blue-900 font-medium mb-2">
                Hospital/Organization Name
              </label>
              <input
                type="text"
                value={employerData.organizationName}
                onChange={(e) =>
                  setEmployerData({
                    ...employerData,
                    organizationName: e.target.value,
                  })
                }
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                placeholder="Enter hospital name"
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
                  value={employerData.location}
                  onChange={(e) =>
                    setEmployerData({
                      ...employerData,
                      location: e.target.value,
                    })
                  }
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                  placeholder="City, State"
                  required
                />
              </div>
              <div>
                <label className="block text-blue-900 font-medium mb-2">
                  Hospital Type
                </label>
                <select
                  value={employerData.organizationType}
                  onChange={(e) =>
                    setEmployerData({
                      ...employerData,
                      organizationType: e.target.value,
                    })
                  }
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="public">Public Hospital</option>
                  <option value="private">Private Hospital</option>
                  <option value="teaching">Teaching Hospital</option>
                  <option value="specialty">Specialty Center</option>
                  <option value="clinic">Clinic</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition-all"
            >
              Create Employer Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
