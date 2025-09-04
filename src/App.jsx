import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AdminLogin from "./pages/AdminLogin";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Aboutus from "./pages/Aboutus";
import Profile from "./pages/Profile"; 
import ServiceProvider from "./pages/ServiceProvider"; 
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";

import { UserProvider } from "./context/UserContext";
import { ServiceProviderProvider } from "./context/ServiceProviderContext";

function App() {
  return (
    <UserProvider>
      <ServiceProviderProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/signup" />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/UserDashboard" element={<UserDashboard />} />
            <Route path="/profile" element={<Profile />} /> 
            <Route path="/service-provider" element={<ServiceProvider />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />

            {/* Protected routes */}
   <Route path="/admin/login" element={<AdminLogin />} />
<Route path="/admin" element={<Navigate to="/admin/login" />} />

<Route element={<ProtectedRoute role="admin" />}>
  <Route path="/admin/dashboard" element={<AdminDashboard />} />
</Route>


            {/* Service pages (example placeholders) */}
            <Route path="/certified/plumber" element={<div>Plumber Service Page</div>} />
            <Route path="/certified/electrician" element={<div>Electrician Service Page</div>} />
            <Route path="/certified/carpenter" element={<div>Carpenter Service Page</div>} />
            <Route path="/certified/painter" element={<div>Painter Service Page</div>} />
            <Route path="/certified/house-shifter" element={<div>House Shifter Service Page</div>} />
            <Route path="/certified/house-cleaner" element={<div>House Cleaner Service Page</div>} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </ServiceProviderProvider>
    </UserProvider>
  );
}

export default App;
