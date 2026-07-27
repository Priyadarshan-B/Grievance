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
    <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
      <div className="h-16 flex items-center justify-center border-b">
        <h2 className="text-xl font-bold text-blue-600">AI Grievance</h2>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
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
