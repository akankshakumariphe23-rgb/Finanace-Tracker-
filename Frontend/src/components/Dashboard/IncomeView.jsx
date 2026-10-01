import React, { useState, useEffect } from "react";
import IncomeExpenseDashboard from './subcomponents/TransactionDashboard';
import MonthlyTrendChart from './subcomponents/MonthlyTrendChart';
import CategoryWisePieChart from './subcomponents/CategoryWisePieChart';
import { incomeColors } from './subcomponents/Colors';



const IncomeView = () => {
  const [incomes, setIncomes] = useState([]);
  const [sortKey, setSortKey] = useState("date");
  const [form, setForm] = useState({ amount: "", category: "", date: "", description: "" });
  const [loading, setLoading] = useState(false);

  const totalIncome = incomes.reduce((sum, i) => sum + Number(i.amount), 0);

  const fetchIncomes = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8001/income", { credentials: "include" });
      const data = await res.json();
      setIncomes(data);
    } catch {
      setIncomes([]);
    }
    setLoading(false);
  };

  const fetchSortedIncome = async (key) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8001/income/sort/${key}`, { credentials: "include" });
      const data = await res.json();
      setIncomes(data);
      setSortKey(key);
    } catch { }
    setLoading(false);
  };

  const handleAddIncome = async (e) => {
    e.preventDefault();
    const formData = new URLSearchParams(form);
    const res = await fetch("http://localhost:8001/income", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
      credentials: "include",
    });
    if (res.ok) {
      fetchIncomes();
      setForm({ amount: "", category: "", date: "", description: "" });
    }
  };

  const handleDeleteIncome = async (id) => {
    if (window.confirm("Delete this income?")) {
      await fetch(`http://localhost:8001/income/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      fetchIncomes();
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  return (
    <div>
      <IncomeExpenseDashboard
        title="Income"
        data={incomes}
        total={totalIncome}
        form={form}
        setForm={setForm}
        loading={loading}
        sortKey={sortKey}
        onSortChange={fetchSortedIncome}
        onSubmit={handleAddIncome}
        onDelete={handleDeleteIncome}
      />
      <MonthlyTrendChart
        dataList={incomes}
        dataKeyName="amount"
        title="Monthly Income Trend"
        color="#22c55e"
      />
      <CategoryWisePieChart
        dataList={incomes}
        dataKeyName="amount"
        title="Category-Wise Income"
        colorPalette={incomeColors}
      />
    </div>
  );
}
export default IncomeView;

