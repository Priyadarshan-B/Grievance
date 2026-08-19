import {
  ClipboardList,
  Clock3,
  CheckCircle,
  AlertCircle,
  Plus,
  FileText,
  User,
  Lightbulb,
  Star,
  Flag,
  ShieldCheck,
  AlertTriangle,
  Bot,
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
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
        Failed to load dashboard.
      </div>
    );
  }

  const dashboard = data ?? {};

  const total = Number(dashboard.total || 0);
  const resolved = Number(dashboard.resolved || 0);
  const submitted = Number(dashboard.submitted || 0);
  const inProgress = Number(dashboard.in_progress || 0);
  const rejected = Number(dashboard.rejected || 0);

  const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

  // --------------------------------------------------
  // AI ACCOUNT HEALTH
  // --------------------------------------------------

  const trustScore = Math.max(0, Math.min(100, Number(user?.trust_score ?? 0)));

  const aiFlags = Number(user?.ai_flag_count ?? 0);
  const warnings = Number(user?.warning_count ?? 0);

  const trustStatus =
    trustScore >= 80
      ? "Excellent"
      : trustScore >= 50
        ? "Fair"
        : "Needs Attention";

  const trustStatusClass =
    trustScore >= 80
      ? "bg-emerald-100 text-emerald-700 border-emerald-200"
      : trustScore >= 50
        ? "bg-amber-100 text-amber-700 border-amber-200"
        : "bg-red-100 text-red-700 border-red-200";

  const trustProgressClass =
    trustScore >= 80
      ? "bg-gradient-to-r from-emerald-500 to-green-500"
      : trustScore >= 50
        ? "bg-gradient-to-r from-yellow-500 to-amber-500"
        : "bg-gradient-to-r from-red-500 to-rose-500";

  const hasWarnings = aiFlags > 0 || warnings > 0;

  const getTrustMessage = () => {
    if (trustScore >= 80) {
      return "Excellent account standing. Your grievance submissions appear genuine and trustworthy. Keep providing clear and relevant information.";
    }

    if (trustScore >= 50) {
      return "Your account is in fair standing. Continue submitting genuine grievances with clear and accurate information to maintain or improve your score.";
    }

    return "Your account currently needs attention. Some previous submissions may have been flagged as spam, abusive, or questionable. Please ensure future grievances are genuine and clearly described.";
  };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45 },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#020817_0%,#0f172a_18%,#111827_32%,#1e3a8a_62%,#312e81_100%)]">
      {/* Background decoration */}
      <div className="absolute -top-20 left-0 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />
      <div className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-violet-400/20 blur-3xl" />

      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.10),transparent_20%,rgba(125,211,252,0.15),transparent_75%)]" />

      <div className="relative z-10 space-y-8 p-4 sm:p-6">
        {/* ------------------------------------------------ */}
        {/* HEADER */}
        {/* ------------------------------------------------ */}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="rounded-3xl border border-white/60 bg-white/50 p-5 shadow-[0_20px_60px_rgba(59,130,246,0.08)] backdrop-blur-xl">
            <PageHeader
              title={`${getGreeting()}, ${user?.first_name || "User"}!`}
              subtitle="Track your grievances and keep an eye on your AI account health."
              action={
                <Link to="/user/grievance/new">
                  <Button>New Grievance</Button>
                </Link>
              }
            />
          </div>
        </motion.div>

        {/* ------------------------------------------------ */}
        {/* AI ACCOUNT HEALTH */}
        {/* ------------------------------------------------ */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* ------------------------------------------------ */}
          {/* GRIEVANCE STATS */}
          {/* ------------------------------------------------ */}

          <motion.div
            className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <StatCard
                title="Total"
                value={total}
                icon={ClipboardList}
                color="bg-gradient-to-r from-blue-500 to-blue-600"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <StatCard
                title="Submitted"
                value={submitted}
                icon={AlertCircle}
                color="bg-gradient-to-r from-cyan-500 to-blue-500"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <StatCard
                title="Progress"
                value={inProgress}
                icon={Clock3}
                color="bg-gradient-to-r from-yellow-500 to-orange-500"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <StatCard
                title="Resolved"
                value={resolved}
                icon={CheckCircle}
                color="bg-gradient-to-r from-green-500 to-emerald-500"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <StatCard
                title="Rejected"
                value={rejected}
                icon={AlertCircle}
                color="bg-gradient-to-r from-red-500 to-pink-500"
              />
            </motion.div>
          </motion.div>

          <div className="overflow-hidden rounded-3xl mt-10 border border-white/20 bg-slate-950/45 shadow-[0_30px_80px_rgba(15,23,42,0.55)] backdrop-blur-xl">
            <div className="border-b border-white/10 p-5 sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
                    <Bot size={23} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-white">
                      AI Account Health
                    </h2>

                    <p className="text-sm text-slate-300">
                      Your account standing based on grievance submissions
                    </p>
                  </div>
                </div>

                <span
                  className={`inline-flex w-fit items-center rounded-full border px-4 py-2 text-sm font-bold ${trustStatusClass}`}
                >
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  {trustStatus}
                </span>
              </div>
            </div>

            <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-3">
              {/* Trust score */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 lg:col-span-2">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-300">
                      AI Trust Score
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />

                      <span className="text-4xl font-black text-white">
                        {trustScore}
                      </span>

                      <span className="mb-1 text-sm text-slate-400">/ 100</span>
                    </div>
                  </div>

                  <span className="text-sm font-bold text-slate-300">
                    {trustStatus}
                  </span>
                </div>

                <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${trustScore}%` }}
                    transition={{ duration: 1 }}
                    className={`h-full rounded-full ${trustProgressClass}`}
                  />
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-300">
                  {getTrustMessage()}
                </p>
              </div>

              {/* Flags + warnings */}
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
                <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/15">
                      <Flag className="h-5 w-5 text-red-400" />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-red-200">
                        AI Flags
                      </p>

                      <p className="mt-1 text-2xl font-black text-white">
                        {aiFlags}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-yellow-400/20 bg-yellow-500/10 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/15">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-yellow-200">
                        Warnings
                      </p>

                      <p className="mt-1 text-2xl font-black text-white">
                        {warnings}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning message */}
            {hasWarnings && (
              <div className="border-t border-white/10 p-5 sm:p-6">
                <div className="flex gap-3 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-300" />

                  <div>
                    <p className="font-bold text-yellow-100">
                      Please keep your submissions genuine
                    </p>

                    <p className="mt-1 text-sm leading-6 text-yellow-100/80">
                      Your account has {aiFlags} AI flag
                      {aiFlags !== 1 ? "s" : ""} and {warnings} warning
                      {warnings !== 1 ? "s" : ""}. Avoid spam, abusive language,
                      duplicate complaints, or misleading information when
                      submitting grievances.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* ------------------------------------------------ */}
        {/* RESOLUTION + QUICK ACTIONS */}
        {/* ------------------------------------------------ */}

        <motion.div
          className="grid grid-cols-1 gap-6 xl:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {/* Quick Actions */}
          <div className="rounded-3xl border border-white/70 bg-white/70 p-2 shadow-[0_20px_60px_rgba(59,130,246,0.08)] backdrop-blur-xl">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-800">
                  Quick Actions
                </h2>
              </div>

              <div className="grid gap-4 p-6 sm:grid-cols-3">
                <Link
                  to="/user/grievance/new"
                  className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
                >
                  <Plus className="mb-3 text-blue-600" />

                  <h3 className="font-semibold text-slate-800">
                    New Grievance
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Submit a new grievance.
                  </p>
                </Link>

                <Link
                  to="/user/grievances"
                  className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-50 p-5 transition duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
                >
                  <FileText className="mb-3 text-emerald-600" />

                  <h3 className="font-semibold text-slate-800">
                    My Grievances
                  </h3>

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

          {/* Resolution Rate */}
          <div className="rounded-3xl border border-white/70 bg-white/70 p-2 shadow-[0_20px_60px_rgba(59,130,246,0.08)] backdrop-blur-xl">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-slate-50">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-800">
                  Resolution Rate
                </h2>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-600">Overall Resolution</span>

                  <span className="text-3xl font-bold text-emerald-600">
                    {resolutionRate}%
                  </span>
                </div>

                <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-200">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${resolutionRate}%` }}
                    transition={{ duration: 1 }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-500"
                  />
                </div>

                <p className="mt-4 text-sm text-slate-500">
                  {resolved} of {total} grievances have been resolved.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ------------------------------------------------ */}
        {/* ACCOUNT GUIDANCE */}
        {/* ------------------------------------------------ */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="rounded-3xl border border-white/70 bg-white/70 p-2 shadow-[0_20px_60px_rgba(251,191,36,0.08)] backdrop-blur-xl">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-amber-50 via-white to-yellow-50">
              <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <Lightbulb className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-800">
                    Keep Your Account Healthy
                  </h2>

                  <p className="text-sm text-slate-500">
                    Simple ways to maintain a good AI trust score
                  </p>
                </div>
              </div>

              <div className="grid gap-4 p-6 md:grid-cols-3">
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-4 text-slate-700">
                  <p className="font-semibold">
                    📎 Attach supporting documents
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Add relevant evidence whenever possible.
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-green-50 p-4 text-slate-700">
                  <p className="font-semibold">📝 Describe the issue clearly</p>

                  <p className="mt-1 text-sm text-slate-500">
                    Provide accurate and detailed information.
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-100 bg-gradient-to-r from-amber-50 to-yellow-50 p-4 text-slate-700">
                  <p className="font-semibold">🔍 Avoid duplicate complaints</p>

                  <p className="mt-1 text-sm text-slate-500">
                    Track an existing grievance before creating another one.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ------------------------------------------------ */}
        {/* TIPS */}
        {/* ------------------------------------------------ */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="rounded-3xl border border-white/70 bg-white/70 p-2 shadow-[0_20px_60px_rgba(251,191,36,0.08)] backdrop-blur-xl">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-amber-50 via-white to-yellow-50">
              <div className="flex items-center gap-2 border-b border-slate-200 px-6 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <Lightbulb className="h-5 w-5" />
                </div>

                <h2 className="text-lg font-semibold text-slate-800">
                  Helpful Tips
                </h2>
              </div>

              <div className="grid gap-4 p-6 md:grid-cols-3">
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
