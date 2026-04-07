import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Pie,
  Cell,
  PieChart,
  CartesianGrid,
} from "recharts";

const Charts = ({ data }) => {
  // 🔹 Monthly balance data (REAL DATA)

  // Step 1: Get current month index
  const now = new Date();
  const currentMonthIndex = now.getMonth();

  // Step 2: Get last 6 months dynamically
  const last6Months = [];

  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), currentMonthIndex - i);
    const month = date.toLocaleString("en-IN", { month: "short" });
    last6Months.push(month);
  }

  // Step 3: Create map
  const monthlyMap = {};

  // Step 4: Fill data
  (data || []).forEach((tx) => {
    const date = new Date(tx.date);
    const month = date.toLocaleString("en-IN", { month: "short" });

    // Only include last 6 months
    if (last6Months.includes(month)) {
      if (!monthlyMap[month]) {
        monthlyMap[month] = 0;
      }

      // 👉 No negative values
      if (tx.type === "Income") {
        monthlyMap[month] += tx.amount;
      } else {
        monthlyMap[month] += 0; // ignore expenses OR you can subtract but clamp later
      }
    }
  });

  // Step 5: Convert to chart format
  const monthlyData = last6Months.map((month) => ({
    name: month,
    balance: Math.max(monthlyMap[month] || 0, 0), // 🔥 prevents negative
  }));
  const expenseData = data
    .filter((tx) => tx.type === "Expense")
    .reduce((acc, tx) => {
      const category = tx.category || "other";
      const existing = acc.find((item) => item.name === category);

      if (existing) {
        existing.value += tx.amount;
      } else {
        acc.push({
          name: category,
          value: tx.amount,
        });
      }

      return acc;
    }, []);

  // 🔹 Pie chart data (REAL DATA)
  const pieData = expenseData;

  const COLORS = ["#EF4444", "#F59E0B", "#3B82F6", "#22C55E"];

  return (
    <div className="pt-4 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      {/* 📈 BALANCE TREND */}
      <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Balance Trend
          </h2>
          <p className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg">
            Based on transactions
          </p>
        </div>

        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              {/* 🔥 Gradient */}
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>

              {/* Grid (soft) */}
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />

              {/* X Axis */}
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
              />

              {/* Y Axis */}
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
              />

              {/* Tooltip */}
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "none",
                  borderRadius: "10px",
                  color: "#fff",
                }}
                labelStyle={{ color: "#94a3b8" }}
                cursor={{ stroke: "#3B82F6", strokeWidth: 1 }}
              />

              {/* 🔥 Line */}
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                fill="url(#colorBalance)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🥧 EXPENSE BREAKDOWN */}
      <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Expenses Breakdown
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Pie */}
          <div className="w-full sm:w-3/5 h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="w-full sm:w-2/5 space-y-3">
            {pieData.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  ₹{item.value.toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
