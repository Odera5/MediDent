import React, { useState, useEffect } from "react";
import { Heart, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import { motion } from "framer-motion";

export function Header({ onLoginClick, onSignupClick, currentUser }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Detect scroll for header animation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleFindJobsClick = () => {
    if (location.pathname === "/") {
      const section = document.getElementById("jobs");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#jobs");
    }
  };

  const linkClasses = (path) =>
    `font-medium py-2 transition-colors ${
      location.pathname === path || location.pathname.startsWith(path + "/")
        ? "text-teal-400 border-b-2 border-teal-400"
        : "text-white hover:text-teal-400"
    }`;

  return (
    <header className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo with scroll animation */}
          <motion.div
            className="flex items-center text-3xl font-bold cursor-pointer"
            animate={{
              scale: isScrolled ? 1.05 : 1,
              color: isScrolled ? "#14B8A6" : "#ffffff",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="w-8 h-8 bg-teal-500 rounded-full mr-2 flex items-center justify-center"
              animate={{
                scale: isScrolled ? 1.1 : 1,
                rotate: isScrolled ? 15 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Heart className="w-5 h-5" />
            </motion.div>
            LumiaGlobe Jobs
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className={linkClasses("/")}>Home</Link>
            <button onClick={handleFindJobsClick} className={linkClasses("/jobs")}>
              Find Jobs
            </button>
            <Link to="/post-job" className={linkClasses("/hospitals")}>For Hospitals</Link>
            <Link to="/about" className={linkClasses("/about")}>About</Link>
            <Link to="/contact" className={linkClasses("/contact")}>Contact</Link>

            {currentUser && (
              <>
                <Link to="/dashboard" className={linkClasses("/dashboard")}>Dashboard</Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border-2 border-white text-white hover:bg-white hover:text-blue-900 rounded-lg font-medium transition-all"
                >
                  Logout
                </button>
              </>
            )}
          </nav>

          {/* Desktop Auth Buttons */}
          {!currentUser && (
            <div className="hidden md:flex space-x-4">
              <button
                onClick={onLoginClick}
                className="px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-blue-900 rounded-lg font-medium transition-all transform hover:-translate-y-0.5"
              >
                Login
              </button>
              <button
                onClick={onSignupClick}
                className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-all transform hover:-translate-y-0.5 hover:shadow-lg"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white text-2xl" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav with animation */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-white/20 py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="flex flex-col space-y-4 mb-4"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            >
              {[
                { label: "Home", to: "/" },
                { label: "Find Jobs", to: "/jobs", onClick: handleFindJobsClick },
                { label: "For Hospitals", to: "/post-job" },
                { label: "About", to: "/about" },
                { label: "Contact", to: "/contact" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
                  }}
                >
                  {item.onClick ? (
                    <button
                      onClick={() => {
                        item.onClick();
                        setIsMobileMenuOpen(false);
                      }}
                      className={linkClasses(item.to)}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      to={item.to}
                      className={linkClasses(item.to)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}

              {currentUser && (
                <>
                  <motion.div
                    variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
                  >
                    <Link
                      to="/dashboard"
                      className={linkClasses("/dashboard")}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </motion.div>
                  <motion.div
                    variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
                  >
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="px-4 py-2 border border-white text-white hover:bg-white hover:text-blue-900 rounded-lg transition-all"
                    >
                      Logout
                    </button>
                  </motion.div>
                </>
              )}
            </motion.div>

            {!currentUser && (
              <motion.div
                className="flex space-x-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={() => {
                    onLoginClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 px-4 py-2 border border-white text-white hover:bg-white hover:text-blue-900 rounded-lg transition-all"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    onSignupClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-all"
                >
                  Sign Up
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </header>
  );
}
