import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { Star } from "lucide-react";

const electricians = [
  { id: 1, name: "Karma Wangchuk", specialist: "Electrician", price: "Nu. 4500 (one job)", rating: 4 },
  { id: 2, name: "Pema Dorji", specialist: "Electrician, Plumber", price: "Nu. 6500 (one job)", rating: 5 },
  { id: 3, name: "Sonam Jamtsho", specialist: "Electrician", price: "Nu. 5000 (one job)", rating: 3 },
];

export default function Electrician() {
  const navigate = useNavigate();

  return (
    <Layout pageTitle="Certified Electricians">
      <div className="p-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/UserDashboard")}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-100 to-yellow-300 text-gray-800 font-medium shadow-sm hover:shadow-md transition"
          >
            ← Back to Dashboard
          </button>
          <div className="text-sm text-gray-500 italic">Reliable electricians near you</div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {electricians.map((worker) => (
            <div
              key={worker.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition duration-300 flex items-center gap-5"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center text-3xl">
                ⚡
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{worker.name}</h2>
                <p className="text-sm text-gray-600">{worker.specialist}</p>
                <p className="text-sm font-semibold text-gray-700 mt-1">{worker.price}</p>
              </div>

              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < worker.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </Layout>
  );
}
