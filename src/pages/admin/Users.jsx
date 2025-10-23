import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users as UsersIcon } from "lucide-react";
import Layout from "../../components/Layout";

export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "customer",
    active: true,
  });

  // loading / fetch error state
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // fatal runtime error (prevent white screen)
  const [fatalError, setFatalError] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      const user = raw ? JSON.parse(raw) : null;
      if (!user || user.role !== "admin") {
        navigate("/admin/login");
      }
    } catch (err) {
      console.error("Error parsing localStorage user:", err);
      setFatalError(
        "Failed to read user from local storage. Open console for details."
      );
    }
  }, [navigate]);

  // Fetch real users from backend on mount
  useEffect(() => {
    let mounted = true;
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const res = await fetch("http://localhost:8080/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401 || res.status === 403) {
          navigate("/admin/login");
          return;
        }

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(text || `Error ${res.status}`);
        }

        const data = await res.json();
        if (mounted) {
          // backend returns a list of users
          setUsers(Array.isArray(data) ? data : data.users || []);
        }
      } catch (err) {
        console.error("Failed to load users:", err);
        if (mounted) setFetchError(err.message || "Failed to fetch users");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchUsers();
    return () => {
      mounted = false;
    };
  }, [navigate]);

  // global runtime error catcher to avoid white screen
  useEffect(() => {
    const onError = (msg, url, line, col, error) => {
      const message =
        typeof msg === "string"
          ? msg
          : (error && error.message) || "Unknown error";
      console.error("Runtime error caught:", {
        message,
        url,
        line,
        col,
        error,
      });
      setFatalError(message);
      // returning false lets the error propagate to console as well
      return false;
    };
    window.addEventListener("error", onError);
    return () => window.removeEventListener("error", onError);
  }, []);

  const handleOpenModal = (user = null) => {
    setEditingUser(user);
    setFormData(
      user || { name: "", email: "", role: "customer", active: true }
    );
    setShowModal(true);
  };

  const handleSaveUser = () => {
    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id ? { ...formData, id: editingUser.id } : u
        )
      );
    } else {
      setUsers([...users, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (id) => setUsers(users.filter((u) => u.id !== id));

  // Render fatal error early so user sees useful message instead of white screen
  if (fatalError) {
    return (
      <Layout pageTitle="User Management" role="admin">
        <div className="max-w-3xl mx-auto p-6">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            An error occurred
          </h2>
          <p className="text-sm text-gray-700 mb-4">{fatalError}</p>
          <p className="text-xs text-gray-500">
            Open developer console for more details.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="User Management" role="admin">
      {/* Header */}
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <UsersIcon className="w-6 h-6 text-blue-600" /> Manage Users
        </h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-yellow-400 w-full sm:w-auto"
          />
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
          >
            + Add User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow rounded-lg p-3 sm:p-6 overflow-x-auto">
        {loading ? (
          <p className="text-gray-500">Loading users...</p>
        ) : fetchError ? (
          <p className="text-red-500">Error: {fetchError}</p>
        ) : users.length === 0 ? (
          <p className="text-gray-500">No users found</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-gray-500">
                  Name
                </th>
                <th className="px-3 py-2 text-left font-medium text-gray-500">
                  Email
                </th>
                <th className="px-3 py-2 text-left font-medium text-gray-500">
                  Role
                </th>
                <th className="px-3 py-2 text-left font-medium text-gray-500">
                  Status
                </th>
                <th className="px-3 py-2 text-left font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users
                .filter(
                  (u) =>
                    u.name?.toLowerCase().includes(search.toLowerCase()) ||
                    u.email?.toLowerCase().includes(search.toLowerCase()) ||
                    (u.role &&
                      u.role
                        .toString()
                        .toLowerCase()
                        .includes(search.toLowerCase()))
                )
                .map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50 transition">
                    <td className="px-3 py-2">{u.name}</td>
                    <td className="px-3 py-2">{u.email}</td>
                    <td className="px-3 py-2 capitalize">
                      {String(u.role).replace("ROLE_", "").toLowerCase()}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          u.isActive || u.active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {u.isActive || u.active ? "Active" : "Suspended"}
                      </span>
                    </td>
                    <td className="px-3 py-2 flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <button
                        onClick={() => handleOpenModal(u)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 w-full sm:w-auto"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          // optimistic removal; you should call backend delete endpoint
                          setUsers((prev) =>
                            prev.filter((it) => it.id !== u.id)
                          );
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full sm:w-auto"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Fully Responsive Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-2">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md sm:max-w-lg md:max-w-xl p-5 sm:p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-blue-600">
                {editingUser ? "Edit User" : "Add User"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                &#10005;
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
                <option value="service provider">Service Provider</option>
                <option value="customer">Customer</option>
              </select>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) =>
                    setFormData({ ...formData, active: e.target.checked })
                  }
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-400"
                />
                Active
              </label>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="w-full sm:w-auto px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUser}
                className="w-full sm:w-auto px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
