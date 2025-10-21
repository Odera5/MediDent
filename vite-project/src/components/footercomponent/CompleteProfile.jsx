import React, { useState } from "react";
import { Upload, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CompleteProfile() {
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState(null);
  const [summary, setSummary] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can send data to your backend or store temporarily
    console.log({
      resume: resumeFile,
      professionalSummary: summary,
    });

    // Redirect to Thank You page after submission
    navigate("/thank-you");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-12">
      <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
        Complete Your Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Resume Upload */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            Upload Your Resume (PDF or DOC)
          </label>
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:border-teal-400 transition">
            <Upload className="w-10 h-10 text-teal-500 mb-2" />
            <p className="text-gray-600">
              {resumeFile ? (
                <span className="flex items-center gap-2 text-teal-600">
                  <FileText className="w-5 h-5" />
                  {resumeFile.name}
                </span>
              ) : (
                "Click to upload or drag and drop your resume here"
              )}
            </p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="opacity-0 absolute inset-0 cursor-pointer"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Professional Summary */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            Professional Summary
          </label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Briefly describe your experience, skills, and professional goals..."
            rows="6"
            className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-teal-400 outline-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-md"
          >
            Finish Setup
          </button>
        </div>
      </form>
    </div>
  );
}
