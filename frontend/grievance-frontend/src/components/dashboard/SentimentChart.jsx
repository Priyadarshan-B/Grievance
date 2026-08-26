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
  Positive: "#22c55e",
  Neutral: "#64748b",
  Negative: "#ef4444",
  Concerned: "#eab308",
  Frustrated: "#f97316",
  Angry: "#b91c1c",
  Urgent: "#7c3aed",
};

function SentimentChart({ data = [] }) {
  return (
    <Card variant="warning">
      <h2 className="mb-5 text-lg font-bold text-white">Sentiment Analysis</h2>

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
              {data.map((item, index) => (
                <Cell key={index} fill={COLORS[item.sentiment] || "#94a3b8"} />
              ))}
            </Pie>

            <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#334155", backgroundColor: "#1E293B", color: "#F9FAFB" }} />
            <Legend wrapperStyle={{ color: "#94A3B8", fontSize: "12px" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default SentimentChart;
