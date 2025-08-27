// pages/Profile.jsx
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useUser } from "../context/UserContext";

export default function Profile() {
  const { user, setUser } = useUser();

  const [profileData, setProfileData] = useState({
    username: "",
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

  // Fetch profile once on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("http://localhost:8080/api/auth/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          const profile = data.data || {};
          setProfileData({
            username: profile.username || "",
            name: profile.name || "",
            email: profile.email || "",
            phone: profile.phone || "",
            address: profile.address || "",
            bio: profile.bio || "",
            facebook: profile.facebook || "",
            linkedin: profile.linkedin || "",
            instagram: profile.instagram || "",
            profilePic: profile.profilePic || "",
          });
          setUser(profile);
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, [setUser]);

  const handleSave = async (updatedFields) => {
    try {
      const newData = { ...profileData, ...updatedFields };
      setProfileData(newData);

      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://localhost:8080/api/auth/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newData),
      });

      if (res.ok) {
        const updatedData = await res.json();
        const updatedProfile = updatedData.data || {};
        setProfileData((prev) => ({ ...prev, ...updatedProfile }));
        setUser(updatedProfile);
        localStorage.setItem("user", JSON.stringify(updatedProfile));
      } else {
        console.error("Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleSave({ [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      handleSave({ profilePic: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePic = () => {
    handleSave({ profilePic: "" });
  };

  return (
    <Layout pageTitle="Profile">
      <div
        id="profile-page"
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6"
      >
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
          {["username", "email", "phone"].map((field) => (
            <div key={field}>
              <label className="font-medium">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={profileData[field]}
                disabled
                className="border px-3 py-1 rounded-lg w-full bg-gray-100"
              />
            </div>
          ))}

          {["name", "address"].map((field) => (
            <div key={field}>
              <label className="font-medium">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                name={field}
                value={profileData[field]}
                onChange={handleChange}
                className="border px-3 py-1 rounded-lg w-full border-yellow-400 bg-yellow-50"
              />
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="font-medium">Bio</label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              rows={3}
              className="border px-3 py-1 rounded-lg w-full border-yellow-400 bg-yellow-50"
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
                onChange={handleChange}
                className="border px-3 py-1 rounded-lg w-full border-yellow-400 bg-yellow-50"
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
