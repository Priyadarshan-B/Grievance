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

          <h4 className="font-semibold">{item.action.replaceAll("_", " ")}</h4>

          {item.remarks && <p className="mt-1 text-gray-600">{item.remarks}</p>}

          <div className="mt-2 text-sm text-gray-500">
            <div>
              <strong>User:</strong> {item.full_name || "System"}
            </div>

            <div>
              <strong>Role:</strong> {item.role || "-"}
            </div>

            <div>
              <strong>Date:</strong>{" "}
              {new Date(item.created_at).toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryTimeline;
