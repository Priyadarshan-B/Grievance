import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";

import Loader from "../../components/common/Loader";

import useCategories from "../../hooks/useCategories";

import {
  deleteCategory,
  updateCategoryStatus,
} from "../../services/categories/category.service";

import CategoryModal from "../../components/admin/CategoryModal";
import CategoryTable from "../../components/admin/CategoryTable";
import DeleteConfirmModal from "../../components/admin/DeleteConfirmModal";

function Categories() {
  const {
    categories,
    loading,
    error,
    refresh,
  } = useCategories();

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState(null);

  const [deleteModal, setDeleteModal] =
    useState(false);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  const [categoryToDelete, setCategoryToDelete] =
    useState(null);

  const filteredCategories = useMemo(() => {
    const keyword = search.toLowerCase();

    return categories.filter((category) => {
      return (
        category.category_name
          .toLowerCase()
          .includes(keyword) ||
        category.department_name
          .toLowerCase()
          .includes(keyword) ||
        (category.description || "")
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [categories, search]);

  const handleAdd = () => {
    setSelectedCategory(null);
    setModalOpen(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setModalOpen(true);
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);

      await deleteCategory(categoryToDelete.id);

      setDeleteModal(false);

      setCategoryToDelete(null);

      refresh();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to delete category."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleStatusChange = async (
    id,
    is_active
  ) => {
    try {
      await updateCategoryStatus(id, is_active);

      refresh();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to update category status."
      );
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

        <h1 className="text-3xl font-bold">
          Categories
        </h1>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Category
        </button>

      </div>

      <div className="rounded-xl bg-white p-5 shadow">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-lg border py-2 pl-10 pr-3 focus:border-blue-500 focus:outline-none"
          />

        </div>

      </div>

      <CategoryTable
        categories={filteredCategories}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onStatusChange={handleStatusChange}
      />

            <CategoryModal
        open={modalOpen}
        category={selectedCategory}
        onClose={() => {
          setModalOpen(false);
          setSelectedCategory(null);
        }}
        onSuccess={refresh}
      />

      <DeleteConfirmModal
        open={deleteModal}
        loading={deleteLoading}
        title="Delete Category"
        message={
          categoryToDelete
            ? `Are you sure you want to delete "${categoryToDelete.category_name}"?`
            : "Are you sure you want to delete this category?"
        }
        onClose={() => {
          setDeleteModal(false);
          setCategoryToDelete(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default Categories;