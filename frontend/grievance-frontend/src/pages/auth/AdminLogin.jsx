import AuthCard from "../../components/auth/AuthCard";
import LoginForm from "../../components/auth/LoginForm";
import GoogleButton from "../../components/auth/GoogleButton";

function AdminLogin() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <AuthCard title="Admin Login" subtitle="Department Admin / Super Admin">
        <LoginForm />

        <div className="my-6 text-center text-gray-400">OR</div>

        <GoogleButton />
      </AuthCard>
    </div>
  );
}

export default AdminLogin;
