import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useCreateGrievance } from "../../hooks/useCreateGrievance";
import { useUploadAttachment } from "../../hooks/useUploadAttachment";

function GrievanceForm() {
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [aiResult, setAiResult] = useState(null);
  const [submissionStage, setSubmissionStage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const createMutation = useCreateGrievance();
  const uploadMutation = useUploadAttachment();

  // Select files
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (!selectedFiles.length) return;

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
      setSubmissionStage("Analyzing grievance with AI...");

      const response = await createMutation.mutateAsync(formData);

      const grievance = response.data.grievance;
      const ai = response.data.ai;
      const trustScore = response.data.trustScore;

      if (files.length > 0) {
        setSubmissionStage(`Uploading attachments (0/${files.length})...`);

        for (let i = 0; i < files.length; i++) {
          setSubmissionStage(
            `Uploading attachments (${i + 1}/${files.length})...`,
          );

          await uploadMutation.mutateAsync({
            grievanceId: grievance.id,
            file: files[i],
          });
        }
      }

      setSubmissionStage("Finalizing grievance...");

      setAiResult({
        grievance,
        ai,
        trustScore,
      });

      reset();
      setFiles([]);
      setSubmissionStage("");
    } catch (err) {
      console.error(err);
      setSubmissionStage("");

      alert(err?.response?.data?.message || "Failed to submit grievance.");
    }
  };

  return (
    <>
      {/* AI Result */}
      {aiResult && (
        <div className="mb-6 rounded-xl border border-green-300 bg-green-50 p-6 shadow">
          <h2 className="text-2xl font-bold text-green-700">
            ✅ Grievance Submitted Successfully
          </h2>

          <p className="mt-3">
            <strong>Grievance No:</strong> {aiResult.grievance.grievance_no}
          </p>

          <p>
            <strong>Status:</strong> {aiResult.grievance.status}
          </p>

          <hr className="my-5" />

          <h3 className="text-xl font-semibold">🤖 AI Analysis</h3>

          <div className="mt-4 space-y-4">
            <div>
              <p className="font-semibold">Summary</p>

              <p className="text-gray-700">{aiResult.ai.summary}</p>
            </div>

            <div>
              <p className="font-semibold">Verdict</p>

              <span
                className={`rounded-full px-4 py-1 text-sm font-semibold ${
                  aiResult.ai.verdict === "GENUINE"
                    ? "bg-green-100 text-green-700"
                    : aiResult.ai.verdict === "QUESTIONABLE"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {aiResult.ai.verdict}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-white p-4 shadow">
                <p className="text-gray-500">Spam Score</p>

                <h2 className="text-2xl font-bold">
                  {aiResult.ai.spam_score}%
                </h2>
              </div>

              <div className="rounded-lg bg-white p-4 shadow">
                <p className="text-gray-500">Abuse Score</p>

                <h2 className="text-2xl font-bold">
                  {aiResult.ai.abuse_score}%
                </h2>
              </div>

              <div className="rounded-lg bg-white p-4 shadow">
                <p className="text-gray-500">Legitimacy</p>

                <h2 className="text-2xl font-bold text-green-600">
                  {aiResult.ai.legitimacy_score}%
                </h2>
              </div>

              <div className="rounded-lg bg-white p-4 shadow">
                <p className="text-gray-500">Trust Score</p>

                <h2 className="text-2xl font-bold text-blue-600">
                  {aiResult.trustScore}/100
                </h2>
              </div>
            </div>

            <div>
              <p className="font-semibold">Sentiment</p>

              <p>{aiResult.ai.sentiment}</p>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                onClick={() => navigate("/user/grievances")}
                className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
              >
                View My Grievances
              </button>

              <button
                onClick={() => setAiResult(null)}
                className="rounded-lg border border-gray-300 px-5 py-2 hover:bg-gray-100"
              >
                Submit Another
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      {!aiResult && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 rounded-lg bg-white p-6 shadow"
        >
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

          <button
            type="submit"
            disabled={createMutation.isPending || uploadMutation.isPending}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {createMutation.isPending || uploadMutation.isPending ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />

                <span>{submissionStage || "Processing..."}</span>
              </>
            ) : (
              "Submit Grievance"
            )}
          </button>
        </form>
      )}
    </>
  );
}

export default GrievanceForm;
