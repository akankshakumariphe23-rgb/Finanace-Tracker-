import React, { useState, useEffect } from "react";
import IncomeExpenseDashboard from './subcomponents/TransactionDashboard';
import MonthlyTrendChart from './subcomponents/MonthlyTrendChart';
import CategoryWisePieChart from './subcomponents/CategoryWisePieChart';
import { expenseColors } from './subcomponents/Colors';

const ExpenseView = () => {
  const [expenses, setExpenses] = useState([]);
  const [sortKey, setSortKey] = useState("date");
  const [form, setForm] = useState({ amount: "", category: "", date: "", description: "" });
  const [loading, setLoading] = useState(false);

  const totalExpense = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8001/expense", { credentials: "include" });
      const data = await res.json();
      setExpenses(data);
    } catch {
      setExpenses([]);
    }
    setLoading(false);
  };

  const fetchSortedExpenses = async (key) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8001/expense/sort/${key}`, { credentials: "include" });
      const data = await res.json();
      setExpenses(data);
      setSortKey(key);
    } catch { }
    setLoading(false);
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    const formData = new URLSearchParams(form);
    const res = await fetch("http://localhost:8001/expense", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
      credentials: "include",
    });
    if (res.ok) {
      fetchExpenses();
      setForm({ amount: "", category: "", date: "", description: "" });
    }
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm("Delete this expense?")) {
      await fetch(`http://localhost:8001/expense/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      fetchExpenses();
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <IncomeExpenseDashboard
        title="Expense"
        data={expenses}
        total={totalExpense}
        form={form}
        setForm={setForm}
        loading={loading}
        sortKey={sortKey}
        onSortChange={fetchSortedExpenses}
        onSubmit={handleAddExpense}
        onDelete={handleDeleteExpense}
      />
      <MonthlyTrendChart
        dataList={expenses}
        dataKeyName="amount"
        title="Monthly Expense Trend"
        color="#e53935"
      />
      <CategoryWisePieChart
        dataList={expenses}
        dataKeyName="amount"
        title="Category-Wise Expense"
        colorPalette={expenseColors}
      />
    </div>
  );
};

export default ExpenseView;

