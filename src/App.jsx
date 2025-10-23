import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import AdminLogin from "./pages/auth/AdminLogin";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import AdminSetting from "./pages/admin/AdminSetting"; 
import ReviewFeedback from "./pages/admin/ReviewFeedback";
import UserReview from "./pages/user/UserReview";
import AdminCommunication from "./pages/admin/AdminCommunication";
import UserAnnouncements from "./pages/user/UserAnnouncements";
import AdminReports from "./pages/admin/AdminReports";
import AdminProfile from "./pages/admin/AdminProfile";
import Profile from "./pages/user/Profile";
import ServiceProvider from "./pages/user/ServiceProvider";
import Notifications from "./pages/user/Notifications";
import Settings from "./pages/user/Settings";

// Certified Service Pages
import Plumber from "./pages/certified/Plumber";
import Electrician from "./pages/certified/Electrician";
import Carpenter from "./pages/certified/Carpenter";
import Painter from "./pages/certified/Painter";
import HouseShifter from "./pages/certified/HouseShifter";
import HouseCleaner from "./pages/certified/HouseCleaner";

// About Us Page
import Aboutus from "./pages/auth/Aboutus"; // ✅ Added this import

// Components
import ProtectedRoute from "./components/ProtectedRoute";

// Context Providers
import { UserProvider } from "./context/UserContext";
import { ServiceProviderProvider } from "./context/ServiceProviderContext";
import { AnnouncementProvider } from "./context/AnnouncementContext";
import { ReviewProvider } from "./context/ReviewContext";

function App() {
  return (
    <UserProvider>
      <ServiceProviderProvider>
        <AnnouncementProvider>
          <ReviewProvider>
            <Router>
              <Navbar />
              <Routes>
                {/* Landing Page */}
                <Route path="/" element={<UserDashboard preLogin={true} />} />

                {/* About Us Page */}
                <Route path="/aboutus" element={<Aboutus />} /> {/* ✅ Added this route */}

                {/* Auth Pages */}
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* User Pages */}
                <Route path="/UserDashboard" element={<UserDashboard preLogin={false} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/service-provider" element={<ServiceProvider />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/reviews" element={<UserReview />} />
                <Route path="/announcements" element={<UserAnnouncements />} />

                {/* Certified Services */}
                <Route path="/certified/plumber" element={<Plumber />} />
                <Route path="/certified/electrician" element={<Electrician />} />
                <Route path="/certified/carpenter" element={<Carpenter />} />
                <Route path="/certified/painter" element={<Painter />} />
                <Route path="/certified/house-shifter" element={<HouseShifter />} />
                <Route path="/certified/house-cleaner" element={<HouseCleaner />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<Navigate to="/admin/login" />} />
                <Route element={<ProtectedRoute role="admin" />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<Users />} />
                  <Route path="/admin/settings" element={<AdminSetting />} /> 
                  <Route path="/admin/reviews" element={<ReviewFeedback />} />
                  <Route path="/admin/communication" element={<AdminCommunication />} />
                  <Route path="/admin/reports" element={<AdminReports />} />
                  <Route path="/admin/profile" element={<AdminProfile />} />
                </Route>

                {/* Catch All */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Router>
          </ReviewProvider>
        </AnnouncementProvider>
      </ServiceProviderProvider>
    </UserProvider>
  );
}

export default App;
