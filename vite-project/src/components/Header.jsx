import React, { useState } from "react";
import { Heart, Menu, X } from "lucide-react";

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
            LumiaGlobe jobs
          </div>

          <nav className="hidden md:flex space-x-8">
            <a
              href="#home"
              className="text-white hover:text-teal-400 font-medium py-2 transition-colors"
            >
              Home
            </a>
            <a
              href="#jobs"
              className="text-white hover:text-teal-400 font-medium py-2 transition-colors"
            >
              Find Jobs
            </a>
            <a
              href="#hospitals"
              className="text-white hover:text-teal-400 font-medium py-2 transition-colors"
            >
              For Hospitals
            </a>
            <a
              href="#about"
              className="text-white hover:text-teal-400 font-medium py-2 transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-white hover:text-teal-400 font-medium py-2 transition-colors"
            >
              Contact
            </a>
          </nav>

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

          <button
            className="md:hidden text-white text-2xl"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-4">
            <div className="flex flex-col space-y-4 mb-4">
              <a
                href="#home"
                className="text-white hover:text-teal-400 transition-colors"
              >
                Home
              </a>
              <a
                href="#jobs"
                className="text-white hover:text-teal-400 transition-colors"
              >
                Find Jobs
              </a>
              <a
                href="#hospitals"
                className="text-white hover:text-teal-400 transition-colors"
              >
                For Hospitals
              </a>
              <a
                href="#about"
                className="text-white hover:text-teal-400 transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-white hover:text-teal-400 transition-colors"
              >
                Contact
              </a>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={onLoginClick}
                className="flex-1 px-4 py-2 border border-white text-white hover:bg-white hover:text-blue-900 rounded-lg transition-all"
              >
                Login
              </button>
              <button
                onClick={onSignupClick}
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
