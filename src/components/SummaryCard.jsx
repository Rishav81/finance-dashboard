import React from "react";

import {
  Wallet,
  BanknoteArrowUp,
  BanknoteArrowDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import Charts from "./Charts";
import TransactionTable from "./TransactionTable";

const SummaryCard = ({ data }) => {
  const totalIncome = data
    .filter((tx) => tx.type === "Income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = data
    .filter((tx) => tx.type === "Expense")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const netBalance = totalIncome - totalExpense;

  const summaryData = [
    {
      title: "Net Balance",
      amount: netBalance,
      type: "Balance",
      icon: Wallet,
    },
    {
      title: "Total Income",
      amount: totalIncome,
      type: "Income",
      icon: BanknoteArrowUp,
      change: "5.26%",
      changeType: "profit",
    },
    {
      title: "Total Expense",
      amount: totalExpense,
      type: "Expense",
      icon: BanknoteArrowDown,
      change: "6.4%",
      changeType: "loss",
    },
  ];

  return (
    <div className="px-4 md:px-6 lg:px-8">
      <div className=" pt-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          Financial Overview
        </h1>
        <p className="text-sm   text-gray-500 dark:text-gray-300  ">
          Track your balance, income, and expenses
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 md:gap-6  pt-6">
        {summaryData.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className={`relative p-3 md:p-5  rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden border border-white/20 
    ${
      item.type === "Income"
        ? "bg-gradient-to-br from-green-50 to-green-100/50 border-white/20 dark:from-green-900/20 dark:to-green-800/20 dark:border-green-500/20"
        : item.type === "Expense"
          ? "bg-gradient-to-br from-red-50 to-red-100/50 border-white/20 dark:from-red-900/20 dark:to-red-800/20 dark:border-red-500/20"
          : "bg-gradient-to-br from-blue-50 to-blue-100/50 border-white/20 dark:from-blue-900/20 dark:to-blue-800/20 dark:border-blue-500/20"
    }
  `}
            >
              {/* Glow Effect (only for balance) */}
              {item.type === "Balance" && (
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full"></div>
              )}

              {/* Top Section */}
              <div className="flex items-center justify-between">
                {/* Title */}
                <h2 className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {item.title}
                </h2>

                {/* Icon */}
                <div
                  className={`p-2 rounded-xl ${
                    item.type === "Income"
                      ? "bg-green-100 text-green-600"
                      : item.type === "Expense"
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                  }`}
                >
                  <Icon size={20} />
                </div>
              </div>
              <div className="flex items-end justify-between flex-wrap mt-3">
                {/* Amount */}
                <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  ₹{item.amount.toLocaleString("en-IN")}
                </p>

                {/* Profit / Loss */}
                {item.change && (
                  <div
                    className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-lg  ${
                      item.changeType === "profit"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {item.changeType === "profit" ? (
                      <ArrowUp size={14} />
                    ) : (
                      <ArrowDown size={14} />
                    )}
                    {item.change}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <Charts data={data} />
      <TransactionTable data={data} />
    </div>
  );
};

export default SummaryCard;
