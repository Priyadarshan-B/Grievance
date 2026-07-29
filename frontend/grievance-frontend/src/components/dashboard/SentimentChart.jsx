import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import Card from "../common/Card";

const COLORS = ["#22c55e", "#64748b", "#ef4444"];

function SentimentChart({ data = [] }) {
  return (
    <Card>
      <h2 className="mb-5 text-lg font-semibold">Sentiment Analysis</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="sentiment"
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

export default SentimentChart;
