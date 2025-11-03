import React, { useEffect, useState } from "react";

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

        // ✅ No Authorization header — public endpoint
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

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {category ? `${category} Services` : "All Service Providers"}
      </h2>

      {providers.length === 0 ? (
        <p className="text-gray-500 text-center">No providers available.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {providers.map((p) => (
            <div
              key={p.id}
              className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md p-5 transition-all bg-white"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {p.user?.name || "Unnamed"}
              </h3>
              <p className="text-gray-600 text-sm mb-1">
                <strong>Dzongkhag:</strong> {p.dzongkhag}
              </p>
              <p className="text-gray-600 text-sm mb-1">
                <strong>City:</strong> {p.city}
              </p>
              <p className="text-gray-700 text-sm mb-1">
                <strong>Category:</strong> {p.category.join(", ")}
              </p>
              <p className="text-gray-700 text-sm mb-1">
                <strong>Pricing:</strong> Nu. {p.pricing} ({p.pricingType})
              </p>
              <p className="text-gray-600 text-sm mb-2">
                <strong>Phone:</strong> {p.user?.phone}
              </p>
              <button
                onClick={() => alert(`Booking ${p.user?.name || "provider"}...`)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
