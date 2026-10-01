import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/landingpage";
import Login from "./components/Login";
import Signup from "./components/Signup";

// Layout and Dashboard Views
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import DashboardOverview from "./components/Dashboard/DashboardOverview";
import IncomeView from "./components/Dashboard/IncomeView";
import ExpenseView from "./components/Dashboard/ExpenseView";
import BudgetView from "./components/Dashboard/BudgetView";

// Router setup
const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/Login", element: <Login /> },
  { path: "/Signup", element: <Signup /> },
  {
    path: "/Dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "Overview", element: <DashboardOverview /> },
      { path: "Income", element: <IncomeView /> },
      { path: "Expense", element: <ExpenseView /> },
      { path: "Budget", element: <BudgetView /> },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;





