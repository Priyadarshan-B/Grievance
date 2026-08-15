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
    <Card>
      <h2 className="mb-5 text-lg font-bold text-slate-900">Monthly Grievances</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />

            <XAxis dataKey="month" tick={{ fill: '#334155', fontSize: 12 }} axisLine={{ stroke: '#334155' }} tickLine={{ stroke: '#334155' }} />

            <YAxis allowDecimals={false} tick={{ fill: '#334155', fontSize: 12 }} axisLine={{ stroke: '#334155' }} tickLine={{ stroke: '#334155' }} />

            <Tooltip contentStyle={{ borderRadius: 12, borderColor: '#cbd5e1', color: '#0f172a' }} />

            <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default MonthlyChart;
