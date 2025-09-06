import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useUser } from "../../context/UserContext";
import { Trash2, Upload } from "lucide-react";

export default function AdminProfile() {
  const { user, setUser } = useUser();
  const [admin, setAdmin] = useState({
    name: "Admin User",
    email: "admin@example.com",
    role: "Administrator",
    profilePic: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({ name: "", email: "", profilePic: "" });

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("user"));
      if (stored && stored.role === "admin") {
        setAdmin(stored);
      }
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
    }
  }, []);

  const startEditing = () => {
    setTempData({ ...admin });
    setIsEditing(true);
  };

  const saveChanges = () => {
    setAdmin(tempData);
    setUser && setUser(tempData);
    localStorage.setItem("user", JSON.stringify(tempData));
    setIsEditing(false);
  };

  const cancelEditing = () => setIsEditing(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setTempData((prev) => ({ ...prev, profilePic: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setTempData((prev) => ({ ...prev, profilePic: "" }));
  };

  const displayPic = isEditing ? tempData.profilePic : admin.profilePic;
  const displayName = isEditing ? tempData.name : admin.name;
  const displayEmail = isEditing ? tempData.email : admin.email;

  return (
    <Layout pageTitle="Admin Profile" role="admin">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-10">
        <div className="flex flex-col items-center gap-4">
          {displayPic ? (
            <img
              src={displayPic}
              alt="Admin"
              className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/128x128.png?text=Admin";
              }}
            />
          ) : (
            <div className="w-32 h-32 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 text-4xl font-bold border-4 border-yellow-400">
              {displayName?.charAt(0) || "A"}
            </div>
          )}

          {isEditing && (
            <div className="flex gap-4 mt-4">
              <label className="flex items-center gap-2 cursor-pointer bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition">
                <Upload size={18} /> Upload
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
              {tempData.profilePic && (
                <button
                  onClick={removeImage}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
                >
                  <Trash2 size={18} /> Remove
                </button>
              )}
            </div>
          )}

          {isEditing ? (
            <div className="flex flex-col gap-3 w-full max-w-md mt-4">
              <input
                type="text"
                value={tempData.name}
                onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
                placeholder="Name"
                className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
              <input
                type="email"
                value={tempData.email}
                onChange={(e) => setTempData({ ...tempData, email: e.target.value })}
                placeholder="Email"
                className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
            </div>
          ) : (
            <div className="text-center mt-4">
              <h2 className="text-2xl font-bold text-gray-800">{displayName}</h2>
              <p className="text-gray-500">{admin.role}</p>
              <p className="text-gray-600">{displayEmail}</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center gap-4">
          {isEditing ? (
            <>
              <button
                className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                onClick={saveChanges}
              >
                Save
              </button>
              <button
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400 transition"
                onClick={cancelEditing}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
              onClick={startEditing}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
