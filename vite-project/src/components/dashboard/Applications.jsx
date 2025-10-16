import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const q = query(collection(db, "applications"), orderBy("submittedAt", "desc"));
        const querySnapshot = await getDocs(q);
        const apps = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setApplications(apps);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading applications...</p>;
  }

  if (applications.length === 0) {
    return <p className="text-center text-gray-600">No applications found.</p>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-blue-900 mb-4">My Applications</h2>

      {applications.map((app) => (
        <div
          key={app.id}
          className="bg-white shadow-md rounded-lg p-6 border border-gray-100 hover:shadow-lg transition-all"
        >
          <h3 className="text-xl font-semibold text-teal-600 mb-2">
            {app.jobTitle || "Untitled Job"}
          </h3>
          <p className="text-gray-700 mb-1">
            <span className="font-medium text-blue-900">Name:</span> {app.fullName}
          </p>
          <p className="text-gray-700 mb-1">
            <span className="font-medium text-blue-900">Email:</span> {app.email}
          </p>
          <p className="text-gray-700 mb-1">
            <span className="font-medium text-blue-900">Phone:</span> {app.phone}
          </p>

          {app.coverLetter && (
            <p className="text-gray-700 mt-2">
              <span className="font-medium text-blue-900">Cover Letter:</span>{" "}
              {app.coverLetter}
            </p>
          )}

          {app.resumeURL && (
            <a
              href={app.resumeURL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-teal-500 hover:underline font-medium"
            >
              View Resume
            </a>
          )}

          <p className="text-sm text-gray-500 mt-2">
            Submitted on:{" "}
            {app.submittedAt?.toDate
              ? app.submittedAt.toDate().toLocaleString()
              : new Date(app.submittedAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
