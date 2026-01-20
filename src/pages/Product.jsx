import React, { useState, useMemo } from "react";
import {
  LayoutDashboard, Package, PlusCircle, BarChart3, Settings, Trash2, Edit,
  DollarSign, ShoppingCart, Users, Menu, X, Star, Search, 
  Eye, ArrowLeft, CheckCircle2, TrendingUp, PackageOpen
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line 
} from 'recharts';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // LOGIC: Ab ye empty array se shuru hoga
  const [products, setProducts] = useState([]); 
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ 
    title: "", category: "electronics", price: "", discount: 0, description: "", rating: 5, image: "default.png" 
  });

  // Monthly Sales Data (Mock)
  const productSalesData = [
    { month: 'Jan', sales: 40 }, { month: 'Feb', sales: 30 },
    { month: 'Mar', sales: 60 }, { month: 'Apr', sales: 80 },
    { month: 'May', sales: 50 }, { month: 'Jun', sales: 90 },
  ];

  // LOGIC: Search Filter (Empty products handle karega)
  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  // LOGIC: Save Product Handler
  const handleSave = (e) => {
    e.preventDefault();
    const productToAdd = { 
      ...newProduct, 
      id: Date.now(), 
      price: parseFloat(newProduct.price) 
    };
    setProducts([productToAdd, ...products]);
    setNewProduct({ title: "", category: "electronics", price: "", discount: 0, description: "", rating: 5, image: "default.png" });
    setActiveTab("products");
  };

  const stats = [
    { label: "Total Revenue", value: `$${products.reduce((acc, p) => acc + p.price, 0).toFixed(2)}`, icon: <DollarSign className="text-green-600" />, bg: "bg-green-100" },
    { label: "Total Products", value: products.length.toString(), icon: <Package className="text-purple-600" />, bg: "bg-purple-100" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 relative font-sans">
      {/* Sidebar */}
      <aside className={`fixed md:static top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 flex flex-col`}>
        <div className="p-6 flex justify-between items-center text-blue-600 font-bold text-2xl">Seller Hub</div>
        <nav className="flex-1 px-4 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />
          <NavItem icon={<Package size={20} />} label="My Products" active={activeTab === "products"} onClick={() => setActiveTab("products")} />
          <NavItem icon={<PlusCircle size={20} />} label="Add Product" active={activeTab === "add"} onClick={() => setActiveTab("add")} />
          <NavItem icon={<BarChart3 size={20} />} label="Analytics" active={activeTab === "analytics"} onClick={() => setActiveTab("analytics")} />
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-10">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 capitalize">{activeTab}</h1>
          {(activeTab === "products") && (
            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
            </div>
          )}
        </header>

        {/* --- VIEW: PRODUCT LIST / DASHBOARD --- */}
        {(activeTab === "dashboard" || activeTab === "products") && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {stats.map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${s.bg}`}>{s.icon}</div>
                        <div><p className="text-xs text-gray-500 font-bold uppercase">{s.label}</p><p className="text-xl font-black">{s.value}</p></div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
              {products.length === 0 ? (
                /* EMPTY STATE DESIGN */
                <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
                    <PackageOpen size={64} className="mb-4 text-gray-200" />
                    <p className="text-lg font-medium">No products found</p>
                    <p className="text-sm mb-6">Start by adding your first product to the store.</p>
                    <button onClick={() => setActiveTab("add")} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition">
                        <PlusCircle size={18} /> Add Your First Product
                    </button>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 text-gray-400 text-[11px] uppercase font-bold tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Product</th>
                      <th className="px-6 py-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50 transition group">
                        <td className="px-6 py-4 flex gap-4 items-center">
                          <div className="w-12 h-12 bg-gray-50 rounded-lg border flex items-center justify-center"><Package size={20} className="text-gray-300"/></div>
                          <div><p className="font-bold text-sm text-gray-800">{p.title}</p><p className="text-xs text-blue-600 font-bold">${p.price}</p></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-3">
                            <button onClick={() => { setSelectedProduct(p); setActiveTab("view-detail"); }} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"><Eye size={18} /></button>
                            <button onClick={() => setProducts(products.filter(item => item.id !== p.id))} className="p-2 text-gray-400 hover:text-red-600 transition"><Trash2 size={18} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* --- VIEW: ADD PRODUCT --- */}
        {activeTab === "add" && (
          <div className="max-w-2xl bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Create New Listing</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Product Name</label>
                <input required type="text" placeholder="e.g. iPhone 15 Pro" value={newProduct.title} onChange={(e) => setNewProduct({...newProduct, title: e.target.value})} className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Category</label>
                  <select value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} className="w-full p-3 border rounded-lg mt-1 outline-none">
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Base Price ($)</label>
                  <input required type="number" placeholder="0.00" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} className="w-full p-3 border rounded-lg mt-1 outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Product Description</label>
                <textarea rows="3" value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} className="w-full p-3 border rounded-lg mt-1 outline-none resize-none" placeholder="Enter product details..."></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg">Save & Publish Product</button>
            </form>
          </div>
        )}

        {/* VIEW: DETAIL PAGE WITH GRAPH (Jo humne pehle banaya tha) */}
        {activeTab === "view-detail" && selectedProduct && (
          <div className="animate-in fade-in duration-500 space-y-6">
            <button onClick={() => setActiveTab("products")} className="flex items-center gap-2 text-gray-500 font-bold text-sm"><ArrowLeft size={18} /> Back</button>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 flex gap-8">
                <div className="w-1/3 bg-gray-50 rounded-xl flex items-center justify-center p-4 border italic text-gray-400">Image Preview</div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold">{selectedProduct.title}</h2>
                  <p className="text-blue-600 font-bold mt-2">${selectedProduct.price}</p>
                  <p className="text-gray-500 mt-4 text-sm leading-relaxed">{selectedProduct.description || "No description provided."}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                <h3 className="font-bold mb-4 flex items-center gap-2"><TrendingUp size={18} className="text-blue-600"/> Performance</h3>
                <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={productSalesData}>
                            <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} dot={false} />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition ${active ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-100"}`}>
    {icon} {label}
  </button>
);

export default SellerDashboard;