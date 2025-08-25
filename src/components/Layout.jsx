import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, User, Settings, LogOut, Menu, X, Briefcase, Bell, Users, Clipboard } from "lucide-react";
import { useUser } from "../context/UserContext";

export default function Layout({ pageTitle, children, role = "user" }) {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Define separate menu items for user and admin
  const menuItems = role === "admin"
    ? [
        { name: "Dashboard", icon: <Home size={20} />, path: "/admin/dashboard" },
        { name: "Pending Providers", icon: <Clipboard size={20} />, path: "/admin/dashboard" },
        { name: "Users", icon: <Users size={20} />, path: "/admin/users" }, // Optional page to manage users
        { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
      ]
    : [
        { name: "Home", icon: <Home size={20} />, path: "/UserDashboard" },
        { name: "Service Provider", icon: <Briefcase size={20} />, path: "/service-provider" },
        { name: "Profile", icon: <User size={20} />, path: "/profile" },
        { name: "Notifications", icon: <Bell size={20} />, path: "/notifications" },
        { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
      ];

  const Avatar = () =>
    user?.profilePic ? (
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
    );

  const Sidebar = ({ onLinkClick }) => (
    <div className="flex flex-col w-64 bg-white shadow-lg p-6 min-h-screen">
      <h2 className="text-lg font-semibold mb-8">{role === "admin" ? "Admin Panel" : `Welcome ${user?.name || "User"}`}</h2>
      <nav className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              navigate(item.path);
              onLinkClick?.();
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
          onLinkClick?.();
        }}
        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-100 text-red-500 mt-6"
      >
        <LogOut size={20} /> Logout
      </button>
    </div>
  );

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed top-0 left-0 h-full w-64 z-40">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-40 transform transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onLinkClick={() => setMenuOpen(false)} />
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 md:ml-64">
        <header className="bg-yellow-500 text-white py-4 px-4 sm:px-6 rounded-lg shadow-md flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen((s) => !s)}
              className="md:hidden bg-yellow-600 text-white p-2 rounded-md shadow-md"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold whitespace-nowrap">
              {pageTitle}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Avatar />
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
