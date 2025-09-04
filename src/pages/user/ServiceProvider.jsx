import React, { useRef, useState } from "react";
import Layout from "../../components/Layout";
import { useServiceProvider } from "../../context/ServiceProviderContext";
import { useUser } from "../../context/UserContext";

export default function ServiceProvider() {
  const { registerProvider } = useServiceProvider();
  const { user } = useUser();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    dzongkhag: "",
    city: "",
    category: [],
    cid: user?.cid || "",
    pricing: "",
    certificates: [],
  });
  const [pricingType, setPricingType] = useState("");
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);

  const serviceOptions = [
    "Plumber",
    "House Cleaner",
    "Electrician",
    "Painter",
    "House Shifter",
    "Carpenter",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFileSelect = (e) => {
    setForm((f) => ({
      ...f,
      certificates: [...f.certificates, ...Array.from(e.target.files)],
    }));
  };

  const handleAddServiceCategory = (service) => {
    if (!form.category.includes(service)) {
      setForm((f) => ({ ...f, category: [...f.category, service] }));
    }
    setServiceDropdownOpen(false);
  };

  const handleRemoveServiceCategory = (service) => {
    setForm((f) => ({ ...f, category: f.category.filter((s) => s !== service) }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    registerProvider(form);
    alert("Registration submitted! Wait for admin approval.");
  };

  return (
    <Layout pageTitle="Service Provider Registration">
      <form className="bg-white shadow-lg rounded-xl p-8 max-w-lg mx-auto space-y-6" onSubmit={handleRegister}>
        {/* Location */}
        <div>
          <p className="text-sm font-medium mb-2">Location</p>
          <div className="grid grid-cols-2 gap-4">
            <select
              name="dzongkhag"
              value={form.dzongkhag}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              required
            >
              <option value="">Dzongkhag</option>
              <option value="Thimphu">Thimphu</option>
              <option value="Paro">Paro</option>
            </select>
            <select
              name="city"
              value={form.city}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              required
            >
              <option value="">City</option>
              <option value="Thimphu City">Thimphu City</option>
              <option value="Wangdue Town">Wangdue Town</option>
            </select>
          </div>
        </div>

        {/* Service Category */}
        <div>
          <label className="block text-sm font-medium mb-2">Service category</label>
          <div className="relative inline-block">
            <button
              type="button"
              className="border rounded-full px-4 py-1 bg-white shadow flex items-center"
              onClick={() => setServiceDropdownOpen((s) => !s)}
            >
              {form.category.length === 0 ? "Select service" : "Add more"}
              <span className="ml-2 text-gray-400">&#9660;</span>
            </button>
            {serviceDropdownOpen && (
              <div className="absolute z-10 left-0 mt-2 bg-white border rounded shadow w-48">
                {serviceOptions
                  .filter((opt) => !form.category.includes(opt))
                  .map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      className="block w-full text-left px-4 py-2 hover:bg-yellow-100"
                      onClick={() => handleAddServiceCategory(opt)}
                    >
                      {opt}
                    </button>
                  ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap mt-2 gap-2">
            {form.category.map((service) => (
              <span key={service} className="inline-flex items-center border rounded-full px-3 py-1 bg-gray-50">
                {service}
                <button
                  type="button"
                  className="ml-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  onClick={() => handleRemoveServiceCategory(service)}
                >
                  &#10006;
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* CID */}
        <div>
          <label className="block text-sm font-medium mb-2">CID</label>
          <input
            type="text"
            name="cid"
            value={form.cid}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            required
          />
        </div>

        {/* Certificates */}
        <div>
          <p className="text-sm font-medium mb-2">Certificates</p>
          <div className="flex items-center gap-3">
            <div
              onClick={() => fileInputRef.current.click()}
              className="w-10 h-10 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 text-xl font-bold"
            >
              +
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />
            <span className="text-sm text-gray-600">
              {form.certificates.length} file(s) added
            </span>
          </div>
        </div>

        {/* Pricing */}
        <div>
          <label className="block text-sm font-medium mb-2">Pricing</label>
          <div className="flex gap-3 mb-2">
            <button
              type="button"
              className={`px-3 py-1 rounded-full border ${pricingType === "hr" ? "bg-yellow-300" : "bg-white"}`}
              onClick={() => setPricingType((t) => (t === "hr" ? "" : "hr"))}
            >
              Per Hour
            </button>
            <button
              type="button"
              className={`px-3 py-1 rounded-full border ${pricingType === "onejob" ? "bg-yellow-300" : "bg-white"}`}
              onClick={() => setPricingType((t) => (t === "onejob" ? "" : "onejob"))}
            >
              Per Job
            </button>
          </div>
          {pricingType && (
            <input
              type="number"
              name="pricing"
              value={form.pricing}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder={`Enter amount (${pricingType === "hr" ? "per hour" : "per job"})`}
              required
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
        >
          Register
        </button>
      </form>
    </Layout>
  );
}
