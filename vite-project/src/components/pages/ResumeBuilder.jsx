import React, { useState } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";

export default function ResumeBuilder() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    title: "",
    summary: "",
    education: "",
    experience: "",
    skills: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let y = 25;
    const pageWidth = doc.internal.pageSize.getWidth();

    // Full Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    const nameWidth = doc.getTextWidth(form.fullName || "Your Name");
    doc.text(form.fullName || "Your Name", (pageWidth - nameWidth) / 2, y);
    y += 8;

    // Job Title
    if (form.title) {
      doc.setFontSize(13);
      doc.setFont("helvetica", "italic");
      const titleWidth = doc.getTextWidth(form.title);
      doc.text(form.title, (pageWidth - titleWidth) / 2, y);
      y += 8;
    }

    //  Contact Info
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const contactText = `${form.email || "email@example.com"} | ${
      form.phone || "Phone number"
    }`;
    const contactWidth = doc.getTextWidth(contactText);
    doc.text(contactText, (pageWidth - contactWidth) / 2, y);
    y += 12;

    //  Divider Line
    doc.setDrawColor(180);
    doc.line(20, y, pageWidth - 20, y);
    y += 10;

    // Resume Sections
    y = addSection(doc, "Professional Summary", form.summary, y, true);
    y = addSection(doc, "Education", form.education, y);
    y = addSection(doc, "Experience", form.experience, y);
    y = addSection(doc, "Skills", form.skills, y);

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text("Generated via LumiaGlobe Resume Builder", 20, 290);

    doc.save(`${form.fullName || "My"}_Resume.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-8">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-3xl font-semibold text-blue-900 text-center mb-10"
      >
        Build Your Healthcare Resume
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* LEFT SIDE — FORM */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-8 rounded-2xl shadow-md"
        >
          <h2 className="text-xl font-semibold text-blue-800 mb-6">
            Fill in Your Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputField
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />
            <InputField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <InputField
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
            <InputField
              label="Job Title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </div>

          <TextAreaField
            label="Professional Summary"
            name="summary"
            value={form.summary}
            onChange={handleChange}
          />
          <TextAreaField
            label="Education"
            name="education"
            value={form.education}
            onChange={handleChange}
          />
          <TextAreaField
            label="Work Experience"
            name="experience"
            value={form.experience}
            onChange={handleChange}
          />
          <TextAreaField
            label="Skills"
            name="skills"
            value={form.skills}
            onChange={handleChange}
          />

          <div className="flex justify-center mt-8">
            <button
              onClick={handleDownloadPDF}
              className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg shadow-md transition"
            >
              Download PDF Resume
            </button>
          </div>
        </motion.div>

        {/* RIGHT SIDE — LIVE PREVIEW */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-8 rounded-2xl shadow-md border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-blue-800 mb-4 text-center">
            Live Resume Preview
          </h2>

          <div className="border-t border-gray-200 pt-6 text-gray-800">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-blue-900">
                {form.fullName || "Your Name"}
              </h3>
              <p className="text-md text-gray-600 italic">
                {form.title || "Your Professional Title"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {form.email || "email@example.com"} |{" "}
                {form.phone || "Phone number"}
              </p>
            </div>

            <Section title="Professional Summary" content={form.summary} />
            <Section title="Education" content={form.education} />
            <Section title="Work Experience" content={form.experience} />
            <Section title="Skills" content={form.skills} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* --- Reusable Components --- */
const InputField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange }) => (
  <div className="mt-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
    />
  </div>
);

const Section = ({ title, content }) => {
  if (!content) return null;
  return (
    <div className="mt-6">
      <h4 className="font-semibold text-teal-700 border-b border-gray-200 pb-1 mb-2">
        {title}
      </h4>
      <p className="text-sm text-gray-700 whitespace-pre-line">{content}</p>
    </div>
  );
};

// Helper for PDF export
function addSection(doc, title, content, y, isFirst = false) {
  if (!content) return y;
  if (y > 260) {
    doc.addPage();
    y = 20;
  }

  // Section Title
  doc.setTextColor(13, 148, 136); // Teal color
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14); // 🔹 Increased from 13 to 14
  doc.text(title, 20, y);
  y += 4;

  // Divider Line
  doc.setDrawColor(200);
  doc.line(20, y, doc.internal.pageSize.getWidth() - 20, y);
  y += 6;

  // Section Content
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const splitText = doc.splitTextToSize(content, 170);
  doc.text(splitText, 20, y);
  y += splitText.length * 6 + 8;

  return y;
}
