import {
  ClipboardList,
  Clock3,
  LoaderCircle,
  CircleCheckBig,
  CircleX,
} from "lucide-react";

import StatCard from "./StatCard";

function StatsGrid({ dashboard }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
      <StatCard
        title="Total"
        value={dashboard?.total ?? dashboard?.grievances ?? 0}
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
    </div>
  );
}

export default StatsGrid;
