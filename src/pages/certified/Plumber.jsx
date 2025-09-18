import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { Star } from "lucide-react";
import { getRole } from "../../lib/auth"; // ✅ check login

const plumbers = [
  { id: 1, name: "Sherab Nima Rigzin", specialist: "Plumber, Painter", price: "Nu. 7000 (one job)", rating: 5 },
  { id: 2, name: "Sonam Gyeltshen", specialist: "Plumber", price: "Nu. 5000 (one job)", rating: 4 },
  { id: 3, name: "Lhendup Tamang", specialist: "Plumber", price: "Nu. 6000 (one job)", rating: 3 },
  { id: 4, name: "Raj Kumar", specialist: "Plumber, Carpenter", price: "Nu. 7000 (one job)", rating: 3 },
];

export default function Plumber() {
  const navigate = useNavigate();

  // ✅ Handle booking (login required)
  const handleBooking = (plumber) => {
    const role = getRole(); // e.g. "user" or null

    if (!role) {
      navigate("/signin"); // redirect if not logged in
    } else {
      navigate(`/service-provider?id=${plumber.id}&type=plumber`); 
      // ✅ Pass plumber ID to booking page
    }
  };

  return (
    <Layout pageTitle="Certified Plumbers">
      <div className="p-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/UserDashboard")}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-100 to-yellow-300 text-gray-800 font-medium shadow-sm hover:shadow-md transition"
          >
            ← Back to Dashboard
          </button>
          <div className="text-sm text-gray-500 italic">Skilled professionals near you</div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plumbers.map((plumber) => (
            <div
              key={plumber.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition duration-300 flex flex-col sm:flex-row items-center justify-between gap-5"
            >
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center text-3xl">
                🛠️
              </div>

              {/* Info */}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{plumber.name}</h2>
                <p className="text-sm text-gray-600">{plumber.specialist}</p>
                <p className="text-sm font-semibold text-gray-700 mt-1">{plumber.price}</p>
                {/* Rating */}
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < plumber.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                    />
                  ))}
                </div>
              </div>

              {/* ✅ Book Now Button */}
              <button
                onClick={() => handleBooking(plumber)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-medium shadow-sm hover:shadow-md transition"
              >
                Book Now
              </button>
            </div>
          ))}
        </section>
      </div>
    </Layout>
  );
}
