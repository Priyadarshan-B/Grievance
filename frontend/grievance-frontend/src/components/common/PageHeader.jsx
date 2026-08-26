function PageHeader({
  title,

  subtitle,

  action,
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-white">{title}</h1>

        {subtitle && <p className="mt-1 font-medium text-slate-400">{subtitle}</p>}
      </div>

      {action}
    </div>
  );
}

export default PageHeader;
