import Card from "../common/Card";

function StatCard({
  title,

  value,

  icon: Icon,

  color = "bg-blue-500",
}) {
  return (
    <Card>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-500 text-sm">{title}</p>

          <h2 className="text-3xl font-bold mt-2">{value}</h2>
        </div>

        <div className={`${color} p-4 rounded-xl text-white`}>
          <Icon size={24} />
        </div>
      </div>
    </Card>
  );
}

export default StatCard;
