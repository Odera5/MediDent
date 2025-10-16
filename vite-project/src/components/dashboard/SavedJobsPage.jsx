import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      if (!auth.currentUser) return;

      try {
        const q = query(
          collection(db, "savedJobs"),
          where("userId", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const jobs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setSavedJobs(jobs);
      } catch (err) {
        console.error("Error fetching saved jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  if (loading) return <p>Loading saved jobs...</p>;

  if (!savedJobs.length) return <p>You haven’t saved any jobs yet.</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-blue-900">Saved Jobs</h2>
      <ul className="space-y-4">
        {savedJobs.map((job) => (
          <li key={job.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold text-teal-500">{job.jobTitle}</h3>
            <p className="text-gray-700">{job.companyName}</p>
            <p className="text-gray-500">{job.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
