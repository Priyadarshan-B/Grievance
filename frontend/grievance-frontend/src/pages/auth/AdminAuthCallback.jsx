import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";
import { supabase } from "../../config/supabase";
import { useAuth } from "../../contexts/AuthContext";

function AdminAuthCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const completeLogin = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          navigate("/admin/login", { replace: true });
          return;
        }

        const response = await api.post("/auth/admin/google", {
          access_token: session.access_token,
        });

        const { token, user, mode } = response.data.data;

        login({
          token,
          user,
          mode,
        });

        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        navigate("/admin/dashboard", {
          replace: true,
        });
      } catch (err) {
        console.error(err);

        alert(err.response?.data?.message || "Login failed.");

        await supabase.auth.signOut();

        await supabase.auth.signOut();

        login({
          token: null,
          user: null,
          mode: null,
        });

        navigate("/admin/login", {
          replace: true,
        });
      }
    };

    completeLogin();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="rounded-xl bg-white p-8 shadow-xl">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

          <h2 className="text-xl font-semibold">Signing you in...</h2>

          <p className="text-gray-500">
            Please wait while we verify your account.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminAuthCallback;
