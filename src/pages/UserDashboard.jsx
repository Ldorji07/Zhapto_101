import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function UserDashboard({ user }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const services = [
    { name: "Plumber", path: "/certified/plumber", img: "/service-plumber.jpg" },
    { name: "Electrician", path: "/certified/electrician", img: "/service-electrician.jpg" },
    { name: "Carpenter", path: "/certified/carpenter", img: "/service-carpenter.jpg" },
    { name: "Painter", path: "/certified/painter", img: "/service-painter.jpg" },
    { name: "House Shifter", path: "/certified/house-shifter", img: "/service-house-shifter.jpg" },
    { name: "House Cleaner", path: "/certified/house-cleaner", img: "/service-house-cleaner.jpg" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold cursor-pointer" onClick={() => navigate("/dashboard")}>
          MyApp
        </div>

        {/* Desktop avatar + logout */}
        <div className="hidden md:flex items-center gap-4">
          <img
            src={user?.profilePic || "/default-avatar.png"}
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => navigate("/profile")}
          />
          <button
            onClick={() => navigate("/signin")}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden absolute top-16 left-0 w-full bg-white shadow-md flex flex-col p-4 transition-all ${
            menuOpen ? "flex" : "hidden"
          }`}
        >
          <button
            onClick={() => {
              setMenuOpen(false);
              navigate("/profile");
            }}
            className="py-2 hover:text-yellow-600"
          >
            Profile
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              navigate("/signin");
            }}
            className="py-2 hover:text-red-500"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Services Section */}
      <main className="flex-1 p-6 grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <section className="bg-white rounded-2xl shadow-soft p-6">
          <h3 className="text-lg font-semibold mb-4">Welcome, {user?.name} 👋</h3>
          <p className="text-gray-600 mb-6">
            This is your dashboard. Click a service to explore certified professionals.
          </p>

          <h4 className="text-md font-semibold mb-3">Type of Services</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.name}
                onClick={() => navigate(service.path)}
                className="bg-white rounded-xl shadow-lg p-6 h-48 flex flex-col items-center justify-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r hover:from-red-400 hover:via-yellow-400 hover:to-orange-400"
              >
                <img
                  src={service.img}
                  alt={`${service.name} icon`}
                  className="w-20 h-20 object-cover mb-4 rounded-full border-2 border-yellow-300 bg-gray-100"
                />
                <span className="font-semibold text-center text-base text-gray-800">{service.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Profile Section (desktop only) */}
        <section className="hidden lg:block bg-white rounded-2xl shadow-soft p-6">
          <h3 className="text-lg font-semibold mb-4">Your Profile</h3>
          <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
            <p className="mb-2"><span className="font-semibold">Name:</span> {user?.name}</p>
            <p className="mb-2"><span className="font-semibold">Email:</span> {user?.email}</p>
            <p className="mb-2"><span className="font-semibold">Phone:</span> {user?.phone}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
