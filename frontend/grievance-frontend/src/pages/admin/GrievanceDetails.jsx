// File: frontend/src/pages/admin/GrievanceDetails.jsx

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Brain,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Flag,
  MessageSquare,
  RefreshCw,
  ShieldCheck,
  User,
  XCircle,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import useGrievance from "../../hooks/useGrievance";
import useDepartmentGrievanceActions from "../../hooks/useDepartmentGrievanceActions";

import Loader from "../../components/common/Loader";
import Badge from "../../components/common/Badge";
import AttachmentList from "../../components/grievance/AttachmentList";
import HistoryTimeline from "../../components/grievance/HistoryTimeline";

import {
  changeDepartment,
  getDepartments,
} from "../../services/grievances/grievance.service";

function GrievanceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { grievance, loading, error, refresh } = useGrievance(id);

  const {
    review,
    resolve,
    reject,
    loading: actionLoading,
  } = useDepartmentGrievanceActions();

  const [remarks, setRemarks] = useState("");

  const [departments, setDepartments] = useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [departmentChangeReason, setDepartmentChangeReason] = useState("");

  const [departmentLoading, setDepartmentLoading] = useState(false);

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        setDepartmentLoading(true);

        const res = await getDepartments();

        setDepartments(res.data.data ?? []);
      } catch (err) {
        console.error("Failed to load departments:", err);
      } finally {
        setDepartmentLoading(false);
      }
    };

    loadDepartments();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl p-6">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          <div className="flex items-center gap-3">
            <XCircle size={22} />
            <div>
              <p className="font-semibold">Unable to load grievance</p>
              <p className="mt-1 text-sm">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const details = grievance?.data?.grievance;
  const attachments = grievance?.data?.attachments ?? [];
  const history = grievance?.data?.history ?? [];

  if (!details) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  const isResolved = details.status === "resolved";
  const isRejected = details.status === "rejected";

  const handleReview = async () => {
    if (!remarks.trim()) {
      return alert(
        "Please enter remarks before marking the grievance under review.",
      );
    }

    try {
      await review(id, {
        remarks: remarks.trim(),
      });

      setRemarks("");

      await refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to update grievance.");
    }
  };

  const handleResolve = async () => {
    if (!remarks.trim()) {
      return alert(
        "Please enter resolution remarks before resolving the grievance.",
      );
    }

    try {
      await resolve(id, {
        remarks: remarks.trim(),
        resolution: remarks.trim(),
      });

      setRemarks("");

      await refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to resolve grievance.");
    }
  };

  const handleReject = async () => {
    if (!remarks.trim()) {
      return alert("Please enter remarks before rejecting the grievance.");
    }

    try {
      await reject(id, {
        remarks: remarks.trim(),
      });

      setRemarks("");

      await refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to reject grievance.");
    }
  };

  const handleDepartmentChange = async () => {
    if (!selectedDepartmentId) {
      return alert("Please select a department.");
    }

    if (!departmentChangeReason.trim()) {
      return alert("Please provide a reason for changing the department.");
    }

    try {
      await changeDepartment(id, {
        department_id: Number(selectedDepartmentId),
        reason: departmentChangeReason.trim(),
      });

      alert("Department updated successfully.");

      setSelectedDepartmentId("");
      setDepartmentChangeReason("");

      await refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update department.");
    }
  };

  const getPriorityStyle = (priority) => {
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

  const getVerdictStyle = (verdict) => {
    switch (verdict) {
      case "GENUINE":
        return "bg-green-50 text-green-700 ring-green-200";

      case "QUESTIONABLE":
        return "bg-yellow-50 text-yellow-700 ring-yellow-200";

      default:
        return "bg-red-50 text-red-700 ring-red-200";
    }
  };

  const getScoreStyle = (score, type) => {
    if (type === "severity") {
      if (score >= 80) {
        return "text-red-600";
      }

      if (score >= 50) {
        return "text-orange-600";
      }

      return "text-green-600";
    }

    if (type === "legitimacy") {
      if (score >= 80) {
        return "text-green-600";
      }

      if (score >= 50) {
        return "text-yellow-600";
      }

      return "text-red-600";
    }

    return "text-slate-900";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100"
                title="Go back"
              >
                <ArrowLeft size={19} />
              </button>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-sm font-semibold text-blue-600">
                    {details.grievance_no}
                  </span>

                  <Badge status={details.status} />

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getPriorityStyle(
                      details.priority,
                    )}`}
                  >
                    {details.priority ?? "Low"} Priority
                  </span>
                </div>

                <h1 className="mt-2 max-w-4xl text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {details.title}
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Submitted {new Date(details.submitted_at).toLocaleString()}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={refresh}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="space-y-6">
            {/* ===============================================
                GRIEVANCE INFORMATION
            =============================================== */}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <FileText size={20} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Grievance Details
                    </h2>

                    <p className="text-sm text-slate-500">
                      Information submitted by the user
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  <InfoItem
                    icon={<User size={17} />}
                    label="User"
                    value={details.full_name || "—"}
                  />

                  <InfoItem
                    icon={<Building2 size={17} />}
                    label="Department"
                    value={details.department_name || "—"}
                  />

                  <InfoItem
                    icon={<Flag size={17} />}
                    label="Priority"
                    value={
                      <span className="capitalize">
                        {details.priority || "—"}
                      </span>
                    }
                  />

                  <InfoItem
                    icon={<Clock3 size={17} />}
                    label="Status"
                    value={<Badge status={details.status} />}
                  />
                </div>

                <div className="mt-7">
                  <p className="mb-2 text-sm font-semibold text-slate-700">
                    Description
                  </p>

                  <div className="max-h-[15rem] overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700 whitespace-pre-wrap">
                    {details.description || "No description provided."}
                  </div>
                </div>
              </div>
            </section>

            {/* ===============================================
                ATTACHMENTS
            =============================================== */}

            {attachments.length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <SectionHeading
                  icon={<FileText size={19} />}
                  title="Attachments"
                  subtitle={`${attachments.length} file${
                    attachments.length === 1 ? "" : "s"
                  } attached`}
                />

                <div className="mt-5">
                  <AttachmentList attachments={attachments} />
                </div>
              </section>
            )}

            {/* ===============================================
                AI ANALYSIS
            =============================================== */}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-white px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    <Brain size={21} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      AI Analysis
                    </h2>

                    <p className="text-sm text-slate-500">
                      Automated grievance assessment
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* AI Summary */}

                <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                    AI Summary
                  </p>

                  <p className="mt-2 max-h-[10rem] overflow-y-auto text-sm leading-6 text-slate-700">
                    {details.summary || "No summary available."}
                  </p>
                </div>

                {/* AI Scores */}

                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <ScoreCard
                    label="Severity"
                    value={`${details.severity_score ?? 0}%`}
                    valueClass={getScoreStyle(
                      details.severity_score ?? 0,
                      "severity",
                    )}
                  />

                  <ScoreCard
                    label="Legitimacy"
                    value={`${details.legitimacy_score ?? 0}%`}
                    valueClass={getScoreStyle(
                      details.legitimacy_score ?? 0,
                      "legitimacy",
                    )}
                  />

                  <ScoreCard
                    label="Spam Score"
                    value={`${details.spam_score ?? 0}%`}
                  />

                  <ScoreCard
                    label="Abuse Score"
                    value={`${details.abuse_score ?? 0}%`}
                  />
                </div>

                {/* AI Classification */}

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Verdict
                    </p>

                    <span
                      className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getVerdictStyle(
                        details.verdict,
                      )}`}
                    >
                      {details.verdict || "—"}
                    </span>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Sentiment
                    </p>

                    <p className="mt-2 font-semibold text-slate-800">
                      {details.sentiment || "—"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Department Confidence
                    </p>

                    <p className="mt-2 font-semibold text-slate-800">
                      {details.department_confidence ?? 0}%
                    </p>
                  </div>
                </div>

                {/* AI Reasoning */}

                <div className="mt-5 space-y-4">
                  <ReasonBox
                    label="Department Reason"
                    value={details.department_reason}
                  />

                  <ReasonBox
                    label="Priority Reason"
                    value={details.priority_reason}
                  />

                  <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                      Suggested Resolution
                    </p>

                    <p className="mt-2 max-h-[10rem] overflow-y-auto text-sm leading-6 text-green-900 whitespace-pre-wrap">
                      {details.suggested_resolution || "—"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ===============================================
                USER TRUST
            =============================================== */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeading
                icon={<ShieldCheck size={19} />}
                title="User Trust"
                subtitle="AI-assisted trust indicators"
              />

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <TrustCard
                  label="Trust Score"
                  value={details.trust_score ?? 0}
                  suffix="/100"
                />

                <TrustCard
                  label="Warnings"
                  value={details.warning_count ?? 0}
                  valueClass="text-yellow-600"
                />

                <TrustCard
                  label="AI Flags"
                  value={details.ai_flag_count ?? 0}
                  valueClass="text-red-600"
                />
              </div>
            </section>

            {/* ===============================================
                MANUAL DEPARTMENT CHANGE
            =============================================== */}

            {!isResolved && !isRejected && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <SectionHeading
                  icon={<Building2 size={19} />}
                  title="Manual Department Change"
                  subtitle="Reassign this grievance if the AI routing is incorrect"
                />

                <div className="mt-5 space-y-4">
                  <select
                    value={selectedDepartmentId}
                    onChange={(e) => setSelectedDepartmentId(e.target.value)}
                    disabled={departmentLoading}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <option value="">
                      {departmentLoading
                        ? "Loading departments..."
                        : "Select department"}
                    </option>

                    {departments.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.department_name}
                      </option>
                    ))}
                  </select>

                  <textarea
                    rows={5}
                    maxLength={1000}
                    value={departmentChangeReason}
                    onChange={(e) => setDepartmentChangeReason(e.target.value)}
                    placeholder="Explain why the grievance should be moved to another department..."
                    className="max-h-[15rem] min-h-[7.5rem] w-full resize-y overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-slate-400">
                      Maximum 10 lines / 1000 characters
                    </p>

                    <button
                      type="button"
                      onClick={handleDepartmentChange}
                      disabled={
                        actionLoading ||
                        departmentLoading ||
                        !selectedDepartmentId
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Building2 size={17} />
                      Change Department
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* ===============================================
                REMARKS / ACTIONS
                HIDDEN WHEN RESOLVED
            =============================================== */}

            {!isResolved && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <SectionHeading
                  icon={<MessageSquare size={19} />}
                  title="Remarks & Actions"
                  subtitle="Add remarks before updating the grievance"
                />

                <div className="mt-5">
                  <textarea
                    rows={6}
                    maxLength={1500}
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder={
                      details.status === "in_progress"
                        ? "Enter resolution or rejection remarks..."
                        : "Enter remarks..."
                    }
                    className="max-h-[15rem] min-h-[9rem] w-full resize-y overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />

                  <div className="mt-2 flex justify-between text-xs text-slate-400">
                    <span>Maximum 10 lines / 1500 characters</span>

                    <span>{remarks.length}/1500</span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {details.status === "submitted" && (
                      <button
                        type="button"
                        onClick={handleReview}
                        disabled={actionLoading}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Clock3 size={17} />
                        Mark Under Review
                      </button>
                    )}

                    {details.status === "in_progress" && (
                      <>
                        <button
                          type="button"
                          onClick={handleResolve}
                          disabled={actionLoading}
                          className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <CheckCircle2 size={17} />
                          Resolve
                        </button>

                        <button
                          type="button"
                          onClick={handleReject}
                          disabled={actionLoading}
                          className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <XCircle size={17} />
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <aside className="space-y-6">
            {/* Current Status */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Current Status
              </p>

              <div className="mt-3 flex items-center justify-between">
                <Badge status={details.status} />

                <span className="text-sm text-slate-400">
                  {details.user_type || "User"}
                </span>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Department</span>

                  <span className="font-semibold text-slate-800">
                    {details.department_name || "—"}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-slate-500">Priority</span>

                  <span className="font-semibold capitalize text-slate-800">
                    {details.priority || "—"}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-slate-500">Severity</span>

                  <span className="font-semibold text-slate-800">
                    {details.severity_score ?? 0}%
                  </span>
                </div>
              </div>
            </section>

            {/* Timeline */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeading
                icon={<Clock3 size={19} />}
                title="Activity Timeline"
                subtitle="Grievance history"
              />

              <div className="mt-5">
                <HistoryTimeline history={history} />
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SMALL UI COMPONENTS
========================================================= */

function SectionHeading({ icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
        {icon}
      </div>

      <div>
        <h2 className="font-semibold text-slate-900">{title}</h2>

        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
        {icon}
        {label}
      </div>

      <div className="mt-2 text-sm font-semibold text-slate-800">{value}</div>
    </div>
  );
}

function ScoreCard({ label, value, valueClass = "text-slate-900" }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className={`mt-2 text-2xl font-bold ${valueClass}`}>{value}</p>
    </div>
  );
}

function TrustCard({
  label,
  value,
  suffix = "",
  valueClass = "text-slate-900",
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-sm font-medium text-slate-500">{label}</p>

      <p className={`mt-2 text-3xl font-bold ${valueClass}`}>
        {value}
        {suffix && (
          <span className="ml-1 text-sm font-medium text-slate-400">
            {suffix}
          </span>
        )}
      </p>
    </div>
  );
}

function ReasonBox({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 max-h-[10rem] overflow-y-auto text-sm leading-6 text-slate-700 whitespace-pre-wrap">
        {value || "—"}
      </p>
    </div>
  );
}

export default GrievanceDetails;
