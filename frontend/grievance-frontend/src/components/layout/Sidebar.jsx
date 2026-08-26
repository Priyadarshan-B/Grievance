import {
  FileText,
  LayoutDashboard,
  PlusCircle,
  ShieldCheck,
  User,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/user/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "New Grievance",
    path: "/user/grievance/new",
    icon: PlusCircle,
  },
  {
    name: "My Grievances",
    path: "/user/grievances",
    icon: FileText,
  },
  {
    name: "Profile",
    path: "/user/profile",
    icon: User,
  },
];

function Sidebar() {
  return (
    <aside className="flex w-72 shrink-0 flex-col border-r border-cyan-400/15 bg-gradient-to-b from-[#111827] via-[#0F172A] to-[#0B0F19] shadow-[12px_0_40px_rgba(2,8,23,0.45)]">
      <div className="border-b border-[#334155] px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/40 bg-cyan-500/15 text-cyan-200 shadow-lg shadow-cyan-500/10">
            <ShieldCheck size={23} />
          </div>

          <div>
            <h2 className="text-lg font-bold tracking-tight text-white">
              AI Grievance
            </h2>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-300/80">
              Citizen portal
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          Workspace
        </p>
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "border-l-2 border-cyan-300 bg-gradient-to-r from-cyan-500/20 to-cyan-500/5 text-cyan-200 shadow-lg shadow-cyan-500/10"
                    : "border-l-2 border-transparent text-slate-400 opacity-70 hover:bg-slate-800/80 hover:text-white hover:opacity-100"
                }`
              }
            >
              <Icon size={20} className="transition-transform duration-300 group-hover:scale-110" />

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

    </aside>
  );
}

export default Sidebar;
