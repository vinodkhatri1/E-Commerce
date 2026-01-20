import React, { useState, useMemo } from "react";
import { useProducts } from "../context/productContext";
import {
  LayoutDashboard, Package, PlusCircle, BarChart3, Trash2, Edit,
  DollarSign, Menu, X, Search, Eye, ArrowLeft, TrendingUp,
  Bell, Layers, User, Star, AlertTriangle, RotateCcw
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, Tooltip, LineChart, Line,
  XAxis, YAxis, CartesianGrid,
} from "recharts";

const SellerDashboard = () => {
  const {
    products,
    categories,
    deleteProduct,
    addProduct,
    updateProduct,
    resetData,
  } = useProducts();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // --- ANALYTICS ---
  const analytics = useMemo(() => {
    const totalVal = products.reduce((sum, p) => sum + Number(p.price) * (Number(p.stock) || 1), 0);
    const lowStockCount = products.filter((p) => p.stock < 10).length;
    const avgPrice = products.length
      ? products.reduce((sum, p) => sum + Number(p.price), 0) / products.length
      : 0;
    return { totalVal, lowStockCount, avgPrice };
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      ...data,
      id: editItem ? editItem.id : Date.now(),
      price: Number(data.price),
      stock: Number(data.stock),
      rating: editItem ? editItem.rating : 5,
    };

    if (editItem) {
      updateProduct(editItem.id, payload);
    } else {
      addProduct(payload);
    }
    setActiveTab("products");
    setEditItem(null);
  };

  return (
    <div className="flex min-h-screen bg-[#fcfcfd] text-slate-900">
      {/* SIDEBAR */}
      <aside
        className={`fixed md:static inset-y-0 left-0 w-72 bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 flex flex-col p-6`}
      >
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <Layers className="text-white" size={22} />
          </div>
          <h2 className="text-xl font-black tracking-tighter text-blue-600 uppercase">Seller Hub</h2>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden ml-auto"><X size={20} /></button>
        </div>

        <nav className="space-y-2 flex-1">
          <NavItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
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
            label={editItem ? "Editing..." : "Add Product"}
            active={activeTab === "add"}
            onClick={() => { setEditItem(null); setActiveTab("add"); }}
          />
          <NavItem
            icon={<BarChart3 size={20} />}
            label="Analytics"
            active={activeTab === "analytics"}
            onClick={() => setActiveTab("analytics")}
          />
        </nav>

        <button onClick={resetData} className="flex items-center gap-2 text-xs text-slate-400 hover:text-red-500 font-bold p-2 mt-auto">
          <RotateCcw size={14} /> Reset All Data
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0 overflow-y-auto p-6 md:p-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black capitalize tracking-tight">{activeTab}</h1>
            <p className="text-slate-400 text-sm font-bold">Managing {products.length} Items</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 ring-blue-50 transition-all text-sm font-medium"
              />
            </div>
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-3 bg-white border rounded-2xl shadow-sm"><Menu size={20} /></button>
          </div>
        </header>

        {/* --- VIEWS --- */}
        {activeTab === "dashboard" && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard label="Total Stock Value" val={`$${analytics.totalVal.toLocaleString()}`} icon={<DollarSign />} color="bg-green-100 text-green-600" />
              <StatCard label="Critical Stock" val={analytics.lowStockCount} icon={<AlertTriangle />} color="bg-red-100 text-red-600" />
              <StatCard label="Avg Unit Price" val={`$${analytics.avgPrice.toFixed(2)}`} icon={<TrendingUp />} color="bg-blue-100 text-blue-600" />
            </div>
            <div className="bg-white p-8 rounded-3xl border shadow-sm">
              <h3 className="font-black text-lg mb-6">Inventory Overview</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={products.slice(0, 6)}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="price" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVal)" />
                    <Tooltip />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] uppercase font-black text-slate-400 border-b">
                <tr>
                  <th className="p-5">Product</th>
                  <th className="p-5">Category</th>
                  <th className="p-5">Price</th>
                  <th className="p-5">Stock</th>
                  <th className="p-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50 transition group">
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <img 
                          src={product.image?.startsWith('http') ? product.image : `/image/${product.category}/${product.image}`} 
                          className="w-12 h-12 rounded-xl object-cover bg-slate-100 border border-slate-100"
                          onError={(e) => e.target.src = "https://placehold.co/100"}
                        />
                        <span className="font-bold text-sm text-slate-700">{product.title}</span>
                      </div>
                    </td>
                    <td className="p-5 text-xs font-bold uppercase text-slate-400">{product.category}</td>
                    <td className="p-5 font-black text-sm text-slate-900">${product.price}</td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full font-bold text-[10px] uppercase ${product.stock < 10 ? "bg-red-50 text-red-500" : "bg-slate-100 text-slate-600"}`}>
                        {product.stock || 0} in stock
                      </span>
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => { setSelectedProduct(product); setActiveTab("view-detail"); }} className="p-2 text-slate-400 hover:text-blue-600 transition"><Eye size={18} /></button>
                        <button onClick={() => { setEditItem(product); setActiveTab("add"); }} className="p-2 text-slate-400 hover:text-blue-600 transition"><Edit size={18} /></button>
                        <button onClick={() => deleteProduct(product.id)} className="p-2 text-slate-400 hover:text-red-500 transition"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "add" && (
          <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl  shadow-xl shadow-slate-200/50 animate-in fade-in zoom-in-95 duration-300">
            <h2 className="text-2xl font-black mb-6">{editItem ? "Edit Product" : "New Listing"}</h2>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Title" name="title" defaultValue={editItem?.title} required />
                <Input label="Brand" name="brand" defaultValue={editItem?.brand} required />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Input label="Price" name="price" type="number" step="0.01" defaultValue={editItem?.price} required />
                <Input label="Stock" name="stock" type="number" defaultValue={editItem?.stock} required />
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase text-slate-400">Category</label>
                  <select name="category" defaultValue={editItem?.category} className="p-3 bg-slate-50 border rounded-xl font-bold text-sm outline-none focus:ring-2 ring-blue-100">
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <Input label="Image Filename or URL" name="image" defaultValue={editItem?.image} required />
              <div className="pt-6 flex gap-4">
                <button type="submit" className="flex-1 bg-blue-600 text-white font-bold p-4 rounded-2xl hover:bg-slate-900 transition shadow-lg shadow-blue-100">
                  {editItem ? "Update Listing" : "Publish to Store"}
                </button>
                <button type="button" onClick={() => setActiveTab("products")} className="px-6 font-bold text-slate-400 hover:text-slate-900 transition">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* DETAIL VIEW */}
        {activeTab === "view-detail" && selectedProduct && (
          <div className="animate-in slide-in-from-right duration-500">
            <button onClick={() => setActiveTab("products")} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-black text-xs uppercase tracking-widest mb-8">
              <ArrowLeft size={16} /> Back to Inventory
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-white rounded-[2.5rem] p-4 border shadow-sm">
                <img 
                  src={selectedProduct.image?.startsWith('http') ? selectedProduct.image : `/image/${selectedProduct.category}/${selectedProduct.image}`} 
                  className="w-full h-96 object-contain bg-slate-50 rounded-4xl"
                  onError={(e) => e.target.src = "https://placehold.co/400"}
                />
              </div>
              <div className="space-y-6">
                <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-black text-[10px] uppercase">{selectedProduct.category}</span>
                <h2 className="text-4xl font-black text-slate-900 leading-tight">{selectedProduct.title}</h2>
                <p className="text-3xl font-black text-blue-600">${selectedProduct.price}</p>
                <div className="flex gap-4">
                  <div className="p-4 bg-white border rounded-2xl flex-1 text-center">
                    <p className="text-[10px] font-black uppercase text-slate-400">Stock</p>
                    <p className="text-xl font-black">{selectedProduct.stock} pcs</p>
                  </div>
                  <div className="p-4 bg-white border rounded-2xl flex-1 text-center">
                    <p className="text-[10px] font-black uppercase text-slate-400">Rating</p>
                    <p className="text-xl font-black flex items-center justify-center gap-1"><Star size={16} className="text-yellow-400 fill-yellow-400" /> {selectedProduct.rating || 5}.0</p>
                  </div>
                </div>
                <div className="flex gap-3 pt-6">
                  <button onClick={() => { setEditItem(selectedProduct); setActiveTab("add"); }} className="flex-1 bg-slate-900 text-white font-bold p-4 rounded-2xl hover:bg-blue-600 transition">Edit Product</button>
                  <button onClick={() => { deleteProduct(selectedProduct.id); setActiveTab("products"); }} className="p-4 bg-red-50 text-red-500 rounded-2xl border border-red-100 hover:bg-red-500 hover:text-white transition"><Trash2 /></button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// --- SUB-COMPONENTS ---
const NavItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 p-3.5 rounded-2xl font-bold transition-all ${
      active ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
    }`}
  >
    {icon} <span className="text-sm">{label}</span>
  </button>
);

const StatCard = ({ label, val, icon, color }) => (
  <div className="bg-white p-7 rounded-4xl border border-slate-100 flex items-center gap-5 shadow-sm">
    <div className={`p-4 rounded-2xl ${color} shadow-sm`}>{icon}</div>
    <div>
      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{label}</p>
      <p className="text-2xl font-black text-slate-900">{val}</p>
    </div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{label}</label>
    <input
      {...props}
      className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:ring-2 ring-blue-100 focus:bg-white transition-all shadow-inner"
    />
  </div>
);

export default SellerDashboard;