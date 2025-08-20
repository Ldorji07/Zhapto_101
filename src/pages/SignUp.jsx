import React, { useState } from "react";
import { Apple, Mail, Lock, User, Eye, EyeOff, Phone } from "lucide-react";
import Navbar from "../components/Navbar";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function SignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState("signup"); // 'signup' or 'otp'
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "user", // default role
  });
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        setError("Registration failed: Server returned invalid response.");
        return;
      }

      if (res.ok && data.success) setStep("otp");
      else setError((data && data.message) || "Registration failed");
    } catch (err) {
      setError("Registration failed: " + err.message);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:8080/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otpCode: otp }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        setError("OTP verification failed: Server returned invalid response.");
        return;
      }

      if (res.ok && data.success) navigate("/signin");
      else setError((data && data.message) || "OTP verification failed");
    } catch (err) {
      setError("OTP verification failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center bg-gray-100 p-4 relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
          style={{ backgroundImage: "url('/butan-flag.webp')" }}
        />

        <div className="relative grid md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden max-w-5xl w-full">
          {/* Left: Form / OTP */}
          <div className="p-8 md:p-10 flex flex-col justify-center bg-gradient-to-b from-gray-50 to-yellow-50">
            {step === "signup" ? (
              <>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                  Create an account
                </h2>
                {error && (
                  <div className="mb-3 text-red-500 text-sm">{error}</div>
                )}
                <form onSubmit={handleSignUpSubmit}>
                  {/* Username */}
                  <label className="mb-3 flex items-center bg-gray-100 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-300">
                    <User className="w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      className="ml-2 w-full bg-transparent focus:outline-none"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      minLength={3}
                      maxLength={50}
                    />
                  </label>

                  {/* Email */}
                  <label className="mb-3 flex items-center bg-gray-100 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-300">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="ml-2 w-full bg-transparent focus:outline-none"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  {/* Phone */}
                  <label className="mb-3 flex items-center bg-gray-100 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-300">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      className="ml-2 w-full bg-transparent focus:outline-none"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setFormData({ ...formData, phone: value });
                      }}
                      required
                      minLength={8}
                      maxLength={15}
                    />
                  </label>

                  {/* Password */}
                  <label className="mb-4 flex items-center bg-gray-100 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-300">
                    <Lock className="w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className="ml-2 w-full bg-transparent focus:outline-none"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="ml-2 text-gray-500"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </label>

                 
                  <button
                    type="submit"
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg py-3 transition"
                  >
                    Submit
                  </button>
                </form>
              </>
            ) : (
              <>
                {/* OTP Verification */}
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                  OTP Verification
                </h2>
                {error && (
                  <div className="mb-3 text-red-500 text-sm">{error}</div>
                )}
                <p className="text-sm text-gray-500 mb-6">
                  Enter the OTP sent to{" "}
                  <span className="font-medium">{formData.email}</span>
                </p>
                <form onSubmit={handleOtpSubmit}>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg py-3 transition"
                  >
                    Verify OTP
                  </button>
                </form>
              </>
            )}

            {step === "signup" && (
              <>
                <div className="flex items-center justify-center mt-6 gap-3 flex-wrap">
                  <button className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-50">
                    <Apple className="w-5 h-5" />
                    <span>Apple</span>
                  </button>
                  <button className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-50">
                    <img
                      src="https://www.svgrepo.com/show/355037/google.svg"
                      alt="Google"
                      className="w-5 h-5"
                    />
                    <span>Google</span>
                  </button>
                </div>

                <p className="mt-6 text-sm text-gray-500 text-center">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="text-yellow-600 hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
                <p className="mt-2 text-xs text-gray-400 text-center">
                  <Link to="/admin" className="text-red-500 hover:underline">
                    Admin Login
                  </Link>
                </p>
              </>
            )}
          </div>

          {/* Right: Slogan */}
          <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-200 p-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-yellow-700 mb-4">
                Your Service, Our Zhapto
              </h2>
              <p className="text-sm text-gray-700 max-w-xs mx-auto">
                Trusted professionals. Seamless experience. Rooted in Bhutanese
                values.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
