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

function DepartmentChart({ data = [] }) {
  return (
    <Card variant="primary">
      <h2 className="mb-5 text-lg font-bold text-white">
        Department Wise Grievances
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

            <XAxis dataKey="department_code" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={{ stroke: "#475569" }} tickLine={{ stroke: "#475569" }} />

            <YAxis allowDecimals={false} tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={{ stroke: "#475569" }} tickLine={{ stroke: "#475569" }} />

            <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#334155", backgroundColor: "#1E293B", color: "#F9FAFB" }} />

            <Bar
              dataKey="total"
              radius={[8, 8, 0, 0]}
              fill="#3b82f6"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default DepartmentChart;