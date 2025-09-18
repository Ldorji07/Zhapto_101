import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { Star } from "lucide-react";

const carpenters = [
  { id: 1, name: "Dorji Tenzin", specialist: "Carpenter", price: "Nu. 5000 (one job)", rating: 2 },
  { id: 2, name: "Tenzin Dorji", specialist: "Carpenter, Painter", price: "Nu. 7000 (one job)", rating: 3 },
  { id: 3, name: "Raj Kumar", specialist: "Carpenter", price: "Nu. 6500 (one job)", rating: 4 },
];

export default function Carpenter() {
  const navigate = useNavigate();

  return (
    <Layout pageTitle="Certified Carpenters">
      <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
          <button
            onClick={() => navigate("/UserDashboard")}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-800 font-semibold shadow hover:shadow-md transition w-full sm:w-auto"
          >
            ← Back to Dashboard
          </button>
          <span className="text-sm text-gray-500 italic text-center sm:text-right">
            Experienced carpenters near you
          </span>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {carpenters.map((worker) => (
            <div
              key={worker.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center text-4xl mb-4 shadow-sm group-hover:scale-105 transition">
                🪚
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-yellow-700 transition">
                {worker.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">{worker.specialist}</p>
              <p className="text-sm font-medium text-gray-700 mt-2">{worker.price}</p>

              <div className="flex items-center justify-center gap-1 mt-3">
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
