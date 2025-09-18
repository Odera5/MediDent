import React, { useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export function Header({ onLoginClick, onSignupClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center text-3xl font-bold">
            <div className="w-8 h-8 bg-teal-500 rounded-full mr-2 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            LumiaGlobe Jobs
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-white hover:text-teal-400 font-medium py-2 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className="text-white hover:text-teal-400 font-medium py-2 transition-colors"
            >
              Find Jobs
            </Link>
            <Link
              to="/hospitals"
              className="text-white hover:text-teal-400 font-medium py-2 transition-colors"
            >
              For Hospitals
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-teal-400 font-medium py-2 transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-teal-400 font-medium py-2 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-4">
            <div className="flex flex-col space-y-4 mb-4">
              <Link
                to="/"
                className="text-white hover:text-teal-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/jobs"
                className="text-white hover:text-teal-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Find Jobs
              </Link>
              <Link
                to="/hospitals"
                className="text-white hover:text-teal-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                For Hospitals
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-teal-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-teal-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
            <div className="flex space-x-2">
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
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
