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

  const gradients = [
    "from-blue-600 to-cyan-500",
    "from-yellow-500 to-orange-600",
    "from-orange-600 to-red-500",
    "from-green-500 to-emerald-600",
    "from-red-600 to-pink-500",
    "from-pink-600 to-rose-500",
    "from-emerald-600 to-teal-600",
    "from-purple-600 to-indigo-600",
    "from-rose-600 to-pink-600",
    "from-indigo-600 to-purple-700",
  ];

  const stats = [
    {
      title: "Total",
      value: dashboard?.total_grievances ?? dashboard?.total ?? 0,
      icon: ClipboardList,
      gradient: gradients[0],
    },
    {
      title: "Submitted",
      value: dashboard?.submitted ?? 0,
      icon: Clock3,
      gradient: gradients[1],
    },
    {
      title: "In Progress",
      value: dashboard?.in_progress ?? 0,
      icon: LoaderCircle,
      gradient: gradients[2],
    },
    {
      title: "Resolved",
      value: dashboard?.resolved ?? 0,
      icon: CircleCheckBig,
      gradient: gradients[3],
    },
    {
      title: "Rejected",
      value: dashboard?.rejected ?? 0,
      icon: CircleX,
      gradient: gradients[4],
    },
    {
      title: "Avg Severity",
      value: dashboard?.avg_severity ?? 0,
      icon: TriangleAlert,
      gradient: gradients[5],
    },
    {
      title: "Legitimacy",
      value: dashboard?.avg_legitimacy ?? 0,
      icon: ShieldCheck,
      gradient: gradients[6],
    },
    {
      title: "Spam",
      value: dashboard?.avg_spam ?? 0,
      icon: ShieldAlert,
      gradient: gradients[7],
    },
    {
      title: "Abuse",
      value: dashboard?.avg_abuse ?? 0,
      icon: ShieldAlert,
      gradient: gradients[8],
    },
    {
      title: "AI Confidence",
      value:
        dashboard?.avg_legitimacy && dashboard?.avg_spam
          ? Math.round(dashboard.avg_legitimacy - dashboard.avg_spam)
          : 0,
      icon: Brain,
      gradient: gradients[9],
    },
  ];

  return (
    <motion.div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat, index) => (
        <motion.div key={index} variants={itemVariants}>
          <StatCard
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.gradient}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default StatsGrid;
