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
  const [previewImage, setPreviewImage] = useState("");

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
    const totalVal = products.reduce((sum, p) => sum + Number(p.price) * (Number(p.stock) || 1), 0);
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
    <div className="flex min-h-screen bg-[#fcfcfd] text-slate-900 font-sans">
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
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-red-500 font-bold p-2 transition-colors mt-auto"
        >
          <RotateCcw size={14} /> Reset All Data
        </button>
      </aside>

      <main className="flex-1 md:ml-64 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-black capitalize tracking-tight">
            {activeTab}
          </h1>
          <p className="text-slate-400 text-sm font-bold tracking-tight">
            Managing {products.length} Items
          </p>
        </header>

        {/* --- VIEWS --- */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
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
        )}

        {activeTab === "products" && (
          <div className="bg-white rounded-3xl border shadow-sm overflow-hidden animate-in fade-in">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] uppercase font-black text-slate-400 border-b">
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
                        onError={(e) =>
                          (e.target.src = "https://placehold.co/100")
                        }
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
        )}

        {activeTab === "add" && (
          <div className="max-w-4xl animate-in fade-in zoom-in-95">
            <form
              onSubmit={handleFormSubmit}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    className="p-3 bg-slate-50 border rounded-xl font-medium text-sm h-[52px] resize-none"
                  />
                </div>
              </div>

              {/* IMAGE UPLOAD FIX */}
              <div className="bg-slate-50 p-6 rounded-3xl border-2 border-dashed border-slate-200">
                <div className="flex items-center gap-6">
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
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="text-xs file:bg-blue-600 file:text-white file:border-0 file:rounded-full file:px-4 file:py-2 cursor-pointer"
                    />
                    <p className="text-[9px] text-slate-400 mt-2 font-bold uppercase">
                      Base64 Upload enabled for instant site preview
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-slate-900 text-white font-black p-5 rounded-2xl hover:bg-blue-600 transition flex items-center justify-center gap-2"
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
                  className="px-8 font-bold text-slate-400 hover:text-rose-500 transition-colors"
                >
                  Discard
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
      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{label}</p>
      <p className="text-2xl font-black text-slate-900">{val}</p>
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