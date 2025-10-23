import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockCandidates = [
  {
    id: 1,
    name: "Dr. Ada Obi",
    role: "Dentist",
    experience: "3 years",
    location: "Lagos, Nigeria",
    skills: ["Restorative Dentistry", "Endodontics"],
  },
  {
    id: 2,
    name: "Nurse John Okeke",
    role: "Registered Nurse",
    experience: "5 years",
    location: "Abuja, Nigeria",
    skills: ["Critical Care", "Emergency Response"],
  },
  {
    id: 3,
    name: "Dr. Mary Eze",
    role: "Medical Laboratory Scientist",
    experience: "4 years",
    location: "Enugu, Nigeria",
    skills: ["Hematology", "Microbiology"],
  },
];

const SearchCandidates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Restrict access to logged-in employers only
  useEffect(() => {
    const isEmployerLoggedIn = localStorage.getItem("employerToken");
    if (!isEmployerLoggedIn) {
      navigate("/employers/login"); // redirect to login if not logged in
    }
  }, [navigate]);

  const filteredCandidates = mockCandidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold text-blue-900 mb-6">
          Search Healthcare Candidates
        </h1>

        {/* Search Bar */}
        <div className="flex items-center mb-8 bg-white shadow-md rounded-lg overflow-hidden">
          <Search className="ml-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, role, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 outline-none"
          />
        </div>

        {/* Candidate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-all"
            >
              <h2 className="text-xl font-bold text-blue-800">
                {candidate.name}
              </h2>
              <p className="text-gray-600">{candidate.role}</p>
              <p className="text-sm text-gray-500">{candidate.experience}</p>
              <p className="text-sm text-gray-500">{candidate.location}</p>

              <div className="mt-3">
                <h3 className="text-sm font-semibold text-gray-700">
                  Skills:
                </h3>
                <ul className="flex flex-wrap gap-2 mt-1">
                  {candidate.skills.map((skill, index) => (
                    <li
                      key={index}
                      className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="mt-4 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchCandidates;
