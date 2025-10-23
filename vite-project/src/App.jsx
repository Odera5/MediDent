import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
  useLocation,
  Navigate,
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
import { Contact } from "./components/pages/Contact";
import { About } from "./components/pages/About";
import { Dashboard } from "./components/dashboard/Dashboard";
import { PlaceholderPage } from "./components/pages/PlaceholderPage";
import ProfileBuilder from "./components/footercomponent/ProfileBuilder";
import BrowseJobs from "./components/footercomponent/BrowseJob";
import { ThankYouPage } from "./components/footercomponent/ThankYouPage";
import { CompleteProfile } from "./components/footercomponent/CompleteProfile";
import ProfileView from "./components/pages/ProfileView";
import ResumeBuilder from "./components/pages/ResumeBuilder";
import CareerTips from "./components/pages/CareerTips";
import HealthcareNews from "./components/pages/HealthcareNews";
import Blog from "./components/pages/Blog";
import FAQ from "./components/pages/FAQ";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import TermsOfService from "./components/pages/TermsOfService";
import BlogPost from "./components/pages/BlogPost";
import SearchCandidates from "./components/pages/SearchCandidates";

// Firebase
import { db, storage, auth } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* --- ScrollToTop Component --- */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

/* --- Home Component --- */
function Home({ onApply }) {
  const { jobs, loadMoreJobs, showLoadMore } = useJobs();
  const navigate = useNavigate();

  return (
    <>
      <Hero
        onFindJobsClick={() => navigate("/signup")}
        onPostJobClick={() => navigate("/post-job")}
      />

      <main
        id="jobs"
        className="max-w-6xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-4 gap-8"
      >
        <div className="lg:col-span-3">
          <JobListings
            jobs={jobs}
            onApply={onApply}
            onLoadMore={loadMoreJobs}
            showLoadMore={showLoadMore}
          />
        </div>
      </main>

      <StatsSection />
    </>
  );
}

/* --- Apply Wrapper --- */
function ApplyWrapper({ onClose }) {
  const { jobId } = useParams();
  const location = useLocation();
  const { jobTitle, companyName } = location.state || {
    jobTitle: "Position",
    companyName: "Unknown Hospital",
  };

  const [currentUser] = useAuthState(auth);

  const handleSubmit = async (cvFile, coverLetter) => {
    if (!currentUser) throw new Error("You must be logged in to apply.");
    if (!cvFile) throw new Error("No file selected.");

    const storageRef = ref(
      storage,
      `resumes/${jobId}/${Date.now()}_${cvFile.name}`
    );
    await uploadBytes(storageRef, cvFile);
    const downloadURL = await getDownloadURL(storageRef);

    const applicationsCollection = collection(db, "applications");
    await addDoc(applicationsCollection, {
      userId: currentUser.uid,
      jobId,
      jobTitle,
      companyName,
      coverLetter,
      resumeURL: downloadURL,
      submittedAt: new Date(),
      status: "Pending",
    });
  };

  return (
    <ApplyModal
      isOpen={true}
      onClose={onClose}
      jobId={jobId}
      jobTitle={jobTitle}
      companyName={companyName}
      onSubmit={handleSubmit}
    />
  );
}

/* --- App Component --- */
function App() {
  const navigate = useNavigate();
  const [currentUser, loadingUser] = useAuthState(auth);

  if (loadingUser) return <p className="p-8 text-center">Loading user...</p>;

  const handleApply = (jobId, jobTitle, companyName) => {
    navigate(`/apply/${jobId}`, { state: { jobTitle, companyName } });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        onLoginClick={() => navigate("/login")}
        onSignupClick={() => navigate("/signup")}
        currentUser={currentUser}
      />

      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home onApply={handleApply} />} />

        {/* Auth routes */}
        <Route
          path="/login"
          element={
            <LoginModal
              isOpen={true}
              onClose={() => navigate("/")}
              onSuccessRedirect={(redirectPath) =>
                navigate(redirectPath || "/")
              }
              onOpenSignup={() => navigate("/signup")}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignupModal
              isOpen={true}
              onClose={() => navigate("/")}
              onOpenLogin={() => navigate("/login")}
            />
          }
        />

        {/* Protected Post Job */}
        <Route
          path="/post-job"
          element={
            currentUser ? (
              <PostJobModal isOpen={true} onClose={() => navigate("/")} />
            ) : (
              <Navigate to="/login" state={{ from: "/post-job" }} />
            )
          }
        />

        {/* Apply route */}
        <Route
          path="/apply/:jobId"
          element={<ApplyWrapper onClose={() => navigate("/")} />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard/*"
          element={
            currentUser ? (
              <Dashboard currentUser={currentUser} />
            ) : (
              <Navigate to="/login" state={{ from: "/dashboard" }} />
            )
          }
        />

        {/* Static pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Footer and utility pages */}
        <Route path="/profile/create" element={<ProfileBuilder />} />
        <Route path="/jobs" element={<BrowseJobs />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/career-tips" element={<CareerTips />} />
        <Route path="/profile/complete" element={<CompleteProfile />} />

        {/* Blog & News */}
        <Route path="/news" element={<HealthcareNews />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />

        {/* Other pages */}
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/resources/career" element={<PlaceholderPage />} />
        <Route path="/resources/interview-tips" element={<PlaceholderPage />} />
        <Route path="/employers/post-job" element={<PlaceholderPage />} />
        <Route path="/employers/search" element={<SearchCandidates />} />
        <Route path="/employers/dashboard" element={<PlaceholderPage />} />
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
