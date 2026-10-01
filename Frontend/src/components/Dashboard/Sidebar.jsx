// src/components/Dashboard/Sidebar.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  Receipt,
  Target,
  Menu,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token logic here if needed
    navigate("/Login");
  };

  const navItems = [
    { label: "Overview", icon: <LayoutDashboard />, to: "/Dashboard/Overview" },
    { label: "Income", icon: <Wallet />, to: "/Dashboard/Income" },
    { label: "Expense", icon: <Receipt />, to: "/Dashboard/Expense" },
    { label: "Budget", icon: <Target />, to: "/Dashboard/Budget" },
  ];

  return (
    <div className={`h-screen bg-indigo-900 text-white ${isCollapsed ? "w-20" : "w-64"} transition-all duration-300 flex flex-col`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💰</span>
          {!isCollapsed && <h1 className="text-xl font-bold">FinanceBudget</h1>}
        </div>
        <button onClick={() => setIsCollapsed(!isCollapsed)}>
          <Menu />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 mt-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="flex items-center gap-4 px-4 py-2 hover:bg-indigo-600 transition"
          >
            {item.icon}
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 hover:bg-red-600 transition mt-auto"
      >
        <LogOut />
        {!isCollapsed && <span>Logout</span>}
      </button>
    </div>
  );
};

export default Sidebar;

