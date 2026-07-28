import useAdminDashboard from "../../hooks/useAdminDashboard";

import StatsGrid from "../../components/dashboard/StatsGrid";
import StatusPieChart from "../../components/dashboard/StatusPieChart";
import MonthlyChart from "../../components/dashboard/MonthlyChart";

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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Grievance Dashboard</h1>

        <p className="mt-1 text-slate-500">Overview of grievance statistics</p>
      </div>

      <StatsGrid dashboard={dashboard} />

      <div className="grid gap-6 lg:grid-cols-2">
        <StatusPieChart dashboard={dashboard} />

        <MonthlyChart data={dashboard?.monthly ?? []} />
      </div>
    </div>
  );
}

export default AdminDashboard;
