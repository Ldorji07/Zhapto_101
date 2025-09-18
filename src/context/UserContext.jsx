import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const formatPicUrl = (pic) => {
    if (!pic) return "";
    if (pic.startsWith("http")) return pic;
    return `http://localhost:8080${pic}`;
  };

  const [user, setUser] = useState(null); // ✅ Start with null

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }

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
        } else {
          // ❌ Invalid token or session expired
          setUser(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
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
