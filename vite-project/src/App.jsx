import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";

import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { SearchSection } from "./components/SearchSection";
import { JobListings } from "./components/JobListings";
import { Sidebar } from "./components/Sidebar";
import { StatsSection } from "./components/StatsSection";
import { Footer } from "./components/Footer";
import { LoginModal } from "./components/modals/LoginModal";
import { SignupModal } from "./components/modals/SignupModal";
import { ApplyModal } from "./components/modals/ApplyModal";
import { PostJobModal } from "./components/modals/PostJobModal";
import { useJobs } from "./hooks/useJobs";

// ✅ Firebase
import { db, storage } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// ✅ Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home({ onApply }) {
  const {
    jobs,
    filters,
    setFilters,
    searchJobs,
    loadMoreJobs,
    clearFilters,
    showLoadMore,
  } = useJobs();

  const navigate = useNavigate();

  return (
    <>
      <Hero
        onFindJobsClick={() => navigate("/signup")}
        onPostJobClick={() => navigate("/post-job")}
      />

      <SearchSection
        filters={filters}
        onFiltersChange={setFilters}
        onSearch={searchJobs}
      />

      <main className="max-w-6xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <JobListings
            jobs={jobs}
            onApply={onApply}
            onLoadMore={loadMoreJobs}
            showLoadMore={showLoadMore}
          />
        </div>

        <div className="lg:col-span-1">
          <Sidebar
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={clearFilters}
          />
        </div>
      </main>

      <StatsSection />
    </>
  );
}

// ✅ Apply wrapper ensures jobId and jobTitle are passed correctly
function ApplyWrapper({ onClose }) {
  const { jobId } = useParams();
  const location = useLocation();
  const jobTitle = location.state?.jobTitle || "Position";

  const handleSubmit = async (cvFile) => {
    if (!cvFile) throw new Error("No file selected");

    const storageRef = ref(
      storage,
      `resumes/${jobId}/${Date.now()}_${cvFile.name}`
    );
    await uploadBytes(storageRef, cvFile);
    const downloadURL = await getDownloadURL(storageRef);

    const applicationsCollection = collection(db, "applications");
    await addDoc(applicationsCollection, {
      jobId,
      resumeURL: downloadURL,
      submittedAt: new Date(),
    });
  };

  return (
    <ApplyModal
      isOpen={true}
      onClose={onClose}
      jobId={jobId}
      jobTitle={jobTitle}
      onSubmit={handleSubmit}
    />
  );
}

function App() {
  const navigate = useNavigate();

  // ✅ Pass both jobId and jobTitle when navigating
  const handleApply = (jobId, jobTitle) => {
    navigate(`/apply/${jobId}`, { state: { jobTitle } });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        onLoginClick={() => navigate("/login")}
        onSignupClick={() => navigate("/signup")}
      />

      <Routes>
        <Route path="/" element={<Home onApply={handleApply} />} />
        <Route
          path="/login"
          element={<LoginModal isOpen={true} onClose={() => navigate("/")} />}
        />
        <Route
          path="/signup"
          element={<SignupModal isOpen={true} onClose={() => navigate("/")} />}
        />
        <Route
          path="/post-job"
          element={<PostJobModal isOpen={true} onClose={() => navigate("/")} />}
        />
        <Route
          path="/apply/:jobId"
          element={<ApplyWrapper onClose={() => navigate("/")} />}
        />
        <Route
          path="/jobs"
          element={<h2 className="p-8 text-xl">Jobs Page Coming Soon...</h2>}
        />
        <Route
          path="/hospitals"
          element={
            <h2 className="p-8 text-xl">Hospitals Page Coming Soon...</h2>
          }
        />
        <Route
          path="/about"
          element={<h2 className="p-8 text-xl">About Page Coming Soon...</h2>}
        />
        <Route
          path="/contact"
          element={<h2 className="p-8 text-xl">Contact Page Coming Soon...</h2>}
        />
      </Routes>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}

export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
