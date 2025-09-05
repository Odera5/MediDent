import React, { useState } from "react";
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

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [notification, setNotification] = useState({
    message: "",
    isVisible: false,
  });

  const {
    jobs,
    filters,
    setFilters,
    searchJobs,
    loadMoreJobs,
    clearFilters,
    showLoadMore,
  } = useJobs();

  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedJobId(null);
  };

  const handleApply = (jobId) => {
    setSelectedJobId(jobId);
    setActiveModal("apply");
  };

  /**
   * Displays a notification message.
   * @param {string} message The message to display.
   */
  /* const showNotification = (message) => {
    setNotification({ message, isVisible: true });
  };*/

  const hideNotification = () => {
    setNotification({ message: "", isVisible: false });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        onLoginClick={() => openModal("login")}
        onSignupClick={() => openModal("signup")}
      />

      <Hero
        onFindJobsClick={() => openModal("signup")}
        onPostJobClick={() => openModal("postJob")}
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
            onApply={handleApply}
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
      <Footer />

      {/* Modals */}
      <LoginModal isOpen={activeModal === "login"} onClose={closeModal} />

      <SignupModal isOpen={activeModal === "signup"} onClose={closeModal} />

      <ApplyModal
        isOpen={activeModal === "apply"}
        onClose={closeModal}
        jobId={selectedJobId}
      />

      <PostJobModal isOpen={activeModal === "postJob"} onClose={closeModal} />

      <Notification
        message={notification.message}
        isVisible={notification.isVisible}
        onHide={hideNotification}
      />
    </div>
  );
}

export default App;
