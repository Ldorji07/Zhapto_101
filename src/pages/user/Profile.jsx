// pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { Edit2, Save } from "lucide-react";
import Layout from "../../components/Layout";
import { useUser } from "../../context/UserContext";

export default function Profile() {
  const { user, setUser } = useUser();
  const [editing, setEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewPic, setPreviewPic] = useState("");

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
  });

  // Fetch profile on mount
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

          setProfileData((prev) => ({
            ...prev,
            username: profile.username || "",
            name: profile.name || "",
            email: profile.email || "",
            phone: profile.phone || "",
            address: profile.address || "",
            bio: profile.bio || "",
            facebook: profile.facebook || "",
            linkedin: profile.linkedin || "",
            instagram: profile.instagram || "",
          }));

          // ✅ Fix: prepend backend URL if profilePic exists
          if (profile.profilePic) {
            setPreviewPic(`http://localhost:8080${profile.profilePic}`);
          } else {
            setPreviewPic("");
          }

          setUser(profile);
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, [setUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);

    // ✅ Instant preview for newly selected file
    setPreviewPic(URL.createObjectURL(file));
  };

  const handleRemovePic = () => {
    setSelectedFile(null);
    setPreviewPic("");
  };

  // Save profile
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const formData = new FormData();
      formData.append(
        "profileData",
        new Blob([JSON.stringify(profileData)], { type: "application/json" })
      );

      if (selectedFile) formData.append("profilePic", selectedFile);

      const res = await fetch("http://localhost:8080/api/auth/update-profile", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        const updatedProfile = data.data || {};
        setProfileData((prev) => ({ ...prev, ...updatedProfile }));
        setUser(updatedProfile);

        // ✅ Fix: after saving, use backend URL for profilePic
        if (updatedProfile.profilePic) {
          setPreviewPic(`http://localhost:8080${updatedProfile.profilePic}`);
        } else {
          setPreviewPic("");
        }

        localStorage.setItem("user", JSON.stringify(updatedProfile));
        alert("Profile updated successfully!");
        setEditing(false);
        setSelectedFile(null);
      } else {
        alert("Failed: " + data.message);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <Layout pageTitle="Profile">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-6">My Profile</h2>

        {/* Profile Picture */}
        <div className="flex flex-col items-center gap-2">
          {previewPic ? (
            <img
              src={previewPic}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-bold text-3xl">
              {profileData.name?.charAt(0) || "U"}
            </div>
          )}

          {editing && (
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
              {previewPic && (
                <button
                  onClick={handleRemovePic}
                  className="bg-red-100 text-red-500 hover:bg-red-200 px-4 py-2 rounded-md transition"
                >
                  Remove
                </button>
              )}
            </div>
          )}
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["username", "email"].map((field) => (
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

          <div>
            <label className="font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              disabled={!editing}
              className={`border px-3 py-1 rounded-lg w-full ${
                editing ? "border-yellow-400 bg-yellow-50" : "bg-gray-100"
              }`}
            />
          </div>

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
                disabled={!editing}
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
              onChange={handleChange}
              disabled={!editing}
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
                onChange={handleChange}
                disabled={!editing}
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
