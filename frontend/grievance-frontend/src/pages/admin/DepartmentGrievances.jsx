import { useMemo, useState } from "react";
import { Eye, Search } from "lucide-react";
import { Link } from "react-router-dom";

import Loader from "../../components/common/Loader";
import Badge from "../../components/common/Badge";
import useDepartmentGrievances from "../../hooks/useDepartmentGrievances";

function DepartmentGrievances() {
  const { grievances, loading, error } = useDepartmentGrievances();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const filtered = useMemo(() => {
    const keyword = search.toLowerCase();
    console.log(grievances);

    return grievances.filter((g) => {
      const matchesSearch =
        (g.grievance_no ?? "").toLowerCase().includes(keyword) ||
        (g.title ?? "").toLowerCase().includes(keyword) ||
        (g.full_name ?? g.student_name ?? "").toLowerCase().includes(keyword);

      const matchesStatus = status === "" || g.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [grievances, search, status]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Department Grievances</h1>

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          {filtered.length} Grievances
        </span>
      </div>

      <div className="rounded-xl bg-white p-5 shadow">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />

            <input
              type="text"
              placeholder="Search grievance..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border py-2 pl-10 pr-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border p-2 focus:border-blue-500 focus:outline-none"
          >
            <option value="">All Status</option>
            <option value="submitted">Submitted</option>
            <option value="assigned">Assigned</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left">No</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Priority</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Submitted</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-10 text-center text-gray-500">
                  No grievances found.
                </td>
              </tr>
            ) : (
              filtered.map((g) => (
                <tr key={g.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{g.grievance_no}</td>

                  <td className="px-4 py-3 font-medium">{g.title}</td>

                  <td className="px-4 py-3">{g.category_name}</td>

                  <td className="px-4 py-3">
                    <span className="capitalize">{g.priority}</span>
                  </td>

                  <td className="px-4 py-3">
                    <Badge status={g.status} />
                  </td>

                  <td className="px-4 py-3">{g.full_name || g.student_name}</td>

                  <td className="px-4 py-3">
                    {new Date(g.submitted_at).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <Link
                      to={`/admin/grievances/${g.id}`}
                      className="inline-flex rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                    >
                      <Eye size={18} />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DepartmentGrievances;
