import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ role }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
