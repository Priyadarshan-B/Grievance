import { Edit, Trash2, Power, PowerOff } from "lucide-react";

function CategoryTable({ categories, onEdit, onDelete, onStatusChange }) {
  if (categories.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow">
        <p className="text-gray-500">No categories found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left">Department</th>

            <th className="px-4 py-3 text-left">Category</th>

            <th className="px-4 py-3 text-left">Description</th>

            <th className="px-4 py-3 text-center">Status</th>

            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-3">{category.department_name}</td>

              <td className="px-4 py-3 font-medium">
                {category.category_name}
              </td>

              <td className="px-4 py-3">{category.description || "-"}</td>

              <td className="px-4 py-3 text-center">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    Number(category.is_active)
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {Number(category.is_active) ? "Active" : "Inactive"}
                </span>
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(category)}
                    className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() =>
                      onStatusChange(
                        category.id,
                        Number(category.is_active) ? 0 : 1,
                      )
                    }
                    className={`rounded-lg p-2 text-white ${
                      Number(category.is_active)
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                    title={
                      Number(category.is_active) ? "Deactivate" : "Activate"
                    }
                  >
                    {Number(category.is_active) ? (
                      <PowerOff size={18} />
                    ) : (
                      <Power size={18} />
                    )}
                  </button>

                  <button
                    onClick={() => onDelete(category)}
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

export default CategoryTable;
