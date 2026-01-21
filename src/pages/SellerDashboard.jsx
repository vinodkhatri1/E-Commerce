import React, { useState, useMemo, useEffect } from "react";
import { useProducts } from "../context/productContext";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Trash2,
  Edit,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  RotateCcw,
  Image as ImageIcon,
  Save,
  Tag,
  Menu,
  X,
  Home,
  ChevronRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  Tooltip,
  BarChart,
  Bar,
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

  // --- UI STATE ---
  const [activeTab, setActiveTab] = useState("dashboard");
  const [editItem, setEditItem] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAllCountries, setShowAllCountries] = useState(false);

  // --- PRICING & DISCOUNT STATE ---
  const [pricing, setPricing] = useState({
    price: "",
    originalPrice: "",
    discountPercent: 0,
  });

  // Sync pricing and images when editing
  useEffect(() => {
    if (editItem) {
      setPricing({
        price: editItem.price || "",
        originalPrice: editItem.originalPrice || "",
        discountPercent: editItem.discountPercent || 0,
      });
      setPreviewImage(editItem.image || "");
    } else {
      setPricing({ price: "", originalPrice: "", discountPercent: 0 });
      setPreviewImage("");
    }
  }, [editItem]);

  // Price Calculation Logic
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const val = value === "" ? "" : Number(value);
    setPricing((prev) => {
      const updated = { ...prev, [name]: val };
      if (updated.originalPrice > 0 && updated.originalPrice > updated.price) {
        updated.discountPercent = Math.round(
          ((updated.originalPrice - updated.price) / updated.originalPrice) *
            100,
        );
      } else {
        updated.discountPercent = 0;
      }
      return updated;
    });
  };

  // Analytics Calculation
  const analytics = useMemo(() => {
    const totalVal = products.reduce(
      (sum, p) => sum + Number(p.price) * Number(p.stock),
      0,
    );
    const lowStockCount = products.filter((p) => p.stock < 10).length;
    const avgPrice = products.length
      ? products.reduce((sum, p) => sum + Number(p.price), 0) / products.length
      : 0;
    return { totalVal, lowStockCount, avgPrice };
  }, [products]);

  // Image Upload Handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const payload = {
      ...data,
      id: editItem ? editItem.id : Date.now(),
      price: Number(pricing.price),
      originalPrice: Number(pricing.originalPrice) || 0,
      discountPercent: pricing.discountPercent,
      stock: Number(data.stock),
      image: previewImage || (editItem ? editItem.image : "placeholder.png"),
    };
    editItem ? updateProduct(editItem.id, payload) : addProduct(payload);
    setEditItem(null);
    setActiveTab("products");
  };

  // Dummy Data for Charts
  const dummyChartData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 600 },
    { name: "Mar", value: 300 },
    { name: "Apr", value: 500 },
    { name: "May", value: 550 },
    { name: "Jun", value: 400 },
  ];
  const allCountries = [
    { name: "Turkey", sales: "6,972", trend: "up" },
    { name: "Belgium", sales: "4,120", trend: "up" },
    { name: "Sweden", sales: "2,972", trend: "down" },
    { name: "Vietnam", sales: "1,850", trend: "up" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] text-slate-900 font-sans">
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden lg:flex w-64 bg-white border-r fixed h-full p-6 flex-col z-50">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Package className="text-white" size={18} />
          </div>
          <h2 className="text-xl font-black text-slate-800 tracking-tighter uppercase">
            Nexus<span className="text-blue-600">Hub</span>
          </h2>
        </div>

        <nav className="space-y-1.5 flex-1">
          <TabButton
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
            icon={<LayoutDashboard size={20} />}
            label="Overview"
          />
          <TabButton
            active={activeTab === "products"}
            onClick={() => setActiveTab("products")}
            icon={<Package size={20} />}
            label="Inventory"
          />
          <TabButton
            active={activeTab === "add"}
            onClick={() => {
              setEditItem(null);
              setActiveTab("add");
            }}
            icon={<PlusCircle size={20} />}
            label="Add Product"
          />
        </nav>

        <button
          onClick={resetData}
          className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-rose-500 uppercase tracking-widest p-4 bg-slate-50 rounded-2xl transition-all"
        >
          <RotateCcw size={14} /> Reset Database
        </button>
      </aside>

      {/* --- MOBILE HEADER & DRAWER --- */}
      <div className="lg:hidden fixed top-0 inset-x-0 h-16 bg-white border-b px-4 flex items-center justify-between z-40">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 hover:bg-slate-100 rounded-xl"
        >
          <Menu size={24} />
        </button>
        <span className="font-black text-blue-600 uppercase tracking-tight">
          Nexus Hub
        </span>
        <div className="w-8 h-8 rounded-full bg-slate-100 border" />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white z-[60] transition-transform duration-300 lg:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <span className="font-black text-blue-600 uppercase">Menu</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 bg-slate-50 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="space-y-2 flex-1">
            <TabButton
              active={activeTab === "dashboard"}
              onClick={() => {
                setActiveTab("dashboard");
                setMobileOpen(false);
              }}
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
            />
            <TabButton
              active={activeTab === "products"}
              onClick={() => {
                setActiveTab("products");
                setMobileOpen(false);
              }}
              icon={<Package size={20} />}
              label="Inventory"
            />
            <TabButton
              active={activeTab === "add"}
              onClick={() => {
                setActiveTab("add");
                setMobileOpen(false);
                setEditItem(null);
              }}
              icon={<PlusCircle size={20} />}
              label="Add New"
            />
            <hr className="my-4 border-slate-100" />
            <TabButton
              active={false}
              onClick={() => (window.location.href = "/")}
              icon={<Home size={20} />}
              label="Back to Store"
            />
          </nav>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 lg:ml-64 p-4 md:p-8 lg:p-10 pt-20 lg:pt-10 transition-all">
        {/* VIEW: DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
              <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-slate-800">
                Store Analytics
              </h1>
              <p className="text-slate-400 font-bold text-sm">
                Real-time performance overview
              </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              <StatCard
                label="Inventory Value"
                val={`$${analytics.totalVal.toLocaleString()}`}
                icon={<DollarSign />}
                color="bg-emerald-50 text-emerald-600"
              />
              <StatCard
                label="Restock Needed"
                val={analytics.lowStockCount}
                icon={<AlertTriangle />}
                color="bg-rose-50 text-rose-600"
              />
              <StatCard
                label="Avg Price"
                val={`$${analytics.avgPrice.toFixed(2)}`}
                icon={<TrendingUp />}
                color="bg-blue-50 text-blue-600"
              />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <h3 className="font-black mb-6 flex items-center gap-2">
                  <TrendingUp size={18} className="text-blue-600" /> Revenue
                  Growth
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dummyChartData}>
                      <defs>
                        <linearGradient
                          id="colorVal"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#2563eb"
                            stopOpacity={0.1}
                          />
                          <stop
                            offset="95%"
                            stopColor="#2563eb"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" hide />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#2563eb"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorVal)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <h3 className="font-black mb-6">Top Markets</h3>
                <div className="space-y-4">
                  {allCountries.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-black text-xs text-slate-400 group-hover:text-blue-600">
                          {c.name[0]}
                        </div>
                        <span className="font-bold text-sm">{c.name}</span>
                      </div>
                      <span className="font-black text-sm">${c.sales}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: INVENTORY */}
        {activeTab === "products" && (
          <div className="animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <h1 className="text-2xl font-black tracking-tight">
                Product Manager
              </h1>
              <button
                onClick={() => {
                  setEditItem(null);
                  setActiveTab("add");
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-100 hover:scale-105 transition-transform active:scale-95"
              >
                <PlusCircle size={18} /> New Product
              </button>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 border-b">
                  <tr>
                    <th className="p-6">Product Information</th>
                    <th className="p-6">Price</th>
                    <th className="p-6">Stock Status</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-50 transition-colors group"
                    >
                      <td className="p-6 flex items-center gap-4">
                        <img
                          src={
                            p.image?.startsWith("data:")
                              ? p.image
                              : `/image/${p.category}/${p.image}`
                          }
                          className="w-12 h-12 rounded-xl object-cover bg-slate-100"
                          onError={(e) =>
                            (e.target.src = "https://placehold.co/100")
                          }
                        />
                        <div>
                          <p className="font-bold text-sm text-slate-800">
                            {p.title}
                          </p>
                          <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">
                            {p.category}
                          </p>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col">
                          <span className="font-black text-sm">${p.price}</span>
                          {p.discountPercent > 0 && (
                            <span className="text-[10px] text-emerald-500 font-bold">
                              -{p.discountPercent}% OFF
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-6">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${p.stock < 10 ? "bg-rose-50 text-rose-600" : "bg-slate-100 text-slate-500"}`}
                        >
                          {p.stock} units
                        </span>
                      </td>
                      <td className="p-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditItem(p);
                              setActiveTab("add");
                            }}
                            className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-4 rounded-3xl border border-slate-200 flex gap-4 shadow-sm"
                >
                  <img
                    src={
                      p.image?.startsWith("data:")
                        ? p.image
                        : `/image/${p.category}/${p.image}`
                    }
                    className="w-20 h-20 rounded-2xl object-cover bg-slate-50"
                  />
                  <div className="flex-1 min-w-0 py-1">
                    <h4 className="font-bold text-slate-800 text-sm truncate">
                      {p.title}
                    </h4>
                    <p className="text-[10px] font-black text-blue-500 uppercase mb-2">
                      {p.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-black text-base">${p.price}</span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            setEditItem(p);
                            setActiveTab("add");
                          }}
                          className="p-2 bg-slate-50 rounded-lg text-slate-400"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-2 bg-slate-50 rounded-lg text-rose-400"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: ADD/EDIT FORM */}
        {activeTab === "add" && (
          <div className="max-w-4xl mx-auto pb-10">
            <form
              onSubmit={handleFormSubmit}
              className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-8 animate-in fade-in zoom-in-95"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <Input
                    label="Display Title"
                    name="title"
                    defaultValue={editItem?.title}
                    required
                  />
                  <Input
                    label="Brand / Manufacturer"
                    name="brand"
                    defaultValue={editItem?.brand}
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-blue-600 uppercase px-1">
                        Sale Price ($)
                      </label>
                      <input
                        type="number"
                        name="price"
                        step="0.01"
                        value={pricing.price}
                        onChange={handlePriceChange}
                        required
                        className="w-full p-3.5 bg-slate-50 rounded-2xl font-bold text-sm outline-none focus:ring-2 ring-blue-500 transition-all border-none"
                      />
                    </div>
                    <div className="space-y-1.5 relative">
                      <label className="text-[10px] font-black text-slate-400 uppercase px-1">
                        Regular Price
                      </label>
                      <input
                        type="number"
                        name="originalPrice"
                        step="0.01"
                        value={pricing.originalPrice}
                        onChange={handlePriceChange}
                        className="w-full p-3.5 bg-slate-50 rounded-2xl font-bold text-sm outline-none focus:ring-2 ring-blue-500 transition-all border-none"
                      />
                      {pricing.discountPercent > 0 && (
                        <span className="absolute -top-3 right-0 bg-emerald-500 text-white text-[9px] font-black px-2 py-1 rounded-lg animate-pulse">
                          {pricing.discountPercent}% OFF
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Stock Units"
                      name="stock"
                      type="number"
                      defaultValue={editItem?.stock}
                      required
                    />
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase px-1">
                        Category
                      </label>
                      <select
                        name="category"
                        defaultValue={editItem?.category}
                        className="w-full p-3.5 bg-slate-50 rounded-2xl font-bold text-sm border-none outline-none focus:ring-2 ring-blue-500 appearance-none"
                      >
                        {categories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase px-1">
                      Product Media
                    </label>
                    <div className="relative aspect-video rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden hover:border-blue-400 transition-colors group">
                      {previewImage ? (
                        <img
                          src={
                            previewImage.startsWith("data:")
                              ? previewImage
                              : `/image/${editItem?.category}/${previewImage}`
                          }
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <ImageIcon
                            className="mx-auto text-slate-300 mb-1"
                            size={32}
                          />
                          <span className="text-[10px] font-black text-slate-400 uppercase">
                            Upload JPEG/PNG
                          </span>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase px-1">
                      Short Description
                    </label>
                    <textarea
                      name="description"
                      defaultValue={editItem?.description}
                      rows="4"
                      className="w-full p-4 bg-slate-50 rounded-2xl font-medium text-sm border-none outline-none focus:ring-2 ring-blue-500 resize-none"
                      placeholder="Enter product highlights..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-100">
                <button
                  type="submit"
                  className="flex-1 bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-blue-600 shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  <Save size={20} />{" "}
                  {editItem ? "CONFIRM UPDATE" : "PUBLISH LISTING"}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("products")}
                  className="px-10 py-4 font-bold text-slate-400 hover:text-slate-800 transition-colors"
                >
                  Discard
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* --- MOBILE NAVIGATION BAR --- */}
      <nav className="lg:hidden fixed bottom-6 left-6 right-6 h-16 bg-slate-900/95 backdrop-blur-xl rounded-[2rem] flex items-center justify-around px-6 z-50 border border-white/10 shadow-2xl">
        <NavIcon
          active={activeTab === "dashboard"}
          onClick={() => setActiveTab("dashboard")}
          icon={<LayoutDashboard size={20} />}
        />
        <NavIcon
          active={activeTab === "products"}
          onClick={() => setActiveTab("products")}
          icon={<Package size={20} />}
        />
        <button
          onClick={() => {
            setEditItem(null);
            setActiveTab("add");
          }}
          className="w-12 h-12 bg-blue-500 rounded-2xl -mt-10 border-4 border-[#F9FAFB] text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform"
        >
          <PlusCircle size={24} />
        </button>
        <NavIcon
          active={activeTab === "add"}
          onClick={() => setActiveTab("add")}
          icon={<Edit size={20} />}
        />
        <NavIcon
          active={false}
          onClick={() => (window.location.href = "/")}
          icon={<Home size={20} />}
        />
      </nav>
    </div>
  );
};

// --- SUB-COMPONENTS ---
const TabButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${active ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-slate-400 hover:bg-slate-50 hover:text-slate-800"}`}
  >
    {icon} <span className="text-sm">{label}</span>
  </button>
);

const NavIcon = ({ active, onClick, icon }) => (
  <button
    onClick={onClick}
    className={`p-2 transition-all ${active ? "text-blue-400 scale-110" : "text-slate-500"}`}
  >
    {icon}
  </button>
);

const StatCard = ({ label, val, icon, color }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-200 flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
    <div className={`p-4 rounded-2xl ${color}`}>{icon}</div>
    <div>
      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
        {label}
      </p>
      <p className="text-xl font-black text-slate-800">{val}</p>
    </div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div className="space-y-1.5 w-full">
    <label className="text-[10px] font-black uppercase text-slate-400 px-1 tracking-widest">
      {label}
    </label>
    <input
      {...props}
      className="w-full p-3.5 bg-slate-50 rounded-2xl font-bold text-sm border-none outline-none focus:ring-2 ring-blue-500 transition-all"
    />
  </div>
);

export default SellerDashboard;
