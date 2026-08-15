import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import Card from "../common/Card";

const COLORS = {
  CRITICAL: "#dc2626",
  HIGH: "#f97316",
  MEDIUM: "#3b82f6",
  LOW: "#22c55e",
};

function PriorityChart({ data = [] }) {
  return (
    <Card>
      <h2 className="mb-5 text-lg font-bold text-slate-900">Priority Distribution</h2>

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
              {data.map((item, index) => (
                <Cell
                  key={index}
                  fill={COLORS[item.priority?.toUpperCase()] || "#94a3b8"}
                />
              ))}
            </Pie>

            <Tooltip contentStyle={{ borderRadius: 12, borderColor: '#cbd5e1', color: '#0f172a' }} />
            <Legend wrapperStyle={{ color: '#0f172a', fontSize: '12px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default PriorityChart;
