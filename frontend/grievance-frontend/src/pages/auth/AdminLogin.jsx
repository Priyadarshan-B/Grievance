import { useState } from "react";
import { Navigate } from "react-router-dom";

import { supabase } from "../../config/supabase";
import api from "../../api/axios";

function AdminLogin() {
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const mode = localStorage.getItem("mode");

  if (token && mode === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo:
            window.location.origin +
            "/admin/auth/callback",
        },
      });

      if (error) {
        throw error;
      }
    } catch (err) {
      alert(err.message || "Google login failed.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            AI Grievance
          </h1>

          <p className="mt-2 text-gray-500">
            Administrator Login
          </p>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium hover:bg-gray-50 disabled:opacity-50"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="h-5 w-5"
          />

          {loading
            ? "Redirecting..."
            : "Continue with Google"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          Department Admins and Super Admins only
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;