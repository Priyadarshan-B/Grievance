import { Mail, ShieldCheck, Building2, Calendar, User } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),transparent_28%),linear-gradient(135deg,#020817_0%,#0f172a_22%,#111827_48%,#1f2937_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet-400/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl space-y-6">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.35)] backdrop-blur-xl">
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

        <div className="overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-900/70 shadow-[0_18px_45px_rgba(15,23,42,0.28)] backdrop-blur-xl">
          <div className="flex flex-col items-center gap-4 border-b border-slate-700 bg-gradient-to-r from-slate-800/80 via-sky-900/60 to-violet-900/50 p-8 md:flex-row">
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

              <span className="mt-3 inline-flex rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20">
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
    </div>
  );
}

function InfoCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800/80 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.16)]">
      <div className="mb-3 flex items-center gap-2 text-cyan-300">
        {icon}
        <span className="font-medium text-slate-200">{title}</span>
      </div>

      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

export default Profile;
