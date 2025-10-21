import React from "react";
import { motion } from "framer-motion";

export default function ProfileView() {
  const mockProfile = {
    name: "Dr. Ani Kingsley",
    title: "Dentist",
    email: "anikingsley@example.com",
    phone: "+234 812 345 6789",
    location: "Enugu, Nigeria",
    experience: "2 years",
    degree: "BDS",
    institution: "University of Nigeria",
    license: "DN12345",
    summary:
      "A passionate dental professional committed to improving oral health through modern techniques and patient-centered care.",
    skills: "Restorative Dentistry, Oral Surgery, Prosthodontics",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full"
      >
        <h1 className="text-3xl font-semibold text-blue-900 mb-6 text-center">
          My Profile
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ProfileField label="Full Name" value={mockProfile.name} />
          <ProfileField label="Job Title" value={mockProfile.title} />
          <ProfileField label="Email" value={mockProfile.email} />
          <ProfileField label="Phone" value={mockProfile.phone} />
          <ProfileField label="Location" value={mockProfile.location} />
          <ProfileField label="Experience" value={mockProfile.experience} />
          <ProfileField label="Degree" value={mockProfile.degree} />
          <ProfileField label="Institution" value={mockProfile.institution} />
          <ProfileField label="License" value={mockProfile.license} />
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Professional Summary
          </h3>
          <p className="text-gray-700">{mockProfile.summary}</p>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Skills</h3>
          <p className="text-gray-700">{mockProfile.skills}</p>
        </div>
      </motion.div>
    </div>
  );
}

const ProfileField = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium text-gray-800">{value}</p>
  </div>
);
