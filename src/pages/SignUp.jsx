import React from 'react'
import { Apple, Mail, Lock, User } from 'lucide-react'
import Navbar from '../components/Navbar'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function SignUp() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/signin')
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar (identical to SignIn) */}
      <Navbar />

      {/* Main Section (identical bg to SignIn) */}
      <div className="flex-1 flex items-center justify-center bg-gray-100 p-4 relative">
        {/* Bhutan flag blurred background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
          style={{ backgroundImage: "url('/butan-flag.webp')" }}
        />

        {/* SignUp Card */}
        <div className="relative grid md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden max-w-5xl w-full">
          
          {/* Left: Form */}
          <div className="p-8 md:p-10 flex flex-col justify-center bg-gradient-to-b from-gray-50 to-yellow-50">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Create an account
            </h2>
            <form onSubmit={handleSubmit}>
              <label className="mb-3 flex items-center bg-gray-100 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-300">
                <User className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full name"
                  className="ml-2 w-full bg-transparent focus:outline-none"
                  required
                />
              </label>
              <label className="mb-3 flex items-center bg-gray-100 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-300">
                <Mail className="w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  className="ml-2 w-full bg-transparent focus:outline-none"
                  required
                />
              </label>
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
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg py-3 transition"
              >
                Submit
              </button>
            </form>

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
              Already have an account?{' '}
              <Link to="/signin" className="text-yellow-600 hover:underline">
                Sign in
              </Link>
            </p>
            <p className="mt-2 text-xs text-gray-400 text-center">
              <Link to="/admin" className="text-red-500 hover:underline">
                Admin Login
              </Link>
            </p>
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
                Trusted professionals. Seamless experience. Rooted in Bhutanese values.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  )
}
