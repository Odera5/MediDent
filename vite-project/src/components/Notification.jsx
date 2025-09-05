import React, { useEffect } from "react";

export function Notification({ message, isVisible, onHide }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onHide();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-5 right-5 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 transition-all duration-300 ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {message}
    </div>
  );
}
