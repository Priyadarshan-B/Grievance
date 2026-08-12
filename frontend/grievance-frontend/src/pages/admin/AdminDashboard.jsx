import useAdminDashboard from "../../hooks/useAdminDashboard";

import StatsGrid from "../../components/dashboard/StatsGrid";
import StatusPieChart from "../../components/dashboard/StatusPieChart";
import MonthlyChart from "../../components/dashboard/MonthlyChart";
import DepartmentChart from "../../components/dashboard/DepartmentChart";
import PriorityChart from "../../components/dashboard/PriorityChart";
import SentimentChart from "../../components/dashboard/SentimentChart";
import RecentGrievances from "../../components/dashboard/RecentGrievances";

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
        <h1 className="text-3xl font-bold">AI Grievance Dashboard</h1>

        <p className="mt-1 text-slate-500">
          Overview of grievances and AI analytics
        </p>
      </div>

      <StatsGrid dashboard={dashboard?.summary} />

      <div className="grid gap-6 lg:grid-cols-2">
        <StatusPieChart dashboard={dashboard?.summary} />
        <MonthlyChart data={dashboard?.monthly ?? []} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DepartmentChart data={dashboard?.departmentWise ?? []} />

        <PriorityChart data={dashboard?.priorityWise ?? []} />
      </div>

      <SentimentChart data={dashboard?.sentimentWise ?? []} />

      <RecentGrievances data={dashboard?.recent ?? []} />
    </div>
  );
}

export default AdminDashboard;
