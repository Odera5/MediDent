import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

export default function AppliedJobsPage({ currentUser }) {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedJobId, setExpandedJobId] = useState(null);

  // Real-time listener for job applications
  useEffect(() => {
    if (!currentUser?.uid) return;

    const q = query(
      collection(db, "applications"),
      where("userId", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const jobs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAppliedJobs(jobs);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        toast.error("Failed to fetch applied jobs");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser?.uid]);

  const toggleCoverLetter = (jobId) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-green-100 text-green-700 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
    }
  };

  return (
    <motion.div
      className="p-6 bg-white shadow rounded-lg border border-gray-200"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-2xl font-semibold mb-6 text-blue-900"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        My Applied Jobs
      </motion.h2>

      {loading ? (
        <p>Loading applied jobs...</p>
      ) : appliedJobs.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <ul className="space-y-4">
          {appliedJobs.map((job, index) => (
            <motion.li
              key={job.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.02,
                y: -3,
                boxShadow: "0px 8px 20px rgba(0,0,0,0.08)",
              }}
              className="p-5 border rounded-lg hover:bg-gray-50 transition flex flex-col gap-3"
            >
              {/* Header: Company + Job Info */}
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  {job.companyLogo && (
                    <img
                      src={job.companyLogo}
                      alt={job.companyName}
                      className="w-12 h-12 rounded-full border object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-lg text-blue-900">
                      {job.jobTitle || "Untitled Job"}
                    </p>
                    <p className="text-gray-700 text-sm font-medium">
                      {job.companyName || "Unknown Hospital"}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Applied on:{" "}
                      {job.submittedAt?.toDate?.().toLocaleDateString() || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(
                    job.status || "Pending"
                  )}`}
                >
                  {job.status || "Pending"}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 text-sm font-medium mt-2">
                {job.resumeURL && (
                  <a
                    href={job.resumeURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:underline"
                  >
                    View Resume
                  </a>
                )}
                <button
                  onClick={() => toggleCoverLetter(job.id)}
                  className="text-teal-600 hover:underline"
                >
                  {expandedJobId === job.id
                    ? "Hide Cover Letter"
                    : "View Cover Letter"}
                </button>
              </div>

              {/* Animated Cover Letter Section */}
              <AnimatePresence>
                {expandedJobId === job.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="mt-3 p-4 bg-gray-50 border rounded-lg text-gray-800 text-sm leading-relaxed whitespace-pre-wrap overflow-hidden"
                  >
                    {job.coverLetter || "No cover letter provided."}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
