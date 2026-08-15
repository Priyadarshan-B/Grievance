import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-slate-950/60 px-6 shadow-[0_10px_30px_rgba(15,23,42,0.35)] backdrop-blur-xl">
      <div>
        <h2 className="text-lg font-semibold text-white">
          Welcome, {user?.full_name}
        </h2>

        <p className="text-sm text-slate-300">{user?.email}</p>
      </div>

      <button
        onClick={handleLogout}
        className="rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:brightness-110"
      >
        Logout
      </button>
    </header>
  );
}

export default Navbar;
