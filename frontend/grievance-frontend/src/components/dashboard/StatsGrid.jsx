import {
  ClipboardList,
  Clock3,
  LoaderCircle,
  CircleCheckBig,
  CircleX,
  ShieldCheck,
  ShieldAlert,
  TriangleAlert,
  Brain,
} from "lucide-react";
import { motion } from "framer-motion";

import StatCard from "./StatCard";

function StatsGrid({ dashboard }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
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

  const leftStats = [
    {
      title: "Total",
      value: dashboard?.total_grievances ?? dashboard?.total ?? 0,
      icon: ClipboardList,
      tone: "cyan",
    },
    {
      title: "Submitted",
      value: dashboard?.submitted ?? 0,
      icon: Clock3,
      tone: "violet",
    },
    {
      title: "In Progress",
      value: dashboard?.in_progress ?? 0,
      icon: LoaderCircle,
      tone: "amber",
    },
    {
      title: "Resolved",
      value: dashboard?.resolved ?? 0,
      icon: CircleCheckBig,
      tone: "teal",
    },
    {
      title: "Rejected",
      value: dashboard?.rejected ?? 0,
      icon: CircleX,
      tone: "rose",
    },
  ];

  const rightStats = [
    {
      title: "Avg Severity",
      value: dashboard?.avg_severity ?? 0,
      icon: TriangleAlert,
      tone: "cyan",
    },
    {
      title: "Legitimacy",
      value: dashboard?.avg_legitimacy ?? 0,
      icon: ShieldCheck,
      tone: "violet",
    },
    {
      title: "Spam",
      value: dashboard?.avg_spam ?? 0,
      icon: ShieldAlert,
      tone: "amber",
    },
    {
      title: "Abuse",
      value: dashboard?.avg_abuse ?? 0,
      icon: ShieldAlert,
      tone: "teal",
    },
    {
      title: "AI Confidence",
      value:
        dashboard?.avg_legitimacy && dashboard?.avg_spam
          ? Math.round(dashboard.avg_legitimacy - dashboard.avg_spam)
          : 0,
      icon: Brain,
      tone: "rose",
    },
  ];

  const formatMetricValue = (value) => {
    const numeric = Number(value ?? 0);

    if (!Number.isFinite(numeric)) return "0";

    return Number.isInteger(numeric) ? String(numeric) : numeric.toFixed(2);
  };

  return (
    <motion.div
      className="grid gap-6 xl:grid-cols-[1.05fr_1.15fr]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-4">
        {leftStats.map((stat, index) => (
          <motion.div key={index} variants={itemVariants}>
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              tone={stat.tone}
              compact
            />
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col rounded-[26px] border border-cyan-400/20 bg-[radial-gradient(circle_at_top,_rgba(30,64,175,0.22),_rgba(15,23,42,0.95)_55%)] p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col justify-center gap-6 h-full">
          {rightStats.map((stat) => {
            const numericValue = Number(stat.value ?? 0);
            const percentage = Math.min(Math.max(numericValue, 0), 100);

            // Get color based on tone
            const colorMap = {
              cyan: "from-blue-400 to-blue-300",
              violet: "from-purple-400 to-purple-300",
              amber: "from-amber-400 to-amber-300",
              teal: "from-emerald-400 to-emerald-300",
              rose: "from-red-400 to-red-300",
            };

            return (
                <div key={stat.title} className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-bold text-blue-300">{stat.title}</span>
                    <span className="text-right text-lg font-bold text-blue-300">
                    {formatMetricValue(stat.value)}
                  </span>
                </div>

                <div className="h-4 overflow-hidden rounded-full border border-cyan-400/20 bg-slate-900/80">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${colorMap[stat.tone] || colorMap.cyan} shadow-[0_0_14px_rgba(52,211,153,0.65)]`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default StatsGrid;
