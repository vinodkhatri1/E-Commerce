import React, { useState, useMemo, useEffect } from "react";
import {
  LayoutDashboard, Package, PlusCircle, BarChart3, Trash2, Edit,
  DollarSign, Menu, X, Search, Eye, ArrowLeft, TrendingUp,
  Bell, ChevronRight, Layers, User, Star, CheckCircle2
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const SellerDashboard = () => {
  // ERROR FIXED: Removed the useProducts() hook call as 'products' was being redeclared below.
  
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("seller_products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  useEffect(() => {
    localStorage.setItem("seller_products", JSON.stringify(products));
  }, [products]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const productSalesData = [
    { month: "Jan", sales: 40 },
    { month: "Feb", sales: 30 },
    { month: "Mar", sales: 60 },
    { month: "Apr", sales: 80 },
    { month: "May", sales: 50 },
    { month: "Jun", sales: 90 },
  ];

  const [newProduct, setNewProduct] = useState({
    title: "",
    category: "electronics",
    price: "",
    discount: "",
    description: "",
    rating: 5,
    image: "default.png",
  });

  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const totalRevenue = useMemo(() => {
    return products.reduce((acc, p) => acc + p.price, 0).toFixed(2);
  }, [products]);

  const totalOrders = 124;
  const totalVisitors = 1450;

  const categoryBreakdown = useMemo(() => {
    const counts = {};
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [products]);

  const handleSave = (e) => {
    e.preventDefault();
    const productToAdd = {
      ...newProduct,
      id: Date.now(),
      price: parseFloat(newProduct.price),
      discount: parseFloat(newProduct.discount || 0),
    };
    setProducts([productToAdd, ...products]);
    setNewProduct({
      title: "",
      category: "electronics",
      price: "",
      discount: "",
      description: "",
      rating: 5,
      image: "default.png",
    });
    setActiveTab("products");
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  // Re-usable Sub-components
  const NavItem = ({ icon, label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
        active 
          ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      {icon}
      <span className="font-bold text-sm">{label}</span>
      {active && <ChevronRight size={16} className="ml-auto" />}
    </button>
  );

  const StatCard = ({ label, value, icon }) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600">
          {icon}
        </div>
      </div>
      <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{label}</p>
      <h3 className="text-2xl font-black text-slate-900 mt-1">{value}</h3>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 w-72 bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 flex flex-col`}
      >
        <div className="p-7 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Layers className="text-white" size={22} />
          </div>
          <h2 className="text-xl font-black text-slate-900">VibeStore</h2>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden ml-auto text-slate-400">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 mt-3 space-y-2">
          <NavItem
            icon={<LayoutDashboard size={20} />}
            label="Overview"
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          />
          <NavItem
            icon={<Package size={20} />}
            label="Inventory"
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
            label="Sales Report"
            active={activeTab === "analytics"}
            onClick={() => setActiveTab("analytics")}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-y-auto px-6 py-8 md:px-12 md:py-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard</h1>
            <p className="text-slate-500 font-medium">Professional seller panel</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none"
                />
             </div>
             <button onClick={() => setSidebarOpen(true)} className="md:hidden p-3 bg-white border rounded-2xl">
               <Menu size={20} />
             </button>
          </div>
        </header>

        {/* Content Tabs */}
        {(activeTab === "dashboard" || activeTab === "products") && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard label="Net Revenue" value={`$${totalRevenue}`} icon={<DollarSign size={24} />} />
              <StatCard label="Total Items" value={products.length} icon={<Package size={24} />} />
              <StatCard label="Orders" value={totalOrders} icon={<BarChart3 size={24} />} />
              <StatCard label="Visitors" value={totalVisitors} icon={<Star size={24} />} />
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
              <div className="p-8 border-b flex items-center justify-between">
                <h3 className="font-bold">Inventory</h3>
                <button onClick={() => setActiveTab("add")} className="px-5 py-3 bg-blue-600 text-white rounded-2xl font-bold">+ Add</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr className="text-xs font-black text-slate-400 uppercase">
                      <th className="px-8 py-5 text-left">Product</th>
                      <th className="px-8 py-5 text-left">Category</th>
                      <th className="px-8 py-5 text-left">Price</th>
                      <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="border-t hover:bg-slate-50">
                        <td className="px-8 py-5 font-bold">{p.title}</td>
                        <td className="px-8 py-5">{p.category}</td>
                        <td className="px-8 py-5">${p.price.toFixed(2)}</td>
                        <td className="px-8 py-5 text-right flex justify-end gap-2">
                          <button onClick={() => { setSelectedProduct(p); setActiveTab("view-detail"); }} className="p-2 text-blue-600"><Eye size={18}/></button>
                          <button onClick={() => handleDelete(p.id)} className="p-2 text-rose-500"><Trash2 size={18}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Add Product Form */}
        {activeTab === "add" && (
          <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl border shadow-xl">
             <h2 className="text-2xl font-black mb-6">Add New Product</h2>
             <form onSubmit={handleSave} className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="text-xs font-bold uppercase">Title</label>
                  <input required className="w-full mt-2 p-3 border rounded-xl" value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase">Price</label>
                  <input required type="number" className="w-full mt-2 p-3 border rounded-xl" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase">Category</label>
                  <select className="w-full mt-2 p-3 border rounded-xl" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home</option>
                  </select>
                </div>
                <div className="col-span-2 flex justify-end gap-4 mt-4">
                  <button type="button" onClick={() => setActiveTab("products")} className="px-6 py-2 border rounded-xl font-bold">Cancel</button>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold">Publish</button>
                </div>
             </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default SellerDashboard;