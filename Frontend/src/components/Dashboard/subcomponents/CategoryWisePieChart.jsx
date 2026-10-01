import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CategoryWisePieChart = ({
  dataList = [],
  dataKeyName = "amount",
  title = "Category-Wise Breakdown",
  colorPalette = [],
}) => {
  // Aggregate values by category
  const categoryMap = {};

  dataList.forEach((item) => {
    const category = item.category || "Uncategorized";
    categoryMap[category] = (categoryMap[category] || 0) + Number(item[dataKeyName]);
  });

  const data = Object.keys(categoryMap).map((category) => ({
    name: category,
    value: categoryMap[category],
  }));

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md border-2 border-indigo-300 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-indigo-700">{title}</h2>
      {data.length === 0 ? (
        <p className="text-gray-600">No data available for pie chart.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colorPalette[index % colorPalette.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "#eef2ff", borderRadius: 8 }}
              itemStyle={{ color: "#4f46e5", fontWeight: "bold" }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: "14px", color: "#4f46e5" }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CategoryWisePieChart;