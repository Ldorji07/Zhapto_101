import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AdminLogin from "./pages/AdminLogin";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Aboutus from "./pages/Aboutus";
import Profile from "./pages/Profile"; 
import ServiceProvider from "./pages/ServiceProvider"; // 👈 Added import
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/service-provider" element={<ServiceProvider />} /> {/* 👈 New route */}

        <Route element={<ProtectedRoute role="user" />}>
          <Route path="/dashboard" element={<UserDashboard />} />
        </Route>
        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Service pages */}
        <Route path="/certified/plumber" element={<div>Plumber Service Page</div>} />
        <Route path="/certified/electrician" element={<div>Electrician Service Page</div>} />
        <Route path="/certified/carpenter" element={<div>Carpenter Service Page</div>} />
        <Route path="/certified/painter" element={<div>Painter Service Page</div>} />
        <Route path="/certified/house-shifter" element={<div>House Shifter Service Page</div>} />
        <Route path="/certified/house-cleaner" element={<div>House Cleaner Service Page</div>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
