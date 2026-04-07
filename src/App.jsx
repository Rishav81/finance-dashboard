import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import SummaryCard from "./components/SummaryCard";

import { Navigate, Route, Routes } from "react-router-dom";

import TransactionTable from "./components/TransactionTable";

import Insights from "./components/Insights";
import BottomNav from "./components/BottomNav";

const App = () => {
  const transactionsData = [
    {
      id: 1,
      name: "Rishav Kumar",
      date: "2026-04-01",
      amount: 1200,
      type: "Income",
    },
    {
      id: 2,
      name: "Amit Sharma",
      date: "2026-03-02",
      amount: 800,
      type: "Income",
    },
    {
      id: 3,
      name: "Neha Singh",
      date: "2026-04-02",
      amount: 5000,
      type: "Expense",
      category: "Food",
    },
    {
      id: 4,
      name: "Mohan Singh",
      date: "2026-04-05",
      amount: 1500,
      type: "Income",
    },
    {
      id: 5,
      name: "Sneha Singh",
      date: "2026-04-02",
      amount: 200,
      type: "Expense",
      category: "Petrol",
    },
    {
      id: 6,
      name: "Nehal Kumar",
      date: "2026-04-02",
      amount: 100,
      type: "Expense",
      category: "Salon",
    },
    {
      id: 7,
      name: "Mohit Thakur",
      date: "2026-04-02",
      amount: 700,
      type: "Expense",
      category: "",
    },
    {
      id: 8,
      name: "Rupali Verma",
      date: "2026-02-02",
      amount: 5500,
      type: "Income",
    },
  ];
  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || "Viewer";
  });

  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem("transactions");
      return saved ? JSON.parse(saved) : transactionsData;
    } catch (error) {
      console.error("JSON Error:", error);
      return transactionsData;
    }
  });

  return (
    <div className="h-screen  flex bg-[#F8FAFC]  dark:bg-slate-950 transition duration-300 overflow-hidden">
      <Sidebar />
      <BottomNav />

      <main className="md:ml-44 lg:ml-64   w-full flex flex-col  ">
        <Navbar role={role} setRole={setRole} />

        {/* Gradient line */}
        <div className="relative w-full h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40"></div>
          <div className="absolute inset-0 blur-sm bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
        </div>

        {/* 🔥 CONTENT AREA (IMPORTANT) */}
        <div className="flex-1 overflow-y-auto scroll-smooth no-scrollbar pb-16 md:pb-6">
          <Routes>
            <Route path="/" element={<SummaryCard data={data} />} />
            <Route
              path="/transactions"
              element={
                <TransactionTable data={data} setData={setData} role={role} />
              }
            />
            <Route path="/insights" element={<Insights data={data} />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default App;
