import React, { useEffect, useState } from "react";
import {
  Navigate,
  Routes,
  Route,
  NavLink,
  useLocation,
} from "react-router-dom";
import { db, auth } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

import AdminDashboard from "./AdminDashboard";
import EmployerDashboard from "./EmployerDashboard";
import JobSeekerDashboard from "./JobSeekerDashboard";
import { Footer } from "../Footer";

export function Dashboard({ currentUser }) {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

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

  // Role-based nav links
  const navLinks = {
    admin: [
      { name: "Dashboard Home", path: "home" },
      { name: "Settings", path: "settings" }, // users + messages handled in AdminDashboard
    ],
    employer: [
      { name: "My Jobs", path: "jobs" },
      { name: "Applicants", path: "applicants" },
      { name: "Post Job", path: "post-job" },
      { name: "Settings", path: "settings" },
    ],
    jobSeeker: [
      { name: "My Applications", path: "applications" },
      { name: "Profile", path: "profile" },
      { name: "Saved Jobs", path: "saved" },
      { name: "Settings", path: "settings" },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Dashboard Header */}
      <header className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-8 flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-teal-400">Dashboard</div>
          <div className="flex items-center space-x-4">
            <span className="capitalize">{role} view</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Role Navigation */}
        <nav className="bg-blue-800">
          <div className="max-w-6xl mx-auto px-8 py-2 flex space-x-6 font-medium">
            {navLinks[role].map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive
                      ? "text-teal-400 font-semibold"
                      : "text-white hover:text-teal-400"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto p-8">
        <Routes>
          {/* Admin */}
          {role === "admin" && (
            <>
              <Route path="home" element={<AdminDashboard />} />
              <Route
                path="settings"
                element={<p className="p-8">Admin Settings Coming Soon...</p>}
              />
            </>
          )}

          {/* Employer */}
          {role === "employer" && (
            <>
              <Route
                path="jobs"
                element={<EmployerDashboard currentUser={currentUser} />}
              />
              <Route
                path="applicants"
                element={<p className="p-8">Applicants List Coming Soon...</p>}
              />
              <Route
                path="post-job"
                element={<p className="p-8">Post Job Form Coming Soon...</p>}
              />
              <Route
                path="settings"
                element={
                  <p className="p-8">Employer Settings Coming Soon...</p>
                }
              />
            </>
          )}

          {/* Job Seeker */}
          {role === "jobSeeker" && (
            <>
              <Route
                path="applications"
                element={<JobSeekerDashboard currentUser={currentUser} />}
              />
              <Route
                path="profile"
                element={<p className="p-8">Profile Section Coming Soon...</p>}
              />
              <Route
                path="saved"
                element={<p className="p-8">Saved Jobs Coming Soon...</p>}
              />
              <Route
                path="settings"
                element={
                  <p className="p-8">Job Seeker Settings Coming Soon...</p>
                }
              />
            </>
          )}

          {/* Default fallback (prevent infinite redirect loop) */}
          <Route
            path="*"
            element={
              location.pathname === `/dashboard/${navLinks[role][0].path}` ? (
                <p className="p-8">Page not found</p>
              ) : (
                <Navigate to={navLinks[role][0].path} replace />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}
