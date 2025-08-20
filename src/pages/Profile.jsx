import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, User, Settings, LogOut, Menu, X, Bell, Edit2, Briefcase } from "lucide-react";

export default function Profile({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState({ ...user });
  const [profilePic, setProfilePic] = useState(user?.profilePic || "/default-avatar.png");

  const handleChange = (e) => setProfileData({ ...profileData, [e.target.name]: e.target.value });

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfilePic(url);
      setProfileData({ ...profileData, profilePic: url });
    }
  };

  const handleSave = () => {
    setUser(profileData);
    alert("Profile updated!");
  };

  const menuItems = [
    { name: "Home", icon: <Home size={20} />, path: "/UserDashboard" },
    { name: "Service Provider", icon: <Briefcase size={20} />, path: "/service-provider" },
    { name: "Profile", icon: <User size={20} />, path: "/profile" },
    { name: "Notifications", icon: <Bell size={20} />, path: "/notifications" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  const InputCard = ({ label, children }) => (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-1">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      {children}
    </div>
  );

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
      <main className="flex-1 p-6 flex flex-col gap-6">
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
              My Profile
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <img
              src={profilePic}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
          </div>
        </header>

        {/* Profile Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={profilePic}
                alt="Profile"
                className="w-40 h-40 rounded-full border-4 border-yellow-400 object-cover"
              />
              <label className="absolute bottom-2 right-2 bg-yellow-500 p-2 rounded-full cursor-pointer hover:bg-yellow-600 transition">
                <Edit2 size={16} className="text-white" />
                <input type="file" onChange={handlePicChange} className="hidden" />
              </label>
            </div>

            <InputCard label="Full Name">
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter full name"
              />
            </InputCard>

            <InputCard label="Email">
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter email"
              />
            </InputCard>

            <InputCard label="Phone Number">
              <input
                type="text"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter phone number"
              />
            </InputCard>

            <InputCard label="CID">
              <input
                type="number"
                name="cid"
                value={profileData.cid || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter CID"
              />
            </InputCard>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            <InputCard label="Address">
              <input
                type="text"
                name="address"
                value={profileData.address || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter address"
              />
            </InputCard>

            <InputCard label="Gender">
              <select
                name="gender"
                value={profileData.gender || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </InputCard>

            <InputCard label="Blood Group">
              <select
                name="bloodGroup"
                value={profileData.bloodGroup || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </InputCard>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={handleSave}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl py-2 px-8 shadow-md transition"
          >
            Save Changes
          </button>
        </div>
      </main>
    </div>
  );
}
