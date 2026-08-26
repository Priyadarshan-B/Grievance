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

  const stats = [
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
      tone: "amber",
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
    {
      title: "Avg Severity",
      value: dashboard?.avg_severity ?? 0,
      icon: TriangleAlert,
      tone: "amber",
    },
    {
      title: "Legitimacy",
      value: dashboard?.avg_legitimacy ?? 0,
      icon: ShieldCheck,
      tone: "teal",
    },
    {
      title: "Spam",
      value: dashboard?.avg_spam ?? 0,
      icon: ShieldAlert,
      tone: "cyan",
    },
    {
      title: "Abuse",
      value: dashboard?.avg_abuse ?? 0,
      icon: ShieldAlert,
      tone: "rose",
    },
    {
      title: "AI Confidence",
      value:
        dashboard?.avg_legitimacy && dashboard?.avg_spam
          ? Math.round(dashboard.avg_legitimacy - dashboard.avg_spam)
          : 0,
      icon: Brain,
      tone: "cyan",
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
            tone={stat.tone}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default StatsGrid;
