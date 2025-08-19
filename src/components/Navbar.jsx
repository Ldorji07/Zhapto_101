import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, Menu, X } from 'lucide-react'
import { getRole, logout } from '../lib/auth'
import { motion, AnimatePresence } from 'framer-motion'

function Navbar() {
  const navigate = useNavigate()
  const role = getRole()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/signin')
    setIsOpen(false)
  }

  return (
    <nav className="w-full bg-white shadow px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img
          src="/WhatsApp Image 2025-08-18 at 09.45.30.jpeg"
          alt="Logo"
          className="w-14 h-14 rounded-full"
        />
      </Link>

      {/* Desktop menu (visible md and up) */}
      <div className="hidden md:flex items-center gap-4">
        <Link to="/signup" className="text-gray-700 hover:text-yellow-500">Sign Up</Link>
        <Link to="/signin" className="text-gray-700 hover:text-yellow-500">Sign In</Link>
        <Link to="/upload" className="text-gray-700 hover:text-yellow-500">Upload</Link>

        {role === 'user' && (
          <Link to="/dashboard" className="text-gray-700 hover:text-yellow-500">Dashboard</Link>
        )}
        {role === 'admin' && (
          <Link to="/admin/dashboard" className="text-gray-700 hover:text-yellow-500">Admin</Link>
        )}

        {role ? (
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border hover:bg-gray-50"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        ) : (
          <Link to="/admin" className="px-3 py-2 rounded-xl border hover:bg-gray-50">Admin Login</Link>
        )}
      </div>

      {/* Hamburger (mobile only) */}
      <button onClick={() => setIsOpen(true)} className="md:hidden">
        <Menu className="w-7 h-7" />
      </button>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 80, damping: 15 }}
              className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col gap-4 z-50"
            >
              <button onClick={() => setIsOpen(false)} className="self-end mb-4">
                <X className="w-6 h-6" />
              </button>

              <Link to="/signup" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-yellow-500">Sign Up</Link>
              <Link to="/signin" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-yellow-500">Sign In</Link>
              <Link to="/upload" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-yellow-500">Upload</Link>

              {role === 'user' && (
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-yellow-500">Dashboard</Link>
              )}
              {role === 'admin' && (
                <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-yellow-500">Admin</Link>
              )}

              {role ? (
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border hover:bg-gray-50"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              ) : (
                <Link to="/admin" onClick={() => setIsOpen(false)} className="px-3 py-2 rounded-xl border hover:bg-gray-50">Admin Login</Link>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
