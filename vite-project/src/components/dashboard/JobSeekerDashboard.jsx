import React, { useRef, useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

export default function JobSeekerDashboard({ currentUser }) {
  const savedJobsRef = useRef(null);
  const appliedJobsRef = useRef(null);

  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(true);
  const [loadingApplied, setLoadingApplied] = useState(true);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const savedJobsQuery = query(
          collection(db, "savedJobs"),
          where("userId", "==", currentUser.uid)
        );
        const snapshot = await getDocs(savedJobsQuery);
        const jobs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSavedJobs(jobs);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch saved jobs");
      } finally {
        setLoadingSaved(false);
      }
    };

    const fetchAppliedJobs = async () => {
      try {
        const appliedJobsQuery = query(
          collection(db, "applications"),
          where("userId", "==", currentUser.uid)
        );
        const snapshot = await getDocs(appliedJobsQuery);
        const jobs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppliedJobs(jobs);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch applied jobs");
      } finally {
        setLoadingApplied(false);
      }
    };

    fetchSavedJobs();
    fetchAppliedJobs();
  }, [currentUser]);

  return (
    <div className="max-w-6xl mx-auto p-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 sticky top-24 h-fit bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-blue-900">
          Job Seeker Menu
        </h2>
        <ul className="space-y-2">
          <li>
            <button
              className="text-teal-500 hover:underline font-medium"
              onClick={() => scrollToSection(savedJobsRef)}
            >
              Saved Jobs
            </button>
          </li>
          <li>
            <button
              className="text-teal-500 hover:underline font-medium"
              onClick={() => scrollToSection(appliedJobsRef)}
            >
              Applied Jobs
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-3/4 flex flex-col gap-12">
        <h1 className="text-4xl font-bold mb-6 text-blue-900">
          Job Seeker Dashboard
        </h1>

        {/* Saved Jobs Section */}
        <section ref={savedJobsRef} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Saved Jobs</h2>
          <div className="p-6 bg-white shadow rounded-lg border border-gray-200">
            {loadingSaved ? (
              <p>Loading saved jobs...</p>
            ) : savedJobs.length === 0 ? (
              <p>No saved jobs found.</p>
            ) : (
              <ul className="space-y-2">
                {savedJobs.map((job) => (
                  <li
                    key={job.id}
                    className="p-3 border-b hover:bg-gray-50 rounded"
                  >
                    <p className="font-semibold">{job.title}</p>
                    <p className="text-gray-600">{job.company}</p>
                    <p className="text-sm text-gray-500">{job.location}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Applied Jobs Section */}
        <section ref={appliedJobsRef}>
          <h2 className="text-2xl font-semibold mb-4">Applied Jobs</h2>
          <div className="p-6 bg-white shadow rounded-lg border border-gray-200">
            {loadingApplied ? (
              <p>Loading applied jobs...</p>
            ) : appliedJobs.length === 0 ? (
              <p>No applied jobs found.</p>
            ) : (
              <ul className="space-y-2">
                {appliedJobs.map((job) => (
                  <li
                    key={job.id}
                    className="p-3 border-b hover:bg-gray-50 rounded"
                  >
                    <p className="font-semibold">{job.jobTitle}</p>
                    <p className="text-gray-600">
                      Applied on:{" "}
                      {job.submittedAt?.toDate?.().toLocaleDateString() ||
                        "N/A"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
