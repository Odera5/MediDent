// src/pages/PlaceholderPage.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

export function PlaceholderPage() {
  const location = useLocation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-4">
        {location.pathname.replace("/", "").toUpperCase() || "HOME"}
      </h1>
      <p className="text-gray-600 mb-6">
        This page is under construction. We’re working hard to bring you fresh
        content soon!
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
}
