import { Routes, Route, Navigate } from "react-router-dom";

import GuestRoute from "./GuestRoute";
import UserRoute from "./UserRoute";
import AdminRoute from "./AdminRoute";

import Login from "../pages/auth/Login";
import AdminLogin from "../pages/auth/AdminLogin";

import UserLayout from "../layouts/UserLayout";

import UserDashboard from "../pages/user/UserDashboard";
import MyGrievances from "../pages/user/MyGrievances";
import NewGrievance from "../pages/user/NewGrievance";
import Profile from "../pages/user/Profile";

import AdminDashboard from "../pages/admin/AdminDashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />

      <Route
        path="/admin/login"
        element={
          <GuestRoute>
            <AdminLogin />
          </GuestRoute>
        }
      />

      <Route
        path="/user"
        element={
          <UserRoute>
            <UserLayout />
          </UserRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<UserDashboard />} />

        <Route path="grievances" element={<MyGrievances />} />

        <Route path="grievance/new" element={<NewGrievance />} />

        <Route path="profile" element={<Profile />} />
      </Route>

      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default AppRoutes;
