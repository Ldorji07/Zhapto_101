import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, Menu, X, Home } from "lucide-react";
import { logout } from "../lib/auth";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../context/UserContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const role = user?.role || null;

  // ✅ Show Navbar only on public routes and admin login page (NOT inside admin panel)
  const allowedRoutes = ["/", "/signin", "/signup", "/aboutus", "/admin/login"];
  const isAllowed = allowedRoutes.includes(location.pathname);

  if (!isAllowed) return null;

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/signin");
    setIsOpen(false);
  };

  return (
    <nav className="w-full bg-white shadow px-6 py-4 flex items-center justify-between fixed top-0 z-50">
      {/* Left: Hamburger + Home */}
      <div className="flex items-center gap-4">
        <button onClick={() => setIsOpen(true)}>
          <Menu className="w-7 h-7 text-gray-800" />
        </button>

        <button
          className="flex items-center gap-1 text-gray-800 hover:text-yellow-500 font-semibold"
          onClick={() => navigate("/")}
        >
          <Home className="w-6 h-6" /> Home
        </button>
      </div>

      {/* Right: Logo only (links to About Us) */}
      <Link to="/aboutus">
        <img
          src="/WhatsApp Image 2025-08-18 at 09.45.30.jpeg"
          alt="Logo"
          className="w-11 h-11 rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/44x44.png?text=Logo";
          }}
        />
      </Link>

      {/* Slide-in menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col gap-4 z-50"
            >
              <button onClick={() => setIsOpen(false)} className="self-end mb-4">
                <X className="w-6 h-6" />
              </button>

              {/* Public Menu (no user logged in) */}
              {!role && (
                <>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-700 hover:text-yellow-500"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/signin"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-700 hover:text-yellow-500"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/admin/login"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-700 hover:text-yellow-500"
                  >
                    Admin Login
                  </Link>
                </>
              )}

              {/* User Dashboard Menu */}
              {role === "user" && (
                <>
                  <Link
                    to="/UserDashboard"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-700 hover:text-yellow-500"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border hover:bg-gray-50"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              )}

              {/* Admin Dashboard Menu */}
              {role === "admin" && (
                <>
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-700 hover:text-yellow-500"
                  >
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border hover:bg-gray-50"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
