import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LockKeyhole, UserRound } from "lucide-react";

import { useLogin } from "../../hooks/useLogin";
import { useAuth } from "../../contexts/AuthContext";

function LoginForm() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        const { token, user } = response.data;

        const mode = user.role === "user" ? "user" : "user";

        login({
          token,
          user,
          mode,
        });

        toast.success(response.message);

        navigate(mode === "admin" ? "/admin/dashboard" : "/user");

        reset();
      },

      onError: (error) => {
        toast.error(error?.response?.data?.message || "Login Failed");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-200">Username</label>

        <div className="relative">
          <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            {...register("username")}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 py-3 pl-10 pr-3 text-white placeholder:text-slate-400 outline-none transition duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
            placeholder="Enter Username"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-200">Password</label>

        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="password"
            {...register("password")}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 py-3 pl-10 pr-3 text-white placeholder:text-slate-400 outline-none transition duration-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20"
            placeholder="Enter Password"
          />
        </div>
      </div>

      <button
        disabled={isPending}
        className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 py-3.5 text-sm font-semibold text-white shadow-[0_20px_35px_rgba(59,130,246,0.45)] transition duration-200 hover:scale-[1.01] hover:shadow-[0_24px_40px_rgba(99,102,241,0.5)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;
