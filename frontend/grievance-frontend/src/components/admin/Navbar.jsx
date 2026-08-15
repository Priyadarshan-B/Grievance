import { Bell } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

function Navbar() {
  const { user } = useAuth();

  const adminName = user?.name || user?.full_name || user?.username || "Admin";

  const department =
    user?.department_name || user?.department || user?.role || "Department";

  return (
    <header className="bg-slate-950 px-6 py-3 shadow-none">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 shadow-lg shadow-blue-500/30">
            <span className="text-lg font-black text-white">DA</span>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-300">
              Welcome
            </p>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Department Admin
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <button className="relative rounded-full bg-slate-900 p-2.5 text-slate-200 transition hover:bg-slate-800 hover:text-cyan-300">
            <Bell size={18} />
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-slate-950"></span>
          </button>

          <div className="text-right">
            <h4 className="text-sm font-semibold text-white">{adminName}</h4>
            <p className="text-xs text-slate-300">{department}</p>
          </div>

          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              adminName,
            )}&background=0ea5e9&color=fff`}
            alt="profile"
            className="h-10 w-10 rounded-full shadow-md shadow-cyan-500/20"
          />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
