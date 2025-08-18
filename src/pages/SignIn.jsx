import React from 'react'
import Navbar from '../components/Navbar'
import { Mail, Lock } from 'lucide-react'
import { login } from '../lib/auth'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Pretend auth succeeded as regular user
    login('user')
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-gray-100 p-4">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-2">Welcome back</h2>
          <p className="text-gray-500 mb-6">Sign in to continue</p>

          {/* Email */}
          <label className="mb-3 flex items-center bg-gray-100 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-300">
            <Mail className="w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="ml-2 w-full bg-transparent focus:outline-none"
              required
            />
          </label>

          {/* Password */}
          <label className="mb-4 flex items-center bg-gray-100 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-300">
            <Lock className="w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="ml-2 w-full bg-transparent focus:outline-none"
              required
            />
          </label>

          <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg py-3 transition">
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
