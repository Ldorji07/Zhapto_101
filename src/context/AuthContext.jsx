import React, { createContext, useState } from "react";

// Create the context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  // Example user data (you'll replace this with signup/login later)
  const [user, setUser] = useState({
    email: "ldorji705@gmail.com",
    password: "********"
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
