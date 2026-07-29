import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import Card from "../common/Card";

const COLORS = ["#ef4444", "#f59e0b", "#22c55e"];

function PriorityChart({ data = [] }) {
  return (
    <Card>
      <h2 className="mb-5 text-lg font-semibold">Priority Distribution</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="priority"
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

export default PriorityChart;