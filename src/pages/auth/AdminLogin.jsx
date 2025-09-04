import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Mail, Lock } from "lucide-react";

// Updated image path from public folder
const Skyline = "/Screenshot 2025-08-27 at 9.36.50 AM.png"; // Remove "public/" prefix

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Add role to user object for ProtectedRoute
        const adminUser = { ...data.user, role: "admin" };
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(adminUser));

        // Redirect to admin dashboard
        navigate("/admin/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gray-100">
      {/* Navbar */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Clouds animation */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 relative z-10 -mt-28 sm:-mt-32 md:-mt-36 lg:-mt-40">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold mb-2 text-center">Admin Login</h2>
          <p className="text-gray-500 mb-6 text-center">
            Restricted access for admins only
          </p>

          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}

          {/* Email */}
          <label className="mb-3 flex items-center bg-gray-100 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-red-300">
            <Mail className="w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Admin Email"
              className="ml-2 w-full bg-transparent focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          {/* Password */}
          <label className="mb-4 flex items-center bg-gray-100 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-red-300">
            <Lock className="w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="ml-2 w-full bg-transparent focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg py-3 transition">
            Login as Admin
          </button>
        </form>
      </div>

      {/* Skyline background */}
      <div className="absolute bottom-0 w-full z-0 flex justify-center pointer-events-none">
        <img
          src={Skyline}
          alt="Skyline"
          className="w-full max-h-[320px] object-contain opacity-90"
          style={{ filter: "brightness(0.95)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-100 via-gray-100/80 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}