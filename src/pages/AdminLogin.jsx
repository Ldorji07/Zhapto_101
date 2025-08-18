import React from 'react'
import Navbar from '../components/Navbar'
import { Mail, Lock } from 'lucide-react'
import { login } from '../lib/auth'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Pretend auth succeeded as admin
    login('admin')
    navigate('/admin/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-gray-100 p-4">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-2 text-center">Admin Login</h2>
          <p className="text-gray-500 mb-6 text-center">Restricted access for admins only</p>

          {/* Email */}
          <label className="mb-3 flex items-center bg-gray-100 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-red-300">
            <Mail className="w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Admin Email"
              className="ml-2 w-full bg-transparent focus:outline-none"
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
              required
            />
          </label>

          <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg py-3 transition">
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  )
}
