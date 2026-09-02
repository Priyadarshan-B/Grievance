import { motion } from "framer-motion";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import { supabase } from "../../config/supabase";

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
          redirectTo: window.location.origin + "/admin/auth/callback",
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
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#1e293b_0%,_#0f172a_40%,_#020817_100%)] px-4 py-10 text-slate-100">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/70 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.7)] backdrop-blur-xl"
      >
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-violet-500/20 blur-2xl" />

        <div className="relative z-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-500/10 text-2xl shadow-lg shadow-blue-500/20">
              🛡️
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white">
              AI Grievance
            </h1>

            <p className="mt-2 text-sm font-medium text-slate-300">
              Administrator Login
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleGoogleLogin}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-600 bg-white px-4 py-3.5 font-semibold text-slate-900 shadow-lg shadow-slate-950/30 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="h-5 w-5"
            />

            {loading ? "Redirecting..." : "Continue with Google"}
          </motion.button>

          <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-slate-800/60 p-4 text-center">
            <p className="text-sm text-slate-300">
              Department Admins and Super Admins only
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AdminLogin;