import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";

import Loader from "../../components/common/Loader";
import useDepartments from "../../hooks/useDepartments";

import {
  deleteDepartment,
  updateDepartmentStatus,
} from "../../services/departments/department.service";

import DepartmentModal from "../../components/admin/DepartmentModal";
import DeleteConfirmModal from "../../components/admin/DeleteConfirmModal";
import DepartmentTable from "../../components/admin/DepartmentTable";

function Departments() {
  const { departments, loading, error, refresh } = useDepartments();

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const [departmentToDelete, setDepartmentToDelete] = useState(null);

  const filteredDepartments = useMemo(() => {
    const keyword = search.toLowerCase();

    return departments.filter((department) => {
      return (
        department.department_name.toLowerCase().includes(keyword) ||
        department.department_code.toLowerCase().includes(keyword) ||
        department.email.toLowerCase().includes(keyword)
      );
    });
  }, [departments, search]);

  const handleAdd = () => {
    setSelectedDepartment(null);
    setModalOpen(true);
  };

  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setModalOpen(true);
  };

  const handleDeleteClick = (department) => {
    setDepartmentToDelete(department);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);

      await deleteDepartment(departmentToDelete.id);

      setDeleteModal(false);

      setDepartmentToDelete(null);

      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete department.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleStatusChange = async (id, is_active) => {
    try {
      await updateDepartmentStatus(id, is_active);

      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status.");
    }
  };

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
        <h1 className="text-3xl font-bold">Departments</h1>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Department
        </button>
      </div>

      <div className="rounded-xl bg-white p-5 shadow">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />

          <input
            type="text"
            placeholder="Search department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border py-2 pl-10 pr-3 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <DepartmentTable
        departments={filteredDepartments}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onStatusChange={handleStatusChange}
      />
      <DepartmentModal
        open={modalOpen}
        department={selectedDepartment}
        onClose={() => {
          setModalOpen(false);
          setSelectedDepartment(null);
        }}
        onSuccess={refresh}
      />

      <DeleteConfirmModal
        open={deleteModal}
        loading={deleteLoading}
        title="Delete Department"
        message={
          departmentToDelete
            ? `Are you sure you want to delete "${departmentToDelete.department_name}"?`
            : "Are you sure you want to delete this department?"
        }
        onClose={() => {
          setDeleteModal(false);
          setDepartmentToDelete(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default Departments;
