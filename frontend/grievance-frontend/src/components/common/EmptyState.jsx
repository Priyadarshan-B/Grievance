function EmptyState({
  title,

  description,
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
      <h3 className="text-xl font-semibold">{title}</h3>

      <p className="text-slate-500 mt-2">{description}</p>
    </div>
  );
}

export default EmptyState;
