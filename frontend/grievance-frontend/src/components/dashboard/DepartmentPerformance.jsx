import { motion } from "framer-motion";

function formatHours(hours) {
  const value = Number(hours);

  if (!value || value <= 0) {
    return "—";
  }

  if (value < 24) {
    return `${value.toFixed(1)} hrs`;
  }

  const days = value / 24;

  return `${days.toFixed(1)} days`;
}

function getPerformanceLabel(percentage) {
  const value = Number(percentage);

  if (value >= 80) {
    return {
      label: "EXCELLENT",
      className: "bg-emerald-100 text-emerald-700",
    };
  }

  if (value >= 60) {
    return {
      label: "GOOD",
      className: "bg-blue-100 text-blue-700",
    };
  }

  if (value >= 40) {
    return {
      label: "AVERAGE",
      className: "bg-amber-100 text-amber-700",
    };
  }

  return {
    label: "NEEDS ATTENTION",
    className: "bg-red-100 text-red-700",
  };
}

function DepartmentPerformance({ data = [] }) {
  if (!data.length) {
    return (
      <div className="rounded-3xl border border-white/20 bg-white/80 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.25)] backdrop-blur-xl">
        <h2 className="text-xl font-black text-slate-900">
          Department Performance
        </h2>

        <p className="mt-4 text-sm font-medium text-slate-600">
          No department performance data available.
        </p>
      </div>
    );
  }

  const bestDepartment = [...data].sort(
    (a, b) => Number(b.resolution_percentage) - Number(a.resolution_percentage),
  )[0];

  const fastestDepartment = [...data]
    .filter((item) => Number(item.average_resolution_hours) > 0)
    .sort(
      (a, b) =>
        Number(a.average_resolution_hours) - Number(b.average_resolution_hours),
    )[0];

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="rounded-3xl border border-white/20 bg-white/80 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.25)] backdrop-blur-xl">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              Department Performance
            </h2>

            <p className="mt-1 text-sm font-semibold text-slate-600">
              Compare grievance resolution efficiency across departments
            </p>
          </div>

          <div className="rounded-full bg-slate-900 px-4 py-2 text-xs font-black tracking-wide text-white">
            PERFORMANCE ANALYTICS
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Best resolution */}
        <div className="rounded-3xl border border-white/20 bg-white/80 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.22)] backdrop-blur-xl">
          <p className="text-xs font-black uppercase tracking-widest text-slate-500">
            Best Resolution Rate
          </p>

          <div className="mt-3 flex items-end justify-between gap-4">
            <div className="min-w-0">
              <h3
                className="truncate text-xl font-black text-slate-900"
                title={bestDepartment?.department_name}
              >
                {bestDepartment?.department_name}
              </h3>

              <p className="mt-1 text-sm font-semibold text-slate-500">
                {bestDepartment?.department_code}
              </p>
            </div>

            <span className="shrink-0 text-3xl font-black text-emerald-600">
              {Number(bestDepartment?.resolution_percentage || 0).toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Fastest */}
        <div className="rounded-3xl border border-white/20 bg-white/80 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.22)] backdrop-blur-xl">
          <p className="text-xs font-black uppercase tracking-widest text-slate-500">
            Fastest Resolution
          </p>

          {fastestDepartment ? (
            <div className="mt-3 flex items-end justify-between gap-4">
              <div className="min-w-0">
                <h3
                  className="truncate text-xl font-black text-slate-900"
                  title={fastestDepartment.department_name}
                >
                  {fastestDepartment.department_name}
                </h3>

                <p className="mt-1 text-sm font-semibold text-slate-500">
                  {fastestDepartment.department_code}
                </p>
              </div>

              <span className="shrink-0 text-2xl font-black text-blue-600">
                {formatHours(fastestDepartment.average_resolution_hours)}
              </span>
            </div>
          ) : (
            <p className="mt-3 text-sm font-semibold text-slate-500">
              No resolved grievances yet.
            </p>
          )}
        </div>
      </div>

      {/* Department table */}
      <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/80 shadow-[0_18px_45px_rgba(15,23,42,0.25)] backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] table-fixed">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-900">
                <th className="w-[24%] px-5 py-4 text-left text-xs font-black uppercase tracking-wider text-white">
                  Department
                </th>

                <th className="w-[10%] px-3 py-4 text-center text-xs font-black uppercase tracking-wider text-white">
                  Total
                </th>

                <th className="w-[12%] px-3 py-4 text-center text-xs font-black uppercase tracking-wider text-white">
                  Resolved
                </th>

                <th className="w-[12%] px-3 py-4 text-center text-xs font-black uppercase tracking-wider text-white">
                  Pending
                </th>

                <th className="w-[20%] px-3 py-4 text-left text-xs font-black uppercase tracking-wider text-white">
                  Resolution
                </th>

                <th className="w-[12%] px-3 py-4 text-center text-xs font-black uppercase tracking-wider text-white">
                  Avg. Time
                </th>

                <th className="w-[10%] px-3 py-4 text-center text-xs font-black uppercase tracking-wider text-white">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((department, index) => {
                const percentage = Number(
                  department.resolution_percentage || 0,
                );

                const performance = getPerformanceLabel(percentage);

                return (
                  <tr
                    key={department.department_id}
                    className="border-b border-slate-200 last:border-0 hover:bg-slate-50"
                  >
                    {/* Department */}
                    <td className="px-5 py-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-black text-white">
                          {index + 1}
                        </div>

                        <div className="min-w-0">
                          <p
                            className="truncate font-bold text-slate-900"
                            title={department.department_name}
                          >
                            {department.department_name}
                          </p>

                          <p
                            className="truncate text-xs font-semibold text-slate-500"
                            title={department.department_code}
                          >
                            {department.department_code}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Total */}
                    <td className="px-3 py-4 text-center text-sm font-bold text-slate-700">
                      {department.total}
                    </td>

                    {/* Resolved */}
                    <td className="px-3 py-4 text-center text-sm font-bold text-emerald-600">
                      {department.resolved}
                    </td>

                    {/* Pending */}
                    <td className="px-3 py-4 text-center text-sm font-bold text-amber-600">
                      {department.pending}
                    </td>

                    {/* Resolution */}
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                            style={{
                              width: `${Math.min(percentage, 100)}%`,
                            }}
                          />
                        </div>

                        <span className="w-12 shrink-0 text-right text-sm font-black text-slate-800">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </td>

                    {/* Average time */}
                    <td className="px-3 py-4 text-center text-sm font-bold text-slate-700">
                      {formatHours(department.average_resolution_hours)}
                    </td>

                    {/* Status */}
                    <td className="px-3 py-4 text-center">
                      <span
                        className={`inline-flex max-w-full truncate rounded-full px-3 py-1 text-[10px] font-black tracking-wide ${performance.className}`}
                        title={performance.label}
                      >
                        {performance.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

export default DepartmentPerformance;
