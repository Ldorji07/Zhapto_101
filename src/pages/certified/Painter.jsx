import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { Star } from "lucide-react";

const painters = [
  { id: 1, name: "Lhendup Tamang", specialist: "Painter", price: "Nu. 6000 (one job)", rating: 3 },
  { id: 2, name: "Raj Kumar", specialist: "Painter, Carpenter", price: "Nu. 7000 (one job)", rating: 4 },
  { id: 3, name: "Pema Wangdi", specialist: "Painter", price: "Nu. 5500 (one job)", rating: 5 },
];

export default function Painter({ preLogin }) {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/painter/${id}`);
  };

  const handleBooking = () => {
    navigate(preLogin ? "/signin" : "/booking");
  };

  return (
    <Layout pageTitle="Certified Painters">
      <div className="p-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/UserDashboard")}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-100 to-yellow-300 text-gray-800 font-medium shadow-sm hover:shadow-md transition"
          >
            ← Back to Dashboard
          </button>
          <div className="text-sm text-gray-500 italic">Skilled painters near you</div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {painters.map((worker) => (
            <div
              key={worker.id}
              onClick={() => handleCardClick(worker.id)}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition duration-300 flex flex-col gap-4 cursor-pointer group"
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center text-3xl">
                  🎨
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-yellow-700">{worker.name}</h2>
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

              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent card click
                  handleBooking();
                }}
                className="self-start mt-2 px-4 py-2 rounded-md bg-gradient-to-r from-yellow-400 to-orange-300 text-white font-medium shadow hover:shadow-md transition"
              >
                {preLogin ? "Sign in to Book" : "Book Now"}
              </button>
            </div>
          ))}
        </section>
      </div>
    </Layout>
  );
}
