import { JobCard } from "./JobCard";
import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

console.log("joblisting.jsx component is being listed");
export function JobListings({ onApply }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const q = query(collection(db, "jobs"), orderBy("postedDate", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const jobsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched jobs:", jobsData);
      setJobs(jobsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  return (
    <section className="bg-white">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-blue-900 text-3xl font-semibold">
          Latest Job Opportunities
        </h2>
        <span className="text-gray-600">Showing {jobs.length} jobs</span>
      </div>

      <div>
        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard key={job.id} job={job} onApply={onApply} />
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </section>
  );
}
