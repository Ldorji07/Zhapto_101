import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile({ user, setUser }) {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({ ...user });
  const [profilePic, setProfilePic] = useState(user?.profilePic || "/default-avatar.png");

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfilePic(url);
      setProfileData({ ...profileData, profilePic: url });
    }
  };

  const handleSave = () => {
    // Ideally, call backend API to update user
    setUser(profileData);
    alert("Profile updated!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between">
        <div
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          MyApp
        </div>
        <button
          onClick={() => navigate("/signin")}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </nav>

      <main className="flex-1 p-6 flex justify-center items-start">
        <div className="bg-white p-6 rounded-2xl shadow-md max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

          <div className="flex flex-col items-center mb-6">
            <img src={profilePic} alt="Profile" className="w-24 h-24 rounded-full mb-2" />
            <input type="file" onChange={handlePicChange} />
          </div>

          <div className="mb-3">
            <label className="font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div className="mb-3">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div className="mb-3">
            <label className="font-semibold">Phone</label>
            <input
              type="tel"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <button
            onClick={handleSave}
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg py-2 px-4 mt-4"
          >
            Save Changes
          </button>
        </div>
      </main>
    </div>
  );
}
