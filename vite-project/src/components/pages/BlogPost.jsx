import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "blogPosts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <p className="text-center text-blue-700 font-medium animate-pulse py-10">
        Loading post...
      </p>
    );
  }

  if (!post) {
    return (
      <p className="text-center text-gray-600 py-10">Post not found.</p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-6 sm:px-10">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8"
      >
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />
        )}
        <h1 className="text-3xl font-semibold text-blue-900 mb-3">
          {post.title}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          {post.date
            ? new Date(post.date.seconds * 1000).toLocaleDateString("en-NG", {
                dateStyle: "medium",
                timeStyle: "short",
              })
            : ""}
        </p>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {post.content}
        </p>

        <div className="mt-10">
          <Link
            to="/blog"
            className="text-blue-700 hover:underline font-medium"
          >
            ← Back to Blog
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
