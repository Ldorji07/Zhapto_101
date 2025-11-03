import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import {
  MapPinIcon,
  TagIcon,
  CurrencyDollarIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

const JobList = ({ category }) => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const url = category
          ? `http://localhost:8080/api/providers?category=${category}`
          : "http://localhost:8080/api/providers";

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to load providers");

        const data = await res.json();
        setProviders(data);
      } catch (err) {
        console.error(err);
        setError("Unable to fetch providers.");
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [category]);

  const pageTitle = category ? `${category} Services` : "All Services";

  if (loading) {
    return (
      <Layout pageTitle={pageTitle}>
        <div className="text-center mt-20 text-lg font-medium text-gray-700 animate-pulse">
          Loading providers...
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout pageTitle={pageTitle}>
        <div className="text-center mt-20 text-red-500 font-semibold">
          {error}
        </div>
      </Layout>
    );
  }

  return (
    <Layout pageTitle={pageTitle}>
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-10">
        {providers.length === 0 ? (
          <p className="text-gray-500 text-center">No providers available.</p>
        ) : (
          <section className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {providers.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-between transition-all transform hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r hover:from-yellow-400 hover:via-orange-300 hover:to-red-400 group"
              >
                {/* Profile image */}
                <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-yellow-300 bg-gray-100 shadow-sm transition group-hover:scale-110">
                  <img
                    src={
                      p.profilePicture ||
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt={p.user?.name || "Provider"}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-white tracking-wide mb-1">
                  {p.user?.name || "Unnamed Provider"}
                </h3>

                <p className="text-sm text-gray-700 group-hover:text-white text-center mb-1 flex items-center gap-1">
                  <MapPinIcon className="h-4 w-4" />
                  {p.city}, {p.dzongkhag}
                </p>

                <p className="text-sm text-gray-700 group-hover:text-white text-center mb-1 flex items-center gap-1">
                  <TagIcon className="h-4 w-4" />
                  {Array.isArray(p.category)
                    ? p.category.join(", ")
                    : p.category}
                </p>

                <p className="text-sm text-gray-700 group-hover:text-white text-center mb-1 flex items-center gap-1">
                  <CurrencyDollarIcon className="h-4 w-4" />
                  Nu. {p.pricing} ({p.pricingType})
                </p>

                <p className="text-sm text-gray-700 group-hover:text-white text-center mb-4 flex items-center gap-1">
                  <PhoneIcon className="h-4 w-4" />
                  {p.user?.phone || "N/A"}
                </p>

                <button
                  onClick={() =>
                    alert(`Booking ${p.user?.name || "provider"}...`)
                  }
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition group-hover:bg-white group-hover:text-blue-700 font-semibold"
                >
                  Book Now
                </button>
              </div>
            ))}
          </section>
        )}
      </div>
    </Layout>
  );
};

export default JobList;
