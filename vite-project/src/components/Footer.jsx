import React from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom"; 

export function Footer() {
  const footerSections = [
    {
      title: "For Job Seekers",
      links: [
        { name: "Browse Jobs", path: "/jobs" },
        { name: "Create Profile", path: "/profile/create" },
        { name: "Career Resources", path: "/resources/career" },
        { name: "Resume Builder", path: "/resume-builder" },
        { name: "Interview Tips", path: "/resources/interview-tips" },
      ],
    },
    {
      title: "For Employers",
      links: [
        { name: "Post a Job", path: "/employers/post-job" },
        { name: "Search Candidates", path: "/employers/search" },
        { name: "Pricing Plans", path: "/pricing" },
        { name: "Recruitment Services", path: "/employers/services" },
        { name: "Employer Dashboard", path: "/employers/dashboard" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Salary Guide", path: "/resources/salary-guide" },
        { name: "Industry Reports", path: "/resources/industry-reports" },
        { name: "Healthcare News", path: "/news" },
        { name: "Blog", path: "/blog" },
        { name: "FAQ", path: "/faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Help Center", path: "/help" },
        { name: "Contact Support", path: "/contact" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
      ],
    },
  ];

  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-8">
        {/* Footer links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-xl mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-white/80 hover:text-teal-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Branding + copyright */}
        <div className="border-t border-white/20 pt-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-teal-500 rounded-full mr-2 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <span className="text-2xl font-semibold">LumiaGlobe</span>
          </div>
          <p className="text-white/80">
            &copy; {new Date().getFullYear()} LumiaGlobe. All rights reserved. Empowering healthcare
            careers across Nigeria.
          </p>
        </div>
      </div>
    </footer>
  );
}
