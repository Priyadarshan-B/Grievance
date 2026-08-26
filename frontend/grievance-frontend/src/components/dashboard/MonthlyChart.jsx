import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import Card from "../common/Card";

function MonthlyChart({ data = [] }) {
  return (
    <Card variant="success">
      <h2 className="mb-5 text-lg font-bold text-white">Monthly Grievances</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

            <XAxis dataKey="month" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={{ stroke: "#475569" }} tickLine={{ stroke: "#475569" }} />

            <YAxis allowDecimals={false} tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={{ stroke: "#475569" }} tickLine={{ stroke: "#475569" }} />

            <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#334155", backgroundColor: "#1E293B", color: "#F9FAFB" }} />

            <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default MonthlyChart;
