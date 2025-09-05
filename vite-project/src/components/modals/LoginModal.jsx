import React, { useState } from "react";
import { X } from "lucide-react";

export function LoginModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
    // Handle login logic here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-md relative animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-blue-900 text-2xl font-semibold">
            Login to Your Account
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl transition-colors"
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-blue-900 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-blue-900 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full py-3 px-4 border border-gray-300 rounded-lg text-base transition-colors focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) =>
                  setFormData({ ...formData, rememberMe: e.target.checked })
                }
                className="w-5 h-5 accent-teal-500"
              />
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition-all"
          >
            Login
          </button>

          <div className="text-center mt-4">
            <a
              href="#"
              className="text-teal-500 hover:text-teal-600 transition-colors"
            >
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
