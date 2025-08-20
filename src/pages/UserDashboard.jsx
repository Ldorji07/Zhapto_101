import React, { useState } from "react";
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

export default function UserDashboard({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const services = [
    { name: "Plumber", path: "/certified/plumber", img: "/service-plumber.jpg" },
    { name: "Electrician", path: "/certified/electrician", img: "/service-electrician.jpg" },
    { name: "Carpenter", path: "/certified/carpenter", img: "/service-carpenter.jpg" },
    { name: "Painter", path: "/certified/painter", img: "/service-painter.jpg" },
    { name: "House Shifter", path: "/certified/house-shifter", img: "/service-house-shifter.jpg" },
    { name: "House Cleaner", path: "/certified/house-cleaner", img: "/service-house-cleaner.jpg" },
  ];

  const menuItems = [
    { name: "Home", icon: <Home size={20} />, path: "/UserDashboard" },
    { name: "Service Provider", icon: <Briefcase size={20} />, path: "/service-provider" },
    { name: "Profile", icon: <User size={20} />, path: "/profile" },
    { name: "Notifications", icon: <Bell size={20} />, path: "/notifications" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar (Desktop) */}
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

      {/* Main Content */}
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
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold whitespace-nowrap">
              Zhapto Portal
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {user?.profilePic ? (
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white object-cover"
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

        {/* Services Grid */}
        <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.name}
              onClick={() => navigate(service.path)}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center cursor-pointer transition-all transform hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r hover:from-yellow-400 hover:via-orange-300 hover:to-red-400 group"
            >
              <img
                src={service.img}
                alt={service.name}
                className="w-20 h-20 object-cover mb-4 rounded-full border-2 border-yellow-300 bg-gray-100 transition group-hover:scale-110"
              />
              <h3 className="font-semibold text-gray-800 group-hover:text-white">
                {service.name}
              </h3>
              <p className="text-sm text-gray-500 text-center mt-2 group-hover:text-white">
                Certified {service.name} professionals available.
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
