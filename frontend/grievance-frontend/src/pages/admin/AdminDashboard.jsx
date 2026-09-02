import { motion } from "framer-motion";
import useAdminDashboard from "../../hooks/useAdminDashboard";

import Loader from "../../components/common/Loader";
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
      <div className="flex min-h-[70vh] items-center justify-center bg-[#0B0F19]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100">
      <div className="space-y-8 p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-3xl border border-cyan-400/30 border-t-2 border-t-cyan-400/80 bg-gradient-to-br from-cyan-950/65 via-[#1E293B] to-violet-950/25 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
            <h1 className="text-4xl font-black tracking-tight text-white">
              AI Grievance Dashboard
            </h1>
            <p className="mt-2 text-base font-semibold text-slate-400">
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
