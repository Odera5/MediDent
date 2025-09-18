import React, { useState } from "react";
import { X } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ApplyModal({ isOpen, onClose, jobId, jobTitle }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const applicationsCollection = collection(db, "applications");
      const resumeFile = formData.resume;

      let resumeURL = null;
      if (resumeFile) {
        const storageRef = ref(
          storage,
          `resumes/${jobId}/${Date.now()}_${resumeFile.name}`
        );
        await uploadBytes(storageRef, resumeFile);
        resumeURL = await getDownloadURL(storageRef);
      }

      await addDoc(applicationsCollection, {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        coverLetter: formData.coverLetter,
        resumeURL: resumeURL,
        jobId,
        submittedAt: new Date(),
      });

      // success toast with jobTitle
      toast.success(
        `Application for ${jobTitle || "this job"} submitted successfully!`
      );

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        resume: null,
        coverLetter: "",
      });
    } catch (error) {
      console.error("Error submitting application:", error.message);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, resume: file });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-blue-900 text-2xl font-semibold">
            Apply for {jobTitle || "Position"}
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
              Full Name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-blue-900 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-blue-900 font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                placeholder="+234 800 000 0000"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-blue-900 font-medium mb-2">
              Resume/CV
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              accept=".pdf,.doc,.docx"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-blue-900 font-medium mb-2">
              Cover Letter
            </label>
            <textarea
              value={formData.coverLetter}
              onChange={(e) =>
                setFormData({ ...formData, coverLetter: e.target.value })
              }
              className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 h-32 resize-y"
              placeholder="Tell us why you're interested in this position and what makes you a great fit..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}
