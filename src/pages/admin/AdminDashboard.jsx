import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useServiceProvider } from "../../context/ServiceProviderContext";
import Layout from "../../components/Layout";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const serviceProviderCtx = useServiceProvider();
  const [search, setSearch] = useState("");
  const [localPending, setLocalPending] = useState([]);

  const pendingProviders = serviceProviderCtx?.pendingProviders || [];
  const approvedProviders = serviceProviderCtx?.approvedProviders || [];
  const approveProvider = serviceProviderCtx?.approveProvider || (() => {});
  const rejectProvider = serviceProviderCtx?.rejectProvider || (() => {});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") navigate("/admin/login");
  }, [navigate]);

  useEffect(() => setLocalPending(pendingProviders), [pendingProviders]);

  const filteredPending = localPending.filter(
    (p) =>
      p.cid?.includes(search) ||
      p.city?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.some((c) => c.toLowerCase().includes(search.toLowerCase()))
  );

  const deleteProvider = (id) =>
    setLocalPending((prev) => prev.filter((p) => p.id !== id));

  return (
    <Layout pageTitle="Admin Dashboard" role="admin">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Welcome, Admin 👋
        </h1>
        <input
          type="text"
          placeholder="Search providers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { title: "Pending Requests", value: localPending.length, color: "bg-yellow-50", textColor: "text-yellow-600" },
          { title: "Approved Providers", value: approvedProviders.length, color: "bg-green-50", textColor: "text-green-600" },
          { title: "Total Requests", value: localPending.length + approvedProviders.length, color: "bg-blue-50", textColor: "text-blue-600" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-xl shadow hover:shadow-xl transition flex flex-col items-center ${stat.color}`}
          >
            <p className={`text-sm font-medium ${stat.textColor} mb-2`}>{stat.title}</p>
            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Pending Providers Table */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Pending Service Providers
        </h2>
        {filteredPending.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No pending requests</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["CID", "Location", "Category", "Pricing", "Certificates", "Actions"].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPending.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-4 py-2 text-gray-700 font-medium">{p.cid || "-"}</td>
                    <td className="px-4 py-2 text-gray-700">{p.city || "-"}, {p.dzongkhag || "-"}</td>
                    <td className="px-4 py-2 text-gray-700">{p.category?.join(", ") || "-"}</td>
                    <td className="px-4 py-2 text-gray-700">{p.pricing || "-"}</td>
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
                    <td className="px-4 py-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => approveProvider(p.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectProvider(p.id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => deleteProvider(p.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
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
