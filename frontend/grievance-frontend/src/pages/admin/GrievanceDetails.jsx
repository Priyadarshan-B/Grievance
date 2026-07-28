import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useGrievance from "../../hooks/useGrievance";
import useDepartmentGrievanceActions from "../../hooks/useDepartmentGrievanceActions";

import Loader from "../../components/common/Loader";
import Badge from "../../components/common/Badge";
import AttachmentList from "../../components/attachments/AttachmentList";
import HistoryTimeline from "../../components/history/HistoryTimeline";

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

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-100 p-5 text-red-600">{error}</div>
    );
  }

  const details = grievance?.data?.grievance;
  const attachments = grievance?.data?.attachments || [];
  const history = grievance?.data?.history || [];

  const handleReview = async () => {
    await review(id, remarks);
    setRemarks("");
    refresh();
  };

  const handleResolve = async () => {
    await resolve(id, remarks);
    setRemarks("");
    refresh();
  };

  const handleReject = async () => {
    await reject(id, remarks);
    setRemarks("");
    refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{details.title}</h1>

          <p className="text-gray-500 mt-1">{details.grievance_no}</p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="rounded-lg border px-4 py-2 hover:bg-gray-100"
        >
          Back
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Grievance Details</h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">Student</p>

                <p className="font-medium">{details.full_name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Department</p>

                <p className="font-medium">{details.department_name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Category</p>

                <p className="font-medium">{details.category_name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Priority</p>

                <p className="capitalize font-medium">{details.priority}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Status</p>

                <Badge status={details.status} />
              </div>

              <div>
                <p className="text-sm text-gray-500">Submitted</p>

                <p>{new Date(details.submitted_at).toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-sm text-gray-500">Description</p>

              <div className="rounded-lg bg-gray-50 p-4 leading-7">
                {details.description}
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Attachments</h2>

            <AttachmentList attachments={attachments} />
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Remarks</h2>

            <textarea
              rows={5}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter remarks..."
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-600"
            />

            <div className="mt-5 flex flex-wrap gap-3">
              {details.status === "submitted" && (
                <button
                  onClick={handleReview}
                  disabled={actionLoading}
                  className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  Mark Under Review
                </button>
              )}

              {details.status === "in_progress" && (
                <>
                  <button
                    onClick={handleResolve}
                    disabled={actionLoading}
                    className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700 disabled:opacity-50"
                  >
                    Resolve
                  </button>

                  <button
                    onClick={handleReject}
                    disabled={actionLoading}
                    className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Activity Timeline</h2>

            <HistoryTimeline history={history} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GrievanceDetails;
