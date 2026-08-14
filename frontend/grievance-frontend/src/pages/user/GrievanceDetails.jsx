import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Flag,
  Hash,
  Sparkles,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import Loader from "../../components/common/Loader";
import Badge from "../../components/common/Badge";
import AttachmentList from "../../components/grievance/AttachmentList";
import HistoryTimeline from "../../components/grievance/HistoryTimeline";

import useGrievance from "../../hooks/useGrievance";

function GrievanceDetails() {
  const { id } = useParams();

  const { grievance, loading, error } = useGrievance(id);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100">
              <FileText size={20} className="text-red-600" />
            </div>

            <div>
              <h2 className="font-semibold text-red-700">
                Failed to load grievance
              </h2>

              <p className="mt-1 text-sm text-red-600">{error}</p>
            </div>
          </div>

          <Link
            to="/user/grievances"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <ArrowLeft size={16} />
            Back to My Grievances
          </Link>
        </div>
      </div>
    );
  }

  if (!grievance?.data) {
    return (
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
          <h2 className="font-semibold text-yellow-700">Grievance not found</h2>

          <p className="mt-1 text-sm text-yellow-600">
            The requested grievance could not be found.
          </p>

          <Link
            to="/user/grievances"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <ArrowLeft size={16} />
            Back to My Grievances
          </Link>
        </div>
      </div>
    );
  }

  const grievanceData = grievance.data.grievance;
  const attachments = grievance.data.attachments || [];
  const history = grievance.data.history || [];

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateOnly = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const priorityStyle = (priority) => {
    switch (priority?.toLowerCase()) {
      case "critical":
        return "bg-red-50 text-red-700 ring-red-200";

      case "high":
        return "bg-orange-50 text-orange-700 ring-orange-200";

      case "medium":
        return "bg-yellow-50 text-yellow-700 ring-yellow-200";

      default:
        return "bg-green-50 text-green-700 ring-green-200";
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* ==================================================
          BACK
      ================================================== */}

      <Link
        to="/user/grievances"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
      >
        <ArrowLeft size={17} />
        Back to My Grievances
      </Link>

      {/* ==================================================
          HEADER
      ================================================== */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 via-white to-white px-6 py-7 sm:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 font-mono text-xs font-semibold text-slate-600">
                  <Hash size={13} />
                  {grievanceData.grievance_no}
                </span>

                <Badge status={grievanceData.status} />
              </div>

              <h1 className="mt-4 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                {grievanceData.title}
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Submitted on {formatDate(grievanceData.submitted_at)}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Info */}

        <div className="grid divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <QuickInfo
            icon={<Building2 size={18} />}
            label="Department"
            value={grievanceData.department_name || "Not assigned"}
          />

          <QuickInfo
            icon={<Flag size={18} />}
            label="Priority"
            value={
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ${priorityStyle(
                  grievanceData.priority,
                )}`}
              >
                {grievanceData.priority || "Low"}
              </span>
            }
          />

          <QuickInfo
            icon={<CalendarDays size={18} />}
            label="Submitted"
            value={formatDateOnly(grievanceData.submitted_at)}
          />
        </div>
      </section>

      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* =================================================
            LEFT
        ================================================= */}

        <div className="space-y-6">
          {/* Description */}

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FileText size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Your Grievance
                  </h2>

                  <p className="text-sm text-slate-500">
                    Details submitted with your grievance
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                  {grievanceData.description || "No description provided."}
                </p>
              </div>
            </div>
          </section>

          {/* AI Summary */}

          <section className="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm">
            <div className="border-b border-indigo-100 bg-gradient-to-r from-indigo-50 to-white px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                  <Sparkles size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">AI Summary</h2>

                  <p className="text-sm text-slate-500">
                    Automated summary of your grievance
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-5">
                <p className="text-sm leading-7 text-slate-700">
                  {grievanceData.summary || "AI summary is not available yet."}
                </p>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <SimpleInfo
                  label="Priority"
                  value={
                    <span className="capitalize">
                      {grievanceData.priority || "—"}
                    </span>
                  }
                />

                <SimpleInfo
                  label="Sentiment"
                  value={grievanceData.sentiment || "—"}
                />
              </div>
            </div>
          </section>

          {/* Attachments */}

          {attachments.length > 0 && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <FileText size={19} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Attachments
                    </h2>

                    <p className="text-sm text-slate-500">
                      Files submitted with this grievance
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {attachments.length}
                </span>
              </div>

              <AttachmentList attachments={attachments} />
            </section>
          )}

          {/* History */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <Clock3 size={19} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Grievance Progress
                </h2>

                <p className="text-sm text-slate-500">
                  Track updates and actions taken
                </p>
              </div>
            </div>

            {history.length > 0 ? (
              <HistoryTimeline history={history} />
            ) : (
              <div className="rounded-xl bg-slate-50 p-5 text-center text-sm text-slate-500">
                No updates have been recorded yet.
              </div>
            )}
          </section>
        </div>

        {/* =================================================
            RIGHT SIDEBAR
        ================================================= */}

        <aside className="space-y-6">
          {/* Current Status */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-slate-900">Current Status</h2>

            <div className="mt-4 rounded-xl bg-slate-50 p-5 text-center">
              <Badge status={grievanceData.status} />

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {getStatusMessage(grievanceData.status)}
              </p>
            </div>

            {grievanceData.resolved_at && (
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 size={18} className="text-green-600" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
                    Resolved
                  </p>

                  <p className="mt-0.5 text-sm font-medium text-green-800">
                    {formatDate(grievanceData.resolved_at)}
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* Basic Information */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-slate-900">
              Grievance Information
            </h2>

            <div className="mt-5 space-y-4">
              <DetailRow
                label="Grievance No."
                value={grievanceData.grievance_no || "—"}
              />

              <DetailRow
                label="Department"
                value={grievanceData.department_name || "Not assigned"}
              />

              <DetailRow
                label="Priority"
                value={
                  <span className="capitalize">
                    {grievanceData.priority || "—"}
                  </span>
                }
              />

              <DetailRow
                label="Submitted"
                value={formatDateOnly(grievanceData.submitted_at)}
              />
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function QuickInfo({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 px-6 py-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <div className="mt-1 truncate text-sm font-semibold text-slate-700">
          {value}
        </div>
      </div>
    </div>
  );
}

function SimpleInfo({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <div className="mt-2 text-sm font-semibold text-slate-700">{value}</div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-slate-500">{label}</span>

      <span className="text-right text-sm font-semibold text-slate-700">
        {value}
      </span>
    </div>
  );
}

function getStatusMessage(status) {
  switch (status) {
    case "submitted":
      return "Your grievance has been submitted and is waiting for department review.";

    case "assigned":
      return "Your grievance has been assigned and is being reviewed by the department.";

    case "in_progress":
      return "The department is currently working on your grievance.";

    case "resolved":
      return "Your grievance has been resolved by the department.";

    case "rejected":
      return "Your grievance has been reviewed and marked as rejected.";

    default:
      return "Your grievance status will be updated as it progresses.";
  }
}

export default GrievanceDetails;
