import React, { useState } from "react";
import { X, User, Building2 } from "lucide-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export function SignupModal({ isOpen, onClose, onOpenLogin }) {
  const [activeTab, setActiveTab] = useState("jobseeker");
  const [loading, setLoading] = useState(false);

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

  const handleJobseekerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        jobseekerData.email,
        jobseekerData.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: jobseekerData.fullName,
        email: jobseekerData.email,
        profession: jobseekerData.profession,
        experience: jobseekerData.experience,
        role: "jobSeeker",
        createdAt: new Date(),
      });

      toast.success("Jobseeker account created successfully!");
      onClose();
    } catch (error) {
      console.error("Jobseeker signup failed:", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmployerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        employerData.email,
        employerData.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        contactName: employerData.contactName,
        email: employerData.email,
        organizationName: employerData.organizationName,
        location: employerData.location,
        organizationType: employerData.organizationType,
        role: "employer",
        createdAt: new Date(),
      });

      toast.success("Employer account created successfully!");
      onClose();
    } catch (error) {
      console.error("Employer signup failed:", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
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

        {/* Tab Buttons */}
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

        {/* Jobseeker Form */}
        {activeTab === "jobseeker" && (
          <form onSubmit={handleJobseekerSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={jobseekerData.fullName}
              onChange={(e) =>
                setJobseekerData({ ...jobseekerData, fullName: e.target.value })
              }
              required
              className="w-full py-3 px-4 border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              value={jobseekerData.email}
              onChange={(e) =>
                setJobseekerData({ ...jobseekerData, email: e.target.value })
              }
              required
              className="w-full py-3 px-4 border border-gray-300 rounded-lg"
            />
            <input
              type="password"
              placeholder="Password"
              value={jobseekerData.password}
              onChange={(e) =>
                setJobseekerData({ ...jobseekerData, password: e.target.value })
              }
              required
              className="w-full py-3 px-4 border border-gray-300 rounded-lg"
            />
            <select
              value={jobseekerData.profession}
              onChange={(e) =>
                setJobseekerData({
                  ...jobseekerData,
                  profession: e.target.value,
                })
              }
              required
              className="w-full py-3 px-4 border border-gray-300 rounded-lg"
            >
              <option value="">Select Profession</option>
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse</option>
              <option value="pharmacist">Pharmacist</option>
              <option value="technician">Medical Technician</option>
              <option value="therapist">Therapist</option>
              <option value="administrator">Healthcare Administrator</option>
              <option value="other">Other</option>
            </select>
            <select
              value={jobseekerData.experience}
              onChange={(e) =>
                setJobseekerData({
                  ...jobseekerData,
                  experience: e.target.value,
                })
              }
              required
              className="w-full py-3 px-4 border border-gray-300 rounded-lg"
            >
              <option value="">Years of Experience</option>
              <option value="0-2">0-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="6-10">6-10 years</option>
              <option value="10+">10+ years</option>
            </select>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition-all"
            >
              {loading ? "Creating..." : "Create Job Seeker Account"}
            </button>

            {/* Already have an account */}
            <p className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenLogin) onOpenLogin();
                }}
                className="text-teal-500 hover:text-teal-600 font-medium"
              >
                Log in here
              </button>
            </p>
          </form>
        )}

        {/* Employer Form */}
        {activeTab === "employer" && (
          <form onSubmit={handleEmployerSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Contact Name"
              value={employerData.contactName}
              onChange={(e) =>
                setEmployerData({
                  ...employerData,
                  contactName: e.target.value,
                })
              }
              required
              className="w-full py-3 px-4 border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              placeholder="Work Email"
              value={employerData.email}
              onChange={(e) =>
                setEmployerData({ ...employerData, email: e.target.value })
              }
              required
              className="w-full py-3 px-4 border border-gray-300 rounded-lg"
            />
            <input
              type="password"
              placeholder="Password"
              value={employerData.password}
              onChange={(e) =>
                setEmployerData({ ...employerData, password: e.target.value })
              }
              required
              className="w-full py-3 px-4 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Hospital/Organization Name"
              value={employerData.organizationName}
              onChange={(e) =>
                setEmployerData({
                  ...employerData,
                  organizationName: e.target.value,
                })
              }
              required
              className="w-full py-3 px-4 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Location (City, State)"
              value={employerData.location}
              onChange={(e) =>
                setEmployerData({ ...employerData, location: e.target.value })
              }
              required
              className="w-full py-3 px-4 border border-gray-300 rounded-lg"
            />
            <select
              value={employerData.organizationType}
              onChange={(e) =>
                setEmployerData({
                  ...employerData,
                  organizationType: e.target.value,
                })
              }
              required
              className="w-full py-3 px-4 border border-gray-300 rounded-lg"
            >
              <option value="">Select Hospital Type</option>
              <option value="public">Public Hospital</option>
              <option value="private">Private Hospital</option>
              <option value="teaching">Teaching Hospital</option>
              <option value="specialty">Specialty Center</option>
              <option value="clinic">Clinic</option>
            </select>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition-all"
            >
              {loading ? "Creating..." : "Create Employer Account"}
            </button>

            {/* Already have an account */}
            <p className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenLogin) onOpenLogin();
                }}
                className="text-teal-500 hover:text-teal-600 font-medium"
              >
                Log in here
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
