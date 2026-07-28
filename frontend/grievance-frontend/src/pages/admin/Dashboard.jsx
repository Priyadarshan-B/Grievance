import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";

const stats = [
  {
    title: "Total",
    value: 120,
    icon: ClipboardList,
    color: "bg-blue-500",
  },
  {
    title: "Pending",
    value: 25,
    icon: Clock3,
    color: "bg-yellow-500",
  },
  {
    title: "Resolved",
    value: 82,
    icon: CheckCircle2,
    color: "bg-green-500",
  },
  {
    title: "Rejected",
    value: 13,
    icon: XCircle,
    color: "bg-red-500",
  },
];

const recent = [
  {
    id: "GR-001",
    title: "Fan not working",
    status: "Pending",
  },
  {
    id: "GR-002",
    title: "Water leakage",
    status: "Resolved",
  },
  {
    id: "GR-003",
    title: "Broken chair",
    status: "Pending",
  },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Department grievance overview</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="rounded-xl bg-white p-5 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">{item.title}</p>
                  <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>
                </div>

                <div className={`${item.color} rounded-lg p-3 text-white`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl bg-white shadow">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Recent Grievances</h2>
        </div>

        <div className="divide-y">
          {recent.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between px-6 py-4"
            >
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.id}</p>
              </div>

              <div className="flex items-center gap-3">
                <AlertTriangle size={18} className="text-yellow-500" />

                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
