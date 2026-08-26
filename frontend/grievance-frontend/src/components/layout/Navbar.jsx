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
    <header className="flex h-20 items-center justify-between border-b border-[#334155] bg-[#111827]/90 px-6 shadow-[0_10px_30px_rgba(2,8,23,0.35)] backdrop-blur-xl">
      <div>
        <h2 className="text-lg font-semibold text-white">
          Welcome, {user?.full_name}
        </h2>

        <p className="text-sm text-slate-400">{user?.email}</p>
      </div>

      <button
        onClick={handleLogout}
        className="rounded-xl border border-rose-400/30 bg-gradient-to-r from-rose-500/90 to-red-500/90 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition hover:-translate-y-0.5 hover:brightness-110"
      >
        Logout
      </button>
    </header>
  );
}

export default Navbar;
