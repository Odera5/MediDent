import React, { useEffect, useState, useRef } from "react";
import { db } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", summary: "" });
  const [editingId, setEditingId] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const usersRef = useRef(null);
  const messagesRef = useRef(null);
  const blogRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        setUsers(usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch users");
      } finally {
        setLoadingUsers(false);
      }
    };

    const fetchMessages = async () => {
      try {
        const messagesSnapshot = await getDocs(collection(db, "contactMessages"));
        setMessages(messagesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch messages");
      } finally {
        setLoadingMessages(false);
      }
    };

    const fetchPosts = async () => {
      try {
        const postsSnapshot = await getDocs(collection(db, "blogPosts"));
        const fetchedPosts = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        fetchedPosts.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds);
        setPosts(fetchedPosts);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch blog posts");
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchUsers();
    fetchMessages();
    fetchPosts();
  }, []);

  //  Add or update blog post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.summary)
      return toast.error("Please fill all fields");

    try {
      if (editingId) {
        const postRef = doc(db, "blogPosts", editingId);
        await updateDoc(postRef, newPost);
        toast.success("Post updated successfully!");
        setEditingId(null);
      } else {
        await addDoc(collection(db, "blogPosts"), {
          ...newPost,
          timestamp: serverTimestamp(),
        });
        toast.success("New post added successfully!");
      }
      setNewPost({ title: "", summary: "" });
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save post");
    }
  };

  //  Edit post
  const handleEdit = (post) => {
    setNewPost({ title: post.title, summary: post.summary });
    setEditingId(post.id);
    scrollToSection(blogRef);
  };

  // Delete post
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteDoc(doc(db, "blogPosts", id));
        toast.success("Post deleted successfully!");
        window.location.reload();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete post");
      }
    }
  };

  // Skeleton Loader
  const SkeletonTable = () => (
    <div className="overflow-x-auto animate-pulse">
      <table className="w-full border border-gray-200 rounded-lg text-left">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-4 py-2 border-b w-1/3">
              <div className="h-4 bg-gray-200 rounded"></div>
            </th>
            <th className="px-4 py-2 border-b w-1/3">
              <div className="h-4 bg-gray-200 rounded"></div>
            </th>
            <th className="px-4 py-2 border-b w-1/3">
              <div className="h-4 bg-gray-200 rounded"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array(5)
            .fill()
            .map((_, idx) => (
              <tr key={idx} className="border-b border-gray-100">
                <td className="px-4 py-3">
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <motion.div
      className="max-w-6xl mx-auto p-8 flex flex-col md:flex-row gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Sidebar */}
      <motion.aside
        className="w-full md:w-1/4 sticky top-24 h-fit bg-white p-4 shadow rounded-lg"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-blue-900">Admin Menu</h2>
        <ul className="space-y-2">
          <li>
            <button
              className="text-teal-500 hover:underline font-medium"
              onClick={() => scrollToSection(usersRef)}
            >
              Users
            </button>
          </li>
          <li>
            <button
              className="text-teal-500 hover:underline font-medium"
              onClick={() => scrollToSection(messagesRef)}
            >
              Contact Messages
            </button>
          </li>
          <li>
            <button
              className="text-teal-500 hover:underline font-medium"
              onClick={() => scrollToSection(blogRef)}
            >
              Blog Management
            </button>
          </li>
        </ul>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        className="w-full md:w-3/4 flex flex-col gap-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold mb-6 text-blue-900">
          Admin Dashboard
        </h1>

        {/* Users Section */}
        <section ref={usersRef}>
          <h2 className="text-2xl font-semibold mb-4">Registered Users</h2>
          {loadingUsers ? (
            <SkeletonTable />
          ) : users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg text-left">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-4 py-2 border-b">Email</th>
                    <th className="px-4 py-2 border-b">Role</th>
                    <th className="px-4 py-2 border-b">UID</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-blue-50">
                      <td className="px-4 py-2 border-b">{user.email}</td>
                      <td className="px-4 py-2 border-b capitalize">{user.role}</td>
                      <td className="px-4 py-2 border-b">{user.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Messages Section */}
        <section ref={messagesRef}>
          <h2 className="text-2xl font-semibold mb-4">Contact Messages</h2>
          {loadingMessages ? (
            <SkeletonTable />
          ) : messages.length === 0 ? (
            <p>No messages found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg text-left">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-4 py-2 border-b">Name</th>
                    <th className="px-4 py-2 border-b">Email</th>
                    <th className="px-4 py-2 border-b">Message</th>
                    <th className="px-4 py-2 border-b">Submitted At</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((msg) => (
                    <tr key={msg.id} className="hover:bg-blue-50">
                      <td className="px-4 py-2 border-b">{msg.name}</td>
                      <td className="px-4 py-2 border-b">{msg.email}</td>
                      <td className="px-4 py-2 border-b">{msg.message}</td>
                      <td className="px-4 py-2 border-b">
                        {msg.submittedAt?.toDate
                          ? msg.submittedAt.toDate().toLocaleString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Blog Management Section */}
        <section ref={blogRef}>
          <h2 className="text-2xl font-semibold mb-4">Blog Management</h2>

          {/* Add/Edit Form */}
          <div className="bg-white p-6 rounded-xl shadow mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              {editingId ? "Edit Blog Post" : "Add New Blog Post"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
              />
              <textarea
                placeholder="Summary"
                className="w-full border border-gray-300 rounded-lg p-2 h-24"
                value={newPost.summary}
                onChange={(e) =>
                  setNewPost({ ...newPost, summary: e.target.value })
                }
              />
              <button
                type="submit"
                className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
              >
                {editingId ? "Update Post" : "Add Post"}
              </button>
            </form>
          </div>

          {/* List of Posts */}
          {loadingPosts ? (
            <SkeletonTable />
          ) : posts.length === 0 ? (
            <p>No blog posts found.</p>
          ) : (
            <div className="grid gap-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white p-5 rounded-xl shadow flex flex-col sm:flex-row sm:justify-between sm:items-center"
                >
                  <div>
                    <h4 className="text-blue-800 font-semibold text-lg">
                      {post.title}
                    </h4>
                    <p className="text-gray-700">{post.summary}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {post.timestamp
                        ? new Date(post.timestamp.seconds * 1000).toLocaleString()
                        : "—"}
                    </p>
                  </div>
                  <div className="flex gap-3 mt-3 sm:mt-0">
                    <button
                      onClick={() => handleEdit(post)}
                      className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </motion.main>
    </motion.div>
  );
}
