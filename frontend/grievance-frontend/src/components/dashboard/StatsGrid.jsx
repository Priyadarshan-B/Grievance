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

import StatCard from "./StatCard";

function StatsGrid({ dashboard }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <StatCard
        title="Total"
        value={dashboard?.total_grievances ?? dashboard?.total ?? 0}
        icon={ClipboardList}
        color="bg-blue-600"
      />

      <StatCard
        title="Submitted"
        value={dashboard?.submitted ?? 0}
        icon={Clock3}
        color="bg-yellow-500"
      />

      <StatCard
        title="In Progress"
        value={dashboard?.in_progress ?? 0}
        icon={LoaderCircle}
        color="bg-orange-500"
      />

      <StatCard
        title="Resolved"
        value={dashboard?.resolved ?? 0}
        icon={CircleCheckBig}
        color="bg-green-600"
      />

      <StatCard
        title="Rejected"
        value={dashboard?.rejected ?? 0}
        icon={CircleX}
        color="bg-red-600"
      />

      <StatCard
        title="Avg Severity"
        value={dashboard?.avg_severity ?? 0}
        icon={TriangleAlert}
        color="bg-rose-600"
      />

      <StatCard
        title="Legitimacy"
        value={dashboard?.avg_legitimacy ?? 0}
        icon={ShieldCheck}
        color="bg-emerald-600"
      />

      <StatCard
        title="Spam"
        value={dashboard?.avg_spam ?? 0}
        icon={ShieldAlert}
        color="bg-purple-600"
      />

      <StatCard
        title="Abuse"
        value={dashboard?.avg_abuse ?? 0}
        icon={ShieldAlert}
        color="bg-pink-600"
      />

      <StatCard
        title="AI Confidence"
        value={
          dashboard?.avg_legitimacy && dashboard?.avg_spam
            ? Math.round(
                dashboard.avg_legitimacy - dashboard.avg_spam
              )
            : 0
        }
        icon={Brain}
        color="bg-indigo-600"
      />
    </div>
  );
}

export default StatsGrid;