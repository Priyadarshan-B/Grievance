import { useEffect, useState } from "react";

import {
  createDepartment,
  updateDepartment,
} from "../../services/departments/department.service";

function DepartmentModal({ open, onClose, onSuccess, department = null }) {
  const [form, setForm] = useState({
    department_name: "",
    department_code: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (department) {
      setForm({
        department_name: department.department_name || "",
        department_code: department.department_code || "",
        email: department.email || "",
        phone: department.phone || "",
      });
    } else {
      setForm({
        department_name: "",
        department_code: "",
        email: "",
        phone: "",
      });
    }

    setErrors({});
  }, [department, open]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const temp = {};

    if (!form.department_name.trim())
      temp.department_name = "Department name is required.";

    if (!form.department_code.trim())
      temp.department_code = "Department code is required.";

    if (!form.email.trim()) temp.email = "Email is required.";

    if (!form.phone.trim()) temp.phone = "Phone number is required.";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      if (department) {
        await updateDepartment(department.id, form);
      } else {
        await createDepartment(form);
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
            {department ? "Edit Department" : "Add Department"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Department Name
            </label>

            <input
              type="text"
              name="department_name"
              value={form.department_name}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />

            {errors.department_name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.department_name}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Department Code
            </label>

            <input
              type="text"
              name="department_code"
              value={form.department_code}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />

            {errors.department_code && (
              <p className="mt-1 text-sm text-red-600">
                {errors.department_code}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Phone</label>

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />

            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : department ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DepartmentModal;
