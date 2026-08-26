import { Mail, ShieldCheck, Building2, Calendar, User } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0B0F19] px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-3xl border border-violet-400/30 border-t-2 border-t-violet-400/80 bg-gradient-to-br from-violet-950/65 via-[#1E293B] to-cyan-950/30 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.55)]">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">
            Profile
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white">
            My Profile
          </h1>
          <p className="mt-1 text-sm text-slate-300">
            View your account information and access details.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-cyan-400/25 border-t-2 border-t-cyan-400/80 bg-gradient-to-br from-cyan-950/35 via-[#1E293B] to-violet-950/25 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col items-center gap-4 border-b border-[#334155] bg-gradient-to-r from-cyan-950/70 via-slate-800/80 to-violet-950/60 p-8 md:flex-row">
            <img
              src={
                user?.avatar_url ||
                "https://ui-avatars.com/api/?name=Admin&background=0ea5e9&color=fff"
              }
              alt="profile"
              className="h-28 w-28 rounded-full border-4 border-cyan-400/60 object-cover shadow-lg shadow-cyan-500/20"
            />

            <div>
              <h2 className="text-2xl font-bold text-white">
                {user?.full_name || "Administrator"}
              </h2>

              <p className="mt-1 text-slate-300">{user?.email}</p>

              <span className="mt-3 inline-flex rounded-full border border-cyan-300/30 bg-cyan-500/15 px-3 py-1 text-sm font-semibold text-cyan-100 shadow-lg shadow-cyan-500/20">
                {user?.role === "super_admin"
                  ? "Super Admin"
                  : "Department Admin"}
              </span>
            </div>
          </div>

          <div className="grid gap-6 border-t border-[#334155] p-8 md:grid-cols-2">
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
    </div>
  );
}

function InfoCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-950/35 to-slate-800/80 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.3)] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-xl">
      <div className="mb-3 flex items-center gap-2 text-cyan-300">
        {icon}
        <span className="font-medium text-slate-200">{title}</span>
      </div>

      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

export default Profile;
