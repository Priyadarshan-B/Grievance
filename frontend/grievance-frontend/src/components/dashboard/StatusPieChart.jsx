import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import Card from "../common/Card";

const COLORS = ["#2563eb", "#f59e0b", "#ea580c", "#16a34a", "#dc2626"];

function StatusPieChart({ dashboard }) {
  const data = [
  {
    name: "Submitted",
    value: Number(dashboard?.submitted ?? 0),
  },
  {
    name: "Assigned",
    value: Number(dashboard?.assigned ?? 0),
  },
  {
    name: "In Progress",
    value: Number(dashboard?.in_progress ?? 0),
  },
  {
    name: "Resolved",
    value: Number(dashboard?.resolved ?? 0),
  },
  {
    name: "Rejected",
    value: Number(dashboard?.rejected ?? 0),
  },
].filter((item) => item.value > 0);

console.log(data);

  return (
    <Card>
      <h2 className="mb-5 text-lg font-semibold">Status Distribution</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={95}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default StatusPieChart;
