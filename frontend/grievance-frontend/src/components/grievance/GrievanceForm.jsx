import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, FileUp, ShieldCheck, Sparkles } from "lucide-react";

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

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (!selectedFiles.length) return;

    const updatedFiles = [...files, ...selectedFiles].slice(0, 5);

    setFiles(updatedFiles);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

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
      {aiResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-emerald-400/30 bg-[linear-gradient(135deg,rgba(16,185,129,0.18),rgba(15,118,110,0.08),rgba(15,23,42,0.8))] p-6 shadow-[0_20px_60px_rgba(16,185,129,0.15)] backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/40">
              <CheckCircle2 className="h-6 w-6" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                Grievance Submitted Successfully
              </h2>
              <p className="text-sm text-emerald-100">
                Your submission has been received and reviewed by the AI system.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 text-sm text-slate-200 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
              <p className="text-slate-400">Grievance No:</p>
              <p className="mt-1 font-semibold text-white">
                {aiResult.grievance.grievance_no}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
              <p className="text-slate-400">Status:</p>
              <p className="mt-1 font-semibold text-white">
                {aiResult.grievance.status}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/40 p-5">
            <div className="mb-4 flex items-center gap-2 text-white">
              <Sparkles className="h-5 w-5 text-cyan-300" />
              <h3 className="text-xl font-semibold">AI Analysis</h3>
            </div>

            <div className="space-y-5 text-slate-200">
              <div>
                <p className="mb-1 font-medium text-slate-300">Summary</p>
                <p>{aiResult.ai.summary}</p>
              </div>

              <div>
                <p className="mb-2 font-medium text-slate-300">Verdict</p>
                <span
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                    aiResult.ai.verdict === "GENUINE"
                      ? "bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/30"
                      : aiResult.ai.verdict === "QUESTIONABLE"
                        ? "bg-yellow-500/20 text-yellow-200 ring-1 ring-yellow-400/30"
                        : "bg-red-500/20 text-red-200 ring-1 ring-red-400/30"
                  }`}
                >
                  {aiResult.ai.verdict}
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-slate-400">Spam Score</p>
                  <h2 className="mt-2 text-2xl font-bold text-white">
                    {aiResult.ai.spam_score}%
                  </h2>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-slate-400">Abuse Score</p>
                  <h2 className="mt-2 text-2xl font-bold text-white">
                    {aiResult.ai.abuse_score}%
                  </h2>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-slate-400">Legitimacy</p>
                  <h2 className="mt-2 text-2xl font-bold text-emerald-300">
                    {aiResult.ai.legitimacy_score}%
                  </h2>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-slate-400">Trust Score</p>
                  <h2 className="mt-2 text-2xl font-bold text-cyan-300">
                    {aiResult.trustScore}/100
                  </h2>
                </div>
              </div>

              <div>
                <p className="mb-1 font-medium text-slate-300">Sentiment</p>
                <p>{aiResult.ai.sentiment}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => navigate("/user/grievances")}
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
            >
              View My Grievances
            </button>

            <button
              onClick={() => setAiResult(null)}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 font-medium text-slate-100 transition hover:bg-white/10"
            >
              Submit Another
            </button>
          </div>
        </motion.div>
      )}

      {!aiResult && (
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5 rounded-3xl border border-white/20 bg-slate-950/40 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.6)] backdrop-blur-xl"
        >
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/20">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white">Submit grievance</h2>
              <p className="text-sm text-slate-300">Add details below</p>
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-200">Title</label>
            <input
              type="text"
              {...register("title", {
                required: "Title is required",
              })}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/20"
              placeholder="Brief issue title"
            />
            <p className="mt-1 text-sm text-red-300">{errors.title?.message}</p>
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-200">
              Description
            </label>
            <textarea
              rows={6}
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/20"
              placeholder="Describe the issue in detail..."
            />
            <p className="mt-1 text-sm text-red-300">
              {errors.description?.message}
            </p>
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-200">
              Attachments
            </label>

            <div className="rounded-2xl border border-dashed border-cyan-400/40 bg-slate-900/50 p-4">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full cursor-pointer text-sm text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-cyan-500/20 file:px-4 file:py-2 file:text-cyan-200 file:shadow-none"
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
              />
            </div>

            <p className="mt-2 text-sm text-slate-400">
              Maximum 5 files (JPG, PNG, PDF, DOC, DOCX)
            </p>

            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
                        <FileUp className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="font-medium text-white">{file.name}</p>
                        <p className="text-xs text-slate-400">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="rounded-xl bg-red-500/15 px-3 py-1.5 text-sm font-medium text-red-200 transition hover:bg-red-500/25"
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
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
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
        </motion.form>
      )}
    </>
  );
}

export default GrievanceForm;
