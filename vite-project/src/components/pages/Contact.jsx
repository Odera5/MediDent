import React, { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contactMessages"), {
        ...formData,
        submittedAt: serverTimestamp(),
      });

      toast.success("Your message has been sent!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-800 text-white py-20">
      <div className="max-w-6xl mx-auto px-8">
        <h1 className="text-5xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="text-lg mb-12 opacity-90 text-center">
          Have questions or need support? Reach out to us using the form below.
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-white text-blue-900 p-8 rounded-xl shadow-lg"
        >
          <div className="mb-6">
            <label className="block font-medium mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Your name"
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="you@example.com"
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block font-medium mb-2">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Your message..."
              className="w-full py-3 px-4 border border-gray-300 rounded-lg h-32 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 resize-y"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
