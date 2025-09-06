import React, { useState } from "react";
import Layout from "../../components/Layout";
import { MessageCircle, Star, Eye } from "lucide-react";
import { useReviews } from "../../context/ReviewContext";

export default function ReviewFeedback() {
  const { reviews } = useReviews();
  const [selectedReview, setSelectedReview] = useState(null);

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
      : 0;

  const serviceSummary = {};
  reviews.forEach((r) => {
    if (!serviceSummary[r.service]) serviceSummary[r.service] = { total: 0, count: 0 };
    serviceSummary[r.service].total += r.rating;
    serviceSummary[r.service].count += 1;
  });

  return (
    <Layout pageTitle="Review & Feedback Management" role="admin">
      <div className="flex items-center mb-8 gap-3">
        <MessageCircle className="w-7 h-7 text-yellow-600 animate-pulse" />
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
          Reviews & Feedback
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <SummaryCard label="Total Reviews" value={totalReviews} />
        <SummaryCard label="Average Rating" value={averageRating} icon />
        {Object.entries(serviceSummary).map(([service, data]) => (
          <SummaryCard
            key={service}
            label={service}
            value={(data.total / data.count).toFixed(1)}
            sub={`${data.count} review(s)`}
            icon
          />
        ))}
      </div>

      <div className="bg-white shadow rounded-xl p-6 overflow-x-auto">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-6 italic">No reviews available</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Customer", "Provider", "Service", "Rating", "Comment", "Actions"].map((heading) => (
                  <th key={heading} className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reviews.map((r) => (
                <tr key={r.id} className="hover:bg-yellow-50 transition">
                  <td className="px-4 py-2">{r.customer || "Anonymous"}</td>
                  <td className="px-4 py-2">{r.provider}</td>
                  <td className="px-4 py-2">{r.service}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < r.rating ? "text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2">{r.comment.substring(0, 40)}...</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => setSelectedReview(r)}
                      className="flex items-center gap-1 px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white transition"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl relative animate-fade-in">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Full Review</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Customer:</strong> {selectedReview.customer || "Anonymous"}</p>
              <p><strong>Provider:</strong> {selectedReview.provider}</p>
              <p><strong>Service:</strong> {selectedReview.service}</p>
              <p><strong>Rating:</strong> {selectedReview.rating} / 5</p>
              <p><strong>Comment:</strong> {selectedReview.comment}</p>
            </div>
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}

function SummaryCard({ label, value, sub, icon }) {
  return (
    <div className="bg-gradient-to-br from-white to-yellow-50 border border-yellow-100 p-6 rounded-xl shadow hover:shadow-lg transition">
      <p className="text-sm text-gray-500">{label}</p>
      <div className="flex items-center gap-2 mt-2">
        {icon && <Star className="w-6 h-6 text-yellow-400" />}
        <span className="text-xl font-semibold text-gray-800">{value}</span>
      </div>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}
