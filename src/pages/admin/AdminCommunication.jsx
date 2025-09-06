import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Send, MessageCircle } from "lucide-react";
import { useAnnouncement } from "../../context/AnnouncementContext";

export default function AdminCommunication() {
  const { sendAnnouncement } = useAnnouncement();
  const [form, setForm] = useState({ title: "", content: "", type: "Announcement" });

  const handleSend = () => {
    if (!form.title || !form.content) return alert("Please fill in all fields.");
    sendAnnouncement({ ...form, id: Date.now(), date: new Date() });
    setForm({ title: "", content: "", type: "Announcement" });
  };

  return (
    <Layout pageTitle="Communication Tools" role="admin">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <MessageCircle className="w-7 h-7 text-yellow-600 animate-pulse" />
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
          Admin Communication Hub
        </h1>
      </div>

      {/* Form Container */}
      <div className="bg-gradient-to-br from-yellow-50 to-white p-8 rounded-xl shadow-lg border border-yellow-100">
        {/* Title Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
          <input
            type="text"
            placeholder="Enter a clear, concise title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Type Selector */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400"
          >
            <option>Announcement</option>
            <option>Offer</option>
            <option>Reminder</option>
          </select>
        </div>

        {/* Message Content */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
          <textarea
            placeholder="Write your message here..."
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400"
            rows={5}
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold px-6 py-2 rounded-md flex items-center gap-2 transition"
        >
          <Send className="w-5 h-5" /> Send Message
        </button>
      </div>
    </Layout>
  );
}
