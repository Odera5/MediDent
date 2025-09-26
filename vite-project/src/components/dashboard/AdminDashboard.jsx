import React, { useEffect, useState, useRef } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);

  const usersRef = useRef(null);
  const messagesRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        setUsers(
          usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch users");
      } finally {
        setLoadingUsers(false);
      }
    };

    const fetchMessages = async () => {
      try {
        const messagesSnapshot = await getDocs(
          collection(db, "contactMessages")
        );
        setMessages(
          messagesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch messages");
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchUsers();
    fetchMessages();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 sticky top-24 h-fit bg-white p-4 shadow rounded-lg">
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
        </ul>
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-3/4 flex flex-col gap-12">
        <h1 className="text-4xl font-bold mb-6 text-blue-900">
          Admin Dashboard
        </h1>

        {/* Users Section */}
        <section ref={usersRef}>
          <h2 className="text-2xl font-semibold mb-4">Registered Users</h2>
          {loadingUsers ? (
            <p>Loading users...</p>
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
                      <td className="px-4 py-2 border-b capitalize">
                        {user.role}
                      </td>
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
            <p>Loading messages...</p>
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
      </main>
    </div>
  );
}
