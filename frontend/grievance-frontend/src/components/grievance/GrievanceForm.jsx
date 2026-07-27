import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useCategories } from "../../hooks/useCategories";
import { useCreateGrievance } from "../../hooks/useCreateGrievance";

function GrievanceForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: categories, isLoading } = useCategories();

  const createMutation = useCreateGrievance();

  const onSubmit = (formData) => {
    createMutation.mutate(formData, {
      onSuccess: () => {
        navigate("/user/grievances");
      },
    });
  };

  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg shadow p-6 space-y-5"
    >
      <div>
        <label className="block mb-2 font-medium">Category</label>

        <select
          {...register("category_id", {
            required: "Category is required",
          })}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Select Category</option>

          {categories?.data?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.department_name} - {category.category_name}
            </option>
          ))}
        </select>

        <p className="text-red-500 text-sm mt-1">
          {errors.category_id?.message}
        </p>
      </div>

      <div>
        <label className="block mb-2 font-medium">Title</label>

        <input
          type="text"
          {...register("title", {
            required: "Title is required",
          })}
          className="w-full border rounded-lg px-3 py-2"
        />

        <p className="text-red-500 text-sm mt-1">{errors.title?.message}</p>
      </div>

      <div>
        <label className="block mb-2 font-medium">Description</label>

        <textarea
          rows={6}
          {...register("description", {
            required: "Description is required",
          })}
          className="w-full border rounded-lg px-3 py-2"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.description?.message}
        </p>
      </div>

      <button
        type="submit"
        disabled={createMutation.isPending}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {createMutation.isPending ? "Submitting..." : "Submit Grievance"}
      </button>
    </form>
  );
}

export default GrievanceForm;
