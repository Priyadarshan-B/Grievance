import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import useCategories from "../../hooks/useCategories";
import { useCreateGrievance } from "../../hooks/useCreateGrievance";
import { useUploadAttachment } from "../../hooks/useUploadAttachment";

function GrievanceForm() {
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { categories, loading, error } = useCategories();

  const createMutation = useCreateGrievance();
  const uploadMutation = useUploadAttachment();

  // Select files
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (!selectedFiles.length) return;

    // Maximum 5 files
    const updatedFiles = [...files, ...selectedFiles].slice(0, 5);

    setFiles(updatedFiles);
  };

  // Remove file
  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit grievance
  const onSubmit = async (formData) => {
    try {
      // Create grievance
      const response = await createMutation.mutateAsync(formData);

      // Backend response:
      // {
      //   success: true,
      //   data: {...}
      // }

      const grievanceId = response.data.id;

      // Upload attachments one by one
      for (const file of files) {
        await uploadMutation.mutateAsync({
          grievanceId,
          file,
        });
      }

      navigate("/user/grievances");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-lg bg-white p-6 shadow"
    >
      {/* Category */}
      <div>
        <label className="mb-2 block font-medium">Category</label>

        <select
          {...register("category_id", {
            required: "Category is required",
          })}
          className="w-full rounded-lg border px-3 py-2"
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.department_name} - {category.category_name}
            </option>
          ))}
        </select>

        <p className="mt-1 text-sm text-red-500">
          {errors.category_id?.message}
        </p>
      </div>

      {/* Title */}
      <div>
        <label className="mb-2 block font-medium">Title</label>

        <input
          type="text"
          {...register("title", {
            required: "Title is required",
          })}
          className="w-full rounded-lg border px-3 py-2"
        />

        <p className="mt-1 text-sm text-red-500">{errors.title?.message}</p>
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block font-medium">Description</label>

        <textarea
          rows={6}
          {...register("description", {
            required: "Description is required",
          })}
          className="w-full rounded-lg border px-3 py-2"
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.description?.message}
        </p>
      </div>

      {/* Attachments */}
      <div>
        <label className="mb-2 block font-medium">Attachments</label>

        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full rounded-lg border px-3 py-2"
          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
        />

        <p className="mt-2 text-sm text-gray-500">
          Maximum 5 files (JPG, PNG, PDF, DOC, DOCX)
        </p>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium">📎 {file.name}</p>

                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={createMutation.isPending || uploadMutation.isPending}
        className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {createMutation.isPending || uploadMutation.isPending
          ? "Submitting..."
          : "Submit Grievance"}
      </button>
    </form>
  );
}

export default GrievanceForm;
