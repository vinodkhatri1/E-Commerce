import { useState } from "react";
import { useProducts } from "../context/productContext";
import { useNavigate, Link } from "react-router-dom";
import { 
  Upload, 
  DollarSign, 
  Package, 
  Image as ImageIcon, 
  FileText, 
  ChevronRight, 
  Sparkles, 
  Tag, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";

const SellerDashboard = () => {
  const { addProduct, getCategories } = useProducts();
  const navigate = useNavigate();

  // --- 1. EXACT STATE FROM YOUR CODE ---
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    price: "",
    originalPrice: "",
    category: "",
    image: "",
    description: "",
    stock: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const categories = getCategories();

  // --- 2. EXACT VALIDATION LOGIC FROM YOUR CODE ---
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Product title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!formData.brand.trim()) {
      newErrors.brand = "Brand name is required";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (formData.originalPrice && parseFloat(formData.originalPrice) < parseFloat(formData.price)) {
      newErrors.originalPrice = "Original price must be greater than or equal to sale price";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    if (!formData.stock) {
      newErrors.stock = "Stock quantity is required";
    } else if (parseInt(formData.stock) < 1) {
      newErrors.stock = "Stock must be at least 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- 3. EXACT HANDLERS FROM YOUR CODE ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to top to see errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Calculate discount percentage if original price is provided
    const discountPercent = formData.originalPrice
      ? (
          ((parseFloat(formData.originalPrice) - parseFloat(formData.price)) /
            parseFloat(formData.originalPrice)) *
          100
        ).toFixed(2)
      : 0;

    const newProduct = {
      title: formData.title.trim(),
      brand: formData.brand.trim(),
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      discountPercent: parseFloat(discountPercent),
      category: formData.category,
      image: formData.image.trim(),
      description: formData.description.trim(),
      stock: parseInt(formData.stock),
    };

    const addedProduct = addProduct(newProduct);

    setSuccessMessage("Product added successfully!");
    
    // Redirect logic
    setTimeout(() => {
      if(addedProduct?.id) {
          navigate(`/products/${addedProduct.id}`);
      } else {
          navigate('/');
      }
    }, 2500);

    // Reset form
    setFormData({
      title: "",
      brand: "",
      price: "",
      originalPrice: "",
      category: "",
      image: "",
      description: "",
      stock: "",
    });
  };

  // Helper: Calculate listing strength for the new UI
  const calculateStrength = () => {
    const fields = ["title", "brand", "price", "description", "category", "image", "stock"];
    const filled = fields.filter((f) => formData[f]).length;
    return Math.round((filled / fields.length) * 100);
  };

  // --- 4. NEW MODERN DESIGN RENDER ---
  return (
    <div className="min-h-screen bg-[#f8fafc] pt-24 pb-20 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Page Header */}
        <div className="mb-10">
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="font-medium text-slate-900">Seller Dashboard</span>
          </nav>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            List Your Product
          </h1>
          <p className="text-slate-500 mt-2">
            Fill out the details below to start selling instantly.
          </p>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3 text-green-800 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 size={24} />
            <span className="font-bold">{successMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT COLUMN: Main Form (Span 8) */}
          <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-8">
            
            {/* CARD 1: Basic Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
                <Sparkles className="text-amber-500" size={22} /> Basic Details
              </h2>

              {/* Title */}
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700 ml-1" htmlFor="title">Product Title *</label>
                <input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 bg-slate-50 border rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-lg font-medium ${errors.title ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                  placeholder="e.g., iPhone 15 Pro Max"
                />
                {errors.title && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle size={14}/> {errors.title}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Brand */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1" htmlFor="brand">Brand *</label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      id="brand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none ${errors.brand ? 'border-red-300' : 'border-slate-200'}`}
                      placeholder="e.g., Apple"
                    />
                  </div>
                  {errors.brand && <p className="text-sm text-red-500">{errors.brand}</p>}
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1" htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-5 py-3.5 bg-slate-50 border rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none appearance-none cursor-pointer ${errors.category ? 'border-red-300' : 'border-slate-200'}`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1" htmlFor="description">Description *</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-4 text-slate-400" size={18} />
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className={`w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none resize-none ${errors.description ? 'border-red-300' : 'border-slate-200'}`}
                    placeholder="Describe your product in detail (min 20 chars)..."
                  />
                </div>
                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
              </div>
            </div>

            {/* CARD 2: Pricing & Stock */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                <DollarSign className="text-green-500" size={22} /> Pricing & Inventory
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sale Price */}
                <div className="md:col-span-1">
                  <label className="text-sm font-bold text-slate-700 block mb-2" htmlFor="price">Sale Price *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={handleChange}
                      className={`w-full pl-8 pr-4 py-3.5 bg-slate-50 border rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none font-bold text-lg ${errors.price ? 'border-red-300' : 'border-slate-200'}`}
                      placeholder="0.00"
                    />
                  </div>
                  {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
                </div>

                {/* Original Price */}
                <div className="md:col-span-1">
                  <label className="text-sm font-bold text-slate-700 block mb-2" htmlFor="originalPrice">Original Price</label>
                  <input
                    id="originalPrice"
                    name="originalPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 bg-slate-50 border rounded-xl outline-none text-slate-500 ${errors.originalPrice ? 'border-red-300' : 'border-slate-200'}`}
                    placeholder="Optional"
                  />
                  {errors.originalPrice && <p className="text-sm text-red-500 mt-1">{errors.originalPrice}</p>}
                </div>

                {/* Stock */}
                <div className="md:col-span-1">
                  <label className="text-sm font-bold text-slate-700 block mb-2" htmlFor="stock">Stock *</label>
                  <div className="relative">
                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      id="stock"
                      name="stock"
                      type="number"
                      min="1"
                      value={formData.stock}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-xl outline-none ${errors.stock ? 'border-red-300' : 'border-slate-200'}`}
                      placeholder="10"
                    />
                  </div>
                  {errors.stock && <p className="text-sm text-red-500 mt-1">{errors.stock}</p>}
                </div>
              </div>
            </div>

            {/* CARD 3: Media */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
               <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                <ImageIcon className="text-blue-500" size={22} /> Product Media
              </h2>
              
              <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1" htmlFor="image">Image Filename *</label>
                  <div className="relative">
                    <Upload className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      id="image"
                      name="image"
                      type="text"
                      value={formData.image}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none ${errors.image ? 'border-red-300' : 'border-slate-200'}`}
                      placeholder="e.g., product-image.png"
                    />
                  </div>
                  <p className="text-slate-400 text-xs ml-1 mt-1">
                     Ensure the file exists in /public/image/[category]/
                  </p>
                  {errors.image && <p className="text-sm text-red-500 mt-1">{errors.image}</p>}
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
                className="px-12 py-4 bg-blue-600 text-white font-extrabold rounded-2xl hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <Upload size={20} />
                List Product
              </button>
            </div>

          </form>

          {/* RIGHT COLUMN: Sidebar (Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Strength Meter */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <h4 className="font-bold text-slate-900 mb-4">Listing Strength</h4>
              
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full transition-all duration-500 ${calculateStrength() === 100 ? 'bg-green-500' : 'bg-blue-600'}`}
                  style={{ width: `${calculateStrength()}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">{calculateStrength()}% Complete</span>
                {calculateStrength() < 100 ? (
                    <span className="text-blue-600 font-medium">Add more details</span>
                ) : (
                    <span className="text-green-600 font-bold flex items-center gap-1"><CheckCircle2 size={12}/> Perfect</span>
                )}
              </div>

              {/* Sidebar Safety Tips */}
              <div className="mt-8 pt-8 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-4 text-slate-800">
                   <ShieldCheck className="text-green-500" size={20} />
                   <h4 className="font-bold text-sm">Selling Tips</h4>
                </div>
                <ul className="space-y-3 text-xs text-slate-500">
                  <li className="flex gap-2 items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                    <span>Use clear, bright images.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                    <span>Describe faults honestly.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                    <span>Competitive pricing sells faster.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;