const colors = {
  submitted: "border border-cyan-400/30 bg-cyan-500/15 text-cyan-200",
  assigned: "border border-violet-400/30 bg-violet-500/15 text-violet-200",
  in_progress: "border border-amber-400/30 bg-amber-500/15 text-amber-200",
  resolved: "border border-emerald-400/30 bg-emerald-500/15 text-emerald-200",
  closed: "border border-slate-400/30 bg-slate-700 text-slate-200",
  reopened: "border border-orange-400/30 bg-orange-500/15 text-orange-200",
  rejected: "border border-rose-400/30 bg-rose-500/15 text-rose-200",
};

function Badge({ status }) {
  const value = status || "unknown";

  return (
    <span
      className={`inline-flex min-w-max items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
        colors[value] || "border border-slate-400/30 bg-slate-700 text-slate-200"
      }`}
    >
      {value.replace(/_/g, " ")}
    </span>
  );
}

export default Badge;