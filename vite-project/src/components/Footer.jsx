import React from "react";
import { Heart } from "lucide-react";

export function Footer() {
  const footerSections = [
    {
      title: "For Job Seekers",
      links: [
        "Browse Jobs",
        "Create Profile",
        "Career Resources",
        "Resume Builder",
        "Interview Tips",
      ],
    },
    {
      title: "For Employers",
      links: [
        "Post a Job",
        "Search Candidates",
        "Pricing Plans",
        "Recruitment Services",
        "Employer Dashboard",
      ],
    },
    {
      title: "Resources",
      links: [
        "Salary Guide",
        "Industry Reports",
        "Healthcare News",
        "Blog",
        "FAQ",
      ],
    },
    {
      title: "Company",
      links: [
        "About Us",
        "Help Center",
        "Contact Support",
        "Privacy Policy",
        "Terms of Service",
      ],
    },
  ];

  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-xl mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-white/80 hover:text-teal-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-teal-500 rounded-full mr-2 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <span className="text-2xl font-semibold">LumiaGlobe</span>
          </div>
          <p className="text-white/80">
            &copy; 2025 LumiaGlobe. All rights reserved. Empowering healthcare
            careers across Nigeria.
          </p>
        </div>
      </div>
    </footer>
  );
}
