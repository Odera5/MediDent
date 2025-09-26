import React, { useRef, useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

export default function EmployerDashboard({ currentUser }) {
  const postJobsRef = useRef(null);
  const applicantsRef = useRef(null);

  const [postedJobs, setPostedJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingApplicants, setLoadingApplicants] = useState(true);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchPostedJobs = async () => {
      try {
        const jobsQuery = query(
          collection(db, "jobs"),
          where("employerId", "==", currentUser.uid)
        );
        const snapshot = await getDocs(jobsQuery);
        const jobs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPostedJobs(jobs);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch posted jobs");
      } finally {
        setLoadingJobs(false);
      }
    };

    const fetchApplicants = async () => {
      try {
        const applicationsQuery = query(
          collection(db, "applications"),
          where("employerId", "==", currentUser.uid)
        );
        const snapshot = await getDocs(applicationsQuery);
        const apps = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setApplicants(apps);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch applicants");
      } finally {
        setLoadingApplicants(false);
      }
    };

    fetchPostedJobs();
    fetchApplicants();
  }, [currentUser]);

  return (
    <div className="max-w-6xl mx-auto p-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 sticky top-24 h-fit bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-blue-900">
          Employer Menu
        </h2>
        <ul className="space-y-2">
          <li>
            <button
              className="text-teal-500 hover:underline font-medium"
              onClick={() => scrollToSection(postJobsRef)}
            >
              Posted Jobs
            </button>
          </li>
          <li>
            <button
              className="text-teal-500 hover:underline font-medium"
              onClick={() => scrollToSection(applicantsRef)}
            >
              Applicants
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-3/4 flex flex-col gap-12">
        <h1 className="text-4xl font-bold mb-6 text-blue-900">
          Employer Dashboard
        </h1>

        {/* Posted Jobs Section */}
        <section ref={postJobsRef} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Posted Jobs</h2>
          <div className="p-6 bg-white shadow rounded-lg border border-gray-200">
            {loadingJobs ? (
              <p>Loading posted jobs...</p>
            ) : postedJobs.length === 0 ? (
              <p>No jobs posted yet.</p>
            ) : (
              <ul className="space-y-2">
                {postedJobs.map((job) => (
                  <li
                    key={job.id}
                    className="p-3 border-b hover:bg-gray-50 rounded"
                  >
                    <p className="font-semibold">{job.title}</p>
                    <p className="text-gray-600">{job.location}</p>
                    <p className="text-sm text-gray-500">
                      Posted on:{" "}
                      {job.createdAt?.toDate?.().toLocaleDateString() || "N/A"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Applicants Section */}
        <section ref={applicantsRef}>
          <h2 className="text-2xl font-semibold mb-4">Applicants</h2>
          <div className="p-6 bg-white shadow rounded-lg border border-gray-200">
            {loadingApplicants ? (
              <p>Loading applicants...</p>
            ) : applicants.length === 0 ? (
              <p>No applicants yet.</p>
            ) : (
              <ul className="space-y-2">
                {applicants.map((app) => (
                  <li
                    key={app.id}
                    className="p-3 border-b hover:bg-gray-50 rounded"
                  >
                    <p className="font-semibold">{app.applicantName}</p>
                    <p className="text-gray-600">Applied for: {app.jobTitle}</p>
                    <p className="text-sm text-gray-500">
                      Submitted on:{" "}
                      {app.submittedAt?.toDate?.().toLocaleDateString() ||
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
