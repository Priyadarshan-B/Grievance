import { Mail, ShieldCheck, Building2, Calendar, User } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">My Profile</h1>

        <p className="mt-1 text-slate-500">View your account information.</p>
      </div>

      <div className="rounded-xl bg-white shadow border border-slate-200">
        <div className="flex flex-col items-center gap-4 border-b p-8 md:flex-row">
          <img
            src={
              user?.avatar_url ||
              "https://ui-avatars.com/api/?name=Admin&background=2563eb&color=fff"
            }
            alt="profile"
            className="h-28 w-28 rounded-full border-4 border-blue-100 object-cover"
          />

          <div>
            <h2 className="text-2xl font-semibold">
              {user?.full_name || "Administrator"}
            </h2>

            <p className="text-slate-500">{user?.email}</p>

            <span className="mt-3 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              {user?.role === "super_admin"
                ? "Super Admin"
                : "Department Admin"}
            </span>
          </div>
        </div>

        <div className="grid gap-6 p-8 md:grid-cols-2">
          <InfoCard
            icon={<User size={20} />}
            title="Full Name"
            value={user?.full_name || "-"}
          />

          <InfoCard
            icon={<Mail size={20} />}
            title="Email"
            value={user?.email || "-"}
          />

          <InfoCard
            icon={<ShieldCheck size={20} />}
            title="Role"
            value={user?.role || "-"}
          />

          <InfoCard
            icon={<Building2 size={20} />}
            title="Department"
            value={user?.department_name || "All Departments"}
          />

          <InfoCard
            icon={<Calendar size={20} />}
            title="Account Status"
            value="Active"
          />

          <InfoCard
            icon={<Calendar size={20} />}
            title="Authentication"
            value="Google OAuth"
          />
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, value }) {
  return (
    <div className="rounded-lg border border-slate-200 p-5">
      <div className="mb-3 flex items-center gap-2 text-blue-600">
        {icon}
        <span className="font-medium">{title}</span>
      </div>

      <p className="text-lg font-semibold text-slate-700">{value}</p>
    </div>
  );
}

export default Profile;
