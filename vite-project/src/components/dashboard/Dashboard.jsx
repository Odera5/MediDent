import React, { useEffect, useState } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { db, auth } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

import AdminDashboard from "./AdminDashboard";
import EmployerDashboard from "./EmployerDashboard";
import JobSeekerDashboard from "./JobSeekerDashboard";
import AppliedJobsPage from "./AppliedJobsPage";
import SavedJobsPage from "./SavedJobsPage"; // optional, you can create this page

export function Dashboard({ currentUser }) {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchRole = async () => {
      if (!currentUser?.uid) {
        if (isMounted) {
          setRole(null);
          setLoading(false);
        }
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (!isMounted) return;

        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        } else {
          setRole(null);
          toast.error("User record not found");
        }
      } catch (err) {
        console.error("Failed to fetch role:", err);
        toast.error("Failed to fetch user role");
        if (isMounted) setRole(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchRole();

    return () => {
      isMounted = false;
    };
  }, [currentUser?.uid]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      toast.error("Failed to logout. Try again.");
    }
  };

  if (loading) return <p className="p-8 text-center">Loading...</p>;
  if (!role) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto p-8">
        <Routes>
          {/* Admin */}
          {role === "admin" && (
            <>
              <Route path="home" element={<AdminDashboard />} />
              <Route path="settings" element={<p className="p-8">Admin Settings Coming Soon...</p>} />
            </>
          )}

          {/* Employer */}
          {role === "employer" && (
            <>
              <Route path="jobs" element={<EmployerDashboard currentUser={currentUser} />} />
              <Route path="applicants" element={<p className="p-8">Applicants List Coming Soon...</p>} />
              <Route path="post-job" element={<p className="p-8">Post Job Form Coming Soon...</p>} />
              <Route path="settings" element={<p className="p-8">Employer Settings Coming Soon...</p>} />
            </>
          )}

          {/* Job Seeker */}
          {role === "jobSeeker" && (
            <Route path="jobseeker/*" element={<JobSeekerDashboard currentUser={currentUser} />}>
              <Route index element={<AppliedJobsPage currentUser={currentUser} />} />
              <Route path="applications" element={<AppliedJobsPage currentUser={currentUser} />} />
              <Route path="saved" element={<SavedJobsPage currentUser={currentUser} />} />
            </Route>
          )}

          {/* Fallback */}
          <Route
            path="*"
            element={
              <Navigate
                to={
                  role === "jobSeeker"
                    ? "/dashboard/jobseeker"
                    : `/dashboard/${role === "admin" ? "home" : "jobs"}`
                }
                replace
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}
