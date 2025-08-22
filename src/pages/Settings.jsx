import React, { useState, useContext } from "react";
import Layout from "../components/Layout";
import { Mail, Key } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function Settings() {
  const { user, setUser } = useContext(AuthContext);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [newEmail, setNewEmail] = useState("");

  // Simulate sending OTP to current email
  const sendOtpToOldEmail = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    setGeneratedOtp(otp);
    setOtpSent(true);
    alert(`OTP sent to ${user.email}: ${otp} (simulated)`); // In real app, send via backend email
  };

  const handleEmailUpdate = () => {
    if (!otpInput) {
      alert("Please enter the OTP sent to your current email.");
      return;
    }
    if (otpInput === generatedOtp) {
      setUser((prev) => ({ ...prev, email: newEmail }));
      alert("Email updated successfully!");
      setEditingEmail(false);
      setOtpSent(false);
      setOtpInput("");
      setNewEmail("");
    } else {
      alert("Invalid OTP!");
    }
  };

  const handlePasswordUpdate = () => {
    if (currentPassword !== user.password) {
      alert("Current password is incorrect!");
      return;
    }
    if (!newPassword) {
      alert("Please enter a new password!");
      return;
    }
    setUser((prev) => ({ ...prev, password: "********" }));
    alert("Password updated successfully!");
    setEditingPassword(false);
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <Layout pageTitle="Settings">
      <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white rounded-xl shadow-lg p-8">
        <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

          {/* Quick Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => setEditingEmail(true)}
              className="flex items-center p-5 bg-white rounded-2xl shadow hover:shadow-lg hover:bg-gray-50 transition"
            >
              <Mail className="w-7 h-7 mr-4 text-blue-600" />
              <div className="text-left">
                <p className="font-semibold text-gray-800">Change Email</p>
                <p className="text-sm text-gray-500">Click to update</p>
              </div>
            </button>

            <button
              onClick={() => setEditingPassword(true)}
              className="flex items-center p-5 bg-white rounded-2xl shadow hover:shadow-lg hover:bg-gray-50 transition"
            >
              <Key className="w-7 h-7 mr-4 text-green-600" />
              <div className="text-left">
                <p className="font-semibold text-gray-800">Change Password</p>
                <p className="text-sm text-gray-500">Click to update</p>
              </div>
            </button>
          </div>

          {/* Sections */}
          <div className="mt-12 space-y-16">
            {/* Email Section */}
            {editingEmail && (
              <section className="p-6 bg-white border rounded-2xl shadow-md hover:shadow-lg transition">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Change Email</h2>

                {!otpSent ? (
                  <>
                    <p className="mb-4 text-gray-600">
                      We will send an OTP to your current email ({user.email}) to verify your identity.
                    </p>
                    <input
                      type="email"
                      placeholder="Enter new email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4"
                    />
                    <button
                      onClick={sendOtpToOldEmail}
                      className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Send OTP
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Enter OTP sent to your current email"
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4"
                    />
                    <button
                      onClick={handleEmailUpdate}
                      className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Verify OTP & Update Email
                    </button>
                  </>
                )}
              </section>
            )}

            {/* Password Section */}
            {editingPassword && (
              <section className="p-6 bg-white border rounded-2xl shadow-md hover:shadow-lg transition">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Change Password</h2>
                <input
                  type="password"
                  placeholder="Current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none mb-4"
                />
                <input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none mb-4"
                />
                <button
                  onClick={handlePasswordUpdate}
                  className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Update Password
                </button>
              </section>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
