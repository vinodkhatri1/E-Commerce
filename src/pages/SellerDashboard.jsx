import { useState, useMemo, useEffect } from "react";
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

  const [activeTab, setActiveTab] = useState("dashboard");
  const [editItem, setEditItem] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [showAllCountries, setShowAllCountries] = useState(false);
  // 1️⃣ STATE (TOP OF COMPONENT KE ANDAR)
const [mobileOpen, setMobileOpen] = useState(false);


  // 1. AUTO-DISCOUNT STATE
  const [pricing, setPricing] = useState({
    price: "",
    originalPrice: "",
    discountPercent: 0,
  });

  // Sync pricing when editing
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

  // 2. AUTO-CALCULATION LOGIC
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

  // 3. ANALYTICS
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

  // 4. IMAGE HANDLER (Fixes the Main Page issue)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // This creates the "data:image/..." string
      };
      reader.readAsDataURL(file);
    }
  };

  const dummyChartData = [
  { name: 'Jan', value: 400 }, { name: 'Feb', value: 600 },
  { name: 'Mar', value: 300 }, { name: 'Apr', value: 500 },
  { name: 'May', value: 550 }, { name: 'Jun', value: 400 },
  { name: 'Jul', value: 350 }, { name: 'Aug', value: 450 },
  { name: 'Sep', value: 650 }, { name: 'Oct', value: 380 },
  { name: 'Nov', value: 500 }, { name: 'Dec', value: 100 },
];

const dummyBarData = [
  { name: 'Jan', val: 40 }, { name: 'Feb', val: 80 },
  { name: 'Mar', val: 30 }, { name: 'Apr', val: 50 },
  { name: 'May', val: 90 }, { name: 'Jun', val: 70 },
  { name: 'Jul', val: 20 }, { name: 'Aug', val: 60 },
];

