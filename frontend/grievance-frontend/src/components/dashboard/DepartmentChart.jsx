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
    <Card>
      <h2 className="mb-5 text-lg font-semibold">
        Department Wise Grievances
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="department_name" />

            <YAxis allowDecimals={false} />

            <Tooltip />

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