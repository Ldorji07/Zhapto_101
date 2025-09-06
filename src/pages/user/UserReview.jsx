import React, { useState } from "react";
import Layout from "../../components/Layout";
import { useReviews } from "../../context/ReviewContext";
import { Star } from "lucide-react";

export default function UserReview() {
  const { addReview } = useReviews();
  const [form, setForm] = useState({ provider: "", service: "", rating: 0, comment: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.provider || !form.service || !form.comment || !form.rating) return;
    addReview(form);
    setForm({ provider: "", service: "", rating: 0, comment: "" });
    alert("Review submitted!");
  };

  return (
    <Layout pageTitle="Submit Review" role="user">
      <div className="max-w-lg mx-auto bg-gradient-to-br from-yellow-50 to-white rounded-xl shadow-lg p-6 mt-6 border border-yellow-100">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Share Your Experience</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Service Provider"
            value={form.provider}
            onChange={(e) => setForm({ ...form, provider: e.target.value })}
            className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="Service Name"
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-yellow-400"
          />
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <Star
                key={num}
                className={`w-6 h-6 cursor-pointer transition ${
                  form.rating >= num ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setForm({ ...form, rating: num })}
              />
            ))}
          </div>
          <textarea
            placeholder="Write your feedback..."
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-yellow-400"
            rows={4}
          />
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </Layout>
  );
}
