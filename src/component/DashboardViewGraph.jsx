import React from "react";
import { DollarSign, AlertTriangle, TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  XAxis,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  YAxis,
} from "recharts";
import StatCard from "../component/StateCards";

const DashboardViewGraph = ({ products, categories, analytics }) => {
  // Data Logic
  const dummyChartData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 600 },
    { name: "Mar", value: 300 },
    { name: "Apr", value: 500 },
    { name: "May", value: 550 },
    { name: "Jun", value: 400 },
    { name: "Jul", value: 350 },
    { name: "Aug", value: 450 },
    { name: "Sep", value: 650 },
    { name: "Oct", value: 380 },
    { name: "Nov", value: 500 },
    { name: "Dec", value: 100 },
  ];

  const dummyBarData = [
    { name: "Jan", val: 40 },
    { name: "Feb", val: 80 },
    { name: "Mar", val: 30 },
    { name: "Apr", val: 50 },
    { name: "May", val: 90 },
    { name: "Jun", val: 70 },
    { name: "Jul", val: 20 },
    { name: "Aug", val: 60 },
  ];

  const allCountries = [
    { name: "Turkey", sales: "6,972" },
    { name: "Belgium", sales: "2,410" },
    { name: "Sweden", sales: "1,972" },
    { name: "Vietnam", sales: "850" },
    { name: "Australia", sales: "600" },
  ];

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 1. STAT CARDS GRID */}
      {/* Stacks on mobile, 3 columns on tablet+ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        <StatCard
          label="Total Value"
          val={`$${analytics.totalVal.toLocaleString()}`}
          icon={<DollarSign size={18} />}
          color="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          label="Critical Stock"
          val={analytics.lowStockCount}
          icon={<AlertTriangle size={18} />}
          color="bg-rose-50 text-rose-600"
        />
        <StatCard
          label="Avg Price"
          val={`$${analytics.avgPrice.toFixed(2)}`}
          icon={<TrendingUp size={18} />}
          color="bg-indigo-50 text-indigo-600"
        />
      </div>

      {/* 2. SALES CHART (Full Width) */}
      <div className="bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-row flex-wrap justify-between items-center mb-4 gap-2">
          <div>
            <h3 className="font-black text-sm md:text-base text-slate-800">
              Sales Trend
            </h3>
            <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-wide">
              Revenue vs Orders
            </p>
          </div>
          <select className="text-[10px] md:text-xs font-bold bg-slate-50 border border-slate-100 p-2 rounded-lg outline-none cursor-pointer hover:bg-slate-100 transition-colors">
            <option>Last 12 Months</option>
            <option>Last 30 Days</option>
          </select>
        </div>

        {/* Dynamic Height: Smaller on mobile, taller on desktop */}
        <div className="h-48 sm:h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={dummyChartData}
              margin={{ top: 5, right: 0, left: -20, bottom: 0 }}
            >
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: "bold", fill: "#94a3b8" }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: "bold", fill: "#94a3b8" }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                cursor={{ stroke: "#e2e8f0", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0, fill: "#4f46e5" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. MIDDLE ROW (Pie + Bar) */}
      {/* 1 Column on Mobile/Tablet, 2 Columns on Desktop (lg) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* STOCK DISTRIBUTION */}
        <div className="bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-black text-sm md:text-base mb-4 text-slate-800">
            Stock Distribution
          </h3>
          <div className="flex-1 min-h-50">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categories.map((cat) => ({
                    name: cat,
                    value: products.filter((p) => p.category === cat).length,
                  }))}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categories.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        ["#6366f1", "#10b981", "#f59e0b", "#f43f5e"][index % 4]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* INVENTORY HEALTH */}
        <div className="bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-black text-sm md:text-base mb-4 text-slate-800">
            Top Inventory Items
          </h3>
          <div className="flex-1 min-h-50">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={products.slice(0, 6)}
                layout="vertical"
                margin={{ left: -20 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  dataKey="title"
                  type="category"
                  width={100}
                  tick={{ fontSize: 10, fontWeight: "bold", fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "#f1f5f9" }}
                  contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
                />
                <Bar
                  dataKey="stock"
                  fill="#10b981"
                  radius={[0, 4, 4, 0]}
                  barSize={12}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM ROW (Earnings + Global) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* MONTHLY EARNINGS */}
        <div className="bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-sm md:text-base text-slate-800">
              Monthly Earnings
            </h3>
            <span className="text-emerald-600 text-[10px] md:text-xs font-black bg-emerald-50 px-2 py-1 rounded-lg">
              +$2,400
            </span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dummyBarData}>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: "bold", fill: "#94a3b8" }}
                  dy={10}
                />
                <Bar
                  dataKey="val"
                  fill="#6366f1"
                  radius={[4, 4, 4, 4]}
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GLOBAL REACH LIST */}
        <div className="bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-black text-sm md:text-base mb-4 text-slate-800">
            Global Sales
          </h3>
          <div className="space-y-3">
            {allCountries.map((country, i) => (
              <div
                key={i}
                className="flex items-center justify-between group hover:bg-slate-50 p-2 rounded-lg transition-colors -mx-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] font-black">
                    {country.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-xs md:text-sm font-bold text-slate-700">
                    {country.name}
                  </span>
                </div>
                <span className="text-xs md:text-sm font-black text-slate-900">
                  ${country.sales}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardViewGraph;
