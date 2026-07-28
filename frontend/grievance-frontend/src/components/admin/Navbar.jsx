import { Bell } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

function Navbar() {
  const { user } = useAuth();

  const adminName = user?.name || user?.full_name || user?.username || "Admin";

  const department =
    user?.department_name || user?.department || user?.role || "Department";

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h2 className="text-xl font-semibold">Department Admin Portal</h2>

      <div className="flex items-center gap-5">
        <button className="relative">
          <Bell size={22} />
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="text-right">
          <h4 className="font-semibold">{adminName}</h4>
          <p className="text-sm text-gray-500">{department}</p>
        </div>

        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            adminName,
          )}&background=2563eb&color=fff`}
          alt="profile"
          className="h-10 w-10 rounded-full"
        />
      </div>
    </header>
  );
}

export default Navbar;
