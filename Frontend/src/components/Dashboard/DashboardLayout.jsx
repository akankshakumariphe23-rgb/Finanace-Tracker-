import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <div className="p-6">Loading user info...</div>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 bg-gray-100 overflow-y-auto">
        {/* Top bar */}
        <div className="flex justify-between items-center px-6 py-4 shadow-sm bg-white border-b">
          <h1 className="text-xl font-semibold text-gray-800">
            Welcome, <span className="capitalize">{user.username}</span> 👋
          </h1>
          <img
            src={user.profilePhoto}
            alt="Profile"
            className="w-11 h-11 rounded-full ring-2 ring-indigo-400 shadow-sm"
          />
        </div>

        {/* Main content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;


