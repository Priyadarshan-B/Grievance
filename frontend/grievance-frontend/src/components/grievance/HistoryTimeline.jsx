import moment from "moment";

const formatAction = (action) => {
  switch (action) {
    case "GRIEVANCE_CREATED":
      return "Grievance Created";

    case "UNDER_REVIEW":
      return "Under Review";

    case "GRIEVANCE_RESOLVED":
      return "Grievance Resolved";

    case "GRIEVANCE_REJECTED":
      return "Grievance Rejected";

    case "STATUS_CHANGED":
      return "Status Updated";

    default:
      return action
        ?.replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase());
  }
};

const formatRole = (role) => {
  switch (role) {
    case "user":
      return "Student";

    case "dept_admin":
      return "Department Admin";

    case "super_admin":
      return "Super Admin";

    default:
      return role || "-";
  }
};

const parseRemarks = (remarks) => {
  if (!remarks) return null;

  try {
    const parsed = typeof remarks === "string" ? JSON.parse(remarks) : remarks;

    return (
      <>
        {parsed.remarks && (
          <div className="mb-2">
            <span className="font-semibold">Remarks:</span>
            <div className="text-gray-700">{parsed.remarks}</div>
          </div>
        )}

        {parsed.resolution && (
          <div>
            <span className="font-semibold">Resolution:</span>
            <div className="text-gray-700">{parsed.resolution}</div>
          </div>
        )}
      </>
    );
  } catch {
    return <div className="text-gray-700">{remarks}</div>;
  }
};

const HistoryTimeline = ({ history }) => {
  if (!history?.length) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-gray-500">
        No history available.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {history.map((item) => (
        <div key={item.id} className="relative border-l-2 border-blue-500 pl-5">
          <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-blue-500"></div>

          <h4 className="text-lg font-semibold text-gray-800">
            {formatAction(item.action)}
          </h4>

          {item.remarks && (
            <div className="mt-2 rounded-lg bg-gray-50 p-3">
              {parseRemarks(item.remarks)}
            </div>
          )}

          <div className="mt-3 space-y-1 text-sm text-gray-600">
            <div>
              <strong>User:</strong> {item.full_name || "System"}
            </div>

            <div>
              <strong>Role:</strong> {formatRole(item.role)}
            </div>

            <div>
              <strong>Date:</strong>{" "}
              {moment(item.created_at).format("DD MMMM YYYY")}
            </div>

            <div>
              <strong>Time:</strong>{" "}
              {moment(item.created_at).local().format("hh:mm A")}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryTimeline;
