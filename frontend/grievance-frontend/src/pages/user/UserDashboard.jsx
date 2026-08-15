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
import { motion } from "framer-motion";

import { useDashboard } from "../../hooks/useDashboard";
import { useAuth } from "../../contexts/AuthContext";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import StatCard from "../../components/dashboard/StatCard";

function Dashboard() {
  const { data, isLoading, error } = useDashboard();
  const { user } = useAuth();

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[linear-gradient(135deg,#020817_0%,#0f172a_18%,#111827_32%,#1e3a8a_62%,#312e81_100%)]">
      <div className="absolute -top-20 left-0 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute top-10 right-0 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />
      <div className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-violet-400/20 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.10),transparent_20%,rgba(125,211,252,0.15),transparent_75%)]" />

      <div className="space-y-8 p-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="rounded-3xl border border-white/60 bg-white/50 p-5 shadow-[0_20px_60px_rgba(59,130,246,0.08)] backdrop-blur-xl">
            <PageHeader
              title="Dashboard"
              subtitle={`Welcome back, ${user?.first_name || "User"}!`}
              action={
                <Link to="/user/grievance/new">
                  <Button>New Grievance</Button>
                </Link>
              }
            />
          </div>
        </motion.div>

        {/* Stats */}

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <StatCard
              title="Total"
              value={dashboard.total || 0}
              icon={ClipboardList}
              color="bg-gradient-to-r from-blue-500 to-blue-600"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatCard
              title="Submitted"
              value={dashboard.submitted || 0}
              icon={AlertCircle}
              color="bg-gradient-to-r from-cyan-500 to-blue-500"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatCard
              title="In Progress"
              value={dashboard.in_progress || 0}
              icon={Clock3}
              color="bg-gradient-to-r from-yellow-500 to-orange-500"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatCard
              title="Resolved"
              value={dashboard.resolved || 0}
              icon={CheckCircle}
              color="bg-gradient-to-r from-green-500 to-emerald-500"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatCard
              title="Rejected"
              value={dashboard.rejected || 0}
              icon={CheckCircle}
              color="bg-gradient-to-r from-red-500 to-pink-500"
            />
          </motion.div>
        </motion.div>

        {/* Quick Actions & Resolution */}

        <motion.div
          className="grid grid-cols-1 gap-6 xl:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="rounded-3xl border border-white/70 bg-white/70 p-2 shadow-[0_20px_60px_rgba(59,130,246,0.08)] backdrop-blur-xl">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-1">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-800">
                  Quick Actions
                </h2>
              </div>

              <div className="grid gap-4 p-6 md:grid-cols-3">
                <Link
                  to="/user/grievance/new"
                  className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
                >
                  <Plus className="mb-3 text-blue-600" />

                  <h3 className="font-semibold text-slate-800">New Grievance</h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Submit a new grievance.
                  </p>
                </Link>

                <Link
                  to="/user/grievances"
                  className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-50 p-5 transition duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
                >
                  <FileText className="mb-3 text-emerald-600" />

                  <h3 className="font-semibold text-slate-800">My Grievances</h3>

                  <p className="mt-1 text-sm text-slate-500">
                    View all submitted grievances.
                  </p>
                </Link>

                <Link
                  to="/user/profile"
                  className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-purple-50 p-5 transition duration-200 hover:-translate-y-1 hover:border-violet-300 hover:shadow-md"
                >
                  <User className="mb-3 text-violet-600" />

                  <h3 className="font-semibold text-slate-800">My Profile</h3>

                  <p className="mt-1 text-sm text-slate-500">
                    View your profile details.
                  </p>
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/70 bg-white/70 p-2 shadow-[0_20px_60px_rgba(59,130,246,0.08)] backdrop-blur-xl">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-slate-50 p-1">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-800">
                  Resolution Rate
                </h2>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Overall Resolution</span>

                  <span className="text-3xl font-bold text-emerald-600">
                    {resolutionRate}%
                  </span>
                </div>

                <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-500 transition-all"
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
        </motion.div>

        {/* Tips */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="rounded-3xl border border-white/70 bg-white/70 p-2 shadow-[0_20px_60px_rgba(251,191,36,0.08)] backdrop-blur-xl">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-amber-50 via-white to-yellow-50 p-1">
              <div className="flex items-center gap-2 border-b border-slate-200 px-6 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <Lightbulb className="h-5 w-5" />
                </div>

                <h2 className="text-lg font-semibold text-slate-800">Helpful Tips</h2>
              </div>

              <div className="space-y-4 p-6">
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-4 text-slate-700">
                  📎 Attach supporting documents whenever possible.
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-green-50 p-4 text-slate-700">
                  📝 Provide a clear and detailed grievance description.
                </div>

                <div className="rounded-2xl border border-amber-100 bg-gradient-to-r from-amber-50 to-yellow-50 p-4 text-slate-700">
                  🔍 Track grievance status regularly from "My Grievances".
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
