import {
  DollarSign,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

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

const SellerDashboardDashboard = ({ products, categories, analytics }) => {
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
    { name: "Belgium", sales: "6,972" },
    { name: "Sweden", sales: "4,972" },
    { name: "Vietnam", sales: "6,972" },
    { name: "Australia", sales: "6,972" },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <StatCard
          label="Total Stock Value"
          val={`$${analytics.totalVal.toLocaleString()}`}
          icon={<DollarSign />}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          label="Critical Stock"
          val={analytics.lowStockCount}
          icon={<AlertTriangle />}
          color="bg-red-100 text-red-600"
        />
        <StatCard
          label="Avg Unit Price"
          val={`$${analytics.avgPrice.toFixed(2)}`}
          icon={<TrendingUp />}
          color="bg-blue-100 text-blue-600"
        />
      </div>

      {/* SALES CHART */}
      <div className="bg-white p-4 sm:p-6 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 px-2 gap-3">
          <div>
            <h3 className="font-black text-lg">Sales Performance</h3>
            <p className="text-xs text-slate-400 font-bold">Monthly revenue vs orders</p>
          </div>
          <select className="text-xs font-bold bg-slate-50 p-2 rounded-lg outline-none">
            <option>Last 12 Months</option>
            <option>Last 30 Days</option>
          </select>
        </div>

        <div className="h-56 sm:h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dummyChartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: "bold", fill: "#94a3b8" }} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={4} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* STOCK ANALYSIS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="font-black text-base mb-4">Stock Distribution</h3>
          <div className="h-64">
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
                    <Cell key={`cell-${index}`} fill={["#3b82f6", "#10b981", "#f59e0b", "#ef4444"][index % 4]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="font-black text-base mb-4">Inventory Health (Top 6 Items)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={products.slice(0, 6)} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="title" type="category" width={80} tick={{ fontSize: 9, fontWeight: "bold" }} />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Bar dataKey="stock" fill="#10b981" radius={[0, 10, 10, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* EARNINGS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-base">Monthly Earnings</h3>
            <span className="text-green-500 text-xs font-black bg-green-50 px-2 py-1 rounded-lg">
              +$2,400 this month
            </span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dummyBarData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: "bold" }} />
                <Bar dataKey="val" fill="#3b82f6" radius={[10, 10, 10, 10]} barSize={15} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="font-black text-base mb-4">Global Reach</h3>
          <div className="space-y-4">
            {allCountries.map((country, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-black">
                    {country.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-sm font-bold text-slate-700">
                    {country.name}
                  </span>
                </div>
                <span className="text-sm font-black">${country.sales}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboardDashboard;
