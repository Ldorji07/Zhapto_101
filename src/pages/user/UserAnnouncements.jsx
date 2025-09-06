import React from "react";
import Layout from "../../components/Layout";
import { useAnnouncement } from "../../context/AnnouncementContext";
import { Bell } from "lucide-react";

export default function UserAnnouncements() {
  const { announcements } = useAnnouncement();

  return (
    <Layout pageTitle="Announcements" role="user">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Bell className="w-7 h-7 text-yellow-600 animate-bounce" />
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
          Announcements & Offers
        </h1>
      </div>

      {/* Empty State */}
      {announcements.length === 0 ? (
        <p className="text-gray-500 text-center py-6 italic">No announcements yet. Stay tuned!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.map((a) => (
            <div
              key={a.id}
              className="bg-gradient-to-br from-white to-yellow-50 border border-yellow-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              {/* Accent Bar */}
              <div className="h-1 w-16 bg-yellow-400 rounded-full mb-3" />

              {/* Type */}
              <p className="text-xs uppercase tracking-wide text-yellow-600 font-semibold">
                {a.type}
              </p>

              {/* Title */}
              <h2 className="text-xl font-bold text-gray-800 mt-2">{a.title}</h2>

              {/* Content */}
              <p className="text-gray-700 mt-3 leading-relaxed">{a.content}</p>

              {/* Date */}
              <p className="text-xs text-gray-400 mt-4">
                {new Date(a.date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
