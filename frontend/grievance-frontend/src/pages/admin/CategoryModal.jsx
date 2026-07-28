import { useEffect, useState } from "react";

import {
  createCategory,
  updateCategory,
} from "../../services/categories/category.service";

import useDepartments from "../../hooks/useDepartments";

function CategoryModal({ open, onClose, onSuccess, category = null }) {
  const { departments } = useDepartments();

  const [form, setForm] = useState({
    department_id: "",
    category_name: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setForm({
        department_id: category.department_id || "",
        category_name: category.category_name || "",
        description: category.description || "",
      });
    } else {
      setForm({
        department_id: "",
        category_name: "",
        description: "",
      });
    }

    setErrors({});
  }, [category, open]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const temp = {};

    if (!form.department_id) temp.department_id = "Department is required.";

    if (!form.category_name.trim())
      temp.category_name = "Category name is required.";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      if (category) {
        await updateCategory(category.id, form);
      } else {
        await createCategory(form);
      }

      onSuccess();

      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-xl rounded-xl bg-white shadow-xl">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold">
            {category ? "Edit Category" : "Add Category"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label className="mb-1 block text-sm font-medium">Department</label>

            <select
              name="department_id"
              value={form.department_id}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            >
              <option value="">Select Department</option>

              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.department_name}
                </option>
              ))}
            </select>

            {errors.department_id && (
              <p className="mt-1 text-sm text-red-600">
                {errors.department_id}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Category Name
            </label>

            <input
              type="text"
              name="category_name"
              value={form.category_name}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />

            {errors.category_name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.category_name}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Description
            </label>

            <textarea
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
              placeholder="Enter category description"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border px-5 py-2 hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : category ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoryModal;
