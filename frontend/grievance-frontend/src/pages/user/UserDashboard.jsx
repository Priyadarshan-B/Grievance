import {
  ClipboardList,
  Clock3,
  CheckCircle,
  AlertCircle,
  Plus,
  FileText,
  User,
  Lightbulb,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useDashboard } from "../../hooks/useDashboard";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import StatCard from "../../components/dashboard/StatCard";

function Dashboard() {
  const { data, isLoading, error } = useDashboard();

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 border border-red-200 p-6 text-red-600">
        Failed to load dashboard.
      </div>
    );
  }

  const dashboard = data ?? {};

  const total = dashboard.total || 0;
  const resolved = dashboard.resolved || 0;

  const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back."
        action={
          <Link to="/user/grievance/new">
            <Button>New Grievance</Button>
          </Link>
        }
      />

      {/* Stats */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total"
          value={dashboard.total || 0}
          icon={ClipboardList}
        />

        <StatCard
          title="Submitted"
          value={dashboard.submitted || 0}
          icon={AlertCircle}
          color="bg-blue-500"
        />

        <StatCard
          title="In Progress"
          value={dashboard.in_progress || 0}
          icon={Clock3}
          color="bg-yellow-500"
        />

        <StatCard
          title="Resolved"
          value={dashboard.resolved || 0}
          icon={CheckCircle}
          color="bg-green-500"
        />
      </div>

      {/* Quick Actions & Resolution */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Quick Actions
            </h2>
          </div>

          <div className="grid gap-4 p-6 md:grid-cols-3">
            <Link
              to="/user/grievance/new"
              className="rounded-xl border p-5 transition hover:border-blue-500 hover:bg-blue-50"
            >
              <Plus className="mb-3 text-blue-600" />

              <h3 className="font-semibold">New Grievance</h3>

              <p className="mt-1 text-sm text-slate-500">
                Submit a new grievance.
              </p>
            </Link>

            <Link
              to="/user/grievances"
              className="rounded-xl border p-5 transition hover:border-blue-500 hover:bg-blue-50"
            >
              <FileText className="mb-3 text-green-600" />

              <h3 className="font-semibold">My Grievances</h3>

              <p className="mt-1 text-sm text-slate-500">
                View all submitted grievances.
              </p>
            </Link>

            <Link
              to="/user/profile"
              className="rounded-xl border p-5 transition hover:border-blue-500 hover:bg-blue-50"
            >
              <User className="mb-3 text-purple-600" />

              <h3 className="font-semibold">My Profile</h3>

              <p className="mt-1 text-sm text-slate-500">
                View your profile details.
              </p>
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Resolution Rate
            </h2>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Overall Resolution</span>

              <span className="text-3xl font-bold text-green-600">
                {resolutionRate}%
              </span>
            </div>

            <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-green-500 transition-all"
                style={{
                  width: `${resolutionRate}%`,
                }}
              />
            </div>

            <p className="mt-4 text-sm text-slate-500">
              {resolved} of {total} grievances have been resolved.
            </p>
          </div>
        </div>
      </div>

      {/* Tips */}

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b px-6 py-4">
          <Lightbulb className="text-yellow-500" />

          <h2 className="text-lg font-semibold text-slate-800">Helpful Tips</h2>
        </div>

        <div className="space-y-4 p-6">
          <div className="rounded-lg bg-blue-50 p-4">
            📎 Attach supporting documents whenever possible.
          </div>

          <div className="rounded-lg bg-green-50 p-4">
            📝 Provide a clear and detailed grievance description.
          </div>

          <div className="rounded-lg bg-yellow-50 p-4">
            🔍 Track grievance status regularly from "My Grievances".
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
