import React, { useState, useEffect } from "react";
import { FaMoneyBillWave, FaChartPie } from "react-icons/fa";

const BudgetView = () => {
  const [budget, setBudget] = useState(null);
  const [form, setForm] = useState({ amount: "", period: "monthly", startDate: "" });
  const [expensesTotal, setExpensesTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchBudget = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8001/budget", { credentials: "include" });
      const data = await res.json();

      setBudget(data);
      setForm({
        amount: data?.amount || "",
        period: data?.period || "monthly",
        startDate: data?.startDate ? data.startDate.slice(0, 10) : "",
      });
    } catch (err) {
      console.error("Failed to fetch budget", err);
    }
    setLoading(false);
  };

  const fetchExpensesSummary = async () => {
    try {
      const res = await fetch("http://localhost:8001/budget/expenses-summary", { credentials: "include" });
      const data = await res.json();
      setExpensesTotal(data.total || 0);
    } catch (err) {
      console.error("Failed to fetch expenses summary", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8001/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (res.ok) {
        fetchBudget();
      }
    } catch (err) {
      console.error("Failed to submit budget", err);
    }
  };

  useEffect(() => {
    fetchBudget();
    fetchExpensesSummary();
  }, []);

  const getProgressColor = (percentage) => {
    if (percentage < 80) return "bg-green-500";
    if (percentage <= 100) return "bg-yellow-500";
    return "bg-red-500";
  };

  const percentageSpent =
    budget?.amount && !isNaN(budget.amount)
      ? Math.min((expensesTotal / budget.amount) * 100, 100)
      : 0;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">🎯 Budget Overview</h1>

      {/* Current Budget */}
      {loading ? (
        <p className="text-gray-500">Loading budget...</p>
      ) : budget ? (
        <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 shadow-md mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-blue-700 flex items-center gap-2">
              <FaMoneyBillWave /> Current Budget
            </h2>
            <span className="text-sm text-gray-600">
              Last updated: {new Date(budget.updatedAt || budget.startDate).toLocaleDateString()}
            </span>
          </div>
          <div className="text-lg">
            ₹<span className="font-bold">{Number(budget.amount).toLocaleString()}</span> /{" "}
            {budget.period} starting from{" "}
            <span className="font-medium">{new Date(budget.startDate).toLocaleDateString()}</span>
          </div>
        </div>
      ) : (
        <p className="text-red-600 font-medium">No budget set yet.</p>
      )}

      {/* Budget Update Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-300 rounded-lg p-4 shadow mb-6 space-y-4"
      >
        <h2 className="text-lg font-semibold text-gray-700">✍️ Update Budget</h2>
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
          className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
        <select
          value={form.period}
          onChange={(e) => setForm({ ...form, period: e.target.value })}
          className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
          <option value="yearly">Yearly</option>
        </select>
        <input
          type="date"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
        >
          Save Budget
        </button>
      </form>

      {/* Spending Summary */}
      {budget && (
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <FaChartPie /> Spending Summary
          </h2>
          <p className="mt-2 text-gray-700">
            You've spent{" "}
            <span className="font-bold text-red-600">₹{expensesTotal.toLocaleString()}</span>{" "}
            out of ₹{budget?.amount?.toLocaleString() || 0}.
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-4 rounded-full mt-3">
            <div
              className={`${getProgressColor(percentageSpent)} h-full rounded-full transition-all`}
              style={{ width: `${percentageSpent}%` }}
            />
          </div>

          <p className="mt-2 text-sm text-gray-600">
            {expensesTotal > budget.amount
              ? "⚠️ You're overspending!"
              : "✅ You're within budget. Keep it up!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default BudgetView;

