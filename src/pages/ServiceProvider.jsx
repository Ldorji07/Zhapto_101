// src/pages/ServiceProvider.js
import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Briefcase,
  Bell,
} from "lucide-react";

export default function ServiceProvider({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const fileInputRef = useRef(null);

  const menuItems = [
    { name: "Home", icon: <Home size={20} />, path: "/UserDashboard" },
    { name: "Service Provider", icon: <Briefcase size={20} />, path: "/service-provider" },
    { name: "Profile", icon: <User size={20} />, path: "/profile" },
    { name: "Notifications", icon: <Bell size={20} />, path: "/notifications" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  const [form, setForm] = useState({
    dzongkhag: "",
    city: "",
    category: "",
    cid: "",
    pricing: "",
    certificates: [],
  });

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

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Submitting", form);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-8">Welcome {user?.name}</h2>
        <nav className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                location.pathname === item.path
                  ? "bg-yellow-100 text-yellow-700 font-semibold"
                  : "hover:bg-yellow-100"
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
        <button
          onClick={() => navigate("/signin")}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-100 text-red-500 mt-6"
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg p-6 z-40 flex flex-col transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-lg font-semibold mb-8">Welcome {user?.name}</h2>
        <nav className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                navigate(item.path);
                setMenuOpen(false);
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                location.pathname === item.path
                  ? "bg-yellow-100 text-yellow-700 font-semibold"
                  : "hover:bg-yellow-100"
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
        <button
          onClick={() => {
            navigate("/signin");
            setMenuOpen(false);
          }}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-100 text-red-500 mt-6"
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 sm:p-6">
        {/* Header */}
        <header className="bg-yellow-500 text-white py-4 px-4 sm:px-6 rounded-lg shadow-md flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden bg-yellow-600 text-white p-2 rounded-md shadow-md"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-xl font-bold">Service Provider Registration</h1>
          </div>
          <div className="flex items-center gap-4">
            {user?.profilePic ? (
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white object-cover cursor-pointer"
                onClick={() => navigate("/profile")}
              />
            ) : (
              <div
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-yellow-600 font-bold cursor-pointer border-2 border-white"
                onClick={() => navigate("/profile")}
              >
                {user?.name?.charAt(0) || "U"}
              </div>
            )}
          </div>
        </header>

        {/* Registration Form */}
        <form
          onSubmit={handleRegister}
          className="bg-white shadow-lg rounded-xl p-8 max-w-lg mx-auto space-y-6"
        >
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
            <label className="block text-sm font-medium mb-2">Service Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              required
            >
              <option value="">Select category</option>
              <option value="Plumber">Plumber</option>
              <option value="Electrician">Electrician</option>
              <option value="Carpenter">Carpenter</option>
            </select>
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
              <span className="text-sm text-gray-600">{form.certificates.length} file(s) added</span>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <label className="block text-sm font-medium mb-2">Pricing (per hr)</label>
            <input
              type="number"
              name="pricing"
              value={form.pricing}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="Enter amount"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
          >
            Register
          </button>
        </form>
      </main>
    </div>
  );
}
