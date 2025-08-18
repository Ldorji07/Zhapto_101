import React from 'react'
import { motion } from 'framer-motion'
import { Apple, Mail, Lock, User } from 'lucide-react'
import Navbar from '../components/Navbar'
import { useNavigate, Link } from 'react-router-dom'

export default function SignUp() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Just navigate to sign in for this demo
    navigate('/signin')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-gray-100 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden max-w-5xl w-full"
        >
          {/* Left Form Section */}
          <div className="p-8 md:p-10 flex flex-col justify-center bg-gradient-to-b from-gray-50 to-yellow-50">
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">Create an account</h2>
            

            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <label className="mb-3 flex items-center bg-gray-100 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-300">
                <User className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full name"
                  className="ml-2 w-full bg-transparent focus:outline-none"
                  required
                />
              </label>

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
                  minLength={6}
                />
              </label>

              {/* Submit */}
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg py-3 transition">
                Submit
              </button>
            </form>

            {/* Social Logins */}
            <div className="flex items-center justify-center mt-6 gap-3 flex-wrap">
              <button className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-50">
                <Apple className="w-5 h-5" /> <span>Apple</span>
              </button>
              <button className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-50">
                <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
                <span>Google</span>
              </button>
            </div>

            <p className="mt-6 text-sm text-gray-500 text-center">
              Have any account? <Link to="/signin" className="text-yellow-600 hover:underline">Sign in</Link>
            </p>
            <p className="text-xs text-gray-400 text-center mt-2">
              <Link to="/admin" className="text-red-500 hover:underline">Admin Login</Link>
            </p>
          </div>

          {/* Right Image Section */}
          <div className="relative hidden md:flex items-center justify-center bg-gray-50">
            <img
              src="https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=1400&q=80"
              alt="Team work"
              className="object-cover h-full w-full"
            />

            {/* Overlay card */}
            <div className="absolute top-6 left-6 bg-black/90 text-white text-xs md:text-sm px-3 py-2 rounded-xl shadow-soft">
              Daily Task Time <br />
              <span className="text-gray-300">09:00am — 5:00pm</span>
            </div>

            <div className="absolute bottom-8 left-6 bg-white shadow-soft px-3 py-2 rounded-xl text-xs md:text-sm">
              Weekends <br />
              <span className="text-gray-500">9:00am — 01:00pm</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
