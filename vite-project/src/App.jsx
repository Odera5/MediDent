import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
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
import { Notification } from "./components/Notification";
import { useJobs } from "./hooks/useJobs";

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

function ApplyWrapper({ onClose }) {
  const { jobId } = useParams();
  return <ApplyModal isOpen={true} onClose={onClose} jobId={jobId} />;
}

function App() {
  const [notification, setNotification] = useState({
    message: "",
    isVisible: false,
  });
  const navigate = useNavigate();

  const hideNotification = () =>
    setNotification({ message: "", isVisible: false });

  const handleApply = (jobId) => {
    navigate(`/apply/${jobId}`);
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

      <Notification
        message={notification.message}
        isVisible={notification.isVisible}
        onHide={hideNotification}
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
