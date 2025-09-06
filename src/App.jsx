import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import AdminLogin from "./pages/auth/AdminLogin";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import AdminSetting from "./pages/admin/AdminSetting"; // ✅ Correct file name
import ReviewFeedback from "./pages/admin/ReviewFeedback";
import UserReview from "./pages/user/UserReview";
import AdminCommunication from "./pages/admin/AdminCommunication";
import UserAnnouncements from "./pages/user/UserAnnouncements";
import AdminReports from "./pages/admin/AdminReports";
import AdminProfile from "./pages/admin/AdminProfile";
import Aboutus from "./pages/auth/Aboutus";
import Profile from "./pages/user/Profile";
import ServiceProvider from "./pages/user/ServiceProvider";
import Notifications from "./pages/user/Notifications";
import Settings from "./pages/user/Settings";

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
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Navigate to="/signup" />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/aboutus" element={<Aboutus />} />
                <Route path="/UserDashboard" element={<UserDashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/service-provider" element={<ServiceProvider />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/reviews" element={<UserReview />} />
                <Route path="/announcements" element={<UserAnnouncements />} />

                {/* Redirect /admin to login */}
                <Route path="/admin" element={<Navigate to="/admin/login" />} />

                {/* Protected Admin Routes */}
                <Route element={<ProtectedRoute role="admin" />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<Users />} />
                  <Route path="/admin/settings" element={<AdminSetting />} /> {/* ✅ Correct */}
                  <Route path="/admin/reviews" element={<ReviewFeedback />} />
                  <Route path="/admin/communication" element={<AdminCommunication />} />
                  <Route path="/admin/reports" element={<AdminReports />} />
                  <Route path="/admin/profile" element={<AdminProfile />} />
                </Route>

                {/* Catch-all redirect */}
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
