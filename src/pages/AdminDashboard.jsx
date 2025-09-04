import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useServiceProvider } from "../context/ServiceProviderContext";
import Layout from "../components/Layout";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const serviceProviderCtx = useServiceProvider();
  const [search, setSearch] = useState("");

  const pendingProviders = serviceProviderCtx?.pendingProviders || [];
  const approvedProviders = serviceProviderCtx?.approvedProviders || [];
  const approveProvider = serviceProviderCtx?.approveProvider || (() => {});
  const rejectProvider = serviceProviderCtx?.rejectProvider || (() => {});

  // ✅ Use localStorage user object instead of decoding JWT
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/admin/login");
    }
  }, [navigate]);

  const filteredPending = pendingProviders.filter(
    (p) =>
      p.cid?.includes(search) ||
      p.city?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.some((c) => c.toLowerCase().includes(search.toLowerCase()))
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  return (
    <Layout pageTitle="Admin Dashboard" role="admin">
      {/* Search */}
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
        <div className="bg-white shadow rounded-2xl p-6 hover:shadow-lg transition">
          <h3 className="text-sm font-medium text-gray-500">Pending Requests</h3>
          <p className="text-3xl font-bold mt-2">{pendingProviders.length}</p>
        </div>
        <div className="bg-white shadow rounded-2xl p-6 hover:shadow-lg transition">
          <h3 className="text-sm font-medium text-gray-500">Approved Providers</h3>
          <p className="text-3xl font-bold mt-2">{approvedProviders.length}</p>
        </div>
        <div className="bg-white shadow rounded-2xl p-6 hover:shadow-lg transition">
          <h3 className="text-sm font-medium text-gray-500">Total Requests</h3>
          <p className="text-3xl font-bold mt-2">
            {pendingProviders.length + approvedProviders.length}
          </p>
        </div>
      </div>

      {/* Pending Providers Table */}
      <div className="bg-white shadow rounded-2xl p-6 animate-fadeIn">
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
                        <span key={i} className="text-blue-500 block">{file.name}</span>
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
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Reject
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
