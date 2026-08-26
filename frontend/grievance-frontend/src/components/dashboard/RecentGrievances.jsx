import { ClipboardList } from "lucide-react";

import Card from "../common/Card";

const priorityStyles = {
  critical: "bg-red-500/15 text-red-300",
  high: "bg-orange-500/15 text-orange-300",
  medium: "bg-cyan-500/15 text-cyan-300",
  low: "bg-emerald-500/15 text-emerald-300",
};

const statusStyles = {
  submitted: "bg-slate-700 text-slate-200",
  assigned: "bg-cyan-500/15 text-cyan-300",
  in_progress: "bg-cyan-500/15 text-cyan-300",
  resolved: "bg-emerald-500/15 text-emerald-300",
  rejected: "bg-red-500/15 text-red-300",
};

const verdictStyles = {
  GENUINE: "bg-emerald-500/15 text-emerald-300",
  QUESTIONABLE: "bg-amber-500/15 text-amber-300",
  SPAM: "bg-red-500/15 text-red-300",
};

const rowStyles = {
  submitted: "border-l-cyan-400/70 hover:bg-cyan-950/30",
  assigned: "border-l-violet-400/70 hover:bg-violet-950/25",
  in_progress: "border-l-amber-400/70 hover:bg-amber-950/25",
  resolved: "border-l-emerald-400/70 hover:bg-emerald-950/25",
  rejected: "border-l-rose-400/70 hover:bg-rose-950/25",
};

function RecentGrievances({ data = [] }) {
  const formatStatus = (status) => {
    return status
      ?.replaceAll("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <Card variant="primary">
      <div className="mb-5 flex items-center justify-between border-b border-cyan-400/15 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/15 text-violet-200">
            <ClipboardList size={18} />
          </div>
          <h2 className="text-lg font-bold text-white">Recent Grievances</h2>
        </div>

        <span className="text-sm font-medium text-slate-400">Latest 10</span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-slate-300">
          <thead>
            <tr className="border-b border-[#334155] bg-slate-900/80">
              <th className="p-3 text-left font-semibold text-slate-200">Grievance No</th>
              <th className="p-3 text-left font-semibold text-slate-200">Title</th>
              <th className="p-3 text-left font-semibold text-slate-200">Department</th>
              <th className="p-3 text-left font-semibold text-slate-200">Priority</th>
              <th className="p-3 text-left font-semibold text-slate-200">Status</th>
              <th className="p-3 text-left font-semibold text-slate-200">AI Verdict</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td className="p-6 text-center text-slate-400" colSpan={6}>
                  No recent grievances
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item.id}
                  className={`border-b border-l-2 border-[#334155] transition ${rowStyles[item.status] || "border-l-slate-500 hover:bg-slate-800"}`}
                >
                  <td className="p-3 font-medium">{item.grievance_no}</td>

                  <td className="max-w-xs truncate p-3" title={item.title}>
                    {item.title}
                  </td>

                  <td className="p-3">{item.department_name}</td>

                  <td className="p-3">
                    <span
                      className={`inline-flex min-w-max whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                        priorityStyles[item.priority] ||
                        "bg-slate-700 text-slate-200"
                      }`}
                    >
                      {item.priority?.toUpperCase() || "N/A"}
                    </span>
                  </td>

                  <td className="whitespace-nowrap p-3">
                    <span
                      className={`inline-flex min-w-max whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                        statusStyles[item.status] ||
                        "bg-slate-700 text-slate-200"
                      }`}
                    >
                      {formatStatus(item.status?.toUpperCase()) || "Unknown"}
                    </span>
                  </td>

                  <td className="whitespace-nowrap p-3">
                    <span
                      className={`inline-flex min-w-max whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                        verdictStyles[item.verdict] ||
                        "bg-slate-700 text-slate-200"
                      }`}
                    >
                      {item.verdict || "N/A"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default RecentGrievances;
