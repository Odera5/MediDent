import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // ✅ Use 'timestamp' instead of 'date'
        const q = query(collection(db, "blogPosts"), orderBy("timestamp", "desc"));
        const snapshot = await getDocs(q);
        const fetchedPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-6 sm:px-10">
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-semibold text-blue-900 text-center mb-8"
      >
        Blog
      </motion.h1>

      {loading ? (
        <p className="text-center text-blue-700 font-medium animate-pulse">
          Loading blog posts...
        </p>
      ) : posts.length > 0 ? (
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition"
            >
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
              )}
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-700 mb-3">{post.summary}</p>
              <p className="text-sm text-gray-500 mb-4">
                {post.timestamp
                  ? new Date(post.timestamp.seconds * 1000).toLocaleString("en-NG", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : ""}
              </p>
              <Link
                to={`/blog/${post.id}`}
                className="text-blue-700 font-medium hover:underline"
              >
                Read More →
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No blog posts available yet.</p>
      )}
    </div>
  );
}
