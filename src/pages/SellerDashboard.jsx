import { useState, useMemo } from "react";
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
} from "lucide-react";

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

  // --- ANALYTICS ---
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
    };

    if (editItem) {
      updateProduct(editItem.id, payload);
    } else {
      addProduct(payload);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fcfcfd] text-slate-900">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col fixed h-full p-6">
        <h2 className="text-xl font-black mb-10 text-blue-600 tracking-tighter uppercase">
          Seller Hub
        </h2>
        <nav className="space-y-2 flex-1">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition ${activeTab === "dashboard" ? "bg-blue-50 text-blue-600" : "text-slate-400"}`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition ${activeTab === "products" ? "bg-blue-50 text-blue-600" : "text-slate-400"}`}
          >
            <Package size={20} /> Inventory
          </button>
          <button
            onClick={() => {
              setEditItem(null);
              setActiveTab("add");
            }}
            className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition ${activeTab === "add" ? "bg-blue-50 text-blue-600" : "text-slate-400"}`}
          >
            <PlusCircle size={20} /> {editItem ? "Editing..." : "Add Product"}
          </button>
        </nav>
        <button
          onClick={resetData}
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-red-500 font-bold p-2"
        >
          <RotateCcw size={14} /> Reset All Data
        </button>
      </aside>

      {/* MAIN VIEW */}
      <main className="flex-1 md:ml-64 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-black capitalize tracking-tight">
            {activeTab}
          </h1>
          <p className="text-slate-400 text-sm font-bold">
            Managing {products.length} Items in Database
          </p>
        </header>

        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] uppercase font-black text-slate-400 border-b">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={`/image/${product.category}/${product.image}`}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-100"
                          onError={(e) =>
                            (e.target.src = "https://placehold.co/100")
                          }
                        />
                        <span className="font-bold text-sm truncate max-w-[150px]">
                          {product.title}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-xs font-bold uppercase text-slate-400">
                      {product.category}
                    </td>
                    <td className="p-4 font-black text-sm">${product.price}</td>
                    <td className="p-4">
                      <span
                        className={`font-bold text-xs ${product.stock < 10 ? "text-red-500" : "text-slate-600"}`}
                      >
                        {product.stock} pcs
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          setEditItem(product);
                          setActiveTab("add");
                        }}
                        className="p-2 text-slate-400 hover:text-blue-600"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 text-slate-400 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "add" && (
          <div className="max-w-2xl bg-white p-8 rounded-3xl border shadow-sm">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Title"
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
              <div className="grid grid-cols-3 gap-4">
                <Input
                  label="Price"
                  name="price"
                  type="number"
                  step="0.01"
                  defaultValue={editItem?.price}
                  required
                />
                <Input
                  label="Stock"
                  name="stock"
                  type="number"
                  defaultValue={editItem?.stock}
                  required
                />
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">
                    Category
                  </label>
                  <select
                    name="category"
                    defaultValue={editItem?.category}
                    className="p-3 bg-slate-50 border rounded-xl font-bold text-sm outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <Input
                label="Image Filename (e.g. apple.png)"
                name="image"
                defaultValue={editItem?.image}
                required
              />
              <div className="pt-4 flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white font-bold p-4 rounded-2xl hover:bg-slate-900 transition"
                >
                  {editItem ? "Update Listing" : "Add to Inventory"}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("products")}
                  className="px-6 font-bold text-slate-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

const StatCard = ({ label, val, icon, color }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
    <div className={`p-4 rounded-2xl ${color}`}>{icon}</div>
    <div>
      <p className="text-[10px] font-black uppercase text-slate-400">{label}</p>
      <p className="text-2xl font-black">{val}</p>
    </div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] font-black uppercase text-slate-400">
      {label}
    </label>
    <input
      {...props}
      className="p-3 bg-slate-50 border rounded-xl font-bold text-sm outline-none focus:ring-2 ring-blue-100"
    />
  </div>
);

export default SellerDashboard;
