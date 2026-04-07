import React from "react";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

const Insights = ({ data }) => {
  // Total Income
  const totalIncome = data
    ?.filter((item) => item.type === "Income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  // Total Expense
  const totalExpense = data
    ?.filter((item) => item.type === "Expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  // Highest Expense Category
  const categoryMap = {};

  data?.forEach((item) => {
    if (item.type === "Expense") {
      const cat = item.category || "Other";
      categoryMap[cat] = (categoryMap[cat] || 0) + item.amount;
    }
  });

  const topCategory = Object.keys(categoryMap).reduce(
    (a, b) => (categoryMap[a] > categoryMap[b] ? a : b),
    "None",
  );
  const insightsData = [
    {
      id: 1,
      text: `Total income is ₹${totalIncome}`,
      type: "positive",
      icon: TrendingUp,
    },
    {
      id: 2,
      text: `Total expenses are ₹${totalExpense}`,
      type: "negative",
      icon: TrendingDown,
    },
    {
      id: 3,
      text: `Highest spending category: ${topCategory}`,
      type: "warning",
      icon: AlertCircle,
    },
  ];

  const location = useLocation();
  const getPadding = () => {
    if (location.pathname === "/insights") return "px-3 md:px-6 lg:px-8";
    return "px-0";
  };

  return (
    <div className={`pt-4 ${getPadding()}`}>
      <div className="bg-white dark:bg-slate-900  shadow-sm rounded-2xl p-4 md:p-6   border border-slate-200 dark:border-slate-800 transition duration-300">
        {/* Header */}
        <div className="">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight ">
            Insights
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your recent financial trends and analysis
          </p>
        </div>

        <div className="h-[1px] bg-slate-100 dark:bg-slate-800 my-4 rounded-full"></div>

        {/* Insights List */}
        <div className="space-y-3">
          {insightsData.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className={`flex items-center sm:items-center gap-3 p-3 rounded-xl transition hover:shadow-sm
                ${
                  item.type === "positive"
                    ? "bg-green-50/50 border-green-100 dark:bg-green-500/5 dark:border-green-500/20"
                    : item.type === "negative"
                      ? "bg-red-50/50 border-red-100 dark:bg-red-500/5 dark:border-red-500/20"
                      : "bg-yellow-50/50 border-yellow-100 dark:bg-yellow-500/5 dark:border-yellow-500/20"
                }`}
              >
                {/* Icon */}
                <div
                  className={`p-2.5 rounded-lg shadow-sm shrink-0
                  ${
                    item.type === "positive"
                      ? "bg-white dark:bg-green-500/20 text-green-600 dark:text-green-400"
                      : item.type === "negative"
                        ? "bg-white dark:bg-red-500/20 text-red-600 dark:text-red-400"
                        : "bg-white dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                  }`}
                >
                  <Icon size={20} />
                </div>

                {/* Text */}
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Insights;
