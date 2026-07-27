import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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

        const mode = user.role === "user" ? "user" : "user"; // Temporary

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
      <div>
        <label className="block mb-2">Username</label>

        <input
          {...register("username")}
          className="w-full border rounded-lg p-3"
          placeholder="Enter Username"
        />
      </div>

      <div>
        <label className="block mb-2">Password</label>

        <input
          type="password"
          {...register("password")}
          className="w-full border rounded-lg p-3"
          placeholder="Enter Password"
        />
      </div>

      <button
        disabled={isPending}
        className="w-full bg-blue-600 text-white rounded-lg py-3"
      >
        {isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;
