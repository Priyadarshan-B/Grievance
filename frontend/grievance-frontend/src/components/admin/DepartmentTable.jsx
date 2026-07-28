import { Edit, Trash2, Power, PowerOff } from "lucide-react";

function DepartmentTable({ departments, onEdit, onDelete, onStatusChange }) {
  if (departments.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow">
        <p className="text-gray-500">No departments found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left">Department</th>
            <th className="px-4 py-3 text-left">Code</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Phone</th>
            <th className="px-4 py-3 text-center">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {departments.map((department) => (
            <tr key={department.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-3 font-medium">
                {department.department_name}
              </td>

              <td className="px-4 py-3">{department.department_code}</td>

              <td className="px-4 py-3">{department.email}</td>

              <td className="px-4 py-3">{department.phone}</td>

              <td className="px-4 py-3 text-center">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    Number(department.is_active)
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {Number(department.is_active) ? "Active" : "Inactive"}
                </span>
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(department)}
                    className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() =>
                      onStatusChange(
                        department.id,
                        Number(department.is_active) ? 0 : 1,
                      )
                    }
                    className={`rounded-lg p-2 text-white ${
                      Number(department.is_active)
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                    title={
                      Number(department.is_active) ? "Deactivate" : "Activate"
                    }
                  >
                    {Number(department.is_active) ? (
                      <PowerOff size={18} />
                    ) : (
                      <Power size={18} />
                    )}
                  </button>

                  <button
                    onClick={() => onDelete(department)}
                    className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentTable;
