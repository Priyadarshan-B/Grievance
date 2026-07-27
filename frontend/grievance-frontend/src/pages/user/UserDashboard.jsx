import { ClipboardList, Clock3, CheckCircle, AlertCircle } from "lucide-react";

import { Link } from "react-router-dom";

import { useDashboard } from "../../hooks/useDashboard";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import StatCard from "../../components/dashboard/StatCard";

function Dashboard() {
  const {
    data,

    isLoading,

    error,
  } = useDashboard();

  if (isLoading) return <Loader />;

  if (error) {
    return <p>Failed to load dashboard.</p>;
  }

  const dashboard = data.data;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back."
        action={
          <Link to="/user/grievance/new">
            <Button>New Grievance</Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Total" value={dashboard.total} icon={ClipboardList} />

        <StatCard
          title="Submitted"
          value={dashboard.submitted}
          icon={AlertCircle}
          color="bg-blue-500"
        />

        <StatCard
          title="In Progress"
          value={dashboard.in_progress}
          icon={Clock3}
          color="bg-yellow-500"
        />

        <StatCard
          title="Resolved"
          value={dashboard.resolved}
          icon={CheckCircle}
          color="bg-green-500"
        />
      </div>
    </div>
  );
}

export default Dashboard;
