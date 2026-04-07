import { ArrowRight, Pencil, Save, Search, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Insights from "./Insights";

const TransactionTable = ({ role, data, setData }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const [newTx, setNewTx] = useState({
    name: "",
    date: "",
    amount: "",
    type: "Income",
    category: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = location.pathname === "/";

  // ✅ FIX: prevent slice error
  const displayData = Array.isArray(data)
    ? isDashboard
      ? data.slice(0, 4)
      : data
    : [];
  const getPadding = () => {
    if (location.pathname === "/") return "px-0";
    if (location.pathname === "/transactions") return "px-3 md:px-6";
    return "px-0";
  };
  // ✅ FILTER
  const filteredData = displayData.filter((tx) => {
    const matchesSearch =
      tx.name.toLowerCase().includes(search.toLowerCase()) ||
      tx.date.includes(search);

    const matchesFilter = filter === "All" || tx.type === filter;

    return matchesSearch && matchesFilter;
  });

  // ✅ SAVE TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(data));
  }, [data]);

  // ---------------- ACTIONS ----------------

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewTx((prev) => ({ ...prev, [name]: value }));
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleAddTransaction = () => {
    let newErrors = {};

    if (!newTx.name.trim()) newErrors.name = true;
    if (!newTx.date) newErrors.date = true;
    if (!newTx.amount) newErrors.amount = true;

    if (newTx.type === "Expense" && !newTx.category) {
      newErrors.category = true;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const newTransaction = {
      ...newTx,
      id: Date.now(),
      amount: Number(newTx.amount),
      category: newTx.type === "Income" ? "" : newTx.category,
    };

    setData((prev) => [newTransaction, ...prev]);

    setNewTx({
      name: "",
      date: "",
      amount: "",
      type: "Income",
      category: "",
    });

    setErrors({});
  };

  const handleDelete = (id) => {
    setData((prev) => prev.filter((tx) => tx.id !== id));
  };

  const handleEdit = (tx) => {
    setEditId(tx.id);
    setEditData(tx);
  };

  const handleSave = () => {
    const updated = data.map((item) => (item.id === editId ? editData : item));

    setData(updated);
    setEditId(null);
  };

  return (
    <div className={`pt-4 lg:flex lg:gap-6 ${getPadding()}`}>
      <div className="flex-1 lg:w-2/3 bg-white dark:bg-slate-900 p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 transition-all duration-300">
        {/* Header & Filter Controls */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              {isDashboard ? "Recent Transactions" : "Transaction History"}
            </h1>
            {!isDashboard && (
              <p className="text-sm text-slate-500">
                Manage and track your full history
              </p>
            )}
          </div>

          <div className="inline-flex justify-between p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            {["All", "Income", "Expense"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`px-4 py-1.5 text-xs md:text-sm font-bold rounded-lg transition-all duration-200
                  ${
                    filter === item
                      ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full mb-6 group">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
          />
          <input
            type="text"
            placeholder="Search by name or date..."
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 pl-10 pr-4 py-2.5 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {role === "admin" && (
          <div className="mb-6 p-4 md:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md shadow-sm transition-all">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
              Add New Transaction
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* Name */}
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newTx.name}
                required
                onChange={handleNewChange}
                className={`px-3 py-2 rounded-lg text-sm 
  bg-slate-50 dark:bg-slate-800/60 
  border 
  ${
    errors.name
      ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
      : "border-slate-200 dark:border-slate-700 focus:ring-blue-500/20 focus:border-blue-500"
  }
  text-slate-900 dark:text-white
  placeholder:text-slate-400
  focus:outline-none transition-all`}
              />

              {/* Date */}
              <input
                type="date"
                name="date"
                required
                value={newTx.date}
                onChange={handleNewChange}
                className={`px-3 py-2 rounded-lg text-sm 
  bg-slate-50 dark:bg-slate-800/60 
  border 
  ${
    errors.date
      ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
      : "border-slate-200 dark:border-slate-700 focus:ring-blue-500/20 focus:border-blue-500"
  }
  text-slate-900 dark:text-white
  placeholder:text-slate-400
  focus:outline-none transition-all`}
              />

              {/* Amount */}
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                required
                value={newTx.amount}
                onChange={handleNewChange}
                className={`px-3 py-2 rounded-lg text-sm 
  bg-slate-50 dark:bg-slate-800/60 
  border 
  ${
    errors.amount
      ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
      : "border-slate-200 dark:border-slate-700 focus:ring-blue-500/20 focus:border-blue-500"
  }
  text-slate-900 dark:text-white
  placeholder:text-slate-400
  focus:outline-none transition-all`}
              />
              {newTx.type === "Expense" && (
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={newTx.category}
                  onChange={handleNewChange}
                  className={`px-3 py-2 rounded-lg text-sm 
    bg-slate-50 dark:bg-slate-800/60 
    border 
    ${
      errors.category
        ? "border-red-500"
        : "border-slate-200 dark:border-slate-700"
    }`}
                />
              )}

              {/* Type */}
              <select
                name="type"
                value={newTx.type}
                onChange={handleNewChange}
                className="px-3 py-2 rounded-lg text-sm 
      bg-slate-50 dark:bg-slate-800/60 
      border border-slate-200 dark:border-slate-700
      text-slate-900 dark:text-white
      focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
      transition-all cursor-pointer"
              >
                <option>Income</option>
                <option>Expense</option>
              </select>

              {/* Button */}
              <button
                onClick={handleAddTransaction}
                className="col-span-2 md:col-span-4 mt-2
      bg-blue-600 hover:bg-blue-700 active:scale-[0.98]
      text-white py-2.5 rounded-xl font-semibold text-sm
      shadow-md shadow-blue-500/10
      transition-all duration-200"
              >
                + Add Transaction
              </button>
            </div>
          </div>
        )}

        {/* The Actual Table Wrapper */}
        <div className="overflow-x-auto scroll-smooth no-scrollbar rounded-xl border border-slate-100 dark:border-slate-800">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                <th className="py-4 px-6 text-center lg:text-left">Name</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 text-right">Amount</th>
                <th className="py-4 px-6 text-center">Type</th>

                {role === "admin" && (
                  <th className="py-4 px-6 text-center">Action</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filteredData.map((tx) => (
                <tr
                  key={tx.id}
                  className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="py-4 px-6 text-sm font-semibold text-slate-900 dark:text-slate-200 text-center lg:text-left">
                    {editId === tx.id ? (
                      <input
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                        className=" bg-transparent border-b border-blue-500/50 focus:border-blue-500 outline-none w-full px-1 py-0.5 transition-all text-slate-900 dark:text-white"
                      />
                    ) : (
                      tx.name
                    )}
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-500 dark:text-slate-400">
                    {editId === tx.id ? (
                      <input
                        name="date"
                        value={editData.date}
                        onChange={handleEditChange}
                        className=" bg-transparent border-b border-blue-500/50 focus:border-blue-500 outline-none w-full px-1 py-0.5 transition-all text-slate-900 dark:text-white"
                      />
                    ) : (
                      new Date(tx.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "2-digit",
                      })
                    )}
                  </td>
                  <td className="py-4 px-6 text-right font-bold text-slate-900 dark:text-white text-sm">
                    {editId === tx.id ? (
                      <input
                        name="amount"
                        value={editData.amount}
                        onChange={handleEditChange}
                        className=" bg-transparent border-b border-blue-500/50 focus:border-blue-500 outline-none w-full px-1 py-0.5 transition-all text-slate-900 dark:text-white"
                      />
                    ) : (
                      <>₹ {tx.amount.toLocaleString("en-IN")}</>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        tx.type === "Income"
                          ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  {role === "admin" && (
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center lg:justify-center gap-3">
                        {editId === tx.id ? (
                          <button
                            onClick={() => handleSave()}
                            className="p-1.5 rounded-md hover:bg-green-100 dark:hover:bg-green-500/10 transition group"
                          >
                            <Save
                              size={16}
                              className="text-green-500 group-hover:scale-110 transition"
                            />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEdit(tx)}
                            className="p-1.5 rounded-md hover:bg-green-100 dark:hover:bg-green-500/10 transition group"
                          >
                            <Pencil
                              size={16}
                              className="text-green-500 group-hover:scale-110 transition"
                            />
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(tx.id)}
                          className="p-1.5 rounded-md hover:bg-red-100 dark:hover:bg-red-500/10 transition group"
                        >
                          <Trash
                            size={16}
                            className="text-red-500 group-hover:scale-110 transition"
                          />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-sm italic">
              No records found.
            </div>
          )}
        </div>

        {isDashboard && (
          <button
            onClick={() => navigate("/transactions")}
            className="mt-6 w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-slate-200 dark:shadow-none"
          >
            View All Transactions <ArrowRight size={18} />
          </button>
        )}
      </div>

      {/* --- INSIGHTS SECTION --- */}
      <div className="w-full lg:w-1/3">
        <Insights data={data} />
      </div>
    </div>
  );
};

export default TransactionTable;
