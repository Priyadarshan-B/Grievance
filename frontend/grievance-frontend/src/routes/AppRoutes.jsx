import { Routes, Route, Navigate } from "react-router-dom";

import GuestRoute from "./GuestRoute";
import UserRoute from "./UserRoute";
import AdminRoute from "./AdminRoute";

import Login from "../pages/auth/Login";
import AdminLogin from "../pages/auth/AdminLogin";
import AdminAuthCallback from "../pages/auth/AdminAuthCallback";

import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

import UserDashboard from "../pages/user/UserDashboard";
import MyGrievances from "../pages/user/MyGrievances";
import NewGrievance from "../pages/user/NewGrievance";
import UserGrievanceDetails from "../pages/user/GrievanceDetails";
import AdminGrievanceDetails from "../pages/admin/GrievanceDetails";
import Profile from "../pages/user/Profile";

import AdminDashboard from "../pages/admin/AdminDashboard";
import Departments from "../pages/admin/Departments";
import Categories from "../pages/admin/Categories";
import DepartmentGrievances from "../pages/admin/DepartmentGrievances";

import AdminProfile from "../pages/admin/Profile";
import AdminSettings from "../pages/admin/Settings";

function AppRoutes() {
  return (
    <Routes>
      {/* Guest Routes */}

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

      <Route path="/admin/auth/callback" element={<AdminAuthCallback />} />

      {/* User Routes */}

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

        <Route path="grievances/:id" element={<UserGrievanceDetails />} />

        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Admin Routes */}

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<AdminDashboard />} />

        <Route path="departments" element={<Departments />} />

        <Route path="categories" element={<Categories />} />

        <Route path="grievances" element={<DepartmentGrievances />} />
        <Route path="grievances/:id" element={<AdminGrievanceDetails />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default AppRoutes;
