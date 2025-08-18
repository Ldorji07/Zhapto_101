import { Link, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { getRole, logout } from '../lib/auth'

export default function Navbar() {
  const navigate = useNavigate()
  const role = getRole()

  const handleLogout = () => {
    logout()
    navigate('/signin')
  }

  return (
    <nav className="w-full bg-white shadow px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center space-x-2">
        {/* Logo image */}
        <img
          src="/WhatsApp Image 2025-08-18 at 09.45.30.jpeg"
          alt="Logo"
          className="w-14 h-14 rounded-full"
        />
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/signup" className="hidden sm:inline text-gray-700 hover:text-yellow-500">Sign Up</Link>
        <Link to="/signin" className="hidden sm:inline text-gray-700 hover:text-yellow-500">Sign In</Link>
        <Link to="/upload" className="text-gray-700 hover:text-yellow-500">Upload</Link>
        {role === 'user' && (
          <Link to="/dashboard" className="text-gray-700 hover:text-yellow-500">Dashboard</Link>
        )}
        {role === 'admin' && (
          <Link to="/admin/dashboard" className="text-gray-700 hover:text-yellow-500">Admin</Link>
        )}

        {role ? (
          <button onClick={handleLogout} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border hover:bg-gray-50">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        ) : (
          <Link to="/admin" className="px-3 py-2 rounded-xl border hover:bg-gray-50">Admin Login</Link>
        )}
      </div>
    </nav>
  )
}
