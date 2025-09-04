import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // ✅ Helper to handle full URL or relative path
  const formatPicUrl = (pic) => {
    if (!pic) return "";
    if (pic.startsWith("http")) return pic;
    return `http://localhost:8080${pic}`;
  };

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      const parsedUser = JSON.parse(saved);
      if (parsedUser.profilePic) {
        parsedUser.profilePic = formatPicUrl(parsedUser.profilePic);
      }
      return parsedUser;
    }
    return null;
  });

  // Fetch latest profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:8080/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success && data.data?.user) {
          const updatedUser = data.data.user;
          if (updatedUser.profilePic) {
            updatedUser.profilePic = formatPicUrl(updatedUser.profilePic);
          }
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, formatPicUrl }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
