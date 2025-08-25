import React, { useState } from "react";
import { useServiceProvider } from "../context/ServiceProviderContext";
import Layout from "../components/Layout";

export default function AdminDashboard() {
  const { pendingProviders, approvedProviders, approveProvider, rejectProvider } = useServiceProvider();
  const [search, setSearch] = useState("");

  const filteredPending = pendingProviders.filter(
    p =>
      p.cid.includes(search) ||
      p.city.toLowerCase().includes(search.toLowerCase()) ||
      p.category.some(c => c.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Layout pageTitle="Admin Dashboard" role="admin">
      {/* Search */}
      <div className="mb-6 flex justify-end">
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
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500">Pending Requests</h3>
          <p className="text-2xl font-bold mt-2">{pendingProviders.length}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500">Approved Providers</h3>
          <p className="text-2xl font-bold mt-2">{approvedProviders.length}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Requests</h3>
          <p className="text-2xl font-bold mt-2">{pendingProviders.length + approvedProviders.length}</p>
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
                  <tr key={p.id}>
                    <td className="px-4 py-2">{p.cid}</td>
                    <td className="px-4 py-2">{p.city}, {p.dzongkhag}</td>
                    <td className="px-4 py-2">{p.category.join(", ")}</td>
                    <td className="px-4 py-2">{p.pricing}</td>
                    <td className="px-4 py-2">
                      {p.certificates.map((file, i) => (
                        <a
                          key={i}
                          href={URL.createObjectURL(file)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline block"
                        >
                          {file.name}
                        </a>
                      ))}
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
