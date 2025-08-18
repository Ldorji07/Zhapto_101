import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Mail, Lock } from 'lucide-react'
import { login } from '../lib/auth'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function SignIn() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = [
    "/bhutan-flag-on-repair-tool-concept-wooden-table-background-mechanical-service-theme-with-national-objects-2C646GE.jpg",
    "/Mechanical-e1752469691840.webp",
    "/electrician.jpg",
    "/Cleaning-1.jpg",
    "/Ever-wondered-what’s-behind-Bhutan’s-closed-doors_.webp",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000)    // 3000ms for 3 seconds, or set to 2000 for 2 seconds
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    login('user')
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center bg-gray-100 p-4 relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
          style={{ backgroundImage: "url('/butan-flag.webp')" }}
        />

        <div className="relative grid md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden max-w-5xl w-full">
          <div className="p-8 md:p-10 flex flex-col justify-center bg-gradient-to-b from-gray-50 to-yellow-50">
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">Welcome back</h2>
            <p className="text-gray-500 mb-6">Sign in to continue</p>

            <form onSubmit={handleSubmit}>
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
                />
              </label>

              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg py-3 transition">
                Sign In
              </button>
            </form>

            <div className="flex items-center justify-center mt-6 gap-3 flex-wrap">
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
              Don't have an account?{' '}
              <Link to="/signup" className="text-yellow-600 hover:underline">
                Sign up
              </Link>
            </p>
            <p className="text-xs text-gray-400 text-center mt-2">
              <Link to="/admin" className="text-red-500 hover:underline">
                Admin Login
              </Link>
            </p>
          </div>

          <div className="relative hidden md:flex items-center justify-center bg-gray-50 overflow-hidden group">
            {images.map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt="Slideshow"
                className="absolute object-cover h-full w-full transition-transform duration-1000 transform group-hover:scale-105 group-hover:brightness-90"
                animate={{ opacity: index === currentIndex ? 1 : 0 }}
                initial={false}
                transition={{ duration: 1 }}
              />
            ))}

            <div className="absolute top-6 left-6 bg-black/60 text-white text-xs md:text-sm px-3 py-2 rounded-xl shadow-soft">
              Daily Task Time <br />
              <span className="text-gray-300">09:00am — 5:00pm</span>
            </div>

            <div className="absolute bottom-8 left-6 bg-white/70 shadow-soft px-3 py-2 rounded-xl text-xs md:text-sm">
              Weekends <br />
              <span className="text-gray-500">9:00am — 01:00pm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
