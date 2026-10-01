import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const MonthlyTrendChart = ({ dataList = [], dataKeyName = "amount", title = "Monthly Trend", color = "#22c55e" }) => {
  // Aggregate amounts by month-year string, e.g. "2025-05"
  const monthlyData = {};

  dataList.forEach((item) => {
    const d = new Date(item.date);
    const monthYear = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    monthlyData[monthYear] = (monthlyData[monthYear] || 0) + Number(item[dataKeyName]);
  });

  // Convert aggregated object to sorted array
  const data = Object.keys(monthlyData)
    .sort()
    .map((monthYear) => ({
      month: monthYear,
      [dataKeyName]: monthlyData[monthYear],
    }));

  return (
    <div className="w-full h-64 bg-white p-6 rounded-lg shadow-md border-2 border-gray-300 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">{title}</h2>
      {data.length === 0 ? (
        <p className="text-gray-600">No data available for chart.</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            barSize={40}
          >
            <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#4b5563", fontWeight: "bold" }}
              stroke="#9ca3af"
            />
            <YAxis tick={{ fill: "#4b5563" }} stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ backgroundColor: "#f9fafb", borderRadius: 8 }}
              itemStyle={{ color: "#111827", fontWeight: "bold" }}
            />
            <Legend wrapperStyle={{ color: "#111827", fontWeight: "bold" }} />
            <Bar
              dataKey={dataKeyName}
              fill={color}
              radius={[8, 8, 0, 0]}
              name={title}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default MonthlyTrendChart;
