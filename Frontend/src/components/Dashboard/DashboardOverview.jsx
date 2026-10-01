import React, { useEffect, useState } from "react";
import {
  FaMoneyBillWave,
  FaWallet,
  FaChartPie,
  FaBalanceScale,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashboardOverview = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("http://localhost:8001/dashboard/", {
          method: "GET",
          credentials: "include",
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || "Fetch failed");
        setData(json);
      } catch (err) {
        console.error("Failed to load dashboard", err);
        alert("Dashboard data could not be loaded");
      }
    };
    fetchDashboard();
  }, []);

  if (!data) return <div className="p-6 text-gray-600">Loading...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card
          icon={<FaMoneyBillWave />}
          title="Income"
          amount={data.summary.totalIncome}
          color="green"
        />
        <Card
          icon={<FaWallet />}
          title="Expense"
          amount={data.summary.totalExpense}
          color="red"
        />
        <Card
          icon={<FaChartPie />}
          title="Budget"
          amount={data.budget.amount}
          color="blue"
        />
        <Card
          icon={<FaBalanceScale />}
          title="Net Balance"
          amount={data.summary.netBalance}
          color="purple"
        />
      </div>

      {/* Budget Status */}
      <div
        className={`p-4 rounded-xl mb-6 ${
          data.budgetStatus.status === "overspent"
            ? "bg-red-100 text-red-700"
            : "bg-green-100 text-green-700"
        }`}
      >
        {data.budgetStatus.status === "overspent" ? (
          <>⚠️ You have overspent your budget by ₹{data.budgetStatus.amount}</>
        ) : (
          <>✅ You are under your budget by ₹{data.budgetStatus.amount}</>
        )}
      </div>

      {/* Monthly Income vs Expense Chart */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Monthly Income vs Expense</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.monthlyTrend}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#4ade80" name="Income" />
            <Bar dataKey="expense" fill="#f87171" name="Expense" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Expenses */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Expenses</h2>
        <ul className="divide-y divide-gray-200">
          {data.recentExpenses.map((expense, index) => (
            <li
              key={index}
              className="py-2 flex justify-between items-center"
            >
              <div>
                <div className="font-medium">{expense.title}</div>
                <div className="text-sm text-gray-500">
                  {expense.category} |{" "}
                  {new Date(expense.date).toLocaleDateString()}
                </div>
              </div>
              <div className="text-red-600 font-semibold">
                ₹{expense.amount}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ✅ Fixed Tailwind dynamic color bug
const Card = ({ icon, title, amount, color }) => {
  const borderColor = {
    green: "border-green-400 text-green-500",
    red: "border-red-400 text-red-500",
    blue: "border-blue-400 text-blue-500",
    purple: "border-purple-400 text-purple-500",
  }[color];

  return (
    <div className={`bg-white shadow rounded-xl p-4 flex items-center gap-4 border-t-4 ${borderColor}`}>
      <div className="text-3xl">{icon}</div>
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-xl font-semibold">₹{amount}</div>
      </div>
    </div>
  );
};

export default DashboardOverview;


