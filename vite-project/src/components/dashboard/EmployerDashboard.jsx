import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import { PostJobModal } from "../modals/PostJobModal";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

export default function EmployerDashboard() {
  const [postedJobs, setPostedJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [flashMessage, setFlashMessage] = useState("");
  const [activeTab, setActiveTab] = useState("postedJobs");

  const employerId = auth.currentUser?.uid;

  //  Fetch Posted Jobs in Real-Time
  useEffect(() => {
    if (!employerId) return;
    const jobsQuery = query(
      collection(db, "jobs"),
      where("userId", "==", employerId)
    );
    const unsubscribe = onSnapshot(jobsQuery, (snapshot) => {
      const jobsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostedJobs(jobsData);
    });
    return () => unsubscribe();
  }, [employerId]);

  //  Fetch Applicants in Real-Time
  useEffect(() => {
    if (!employerId) return;
    const applicationsQuery = query(collection(db, "applications"));
    const unsubscribe = onSnapshot(applicationsQuery, (snapshot) => {
      const allApplications = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const employerApps = allApplications.filter((app) =>
        postedJobs.some((job) => job.id === app.jobId)
      );
      setApplicants(employerApps);
    });
    return () => unsubscribe();
  }, [postedJobs, employerId]);

  //  Flash message
  const triggerFlash = (message) => {
    setFlashMessage(message);
    setTimeout(() => setFlashMessage(""), 1000);
  };

  // Update applicant status
  const handleStatusUpdate = async (applicationId, newStatus) => {
    const appRef = doc(db, "applications", applicationId);
    await updateDoc(appRef, { status: newStatus });
    triggerFlash(`Application marked as ${newStatus}`);
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto p-8 flex flex-col gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header */}
      <motion.header
        className="flex flex-col md:flex-row justify-between items-start md:items-center"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h1 className="text-4xl font-bold text-blue-900 mb-4 md:mb-0">
          Employer Dashboard
        </h1>
        <motion.button
          onClick={() => setShowModal(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-xl shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          + Post New Job
        </motion.button>
      </motion.header>

      {/* Tabs */}
      <motion.div
        className="flex space-x-4 border-b pb-2 text-lg font-medium text-gray-600"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {["postedJobs", "applicants"].map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${
              activeTab === tab
                ? "text-teal-600 border-b-2 border-teal-600"
                : ""
            }`}
            whileHover={{ y: -2 }}
          >
            {tab === "postedJobs" ? "Posted Jobs" : "Applicants"}
          </motion.button>
        ))}
      </motion.div>

      {/* Flash Message */}
      <AnimatePresence>
        {flashMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="bg-green-100 text-green-800 text-center py-2 rounded-md shadow"
          >
            {flashMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/*  Posted Jobs */}
      {activeTab === "postedJobs" && (
        <motion.section
          key="jobs"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {postedJobs.length === 0 ? (
            <p className="text-gray-500 italic">No jobs posted yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {postedJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  className="bg-white shadow p-6 rounded-xl border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-xl font-semibold text-blue-800 mb-1">
                    {job.title}
                  </h3>
                  <p className="text-gray-500 mb-2">
                    {job.hospitalName || "Unknown Hospital"}
                  </p>
                  <p className="text-sm text-gray-400">
                    Posted on:{" "}
                    {job.postedAt
                      ? format(job.postedAt.toDate(), "MM/dd/yyyy")
                      : "N/A"}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      )}

      {/* Applicants */}
      {activeTab === "applicants" && (
        <motion.section
          key="applicants"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {applicants.length === 0 ? (
            <p className="text-gray-500 italic">No applicants yet.</p>
          ) : (
            <motion.div
              className="overflow-x-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <table className="min-w-full bg-white rounded-xl shadow border border-gray-100">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Position</th>
                    <th className="px-4 py-2 text-left">Applied On</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.map((app, index) => {
                    const job = postedJobs.find((j) => j.id === app.jobId);
                    return (
                      <motion.tr
                        key={app.id}
                        className="border-t border-gray-100 hover:bg-gray-50"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <td className="px-4 py-3 font-medium">{app.fullName}</td>
                        <td className="px-4 py-3">{job?.title || "Unknown"}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {app.submittedAt
                            ? format(app.submittedAt.toDate(), "MM/dd/yyyy")
                            : "N/A"}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-3 py-1 text-sm rounded-full ${
                              app.status === "Accepted"
                                ? "bg-green-100 text-green-700"
                                : app.status === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {app.status || "Pending"}
                          </span>
                        </td>
                        <td className="px-4 py-3 space-x-2">
                          <button
                            onClick={() => window.open(app.resumeURL, "_blank")}
                            className="text-teal-600 hover:underline text-sm"
                          >
                            View Resume
                          </button>
                          <button
                            onClick={() => alert(app.coverLetter)}
                            className="text-blue-600 hover:underline text-sm"
                          >
                            Cover Letter
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(app.id, "Accepted")
                            }
                            className="text-green-600 hover:underline text-sm"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(app.id, "Rejected")
                            }
                            className="text-red-600 hover:underline text-sm"
                          >
                            Reject
                          </button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </motion.div>
          )}
        </motion.section>
      )}

      {/* Post Job Modal */}
      <PostJobModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </motion.div>
  );
}
