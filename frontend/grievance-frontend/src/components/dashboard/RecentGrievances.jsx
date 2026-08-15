import Card from "../common/Card";

const priorityStyles = {
  critical: "bg-red-100 text-red-700",
  high: "bg-orange-100 text-orange-700",
  medium: "bg-blue-100 text-blue-700",
  low: "bg-green-100 text-green-700",
};

const statusStyles = {
  submitted: "bg-slate-100 text-slate-700",
  assigned: "bg-purple-100 text-purple-700",
  in_progress: "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const verdictStyles = {
  GENUINE: "bg-green-100 text-green-700",
  QUESTIONABLE: "bg-yellow-100 text-yellow-700",
  SPAM: "bg-red-100 text-red-700",
};

function RecentGrievances({ data = [] }) {
  const formatStatus = (status) => {
    return status
      ?.replaceAll("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <Card>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Recent Grievances</h2>

        <span className="text-sm font-medium text-slate-600">Latest 10</span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-slate-700">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="p-3 text-left font-semibold text-slate-700">Grievance No</th>
              <th className="p-3 text-left font-semibold text-slate-700">Title</th>
              <th className="p-3 text-left font-semibold text-slate-700">Department</th>
              <th className="p-3 text-left font-semibold text-slate-700">Priority</th>
              <th className="p-3 text-left font-semibold text-slate-700">Status</th>
              <th className="p-3 text-left font-semibold text-slate-700">AI Verdict</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td className="p-6 text-center text-slate-500" colSpan={6}>
                  No recent grievances
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item.id}
                  className="border-b transition hover:bg-slate-50"
                >
                  <td className="p-3 font-medium">{item.grievance_no}</td>

                  <td className="max-w-xs truncate p-3" title={item.title}>
                    {item.title}
                  </td>

                  <td className="p-3">{item.department_name}</td>

                  <td className="p-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        priorityStyles[item.priority] ||
                        "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {item.priority.toUpperCase()}
                    </span>
                  </td>

                  <td className="p-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        statusStyles[item.status] ||
                        "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {formatStatus(item.status.toUpperCase())}
                    </span>
                  </td>

                  <td className="p-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        verdictStyles[item.verdict] ||
                        "bg-slate-100 text-slate-700"
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
