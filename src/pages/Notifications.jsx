import React from "react";
import Layout from "../components/Layout";
import { useServiceProvider } from "../context/ServiceProviderContext";

export default function Notifications() {
  const { notifications } = useServiceProvider();

  return (
    <Layout pageTitle="Notifications">
      <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications yet.</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-md ${
                n.type === "success"
                  ? "bg-green-100 text-green-800"
                  : n.type === "error"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {n.message}
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
