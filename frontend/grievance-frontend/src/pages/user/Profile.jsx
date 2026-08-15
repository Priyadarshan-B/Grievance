import {
  User,
  Mail,
  Building2,
  Calendar,
  ShieldCheck,
  Star,
  Flag,
  AlertTriangle,
  Bot,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";

function Profile() {
  const { user } = useAuth();

  const trustScore = user?.trust_score ?? 0;

  const trustColor =
    trustScore >= 80
      ? "bg-gradient-to-r from-emerald-500 to-green-500"
      : trustScore >= 50
        ? "bg-gradient-to-r from-yellow-500 to-amber-500"
        : "bg-gradient-to-r from-red-500 to-rose-500";

  const trustStatus =
    trustScore >= 80 ? "Excellent" : trustScore >= 50 ? "Fair" : "Low";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#020817_0%,#0f172a_18%,#111827_32%,#1e3a8a_62%,#312e81_100%)]">
      <div className="absolute -top-20 left-0 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-6 p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/60 bg-white/10 p-5 shadow-[0_20px_60px_rgba(59,130,246,0.12)] backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/20">
              <User size={22} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">My Profile</h1>
              <p className="mt-1 text-sm text-slate-200">
                View your profile and AI account health.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-3xl border border-white/15 bg-slate-950/40 shadow-[0_30px_80px_rgba(15,23,42,0.6)] backdrop-blur-xl"
        >
          <div className="flex flex-col items-center gap-5 border-b border-white/10 p-8 md:flex-row">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-4xl font-bold text-white shadow-lg shadow-cyan-500/30">
              {user?.full_name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">{user?.full_name}</h2>
              <p className="text-slate-300">{user?.email}</p>
              <span className="mt-3 inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm font-medium capitalize text-cyan-200">
                {user?.role?.replace("_", " ")}
              </span>
            </div>
          </div>

          <div className="grid gap-6 p-8 md:grid-cols-2">
            <InfoCard
              icon={<User size={20} />}
              title="Full Name"
              value={user?.full_name}
            />

            <InfoCard
              icon={<Mail size={20} />}
              title="Email"
              value={user?.email}
            />

            <InfoCard
              icon={<Building2 size={20} />}
              title="Department"
              value={user?.department_name || "-"}
            />

            <InfoCard
              icon={<ShieldCheck size={20} />}
              title="Role"
              value={user?.role?.replace("_", " ")}
            />

            <InfoCard
              icon={<Calendar size={20} />}
              title="Account Status"
              value={user?.is_active ? "Active" : "Suspended"}
            />

            <InfoCard
              icon={<Calendar size={20} />}
              title="Joined"
              value={
                user?.created_at
                  ? new Date(user.created_at).toLocaleDateString()
                  : "-"
              }
            />
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/15 bg-slate-950/40 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.6)] backdrop-blur-xl lg:col-span-2">
            <div className="mb-4 flex items-center gap-2 text-white">
              <Star className="text-yellow-400" />
              <h2 className="text-xl font-semibold">AI Trust Score</h2>
            </div>

            <div className="mb-2 flex items-center justify-between">
              <span className="text-4xl font-bold text-white">{trustScore}</span>
              <span className="font-semibold text-slate-200">{trustStatus}</span>
            </div>

            <div className="h-4 overflow-hidden rounded-full bg-slate-800">
              <div
                className={`h-full ${trustColor}`}
                style={{
                  width: `${trustScore}%`,
                }}
              />
            </div>

            <p className="mt-4 text-sm text-slate-300">
              Your trust score is calculated using AI analysis of submitted
              grievances. Genuine grievances improve your score while spam,
              abusive or repeated false complaints reduce it.
            </p>
          </div>

          <div className="space-y-4">
            <SmallCard
              icon={<Flag className="text-red-400" />}
              title="AI Flags"
              value={user?.ai_flag_count ?? 0}
            />

            <SmallCard
              icon={<AlertTriangle className="text-yellow-400" />}
              title="Warnings"
              value={user?.warning_count ?? 0}
            />

            <SmallCard
              icon={<ShieldCheck className="text-emerald-400" />}
              title="Status"
              value={user?.is_active ? "Active" : "Suspended"}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-cyan-400/20 bg-[linear-gradient(135deg,rgba(14,116,144,0.2),rgba(59,130,246,0.1),rgba(15,23,42,0.6))] p-6 shadow-[0_20px_60px_rgba(34,211,238,0.08)] backdrop-blur-xl">
          <div className="mb-3 flex items-center gap-2 text-cyan-200">
            <Bot className="text-cyan-300" />
            <h2 className="text-lg font-semibold">AI Account Evaluation</h2>
          </div>

          <p className="leading-7 text-slate-200">
            {trustScore >= 80 &&
              "Excellent account standing. Your grievance submissions appear genuine and trustworthy."}

            {trustScore >= 50 &&
              trustScore < 80 &&
              "Your account is in fair standing. Continue submitting genuine grievances to improve your trust score."}

            {trustScore < 50 &&
              "Your trust score is low because previous submissions were flagged as spam, abusive or questionable. Future submissions will be reviewed more carefully."}
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-inner shadow-slate-950/30">
      <div className="mb-2 flex items-center gap-2 text-cyan-300">
        {icon}
        <span className="font-medium text-slate-200">{title}</span>
      </div>

      <p className="text-lg font-semibold text-white">{value || "-"}</p>
    </div>
  );
}

function SmallCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-5 shadow-[0_20px_45px_rgba(15,23,42,0.45)] backdrop-blur-xl">
      <div className="mb-2 flex items-center gap-2 text-slate-200">
        {icon}
        <span className="font-medium">{title}</span>
      </div>

      <div className="text-3xl font-bold text-white">{value}</div>
    </div>
  );
}

export default Profile;
