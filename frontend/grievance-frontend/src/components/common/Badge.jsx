const colors = {
  submitted: "bg-blue-100 text-blue-700",
  assigned: "bg-purple-100 text-purple-700",
  in_progress: "bg-yellow-100 text-yellow-700",
  resolved: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-700",
  reopened: "bg-orange-100 text-orange-700",
  rejected: "bg-red-100 text-red-700",
};

function Badge({ status }) {
  const value = status || "unknown";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        colors[value] || "bg-gray-100 text-gray-700"
      }`}
    >
      {value.replace(/_/g, " ")}
    </span>
  );
}

export default Badge;