function PageHeader({
  title,

  subtitle,

  action,
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>

        {subtitle && <p className="text-slate-700 mt-1 font-medium">{subtitle}</p>}
      </div>

      {action}
    </div>
  );
}

export default PageHeader;