const allCountries = [
  { name: 'Turkey', sales: '6,972', trend: 'up' },
  { name: 'Belgium', sales: '6,972', trend: 'up' },
  { name: 'Sweden', sales: '4,972', trend: 'down' },
  { name: 'Vietnam', sales: '6,972', trend: 'up' },
  { name: 'Australia', sales: '6,972', trend: 'down' },
  { name: 'Saudi Arabia', sales: '6,972', trend: 'down' },
  { name: 'Italy', sales: '5,120', trend: 'up' },
  { name: 'Canada', sales: '4,890', trend: 'up' },
];

  // 5. FORM SUBMIT WITH DEBUGGING
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      ...data,
      id: editItem ? editItem.id : Date.now(),
      price: Number(pricing.price),
      originalPrice: Number(pricing.originalPrice) || 0,
      discountPercent: pricing.discountPercent, // Auto-calculated value
      stock: Number(data.stock),
      // If we uploaded a new image, use it. Otherwise, use the old one.
      image: previewImage || (editItem ? editItem.image : "placeholder.png"),
    };

    console.log("DEBUG: Final Payload being sent:", payload);

    if (editItem) {
      updateProduct(editItem.id, payload);
    } else {
      addProduct(payload);
    }

    // Reset UI
    setEditItem(null);
    setPreviewImage("");
    setPricing({ price: "", originalPrice: "", discountPercent: 0 });
    setActiveTab("products");
  };

  return (
    <div className="flex min-h-screen bg-[#fcfcfd] text-slate-900 font-sans pb-20 md:pb-0">
      {/* SIDEBAR */}

      {/* DESKTOP SIDEBAR */}
<aside className="hidden md:flex w-64 bg-white border-r fixed h-full p-6 flex-col z-30">
  <h2 className="text-xl font-black mb-10 text-blue-600 tracking-tighter uppercase">
    Seller Hub
  </h2>

  <nav className="space-y-2 flex-1">
    <TabButton
      active={activeTab === "dashboard"}
      onClick={() => setActiveTab("dashboard")}
      icon={<LayoutDashboard size={20} />}
      label="Dashboard"
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
      label={editItem ? "Editing..." : "Add Product"}
    />
  </nav>

  <button
    onClick={resetData}
    className="flex items-center gap-2 text-xs text-slate-400 hover:text-red-500 font-bold p-2 mt-auto"
  >
    <RotateCcw size={14} /> Reset All Data
  </button>
</aside>

    
{/* MOBILE HEADER */}
<div className="md:hidden fixed top-0 inset-x-0 z-40 bg-white border-b px-4 py-3 flex items-center justify-between">
  <button
    onClick={() => setMobileOpen(true)}
    className="p-2 rounded-lg hover:bg-slate-100"
  >
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h16M3 12h16M3 18h16" />
    </svg>
  </button>
  <span className="font-black text-blue-600 uppercase">Seller Hub</span>
</div>

{/* OVERLAY */}
<div
  className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ${
    mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
  }`}
  onClick={() => setMobileOpen(false)}
/>

{/* MOBILE SLIDE DRAWER */}
<aside
  className={`
    fixed top-0 left-0 z-50 h-full w-64 bg-white border-r
    transform transition-transform duration-300 ease-in-out
    md:hidden
    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
  `}
>
  <div className="p-6 flex flex-col h-full">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-xl font-black text-blue-600 uppercase">Seller Hub</h2>
      <button onClick={() => setMobileOpen(false)} className="p-2">✕</button>
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
          setEditItem(null);
          setActiveTab("add");
          setMobileOpen(false);
        }}
        icon={<PlusCircle size={20} />}
        label={editItem ? "Editing..." : "Add Product"}
      />
    </nav>

    <button
      onClick={resetData}
      className="flex items-center gap-2 text-xs text-slate-400 hover:text-red-500 font-bold p-2 mt-auto"
    >
      <RotateCcw size={14} /> Reset All Data
    </button>
  </div>
</aside>

{/* MAIN OFFSET */}
<main className="flex-1 md:ml-64 pt-16 md:pt-0">

  <header className="mb-6 sm:mb-8">
    <h1 className="
      text-2xl sm:text-3xl 
      font-black 
      capitalize 
      tracking-tight">
      {activeTab}
    </h1>

    <p className="text-slate-400 text-xs sm:text-sm font-bold tracking-tight">
      Managing {products.length} Items
    </p>
  </header>


       {/* --- DASHBOARD VIEW UPDATED --- */}
{activeTab === "dashboard" && (
  <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4">

    {/* 1. TOP STAT CARDS */}
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

    {/* 2. RECENT ORDER AREA CHART */}
    <div className="bg-white p-4 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 shadow-sm">
      <div className="flex justify-between items-center mb-4 sm:mb-6 px-1 sm:px-2">
        <h3 className="font-black text-base sm:text-lg">Recent Order</h3>
        <button className="text-slate-400 font-bold">...</button>
      </div>

      <div className="h-52 sm:h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dummyChartData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fontWeight: "bold", fill: "#94a3b8" }}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* 3. MIDDLE SECTION */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

      {/* Top Products */}
      <div className="bg-white p-4 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h3 className="font-black text-base sm:text-lg">Top Products</h3>
          <button
            onClick={() => setActiveTab("products")}
            className="text-blue-600 text-xs font-bold hover:underline"
          >
            View all
          </button>
        </div>

        <div className="space-y-4">
          {products.slice(0, 4).map((p, i) => (
            <div key={i} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={p.image?.startsWith("data:") ? p.image : `/image/${p.category}/${p.image}`}
                  className="w-10 h-10 rounded-xl bg-slate-100 object-cover flex-shrink-0"
                  onError={(e) => (e.target.src = "https://placehold.co/100")}
                />
                <div className="min-w-0">
                  <p className="text-sm font-bold truncate max-w-[140px] sm:max-w-none">
                    {p.title}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold">100 Items</p>
                </div>
              </div>

              <div className="text-right hidden sm:block">
                <p className="text-[10px] text-slate-400 font-black uppercase">
                  Coupon Code
                </p>
                <p className="text-sm font-black">Sflat</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Countries */}
      <div className="bg-white p-4 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-black text-base sm:text-lg">Top Countries By Sales</h3>
          <button
            onClick={() => setShowAllCountries(!showAllCountries)}
            className="text-blue-600 text-xs font-bold px-3 py-1 rounded-full hover:bg-blue-50"
          >
            {showAllCountries ? "Show Less" : "View all"}
          </button>
        </div>

        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <span className="text-xl sm:text-2xl font-black">$37,802</span>
          <span className="text-green-500 flex items-center text-xs font-bold">
            <TrendingUp size={14} /> 1.56%
          </span>
        </div>

        <div
          className={`space-y-4 overflow-hidden transition-all duration-500 ${
            showAllCountries ? "max-h-[1000px]" : "max-h-[260px]"
          }`}
        >
          {(showAllCountries ? allCountries : allCountries.slice(0, 4)).map(
            (country, i) => (
              <div key={i} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold">
                    {country.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-sm font-bold text-slate-600">
                    {country.name}
                  </span>
                </div>

                <div className="flex items-center gap-6">
                  {country.trend === "up" ? (
                    <TrendingUp size={16} className="text-green-400 opacity-50" />
                  ) : (
                    <TrendingUp size={16} className="text-red-400 rotate-180 opacity-50" />
                  )}
                  <span className="text-sm font-black text-slate-700 w-12 text-right">
                    {country.sales}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>

    {/* 4. BOTTOM SECTION */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      {/* Orders */}
      <div className="bg-white p-4 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h3 className="font-black text-base sm:text-lg">Orders</h3>
          <button className="text-slate-400">...</button>
        </div>

        <div className="space-y-4">
          {products.slice(0, 5).map((p, i) => (
            <div key={i} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={p.image?.startsWith("data:") ? p.image : `/image/${p.category}/${p.image}`}
                  className="w-10 h-10 rounded-xl object-cover"
                />
                <span className="text-sm font-bold text-slate-600 truncate max-w-[160px]">
                  {p.title}
                </span>
              </div>
              <span className="text-xs font-bold text-slate-400 whitespace-nowrap">
                20 Nov 2023
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Earnings */}
      <div className="bg-white p-4 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-black text-base sm:text-lg">Earnings</h3>
          <button className="text-slate-400">...</button>
        </div>

        <div className="space-y-2 mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full" />
            <span className="text-xs font-bold text-slate-400">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black">$37,802</span>
            <span className="text-green-500 text-xs font-bold flex items-center">
              <TrendingUp size={12} /> 0.56%
            </span>
          </div>
        </div>

        <div className="h-40 sm:h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dummyBarData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
              <Bar dataKey="val" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>
)}


        {activeTab === "products" && (
  <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden animate-in fade-in">

    {/* ===== DESKTOP TABLE ===== */}
    <div className="hidden md:block">
      <table className="w-full text-left">
        <thead className="bg-slate-50 text-[10px] uppercase font-black text-slate-400 ">
          <tr>
            <th className="p-4">Image</th>
            <th className="p-4">Product Info</th>
            <th className="p-4">Pricing</th>
            <th className="p-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {products.map((product) => (
            <tr
              key={product.id}
              className="hover:bg-slate-50 transition group"
            >
              <td className="p-4 w-20">
                <img
                  src={
                    product.image?.startsWith("data:")
                      ? product.image
                      : `/image/${product.category}/${product.image}`
                  }
                  className="w-12 h-12 rounded-xl object-cover bg-slate-100"
                  onError={(e) => (e.target.src = "https://placehold.co/100")}
                />
              </td>

              <td className="p-4">
                <p className="font-bold text-sm">{product.title}</p>
                <p className="text-[10px] text-slate-400 uppercase">
                  {product.category}
                </p>
              </td>

              <td className="p-4">
                <p className="font-black text-sm">${product.price}</p>
                {product.discountPercent > 0 && (
                  <p className="text-[10px] text-green-500 font-bold">
                    -{product.discountPercent}%
                  </p>
                )}
              </td>

              <td className="p-4 text-right">
                <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      setEditItem(product);
                      setActiveTab("add");
                    }}
                    className="p-2 hover:text-blue-600"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="p-2 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* ===== MOBILE CARDS ===== */}
    <div className="md:hidden divide-y">
      {products.map((product) => (
        <div key={product.id} className="p-4 flex gap-4">
          <img
            src={
              product.image?.startsWith("data:")
                ? product.image
                : `/image/${product.category}/${product.image}`
            }
            className="w-14 h-14 rounded-xl object-cover bg-slate-100 flex-shrink-0"
            onError={(e) => (e.target.src = "https://placehold.co/100")}
          />

          <div className="flex-1">
            <p className="font-bold text-sm">{product.title}</p>
            <p className="text-[10px] text-slate-400 uppercase mb-1">
              {product.category}
            </p>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-black text-sm">${product.price}</p>
                {product.discountPercent > 0 && (
                  <p className="text-[10px] text-green-500 font-bold">
                    -{product.discountPercent}%
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditItem(product);
                    setActiveTab("add");
                  }}
                  className="p-2 text-blue-600"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="p-2 text-red-600"
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


        {activeTab === "add" && (
  <div className="max-w-4xl mx-auto px-3 sm:px-4 animate-in fade-in zoom-in-95">
    <form
      onSubmit={handleFormSubmit}
      className="bg-white p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6 sm:space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        <Input
          label="Product Title"
          name="title"
          defaultValue={editItem?.title}
          required
        />
        <Input
          label="Brand"
          name="brand"
          defaultValue={editItem?.brand}
          required
        />
      </div>

      {/* AUTO-DISCOUNT UI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-end">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-black text-slate-400 uppercase px-1">
            Sale Price ($)
          </label>
          <input
            type="number"
            name="price"
            step="0.01"
            value={pricing.price}
            onChange={handlePriceChange}
            className="p-3 bg-slate-50 border rounded-xl font-bold text-sm outline-none focus:ring-4 ring-blue-50 transition-all"
            required
          />
        </div>

        <div className="flex flex-col gap-1 relative">
          <label className="text-[10px] font-black text-slate-400 uppercase px-1">
            Original Price
          </label>
          <input
            type="number"
            name="originalPrice"
            step="0.01"
            value={pricing.originalPrice}
            onChange={handlePriceChange}
            className="p-3 bg-slate-50 border rounded-xl font-bold text-sm outline-none focus:ring-4 ring-blue-50 transition-all"
          />
          {pricing.discountPercent > 0 && (
            <div className="absolute -top-3 right-0 bg-green-500 text-white text-[9px] font-black px-2 py-1 rounded-lg animate-bounce flex items-center gap-1">
              <Tag size={8} /> {pricing.discountPercent}% OFF
            </div>
          )}
        </div>

        <Input
          label="Stock Level"
          name="stock"
          type="number"
          defaultValue={editItem?.stock}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-black text-slate-400 uppercase px-1">
            Category
          </label>
          <select
            name="category"
            defaultValue={editItem?.category}
            className="p-3 bg-slate-50 border rounded-xl font-bold text-sm h-[52px]"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="text-[10px] font-black text-slate-400 uppercase px-1">
            Short Description
          </label>
          <textarea
            name="description"
            defaultValue={editItem?.description}
            className="p-3 bg-slate-50 border rounded-xl font-medium text-sm h-[72px] resize-none"
          />
        </div>
      </div>

      {/* IMAGE UPLOAD */}
      <div className="bg-slate-50 p-4 sm:p-6 rounded-3xl border-2 border-dashed border-slate-200">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="w-24 h-24 bg-white rounded-xl border flex items-center justify-center overflow-hidden">
            {previewImage ? (
              <img
                src={
                  previewImage.startsWith("data:")
                    ? previewImage
                    : `/image/${editItem?.category}/${previewImage}`
                }
                className="w-full h-full object-contain"
              />
            ) : (
              <ImageIcon className="text-slate-200" />
            )}
          </div>

          <div className="flex-1 w-full">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-xs file:bg-blue-600 file:text-white file:border-0 file:rounded-full file:px-4 file:py-2 cursor-pointer"
            />
            <p className="text-[9px] text-slate-400 mt-2 font-bold uppercase">
              Base64 Upload enabled for instant site preview
            </p>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          type="submit"
          className="flex-1 bg-slate-900 text-white font-black p-4 sm:p-5 rounded-2xl hover:bg-blue-600 transition flex items-center justify-center gap-2"
        >
          {editItem ? <Save size={20} /> : <PlusCircle size={20} />}
          {editItem ? "CONFIRM EDIT" : "PUBLISH TO STORE"}
        </button>

        <button
          type="button"
          onClick={() => {
            setEditItem(null);
            setActiveTab("products");
          }}
          className="sm:px-8 py-3 font-bold text-slate-400 hover:text-rose-500 transition-colors text-center"
        >
          Discard
        </button>
      </div>
    </form>
  </div>
)}

      </main>
    </div>
  );
};

// --- HELPERS ---
const TabButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${active ? "bg-blue-50 text-blue-600 shadow-sm" : "text-slate-400 hover:bg-slate-50"}`}
  >
    {icon} {label}
  </button>
);

const StatCard = ({ label, val, icon, color }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
    <div className={`p-4 rounded-2xl ${color} shadow-sm`}>{icon}</div>
    <div>
      <p className="text-[10px] font-black uppercase text-slate-400">{label}</p>
      <p className="text-2xl font-black">{val}</p>
    </div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] font-black uppercase text-slate-400 px-1 tracking-wider">
      {label}
    </label>
    <input
      {...props}
      className="p-3 bg-slate-50 border rounded-xl font-bold text-sm outline-none focus:ring-4 ring-blue-50 transition-all"
    />
  </div>
);

export default SellerDashboard;
