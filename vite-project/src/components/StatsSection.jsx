import React from "react";
import { FileText, Building2, Users, CheckCircle } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      icon: <FileText className="w-8 h-8" />,
      number: "2,500+",
      label: "Active Job Listings",
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      number: "850+",
      label: "Partner Hospitals",
    },
    {
      icon: <Users className="w-8 h-8" />,
      number: "15,000+",
      label: "Healthcare Professionals",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      number: "95%",
      label: "Successful Placements",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-blue-900 text-4xl font-bold mb-4">
            Trusted by Healthcare Leaders
          </h2>
          <p className="text-gray-600 text-xl">
            Connecting top medical talent across Nigeria
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white p-10 rounded-xl shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="w-15 h-15 bg-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-blue-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
