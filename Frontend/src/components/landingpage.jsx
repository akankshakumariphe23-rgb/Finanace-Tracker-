import React from "react";
import { useNavigate } from "react-router-dom";
import makemeImage from './assests/makeme.png';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-900 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold">
          <span className="text-white">Finance</span>{" "}
          <span className="text-blue-300">Tracker</span>
        </h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/Login")}
            className="border border-white px-4 py-2 rounded hover:bg-white hover:text-blue-900 transition"
          >
            Log In
          </button>
          <button
            onClick={() => navigate("/Signup")}
            className="border border-white px-4 py-2 rounded hover:bg-white hover:text-blue-900 transition"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 items-center px-6 py-16 max-w-7xl mx-auto">
        {/* Left Content */}
        <div>
          <h2 className="text-4xl font-bold leading-tight mb-6">
            Take Control of <br /> Your Finances
          </h2>
          <div className="w-10 h-1 bg-yellow-400 mb-6" />
          <p className="text-lg text-gray-300 mb-6">
            Track your income and expenses effortlessly. Manage your budget,
            set financial goals, and make smarter decisions for a more secure
            future.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-semibold"
          >
            Sign Up Now
          </button>
        </div>

        {/* Right Image */}
        <div className="mt-10 md:mt-0">
          <img src={makemeImage} alt="Finance Illustration" className="w-full h-auto" />
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
