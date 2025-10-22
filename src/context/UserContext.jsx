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

        // Only clear session on explicit 401 Unauthorized
        if (res.status === 401) {
          setUser(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          return;
        }

        // Try to parse JSON; backend might not follow exact shape yet
        let data = null;
        try {
          data = await res.json();
        } catch (_) {
          // Non-JSON response: keep existing session if present
        }

        if (data?.success && data?.data?.user) {
          const updatedUser = data.data.user;

          // 🔑 Normalize ID (always ensure user.id exists)
          updatedUser.id =
            updatedUser.id || updatedUser.userId || updatedUser._id;

          if (updatedUser.profilePic) {
            updatedUser.profilePic = formatPicUrl(updatedUser.profilePic);
          }

          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        } else {
          // Keep token; fall back to cached user if available
          const cached = localStorage.getItem("user");
          setUser(cached ? JSON.parse(cached) : null);
        }
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        // Network/other error: keep existing session if any
        const cached = localStorage.getItem("user");
        setUser(cached ? JSON.parse(cached) : null);
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
