import { useMemo, useState, useEffect } from "react";
import {
  Search,
  Eye,
  XCircle,
  FileText,
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { useMyGrievances } from "../../hooks/useMyGrievances";

import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import Badge from "../../components/common/Badge";

function MyGrievances() {
  const { data, isLoading, error } = useMyGrievances();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  const grievances = data?.data || [];

  // ==========================================
  // Reset pagination when search changes
  // ==========================================

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // ==========================================
  // Filter
  // ==========================================

  const filteredGrievances = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return grievances;
    }

    return grievances.filter((item) => {
      return (
        item.grievance_no?.toLowerCase().includes(query) ||
        item.title?.toLowerCase().includes(query) ||
        item.category_name?.toLowerCase().includes(query) ||
        item.department_name?.toLowerCase().includes(query) ||
        item.status?.toLowerCase().includes(query)
      );
    });
  }, [grievances, search]);

  // ==========================================
  // Pagination
  // ==========================================

  const totalPages = Math.ceil(filteredGrievances.length / ITEMS_PER_PAGE);

  const paginatedGrievances = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredGrievances.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredGrievances, currentPage]);

  const startItem =
    filteredGrievances.length === 0
      ? 0
      : (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredGrievances.length,
  );

  // ==========================================
  // Loading
  // ==========================================

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  // ==========================================
  // Error
  // ==========================================

  if (error) {
    return (
      <div className="rounded-2xl border border-red-400/30 bg-gradient-to-br from-red-950/60 to-slate-800/80 p-6 shadow-lg shadow-red-950/20">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-400/30 bg-red-500/15">
            <XCircle className="text-red-300" size={21} />
          </div>

          <div>
            <h2 className="font-semibold text-red-100">
              Failed to load grievances
            </h2>

            <p className="mt-1 text-sm text-red-200">
              {error?.response?.data?.message ||
                error?.message ||
                "Something went wrong while fetching grievances."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // Page Number Helper
  // ==========================================

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
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
    <div className="min-h-screen bg-[#0B0F19] text-slate-100">
      <div className="space-y-6 p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-cyan-400/30 border-t-2 border-t-cyan-400/80 bg-gradient-to-br from-cyan-950/70 via-[#1E293B] to-violet-950/30 p-5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/40 bg-cyan-500/20 text-cyan-200 shadow-lg shadow-cyan-500/20">
                  <FileText size={22} />
                </div>

                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-white">
                    My Grievances
                  </h1>

                  <p className="mt-1 text-sm text-slate-300">
                    View and track all grievances you have submitted.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative w-full lg:w-96">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search grievances..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/60 py-3 pl-11 pr-4 text-sm text-white shadow-inner shadow-slate-950/30 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-4 focus:ring-cyan-500/20"
              />
            </div>
          </div>
        </motion.div>

        {filteredGrievances.length > 0 && (
          <div className="flex flex-col gap-3 rounded-2xl border border-emerald-400/25 bg-gradient-to-r from-emerald-950/50 to-cyan-950/40 px-5 py-4 text-slate-100 shadow-[0_12px_30px_rgba(8,145,178,0.12)] sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">
                {filteredGrievances.length}{" "}
                {filteredGrievances.length === 1 ? "grievance" : "grievances"}
              </p>

              <p className="mt-0.5 text-xs text-slate-300">
                Your submitted grievance history
              </p>
            </div>

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-left text-sm font-medium text-cyan-300 hover:text-cyan-200 sm:text-right"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {!filteredGrievances.length ? (
          <div className="rounded-3xl border border-amber-400/25 bg-gradient-to-br from-amber-950/35 to-slate-800/80 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.55)]">
            <EmptyState
              title="No grievances found"
              description={
                search
                  ? "No grievances match your search."
                  : "You haven't submitted any grievances yet."
              }
            />
          </div>
        ) : (
          <>
            <div className="hidden overflow-hidden rounded-3xl border border-[#334155] border-t-2 border-t-violet-400/70 bg-gradient-to-br from-violet-950/20 to-[#1E293B] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] lg:block">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-[#334155] bg-slate-900/80">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">
                        Grievance
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">
                        Department
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">
                        Status
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">
                        Submitted
                      </th>

                      <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-300">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#334155]/60">
                    {paginatedGrievances.map((item) => (
                      <tr
                        key={item.id}
                        className="group transition hover:bg-cyan-950/30"
                      >
                        <td className="max-w-[420px] px-6 py-5">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-400/20">
                              <FileText size={17} />
                            </div>

                            <div className="min-w-0">
                              <p
                                className="truncate text-sm font-semibold text-white"
                                title={item.title}
                              >
                                {item.title}
                              </p>

                              <p className="mt-1 font-mono text-xs text-slate-400">
                                {item.grievance_no || "—"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-6 py-5">
                          <div className="flex items-center gap-2 text-sm text-slate-200">
                            <Building2 size={16} className="text-slate-400" />

                            <span>{item.department_name || "Not assigned"}</span>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <Badge status={item.status} />
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-sm text-slate-300">
                            <CalendarDays size={16} className="text-slate-400" />

                            <span>
                              {item.submitted_at
                                ? new Date(item.submitted_at).toLocaleDateString(
                                    undefined,
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    },
                                  )
                                : "—"}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-5 text-center">
                          <Link
                            to={`/user/grievances/${item.id}`}
                            className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-2 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-500/20"
                          >
                            <Eye size={16} />
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <PaginationBar
                startItem={startItem}
                endItem={endItem}
                totalItems={filteredGrievances.length}
                currentPage={currentPage}
                totalPages={totalPages}
                getPageNumbers={getPageNumbers}
                setCurrentPage={setCurrentPage}
              />
            </div>

            <div className="grid gap-4 lg:hidden">
              {paginatedGrievances.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl border border-[#334155] border-t-2 border-t-violet-400/70 bg-gradient-to-br from-violet-950/20 to-[#1E293B] p-5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-400/20">
                      <FileText size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <p className="font-mono text-xs text-slate-400">
                            {item.grievance_no || "—"}
                          </p>

                          <h3 className="mt-1 font-semibold leading-6 text-white">
                            {item.title}
                          </h3>
                        </div>

                        <Badge status={item.status} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 rounded-2xl border border-amber-400/20 bg-amber-950/20 p-4">
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="flex items-center gap-2 text-slate-400">
                        <Building2 size={15} />
                        Department
                      </span>

                      <span className="text-right font-medium text-slate-100">
                        {item.department_name || "Not assigned"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="flex items-center gap-2 text-slate-400">
                        <CalendarDays size={15} />
                        Submitted
                      </span>

                      <span className="font-medium text-slate-100">
                        {item.submitted_at
                          ? new Date(item.submitted_at).toLocaleDateString(
                              undefined,
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )
                          : "—"}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/user/grievances/${item.id}`}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
                  >
                    <Eye size={16} />
                    View Details
                  </Link>
                </motion.div>
              ))}

              <div className="rounded-3xl border border-[#334155] bg-[#1E293B] p-4 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]">
                <PaginationBar
                  startItem={startItem}
                  endItem={endItem}
                  totalItems={filteredGrievances.length}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  getPageNumbers={getPageNumbers}
                  setCurrentPage={setCurrentPage}
                  mobile
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   PAGINATION
========================================================= */

function PaginationBar({
  startItem,
  endItem,
  totalItems,
  currentPage,
  totalPages,
  getPageNumbers,
  setCurrentPage,
  mobile = false,
}) {
  return (
    <div
      className={`flex flex-col gap-4 ${
        mobile
          ? ""
          : "border-t border-[#334155] bg-slate-900/50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
      }`}
    >
      <p className="text-sm text-slate-400">
        Showing{" "}
        <span className="font-semibold text-slate-200">{startItem}</span> to{" "}
        <span className="font-semibold text-slate-200">{endItem}</span> of{" "}
        <span className="font-semibold text-slate-200">{totalItems}</span>{" "}
        grievances
      </p>

      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-2 sm:justify-end">
          {/* Previous */}

          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#475569] bg-slate-800 text-slate-200 transition hover:border-cyan-400/60 hover:bg-cyan-500/15 disabled:cursor-not-allowed disabled:opacity-40"
            title="Previous page"
          >
            <ChevronLeft size={17} />
          </button>

          {/* Page Numbers */}

          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span
                  key={`ellipsis-${index}`}
                  className="flex h-9 w-8 items-center justify-center text-sm text-slate-400"
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
                      ? "bg-cyan-400 text-slate-950 shadow-sm shadow-cyan-500/25"
                      : "border border-[#475569] bg-slate-800 text-slate-200 hover:border-cyan-400/60 hover:bg-cyan-500/15"
                  }`}
                >
                  {page}
                </button>
              ),
            )}
          </div>

          {/* Next */}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((page) => Math.min(page + 1, totalPages))
            }
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#475569] bg-slate-800 text-slate-200 transition hover:border-cyan-400/60 hover:bg-cyan-500/15 disabled:cursor-not-allowed disabled:opacity-40"
            title="Next page"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      )}
    </div>
  );
}

export default MyGrievances;
