import { motion } from "framer-motion";
import useAdminDashboard from "../../hooks/useAdminDashboard";

import StatsGrid from "../../components/dashboard/StatsGrid";
import StatusPieChart from "../../components/dashboard/StatusPieChart";
import MonthlyChart from "../../components/dashboard/MonthlyChart";
import DepartmentChart from "../../components/dashboard/DepartmentChart";
import PriorityChart from "../../components/dashboard/PriorityChart";
import SentimentChart from "../../components/dashboard/SentimentChart";
import RecentGrievances from "../../components/dashboard/RecentGrievances";
import DepartmentPerformance from "../../components/dashboard/DepartmentPerformance";

function AdminDashboard() {
  const { dashboard, loading } = useAdminDashboard();

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.24),transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.2),transparent_24%),linear-gradient(135deg,#020817_0%,#0f172a_18%,#111827_40%,#1d4ed8_68%,#312e81_100%)]">
      <div className="absolute -top-20 left-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet-400/20 blur-3xl" />

      <div className="space-y-8 p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-3xl border border-white/20 bg-white/80 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.35)] backdrop-blur-xl">
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              AI Grievance Dashboard
            </h1>
            <p className="mt-2 text-base font-semibold text-slate-700">
              Overview of grievances and AI analytics
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <StatsGrid dashboard={dashboard?.summary} />
        </motion.div>

        <motion.div
          className="grid gap-6 lg:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <StatusPieChart dashboard={dashboard?.summary} />
          <MonthlyChart data={dashboard?.monthly ?? []} />
        </motion.div>

        <motion.div
          className="grid gap-6 lg:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <DepartmentChart data={dashboard?.departmentWise ?? []} />
          <PriorityChart data={dashboard?.priorityWise ?? []} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <DepartmentPerformance
            data={dashboard?.departmentPerformance ?? []}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <SentimentChart data={dashboard?.sentimentWise ?? []} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <RecentGrievances data={dashboard?.recent ?? []} />
        </motion.div>
      </div>
    </div>
  );
}

export default AdminDashboard;
