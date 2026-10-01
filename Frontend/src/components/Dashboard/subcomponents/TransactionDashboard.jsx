import React from "react";

const TransactionDashboard = ({
  title,
  data,
  total,
  onDelete,
  onSubmit,
  form,
  setForm,
  loading,
  sortKey,
  onSortChange,
}) => {
  const isIncome = title === "Income";
  const themeColor = isIncome ? "green" : "red";

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-gray-800">{title} Dashboard</h1>

      <div
        className={`border-l-8 p-5 shadow rounded-lg flex justify-between items-center ${
          isIncome ? "bg-green-50 border-green-500 text-green-700" : "bg-red-50 border-red-500 text-red-700"
        }`}
      >
        <div className="text-xl font-semibold">Total {title}</div>
        <div className="text-3xl font-bold">₹{total.toLocaleString()}</div>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md border border-gray-200"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
            className="border p-3 rounded focus:ring-2 focus:ring-green-400 w-full"
          />
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
            className="border p-3 rounded focus:ring-2 focus:ring-green-400 w-full"
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="border p-3 rounded focus:ring-2 focus:ring-green-400 w-full"
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border p-3 rounded focus:ring-2 focus:ring-green-400 w-full"
          />
        </div>
        <button
          type="submit"
          className={`w-full md:w-auto px-6 py-2 font-semibold text-white rounded transition-colors ${
            isIncome ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          Add {title}
        </button>
      </form>

      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="font-medium text-gray-700">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortKey}
          onChange={(e) => onSortChange(e.target.value)}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
          <option value="category">Category</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading {title.toLowerCase()}...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-600">No {title.toLowerCase()} records found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className={`text-white ${
                  isIncome ? "bg-green-600" : "bg-red-600"
                }`}
              >
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-right">Amount (₹)</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={item._id}
                  className={`${
                    index % 2 === 0
                      ? isIncome
                        ? "bg-green-50"
                        : "bg-red-50"
                      : "bg-white"
                  } hover:bg-opacity-80 transition`}
                >
                  <td className="py-3 px-4 border-t border-gray-200">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 border-t border-gray-200">
                    {item.category}
                  </td>
                  <td className="py-3 px-4 border-t border-gray-200 text-right font-semibold">
                    ₹{item.amount}
                  </td>
                  <td className="py-3 px-4 border-t border-gray-200">
                    {item.description || "-"}
                  </td>
                  <td className="py-3 px-4 border-t border-gray-200 text-center">
                    <button
                      onClick={() => onDelete(item._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionDashboard;

