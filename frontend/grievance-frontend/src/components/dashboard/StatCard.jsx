import Card from "../common/Card";

function StatCard({ title, value, icon: Icon, color = "bg-blue-500" }) {
  return (
    <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold">{value}</h2>
        </div>

        <div className={`${color} rounded-xl p-4 text-white shadow-lg`}>
          <Icon size={24} />
        </div>
      </div>
    </Card>
  );
}

export default StatCard;
