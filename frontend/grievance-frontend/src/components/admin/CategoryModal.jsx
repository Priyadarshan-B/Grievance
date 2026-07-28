import { useEffect, useState } from "react";
import { X } from "lucide-react";

function CategoryModal({
  open,
  onClose,
  onSubmit,
  editData = null,
  departments = [],
}) {
  const [formData, setFormData] = useState({
    department_id: "",
    category_name: "",
    description: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        department_id: editData.department_id || "",
        category_name: editData.category_name || "",
        description: editData.description || "",
      });
    } else {
      setFormData({
        department_id: "",
        category_name: "",
        description: "",
      });
    }
  }, [editData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      department_id: Number(formData.department_id),
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-semibold">
            {editData ? "Edit Category" : "Add Category"}
          </h2>

          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Department
            </label>

            <select
              name="department_id"
              value={formData.department_id}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-3 py-2"
            >
              <option value="">Select Department</option>

              {departments.map((dept) => (
                <option
                  key={dept.department_id}
                  value={dept.department_id}
                >
                  {dept.department_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Category Name
            </label>

            <input
              type="text"
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Enter category name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Enter description"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              {editData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoryModal;