import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  BarChart3,
  Settings,
  Trash2,
  Edit,
  DollarSign,
  ShoppingCart,
  Users,
} from "lucide-react";
import ProductData from "../Data/ProductData"; // Assuming this is where your data is

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock statistics
  const stats = [
    {
      label: "Total Revenue",
      value: "$4,250",
      icon: <DollarSign className="text-green-600" />,
      bg: "bg-green-100",
    },
    {
      label: "Orders",
      value: "24",
      icon: <ShoppingCart className="text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      label: "Total Products",
      value: "12",
      icon: <Package className="text-purple-600" />,
      bg: "bg-purple-100",
    },
    {
      label: "Store Visitors",
      value: "1,120",
      icon: <Users className="text-orange-600" />,
      bg: "bg-orange-100",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-600">Seller Hub</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <NavItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          />
          <NavItem
            icon={<Package size={20} />}
            label="My Products"
            active={activeTab === "products"}
            onClick={() => setActiveTab("products")}
          />
          <NavItem
            icon={<PlusCircle size={20} />}
            label="Add Product"
            active={activeTab === "add"}
            onClick={() => setActiveTab("add")}
          />
          <NavItem
            icon={<BarChart3 size={20} />}
            label="Analytics"
            active={activeTab === "analytics"}
            onClick={() => setActiveTab("analytics")}
          />
          <NavItem
            icon={<Settings size={20} />}
            label="Settings"
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 capitalize">
              {activeTab}
            </h1>
            <p className="text-gray-500 text-sm">
              Welcome back to your store manager.
            </p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition shadow-md">
            <PlusCircle size={18} /> <span>Add New Product</span>
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4"
            >
              <div className={`p-3 rounded-lg ${stat.bg}`}>{stat.icon}</div>
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase">
                  {stat.label}
                </p>
                <p className="text-xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Product Management Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">Recent Products</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ProductData.slice(0, 5).map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={`/image/${product.category}/${product.image}`}
                        className="w-10 h-10 rounded bg-gray-100 object-contain"
                        alt=""
                      />
                      <span className="font-medium text-gray-800 text-sm">
                        {product.title}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-800">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-[10px] font-bold uppercase">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3 text-gray-400">
                        <button className="hover:text-blue-600 transition">
                          <Edit size={18} />
                        </button>
                        <button className="hover:text-red-600 transition">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

// Sidebar Navigation Item Helper
const NavItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition ${
      active
        ? "bg-blue-50 text-blue-600"
        : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
    }`}
  >
    {icon} {label}
  </button>
);

export default SellerDashboard;
