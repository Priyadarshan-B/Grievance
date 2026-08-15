import { LayoutDashboard, FileText, PlusCircle, User } from "lucide-react";

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
    <aside className="flex w-64 flex-col border-r border-white/10 bg-slate-950/70 shadow-[0_0_30px_rgba(15,23,42,0.6)] backdrop-blur-xl">
      <div className="flex h-16 items-center justify-center border-b border-white/10 px-4">
        <h2 className="text-xl font-bold text-cyan-300">AI Grievance</h2>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                    : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                }`
              }
            >
              <Icon size={20} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
