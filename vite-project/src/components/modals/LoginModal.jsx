import React, { useState } from "react";
import { X } from "lucide-react";
import {
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
  onSuccessRedirect,
  onOpenSignup, // passed from App.jsx to open SignupModal
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [isResetting, setIsResetting] = useState(false); // loading state for reset
  const location = useLocation();
  const redirectPath = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const persistence = formData.rememberMe
        ? browserLocalPersistence
        : browserSessionPersistence;

      await setPersistence(auth, persistence);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        toast.success(`Welcome back, ${userData.fullName || "User"}!`);
        onClose();
        if (onLoginSuccess) onLoginSuccess(user);
        if (onSuccessRedirect) onSuccessRedirect(redirectPath);
      } else {
        toast.error("Profile not found. Please contact support.");
        await signOut(auth);
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      toast.error(error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      toast.error("Please enter your email first.");
      return;
    }
    try {
      setIsResetting(true);
      await sendPasswordResetEmail(auth, formData.email);
      toast.success("Password reset email sent! Please check your inbox.");
    } catch (error) {
      console.error("Password reset failed:", error.message);
      toast.error(error.message);
    } finally {
      setIsResetting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-md relative animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
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

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
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

          {/* Password */}
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

          {/* Remember Me */}
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

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition-all"
          >
            Login
          </button>

          {/* Forgot password + Signup */}
          <div className="text-center mt-4 space-y-2">
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={isResetting}
              className="text-teal-500 hover:text-teal-600 transition-colors disabled:opacity-50"
            >
              {isResetting ? "Sending reset link..." : "Forgot password?"}
            </button>

            <p className="text-gray-600">
              Not a member?{" "}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenSignup) onOpenSignup();
                }}
                className="text-teal-500 hover:text-teal-600 font-medium"
              >
                Sign up here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
