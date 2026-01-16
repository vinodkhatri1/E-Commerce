import { useState } from "react";
import { useProducts } from "../context/productContext";
import { useNavigate, Link } from "react-router-dom";
import {
  Upload,
  X,
  ChevronRight,
  Image as ImageIcon,
  ShieldCheck,
  Info,
  Tag,
  Package,
  DollarSign,
  TextQuote,
  Sparkles,
} from "lucide-react";
import ProductData from "../Data/ProductData";
const categories = [...new Set(ProductData.map((item) => item.category))];

const SellProduct = () => {
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    category: "Electronics",
    price: "",
    originalPrice: "",
    stock: 1,
    condition: "New",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file.name }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) return;

    const price = parseFloat(formData.price);
    const original = parseFloat(formData.originalPrice);
    const discountPercent =
      original && original > price
        ? Math.round(((original - price) / original) * 100)
        : 0;

    const newProduct = {
      ...formData,
      id: Date.now(),
      price,
      originalPrice: original || price,
      discountPercent,
      stock: parseInt(formData.stock) || 1,
      image: preview || "https://via.placeholder.com/150",
    };

    addProduct(newProduct);
    navigate("/");
  };

  // UI Helper: Calculate form completion %
  const calculateStrength = () => {
    const fields = ["title", "brand", "price", "description", "image"];
    const filled = fields.filter((f) => formData[f]).length;
    return (filled / fields.length) * 100;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-24 pb-20 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-10">
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="font-medium text-slate-900">Create Listing</span>
          </nav>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            List Your Item
          </h1>
          <p className="text-slate-500 mt-2">
            Reach thousands of buyers in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Form (Span 8) */}
          <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-8">
            {/* Media Upload Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ImageIcon className="text-blue-500" size={22} /> Media
                </h2>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  Required
                </span>
              </div>

              {!preview ? (
                <div className="relative group border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-white shadow-md rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Upload className="text-blue-600" size={28} />
                    </div>
                    <p className="text-lg font-semibold text-slate-700">
                      Drop your product photo here
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                      Supports: JPG, PNG (Max 10MB)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative w-full aspect-video sm:w-80 rounded-2xl overflow-hidden group shadow-xl">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setPreview(null)}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-red-500 p-2 rounded-xl shadow-lg hover:bg-red-500 hover:text-white transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Product Details Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
                <Sparkles className="text-amber-500" size={22} /> Details
              </h2>

              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Product Title
                </label>
                <input
                  name="title"
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-lg font-medium"
                  placeholder="What are you selling?"
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">
                    Brand
                  </label>
                  <div className="relative">
                    <Tag
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      name="brand"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none"
                      placeholder="Brand Name"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">
                    Category
                  </label>
                  <select
                    name="category"
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none appearance-none cursor-pointer"
                    onChange={handleInputChange}
                  >
                    {categories.map((title, index) => (
                      <option>{title.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Description
                </label>
                <div className="relative">
                  <TextQuote
                    className="absolute left-4 top-4 text-slate-400"
                    size={18}
                  />
                  <textarea
                    name="description"
                    rows="4"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none resize-none"
                    placeholder="Tell buyers more about the item..."
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                <DollarSign className="text-green-500" size={22} /> Pricing &
                Stock
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <label className="text-sm font-bold text-slate-700 block mb-2">
                    Selling Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                      $
                    </span>
                    <input
                      name="price"
                      type="number"
                      step="0.01"
                      required
                      className="w-full pl-8 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none font-bold text-lg"
                      placeholder="0.00"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="md:col-span-1">
                  <label className="text-sm font-bold text-slate-700 block mb-2">
                    Original Price
                  </label>
                  <input
                    name="originalPrice"
                    type="number"
                    step="0.01"
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-400"
                    placeholder="Optional"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="text-sm font-bold text-slate-700 block mb-2">
                    Stock
                  </label>
                  <div className="relative">
                    <Package
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      name="stock"
                      type="number"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                      placeholder="1"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-8 py-4 text-slate-600 font-bold hover:text-slate-900 transition-colors"
              >
                Discard
              </button>
              <button
                type="submit"
                className="px-12 py-4 bg-blue-600 text-white font-extrabold rounded-2xl hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/20 active:scale-[0.98] transition-all"
              >
                Publish Ad
              </button>
            </div>
          </form>

          {/* Sidebar (Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Strength Meter */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h4 className="font-bold text-slate-900 mb-4">
                Listing Strength
              </h4>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-blue-600 h-full transition-all duration-500"
                  style={{ width: `${calculateStrength()}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500">
                {calculateStrength() < 100
                  ? "Complete all fields for 2x more views."
                  : "Perfect! Your listing is optimized."}
              </p>
            </div>

            {/* Safety Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/10 rounded-lg">
                  <ShieldCheck className="text-green-400" size={24} />
                </div>
                <h4 className="font-bold text-lg">Safety First</h4>
              </div>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-2 shrink-0"></div>
                  <span>Meet in public, well-lit areas during daytime.</span>
                </li>
                <li className="flex gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-2 shrink-0"></div>
                  <span>Never share your banking credentials or OTP.</span>
                </li>
                <li className="flex gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-2 shrink-0"></div>
                  <span>Verify item condition before paying.</span>
                </li>
              </ul>
              <button className="w-full mt-8 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-sm font-bold transition-colors">
                Safety Center
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellProduct;
