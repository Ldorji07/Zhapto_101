import React from "react";
import Layout from "../../components/Layout";
import { Settings, Shield, Users as UsersIcon } from "lucide-react";

export default function AdminSettings() {
  const settingsSections = [
    {
      title: "Site Settings",
      description: "Manage your site logo, colors, and text content.",
      icon: <Settings className="w-6 h-6 text-white" />,
      color: "bg-blue-500",
    },
    {
      title: "Security",
      description: "Enable two-factor authentication and manage password resets.",
      icon: <Shield className="w-6 h-6 text-white" />,
      color: "bg-green-500",
    },
    {
      title: "Roles & Permissions",
      description: "Manage admin, staff, and user roles and permissions.",
      icon: <UsersIcon className="w-6 h-6 text-white" />,
      color: "bg-yellow-500",
    },
  ];

  return (
    <Layout pageTitle="Admin Settings" role="admin">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Admin Settings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsSections.map((section) => (
          <div
            key={section.title}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-full ${section.color} flex items-center justify-center`}>
                {section.icon}
              </div>
              <h2 className="text-lg font-semibold text-gray-800">{section.title}</h2>
            </div>
            <p className="text-gray-600 mb-6 text-sm">{section.description}</p>
            <button className="mt-auto px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition">
              Manage
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}
