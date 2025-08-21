// pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { Edit2, Save } from "lucide-react";
import Layout from "../components/Layout";
import { useUser } from "../context/UserContext";

export default function Profile() {
  const { user, setUser } = useUser();
  const [editing, setEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    facebook: "",
    linkedin: "",
    instagram: "",
    profilePic: "",
  });

  // Load from user context or localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const initialUser = storedUser ? JSON.parse(storedUser) : user;
    if (initialUser) setProfileData(initialUser);
  }, [user]);

  // Handle text input changes locally
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload locally
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfileData((prev) => ({ ...prev, profilePic: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Remove profile picture
  const handleRemovePic = () => {
    setProfileData((prev) => ({ ...prev, profilePic: "" }));
  };

  // Save data persistently and update context
  const handleSave = () => {
    setEditing(false);
    localStorage.setItem("user", JSON.stringify(profileData));
    setUser(profileData); // update Navbar and context
  };

  return (
    <Layout pageTitle="Profile">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-6">My Profile</h2>

        {/* Profile Picture */}
        <div className="flex flex-col items-center gap-2">
          {profileData.profilePic ? (
            <img
              src={profileData.profilePic}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-bold text-3xl">
              {profileData.name?.charAt(0) || "U"}
            </div>
          )}

          <div className="flex gap-2 mt-2">
            <input
              type="file"
              accept="image/*"
              id="profilePicUpload"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="profilePicUpload"
              className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md transition"
            >
              Upload
            </label>
            {profileData.profilePic && (
              <button
                onClick={handleRemovePic}
                className="bg-red-100 text-red-500 hover:bg-red-200 px-4 py-2 rounded-md transition"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["name", "email", "phone", "address"].map((field) => (
            <div key={field}>
              <label className="font-medium">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={profileData[field]}
                disabled={!editing}
                onChange={handleChange}
                className={`border px-3 py-1 rounded-lg w-full ${
                  editing ? "border-yellow-400 bg-yellow-50" : "bg-gray-100"
                }`}
              />
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="font-medium">Bio</label>
            <textarea
              name="bio"
              value={profileData.bio}
              disabled={!editing}
              onChange={handleChange}
              rows={3}
              className={`border px-3 py-1 rounded-lg w-full ${
                editing ? "border-yellow-400 bg-yellow-50" : "bg-gray-100"
              }`}
            />
          </div>

          {["facebook", "linkedin", "instagram"].map((field) => (
            <div key={field}>
              <label className="font-medium">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                name={field}
                value={profileData[field]}
                disabled={!editing}
                onChange={handleChange}
                className={`border px-3 py-1 rounded-lg w-full ${
                  editing ? "border-yellow-400 bg-yellow-50" : "bg-gray-100"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Edit / Save Button */}
        <div className="flex justify-end mt-4">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
            >
              <Edit2 size={18} /> Edit
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              <Save size={18} /> Save
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
