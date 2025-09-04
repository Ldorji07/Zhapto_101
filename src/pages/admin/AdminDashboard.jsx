import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useServiceProvider } from "../../context/ServiceProviderContext";
import Layout from "../../components/Layout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const serviceProviderCtx = useServiceProvider();
  const [search, setSearch] = useState("");
  const [localPending, setLocalPending] = useState([]);

  const pendingProviders = serviceProviderCtx?.pendingProviders || [];
  const approvedProviders = serviceProviderCtx?.approvedProviders || [];
  const approveProvider = serviceProviderCtx?.approveProvider || (() => {});
  const rejectProvider = serviceProviderCtx?.rejectProvider || (() => {});

  // Redirect if not admin
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Keep local copy of pending for instant frontend updates
  useEffect(() => {
    setLocalPending(pendingProviders);
  }, [pendingProviders]);

  const filteredPending = localPending.filter(
    (p) =>
      p.cid?.includes(search) ||
      p.city?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.some((c) => c.toLowerCase().includes(search.toLowerCase()))
  );

  const deleteProvider = (id) => {
    setLocalPending((prev) => prev.filter((p) => p.id !== id));
    console.log("Deleted provider:", id);
    // TODO: Call API to delete provider in backend
  };

  // Demo registration chart (replace with backend data if available)
  const registrationData = [
    { day: "Mon", registrations: 5 },
    { day: "Tue", registrations: 12 },
    { day: "Wed", registrations: 8 },
    { day: "Thu", registrations: 20 },
    { day: "Fri", registrations: 15 },
    { day: "Sat", registrations: 10 },
    { day: "Sun", registrations: 18 },
  ];

  const bookingBreakdown = [
    { name: "Approved", value: approvedProviders.length },
    { name: "Pending", value: localPending.length },
    { name: "Rejected", value: 3 }, // replace with real data if available
  ];
  const COLORS = ["#22c55e", "#facc15", "#ef4444"];

  return (
    <Layout pageTitle="Admin Dashboard" role="admin">
      {/* Header & Search */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome, Admin 👋</h1>
        <input
          type="text"
          placeholder="Search providers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
          <h3 className="text-sm font-medium text-gray-500">Pending Requests</h3>
          <p className="text-2xl font-bold mt-2">{localPending.length}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
          <h3 className="text-sm font-medium text-gray-500">Approved Providers</h3>
          <p className="text-2xl font-bold mt-2">{approvedProviders.length}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
          <h3 className="text-sm font-medium text-gray-500">Total Requests</h3>
          <p className="text-2xl font-bold mt-2">
            {localPending.length + approvedProviders.length}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">User Registrations</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={registrationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="registrations" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Bookings Breakdown</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={bookingBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {bookingBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pending Providers Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Pending Service Providers</h2>
        {filteredPending.length === 0 ? (
          <p className="text-gray-500">No pending requests</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">CID</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Location</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Category</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Pricing</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Certificates</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPending.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2">{p.cid || "-"}</td>
                    <td className="px-4 py-2">{p.city || "-"}, {p.dzongkhag || "-"}</td>
                    <td className="px-4 py-2">{p.category?.join(", ") || "-"}</td>
                    <td className="px-4 py-2">{p.pricing || "-"}</td>
                    <td className="px-4 py-2">
                      {p.certificates?.map((file, i) => (
                        <a
                          key={i}
                          href={URL.createObjectURL(file)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline block"
                        >
                          {file.name}
                        </a>
                      )) || "-"}
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => approveProvider(p.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectProvider(p.id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => deleteProvider(p.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
