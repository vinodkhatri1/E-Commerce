import { useState } from "react";
import { useProducts } from "../context/productContext";
import { useNavigate, Link } from "react-router-dom";
import { Upload, X, ChevronRight, Image as ImageIcon, ShieldCheck, Info } from "lucide-react";

const SellProduct = () => {
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "Electronics",
    price: "",
    condition: "New",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file.name });
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, image: null });
    setPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) return;

    const newProduct = {
      ...formData,
      price: parseFloat(formData.price),
      image: preview || "https://via.placeholder.com/150",
      id: Date.now(),
    };

    addProduct(newProduct);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="font-medium text-gray-900">Sell Item</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* --- LEFT COLUMN: Main Form --- */}
            <div className="flex-1">
                <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
                    
                    {/* Form Header */}
                    <div className="px-6 sm:px-8 py-6 border-b border-gray-100">
                        <h1 className="text-2xl font-bold text-gray-900">Post your Ad</h1>
                        <p className="text-gray-500 text-sm mt-1">Fill in the details below to list your item for sale.</p>
                    </div>

                    <div className="p-6 sm:p-8 space-y-10">
                        
                        {/* Section 1: Image Upload */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <h3 className="text-lg font-bold text-gray-900">Photos</h3>
                                <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded">Required</span>
                            </div>
                            
                            {!preview ? (
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 sm:p-12 text-center hover:bg-gray-50 hover:border-blue-400 transition-all cursor-pointer relative group">
                                    <input 
                                        type="file" 
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                                        onChange={handleImageChange} 
                                        accept="image/*"
                                    />
                                    <div className="flex flex-col items-center justify-center pointer-events-none">
                                        <div className="bg-blue-50 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                                            <ImageIcon className="text-blue-600" size={32} />
                                        </div>
                                        <p className="text-gray-900 font-semibold text-lg">Add photos</p>
                                        <p className="text-gray-500 text-sm mt-1">Drag and drop or click to upload</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative w-full sm:w-64 h-64 border border-gray-200 rounded-xl overflow-hidden group shadow-sm">
                                    <img src={preview} alt="Upload" className="w-full h-full object-cover" />
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                    <button 
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-3 right-3 bg-white text-red-600 p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors z-20"
                                        title="Remove Image"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            )}
                        </div>

                        <hr className="border-gray-100" />

                        {/* Section 2: Product Details */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-gray-900">Include some details</h3>
                            
                            {/* Title Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Ad Title</label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
                                    placeholder="What are you selling? (e.g. iPhone 14 Pro Max - 256GB)"
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                />
                                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                    <Info size={12} /> Include brand, model, and key features.
                                </p>
                            </div>

                            {/* Grid for Selects */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                                    <div className="relative">
                                        <select 
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        >
                                            <option>Electronics</option>
                                            <option>Fashion</option>
                                            <option>Home & Garden</option>
                                            <option>Sports</option>
                                            <option>Vehicles</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                            <ChevronRight className="rotate-90" size={16} />
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Condition</label>
                                    <div className="relative">
                                        <select 
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                                            onChange={(e) => setFormData({...formData, condition: e.target.value})}
                                        >
                                            <option>New</option>
                                            <option>Used - Like New</option>
                                            <option>Used - Good</option>
                                            <option>Used - Fair</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                            <ChevronRight className="rotate-90" size={16} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                <textarea 
                                    rows="5"
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none placeholder-gray-400"
                                    placeholder="Describe the item you are selling. Include information about condition, age, and any faults."
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                />
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Section 3: Price */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-gray-900">Set a price</h3>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
                                <div className="relative max-w-sm">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                                    <input 
                                        type="number" 
                                        className="w-full pl-8 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-medium text-lg"
                                        placeholder="0.00"
                                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Footer */}
                    <div className="px-6 sm:px-8 py-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-4">
                        <Link 
                            to="/"
                            className="px-6 py-3 text-gray-700 font-semibold hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            Cancel
                        </Link>
                        <button 
                            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-md active:scale-95"
                        >
                            Post Now
                        </button>
                    </div>
                </form>
            </div>

            {/* --- RIGHT COLUMN: Sidebar (Safety Tips) --- */}
            <div className="lg:w-80 space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-28">
                    <div className="flex items-center gap-2 mb-4">
                        <ShieldCheck className="text-green-600" size={24} />
                        <h4 className="font-bold text-gray-900 text-lg">Safety Tips</h4>
                    </div>
                    <ul className="space-y-4 text-sm text-gray-600">
                        <li className="flex gap-3 items-start">
                            <span className="bg-green-100 text-green-700 rounded-full h-5 w-5 flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
                            <span>Meet in a safe, public place like a mall or coffee shop.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="bg-green-100 text-green-700 rounded-full h-5 w-5 flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
                            <span>Check the item thoroughly before making a payment.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="bg-green-100 text-green-700 rounded-full h-5 w-5 flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
                            <span>Pay only after collecting the item. Avoid online transfers.</span>
                        </li>
                    </ul>
                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <Link to="#" className="text-blue-600 text-sm font-semibold hover:underline">
                            Read all safety rules
                        </Link>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default SellProduct;