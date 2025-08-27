// pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { Edit2, Save } from "lucide-react";
import Layout from "../components/Layout";
import { useUser } from "../context/UserContext";

export default function Profile() {
  const { user, setUser } = useUser();
  const [editing, setEditing] = useState(false);

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
          if (!editing) setUser(profile);
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, [setUser, editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (!editing) return; // only allow upload in edit mode
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfileData((prev) => ({ ...prev, profilePic: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePic = () => {
    if (!editing) return;
    setProfileData((prev) => ({ ...prev, profilePic: "" }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://localhost:8080/api/auth/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (res.ok) {
        const updatedData = await res.json();
        const updatedProfile = updatedData.data || {};
        setProfileData((prev) => ({ ...prev, ...updatedProfile }));
        setUser(updatedProfile);
        localStorage.setItem("user", JSON.stringify(updatedProfile));
        alert("Profile updated successfully!");
        setEditing(false);
      } else {
        alert("Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Error updating profile");
    }
  };

  // 🔒 Block navigation ONLY while Save is showing (editing === true)
  useEffect(() => {
    if (!editing) return;

    // 1) Block link clicks (react-router <Link> renders <a>)
    const clickGuard = (e) => {
      const profileRoot = document.getElementById("profile-page");
      const target = e.target;
      const anchor = target.closest('a, [role="link"]');

      // If a link was clicked outside the profile content, block it
      if (anchor && profileRoot && !profileRoot.contains(anchor)) {
        e.preventDefault();
        e.stopPropagation();
        alert("Please save your changes before leaving this page.");
      }
    };
    document.addEventListener("click", clickGuard, true);

    // 2) Warn on browser refresh/close
    const beforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", beforeUnload);

    // 3) Soft-block Back/Forward
    const onPop = (e) => {
      const ok = window.confirm("You have unsaved changes. Leave this page?");
      if (!ok) {
        // Cancel the back navigation by pushing state forward again
        history.pushState(null, "", window.location.href);
      }
    };
    window.addEventListener("popstate", onPop);

    return () => {
      document.removeEventListener("click", clickGuard, true);
      window.removeEventListener("beforeunload", beforeUnload);
      window.removeEventListener("popstate", onPop);
    };
  }, [editing]);

  return (
    // NOTE: id="profile-page" is used by the guard to allow clicks inside
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
              {profileData.profilePic && (
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
              className="flex items-center gap-2 bg-green-500 text- hite px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              <Save size={18} /> Save
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
