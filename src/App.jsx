import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import AdminLogin from './pages/AdminLogin'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Upload from './pages/Upload'
import Aboutus from './pages/Aboutus' // 👈 import About Us
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/aboutus" element={<Aboutus />} /> {/* 👈 About Us route */}

        <Route element={<ProtectedRoute role="user" />}>
          <Route path="/dashboard" element={<UserDashboard />} />
        </Route>

        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
