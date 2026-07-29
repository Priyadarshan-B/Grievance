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
import { useAuth } from "../../contexts/AuthContext";

function Profile() {
  const { user } = useAuth();

  const trustScore = user?.trust_score ?? 0;

  const trustColor =
    trustScore >= 80
      ? "bg-green-500"
      : trustScore >= 50
        ? "bg-yellow-500"
        : "bg-red-500";

  const trustStatus =
    trustScore >= 80 ? "Excellent" : trustScore >= 50 ? "Fair" : "Low";

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">My Profile</h1>

        <p className="mt-1 text-slate-500">
          View your profile and AI account health.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow">
        <div className="flex flex-col items-center gap-5 border-b p-8 md:flex-row">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-600 text-4xl font-bold text-white">
            {user?.full_name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <h2 className="text-2xl font-bold">{user?.full_name}</h2>

            <p className="text-slate-500">{user?.email}</p>

            <span className="mt-3 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 capitalize">
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
      </div>

      {/* AI Dashboard */}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border bg-white p-6 shadow lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <Star className="text-yellow-500" />

            <h2 className="text-xl font-semibold">AI Trust Score</h2>
          </div>

          <div className="mb-2 flex items-center justify-between">
            <span className="text-4xl font-bold">{trustScore}</span>

            <span className="font-semibold text-slate-600">{trustStatus}</span>
          </div>

          <div className="h-4 overflow-hidden rounded-full bg-slate-200">
            <div
              className={`h-full ${trustColor}`}
              style={{
                width: `${trustScore}%`,
              }}
            />
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Your trust score is calculated using AI analysis of submitted
            grievances. Genuine grievances improve your score while spam,
            abusive or repeated false complaints reduce it.
          </p>
        </div>

        <div className="space-y-4">
          <SmallCard
            icon={<Flag className="text-red-500" />}
            title="AI Flags"
            value={user?.ai_flag_count ?? 0}
          />

          <SmallCard
            icon={<AlertTriangle className="text-yellow-500" />}
            title="Warnings"
            value={user?.warning_count ?? 0}
          />

          <SmallCard
            icon={<ShieldCheck className="text-green-500" />}
            title="Status"
            value={user?.is_active ? "Active" : "Suspended"}
          />
        </div>
      </div>

      <div className="rounded-xl border border-blue-100 bg-blue-50 p-6">
        <div className="mb-3 flex items-center gap-2">
          <Bot className="text-blue-600" />

          <h2 className="text-lg font-semibold text-blue-700">
            AI Account Evaluation
          </h2>
        </div>

        <p className="leading-7 text-slate-700">
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
  );
}

function InfoCard({ icon, title, value }) {
  return (
    <div className="rounded-lg border border-slate-200 p-5">
      <div className="mb-2 flex items-center gap-2 text-blue-600">
        {icon}
        <span className="font-medium">{title}</span>
      </div>

      <p className="text-lg font-semibold text-slate-700">{value || "-"}</p>
    </div>
  );
}

function SmallCard({ icon, title, value }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow">
      <div className="mb-2 flex items-center gap-2">
        {icon}

        <span className="font-medium">{title}</span>
      </div>

      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}

export default Profile;
