import {
  ArrowLeft,
  Building2,
  Calendar,
  FileText,
  Flag,
  FolderOpen,
  Hash,
  User,
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
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-lg font-semibold text-red-700">
          Failed to load grievance
        </h2>

        <p className="mt-2 text-red-600">{error}</p>

        <Link
          to="/my-grievances"
          className="mt-5 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Back
        </Link>
      </div>
    );
  }

  if (!grievance?.data) {
    return (
      <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6">
        <h2 className="text-lg font-semibold text-yellow-700">
          Grievance not found
        </h2>

        <Link
          to="/my-grievances"
          className="mt-5 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Back
        </Link>
      </div>
    );
  }

  const grievanceData = grievance.data.grievance;
  const attachments = grievance.data.attachments || [];
  const history = grievance.data.history || [];

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}

      <Link
        to="/my-grievances"
        className="inline-flex items-center gap-2 text-blue-600 transition hover:text-blue-700"
      >
        <ArrowLeft size={18} />
        Back to My Grievances
      </Link>

      {/* Header */}

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              {grievanceData.title}
            </h1>

            <p className="mt-2 text-slate-500">{grievanceData.grievance_no}</p>
          </div>

          <Badge status={grievanceData.status} />
        </div>
      </div>

      {/* Information */}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left */}

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Basic Information</h2>

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Hash className="mt-1 text-blue-600" size={20} />

              <div>
                <p className="text-sm text-slate-500">Grievance Number</p>

                <h3 className="font-semibold">{grievanceData.grievance_no}</h3>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FolderOpen className="mt-1 text-blue-600" size={20} />

              <div>
                <p className="text-sm text-slate-500">Category</p>

                <h3 className="font-semibold">{grievanceData.category_name}</h3>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building2 className="mt-1 text-blue-600" size={20} />

              <div>
                <p className="text-sm text-slate-500">Department</p>

                <h3 className="font-semibold">
                  {grievanceData.department_name}
                </h3>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="mt-1 text-blue-600" size={20} />

              <div>
                <p className="text-sm text-slate-500">Submitted By</p>

                <h3 className="font-semibold">{grievanceData.full_name}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Status Information</h2>

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Calendar className="mt-1 text-blue-600" size={20} />

              <div>
                <p className="text-sm text-slate-500">Submitted On</p>

                <h3 className="font-semibold">
                  {formatDate(grievanceData.submitted_at)}
                </h3>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Flag className="mt-1 text-blue-600" size={20} />

              <div>
                <p className="text-sm text-slate-500">Priority</p>

                <h3 className="font-semibold capitalize">
                  {grievanceData.priority}
                </h3>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileText className="mt-1 text-blue-600" size={20} />

              <div>
                <p className="text-sm text-slate-500">Current Status</p>

                <Badge status={grievanceData.status} />
              </div>
            </div>

            {grievanceData.resolved_at && (
              <div className="flex items-start gap-3">
                <Calendar className="mt-1 text-green-600" size={20} />

                <div>
                  <p className="text-sm text-slate-500">Resolved On</p>

                  <h3 className="font-semibold">
                    {formatDate(grievanceData.resolved_at)}
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description */}

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Description</h2>

        <p className="whitespace-pre-wrap leading-7 text-slate-600">
          {grievanceData.description}
        </p>
      </div>

      {/* Attachments */}

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Attachments</h2>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
            {attachments.length}
          </span>
        </div>

        <AttachmentList attachments={attachments} />
      </div>

      {/* History */}

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">History</h2>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
            {history.length}
          </span>
        </div>

        <HistoryTimeline history={history} />
      </div>
    </div>
  );
}

export default GrievanceDetails;
