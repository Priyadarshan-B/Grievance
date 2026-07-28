import { useMemo, useState, useEffect } from "react";
import { Search, Eye, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

import { useMyGrievances } from "../../hooks/useMyGrievances";

import Pagination from "../../components/common/Pagination";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import Badge from "../../components/common/Badge";

function MyGrievances() {
  const { data, isLoading, error } = useMyGrievances();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  const grievances = data?.data || [];

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filteredGrievances = useMemo(() => {
    if (!search.trim()) return grievances;

    const query = search.toLowerCase();

    return grievances.filter((item) => {
      return (
        item.title?.toLowerCase().includes(query) ||
        item.category_name?.toLowerCase().includes(query) ||
        item.department_name?.toLowerCase().includes(query) ||
        item.status?.toLowerCase().includes(query)
      );
    });
  }, [grievances, search]);

  const totalPages = Math.ceil(
    filteredGrievances.length / ITEMS_PER_PAGE
  );

  const paginatedGrievances = filteredGrievances.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-center gap-3">
          <XCircle className="text-red-600" size={22} />

          <div>
            <h2 className="font-semibold text-red-700">
              Failed to load grievances
            </h2>

            <p className="mt-1 text-sm text-red-600">
              {error?.response?.data?.message ||
                error?.message ||
                "Something went wrong while fetching grievances."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            My Grievances
          </h1>

          <p className="mt-1 text-slate-500">
            View and track all grievances you have submitted.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search grievances..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Empty State */}

      {!filteredGrievances.length ? (
        <EmptyState
          title="No grievances found"
          description={
            search
              ? "No grievances match your search."
              : "You haven't submitted any grievances yet."
          }
        />
      ) : (
        <>
          {/* Desktop Table */}

          <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm lg:block">
            <table className="w-full">
              <thead className="border-b bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                    Title
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                    Category
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                    Department
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                    Submitted
                  </th>

                  <th className="px-5 py-4 text-center text-sm font-semibold text-slate-700">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedGrievances.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4 font-medium text-slate-800">
                      {item.title}
                    </td>

                    <td className="px-5 py-4">
                      {item.category_name}
                    </td>

                    <td className="px-5 py-4">
                      {item.department_name || "-"}
                    </td>

                    <td className="px-5 py-4">
                      <Badge status={item.status} />
                    </td>

                    <td className="px-5 py-4">
                      {item.submitted_at
                        ? new Date(
                            item.submitted_at
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="px-5 py-4 text-center">
                      <Link
                        to={`/grievances/${item.id}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
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

          {/* Mobile Cards */}

          <div className="grid gap-4 lg:hidden">
            {paginatedGrievances.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-slate-800">
                    {item.title}
                  </h3>

                  <Badge status={item.status} />
                </div>

                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <p>
                    <span className="font-medium">Category:</span>{" "}
                    {item.category_name}
                  </p>

                  <p>
                    <span className="font-medium">Department:</span>{" "}
                    {item.department_name || "-"}
                  </p>

                  <p>
                    <span className="font-medium">Submitted:</span>{" "}
                    {item.submitted_at
                      ? new Date(
                          item.submitted_at
                        ).toLocaleDateString()
                      : "-"}
                  </p>
                </div>

                <Link
                  to={`/grievances/${item.id}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
                >
                  <Eye size={16} />
                  View Details
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination */}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export default MyGrievances;