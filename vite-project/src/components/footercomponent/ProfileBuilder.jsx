import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileBuilder() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    title: "",
    skills: "",
    degree: "",
    institution: "",
    license: "",
    summary: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real setup, send formData to API here
    navigate("/thank-you");
  };

  const stepsTotal = 3;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center py-12 px-4">
      {/* Progress Bar */}
      <div className="w-full max-w-2xl mb-8">
        <div className="w-full bg-blue-200 rounded-full h-2.5">
          <motion.div
            className="bg-teal-500 h-2.5 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / stepsTotal) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <p className="text-center text-sm text-gray-600 mt-2">
          Step {step} of {stepsTotal}
        </p>
      </div>

      {/* Form Card */}
      <motion.div
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* STEP 1 — PERSONAL INFO */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
              <InputField label="Email" name="email" value={formData.email} onChange={handleChange} type="email" />
              <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} type="tel" />
              <InputField label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="City, State" />
            </div>

            <div className="flex justify-end mt-8">
              <NextButton onClick={nextStep} />
            </div>
          </>
        )}

        {/* STEP 2 — PROFESSIONAL DETAILS */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">
              Professional Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField label="Job Title" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Dentist, Nurse, Pharmacist" />
              <InputField label="Years of Experience" name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g. 3 years" />
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Key Skills</label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="List your major skills (comma-separated)"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <BackButton onClick={prevStep} />
              <NextButton onClick={nextStep} />
            </div>
          </>
        )}

        {/* STEP 3 — EDUCATION & LICENSE */}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">
              Education & Licensing
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField label="Degree" name="degree" value={formData.degree} onChange={handleChange} placeholder="e.g. BDS, MBBS, RN" />
              <InputField label="Institution" name="institution" value={formData.institution} onChange={handleChange} placeholder="e.g. University of Nigeria" />
              <InputField label="Professional License Number" name="license" value={formData.license} onChange={handleChange} />
            </div>

            <div className="sm:col-span-2 mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Briefly describe your background and goals..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
                rows={4}
              />
            </div>

            <div className="flex justify-between mt-8">
              <BackButton onClick={prevStep} />
              <SubmitButton onClick={handleSubmit} />
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

/* ---------------------- Subcomponents ---------------------- */
const InputField = ({ label, name, value, onChange, type = "text", placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400"
    />
  </div>
);

const NextButton = ({ onClick }) => (
  <button onClick={onClick} className="flex items-center gap-2 bg-teal-500 text-white px-5 py-2 rounded-lg hover:bg-teal-600 transition">
    Next <ArrowRight className="w-4 h-4" />
  </button>
);

const BackButton = ({ onClick }) => (
  <button onClick={onClick} className="flex items-center gap-2 bg-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-400 transition">
    <ArrowLeft className="w-4 h-4" /> Back
  </button>
);

const SubmitButton = ({ onClick }) => (
  <button onClick={onClick} className="flex items-center gap-2 bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition">
    Finish <CheckCircle className="w-5 h-5" />
  </button>
);
