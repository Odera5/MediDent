import React, { useState } from "react";
import { X } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function PostJobModal({ isOpen, onClose, onOpenLogin }) {
  const [formData, setFormData] = useState({
    title: "",
    hospitalName: "",
    location: "",
    jobType: "",
    specialty: "",
    experience: "",
    minSalary: "",
    maxSalary: "",
    description: "",
    requirements: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      onClose();
      onOpenLogin?.();
      toast.info("Please login to post a job.");
      return;
    }

    setIsSubmitting(true);

    try {
      const user = auth.currentUser;

      // Trim text inputs and convert salaries to numbers
      const jobData = {
        title: formData.title.trim(),
        hospitalName: formData.hospitalName.trim(),
        location: formData.location.trim(),
        jobType: formData.jobType || "Not specified",
        specialty: formData.specialty || "Not specified",
        experience: formData.experience || "Not specified",
        minSalary: Number(formData.minSalary) || 0,
        maxSalary: Number(formData.maxSalary) || 0,
        description: formData.description.trim() || "No description provided.",
        requirements: formData.requirements.trim() || "No requirements provided.",
        userId: user.uid,
        employerEmail: user.email,
        postedBy: user.displayName || "Anonymous Employer",
        postedAt: serverTimestamp(),
      };

      await addDoc(collection(db, "jobs"), jobData);

      toast.success("Job posted successfully!");

      //  Reset form
      setFormData({
        title: "",
        hospitalName: "",
        location: "",
        jobType: "",
        specialty: "",
        experience: "",
        minSalary: "",
        maxSalary: "",
        description: "",
        requirements: "",
      });

      onClose();
    } catch (error) {
      console.error("Error posting job:", error.message);
      toast.error("Failed to post job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-blue-900 text-2xl font-semibold">Post a New Job</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl transition-colors">
            <X />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title */}
          <div>
            <label className="block text-blue-900 font-medium mb-2">Job Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              placeholder="e.g., Senior Cardiologist"
              required
            />
          </div>

          {/* Hospital */}
          <div>
            <label className="block text-blue-900 font-medium mb-2">Hospital/Organization</label>
            <input
              type="text"
              value={formData.hospitalName}
              onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              placeholder="Hospital name"
              required
            />
          </div>

          {/* Location + Job Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-blue-900 font-medium mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                placeholder="City, State"
                required
              />
            </div>
            <div>
              <label className="block text-blue-900 font-medium mb-2">Job Type</label>
              <select
                value={formData.jobType}
                onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                required
              >
                <option value="">Select Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Locum">Locum</option>
              </select>
            </div>
          </div>

          {/* Specialty + Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-blue-900 font-medium mb-2">Specialty</label>
              <select
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                required
              >
                <option value="">Select Specialty</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Emergency Medicine">Emergency Medicine</option>
                <option value="Nursing">Nursing</option>
                <option value="Surgery">Surgery</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Radiology">Radiology</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-blue-900 font-medium mb-2">Experience Required</label>
              <select
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                required
              >
                <option value="">Select Experience</option>
                <option value="Entry Level (0-2 years)">Entry Level (0-2 years)</option>
                <option value="Mid-Level (3-5 years)">Mid-Level (3-5 years)</option>
                <option value="Senior Level (6-10 years)">Senior Level (6-10 years)</option>
                <option value="Consultant (10+ years)">Consultant (10+ years)</option>
              </select>
            </div>
          </div>

          {/* Salary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-blue-900 font-medium mb-2">Minimum Salary (₦)</label>
              <input
                type="number"
                value={formData.minSalary}
                onChange={(e) => setFormData({ ...formData, minSalary: e.target.value })}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                placeholder="e.g., 500000"
              />
            </div>
            <div>
              <label className="block text-blue-900 font-medium mb-2">Maximum Salary (₦)</label>
              <input
                type="number"
                value={formData.maxSalary}
                onChange={(e) => setFormData({ ...formData, maxSalary: e.target.value })}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                placeholder="e.g., 800000"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-blue-900 font-medium mb-2">Job Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 h-40 resize-y"
              placeholder="Describe the role, responsibilities, and perks..."
              required
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-blue-900 font-medium mb-2">Requirements</label>
            <textarea
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 h-32 resize-y"
              placeholder="List education, certifications, and skills..."
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Posting Job..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
}
