import { useMemo, useState } from "react";
import { Eye, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import Loader from "../../components/common/Loader";
import Badge from "../../components/common/Badge";
import useDepartmentGrievances from "../../hooks/useDepartmentGrievances";

function DepartmentGrievances() {
  const { grievances, loading, error } = useDepartmentGrievances();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [sentiment, setSentiment] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  // ==========================================
  // Filter Grievances
  // ==========================================

  const filtered = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return grievances.filter((g) => {
      const matchesSearch =
        (g.grievance_no ?? "").toLowerCase().includes(keyword) ||
        (g.title ?? "").toLowerCase().includes(keyword) ||
        (g.student_name ?? g.full_name ?? "").toLowerCase().includes(keyword);

      const matchesStatus = !status || g.status === status;

      const matchesPriority = !priority || g.priority === priority;

      const matchesSentiment = !sentiment || g.sentiment === sentiment;

      return (
        matchesSearch && matchesStatus && matchesPriority && matchesSentiment
      );
    });
  }, [grievances, search, status, priority, sentiment]);

  // ==========================================
  // Pagination
  // ==========================================

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginatedGrievances = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  // Reset page when filters change
  const resetPage = () => {
    setCurrentPage(1);
  };

  const startItem =
    filtered.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filtered.length);

  // ==========================================
  // Loading / Error
  // ==========================================

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
        {error}
      </div>
    );
  }

  // ==========================================
  // Badge Colors
  // ==========================================

  const priorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-700 ring-1 ring-red-200";

      case "high":
        return "bg-orange-100 text-orange-700 ring-1 ring-orange-200";

      case "medium":
        return "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200";

      default:
        return "bg-green-100 text-green-700 ring-1 ring-green-200";
    }
  };

  const verdictColor = (verdict) => {
    switch (verdict) {
      case "GENUINE":
        return "bg-green-100 text-green-700 ring-1 ring-green-200";

      case "QUESTIONABLE":
        return "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200";

      default:
        return "bg-red-100 text-red-700 ring-1 ring-red-200";
    }
  };

  // ==========================================
  // Page Numbers
  // ==========================================

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.28),transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(244,114,182,0.22),transparent_25%),linear-gradient(135deg,#020817_0%,#0f172a_24%,#1e1b4b_56%,#111827_100%)]">
      <div className="absolute -top-20 left-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet-400/20 blur-3xl" />

      <div className="space-y-6 p-6 relative z-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.35)] backdrop-blur-xl">
            <h1 className="text-3xl font-black tracking-tight text-white">
              Department Grievances
            </h1>
            <p className="mt-1 text-sm font-medium text-slate-300">
              Review and manage grievances assigned to your department.
            </p>
          </div>

          <span className="inline-flex w-fit items-center rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-blue-500/30 ring-1 ring-cyan-300/50">
            {filtered.length} {filtered.length === 1 ? "Grievance" : "Grievances"}
          </span>
        </div>

        <div className="rounded-2xl border border-slate-700/80 bg-slate-900/65 p-5 shadow-[0_14px_40px_rgba(15,23,42,0.22)] backdrop-blur-xl">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search grievances..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  resetPage();
                }}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-2.5 pl-10 pr-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:bg-slate-800 focus:ring-4 focus:ring-cyan-500/20"
              />
            </div>

            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                resetPage();
              }}
              className="rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:bg-slate-800 focus:ring-4 focus:ring-cyan-500/20"
            >
              <option value="">All Status</option>
              <option value="submitted">Submitted</option>
              <option value="assigned">Assigned</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={priority}
              onChange={(e) => {
                setPriority(e.target.value);
                resetPage();
              }}
              className="rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:bg-slate-800 focus:ring-4 focus:ring-cyan-500/20"
            >
              <option value="">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>

            <select
              value={sentiment}
              onChange={(e) => {
                setSentiment(e.target.value);
                resetPage();
              }}
              className="rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:bg-slate-800 focus:ring-4 focus:ring-cyan-500/20"
            >
              <option value="">All Sentiment</option>
              <option value="Positive">Positive</option>
              <option value="Neutral">Neutral</option>
              <option value="Concerned">Concerned</option>
              <option value="Frustrated">Frustrated</option>
              <option value="Negative">Negative</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900/70 shadow-[0_18px_45px_rgba(15,23,42,0.32)] backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-slate-100">
              <thead className="border-b border-slate-700 bg-slate-800/90">
                <tr>
                  <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-[0.12em] text-slate-300">No</th>
                  <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-[0.12em] text-slate-300">Title</th>
                  <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-[0.12em] text-slate-300">Priority</th>
                  <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-[0.12em] text-slate-300">Severity</th>
                  <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-[0.12em] text-slate-300">Sentiment</th>
                  <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-[0.12em] text-slate-300">Verdict</th>
                  <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-[0.12em] text-slate-300">Status</th>
                  <th className="px-5 py-3.5 text-center text-xs font-bold uppercase tracking-[0.12em] text-slate-300">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-700/80">
                {paginatedGrievances.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-14 text-center">
                      <div className="text-sm font-semibold text-slate-100">No grievances found</div>
                      <div className="mt-1 text-xs text-slate-400">Try changing your search or filters.</div>
                    </td>
                  </tr>
                ) : (
                  paginatedGrievances.map((g) => (
                    <tr key={g.id} className="transition hover:bg-slate-800/80">
                      <td className="whitespace-nowrap px-5 py-4">
                        <span className="font-mono text-sm font-medium text-slate-200">
                          {g.grievance_no}
                        </span>
                      </td>

                      <td className="max-w-[320px] px-5 py-4">
                        <div className="truncate text-sm font-semibold text-white" title={g.title}>
                          {g.title}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${priorityColor(
                            g.priority,
                          )}`}
                        >
                          {g.priority ?? "Low"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-semibold text-slate-200">
                          {g.severity_score ?? 0}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-sm text-slate-300">
                          {g.sentiment ?? "—"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${verdictColor(
                            g.verdict,
                          )}`}
                        >
                          {g.verdict ?? "—"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <Badge status={g.status} />
                      </td>

                      <td className="px-5 py-4 text-center">
                        <Link
                          to={`/admin/grievances/${g.id}`}
                          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 p-2.5 text-white shadow-md shadow-indigo-200 transition hover:scale-[1.04] hover:shadow-lg"
                          title="View grievance"
                        >
                          <Eye size={17} />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {filtered.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-slate-700 bg-slate-800/80 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-300">
                Showing <span className="font-bold text-white">{startItem}</span> to <span className="font-bold text-white">{endItem}</span> of <span className="font-bold text-white">{filtered.length}</span> grievances
              </p>

              {totalPages > 1 && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                    title="Previous page"
                  >
                    <ChevronLeft size={17} />
                  </button>

                  {getPageNumbers().map((page, index) =>
                    page === "..." ? (
                      <span
                        key={`ellipsis-${index}`}
                        className="flex h-9 w-9 items-center justify-center text-sm text-slate-400"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`h-9 min-w-9 rounded-lg px-2 text-sm font-medium transition ${
                          currentPage === page
                            ? "bg-blue-600 text-white shadow-sm"
                            : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                    title="Next page"
                  >
                    <ChevronRight size={17} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DepartmentGrievances;
