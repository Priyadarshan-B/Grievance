import {
  LayoutDashboard,
  ClipboardList,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../config/supabase";

const menus = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    name: "Grievances",
    icon: ClipboardList,
    path: "/admin/grievances",
  },
  {
    name: "Profile",
    icon: User,
    path: "/admin/profile",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error(error);
    }

    logout();

    navigate("/admin/login", {
      replace: true,
    });
  };

  return (
    <aside className="relative w-64 bg-slate-900 text-white">
      <div className="border-b border-slate-700 p-5">
        <h1 className="text-xl font-bold">
          {user?.role === "super_admin" ? "Admin" : "Department Admin"}
        </h1>
      </div>

      <nav className="mt-4">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.name}
              to={menu.path}
              className={({ isActive }) =>
                `mx-2 mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive ? "bg-blue-600" : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              {menu.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="absolute bottom-5 w-full px-2">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-red-600"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
