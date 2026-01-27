import React from "react";
import Save from "lucide-react/dist/esm/icons/save";
import PlusCircle from "lucide-react/dist/esm/icons/plus-circle";
import ImageIcon from "lucide-react/dist/esm/icons/image";
import Tag from "lucide-react/dist/esm/icons/tag";

const SellerDashboardAddProduct = ({
  editItem,
  previewImage,
  pricing,
  handlePriceChange,
  handleImageChange,
  handleFormSubmit,
  categories,
  setEditItem,
  setActiveTab,
}) => {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">
          {editItem ? "Edit Product" : "Create Listing"}
        </h1>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
          Fill in the details below to update your inventory
        </p>
      </div>

      <form
        onSubmit={handleFormSubmit}
        className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Input
            label="Product Title"
            name="title"
            defaultValue={editItem?.title}
            placeholder="e.g. Pro Wireless Headphones"
            required
          />
          <Input
            label="Brand Name"
            name="brand"
            defaultValue={editItem?.brand}
            placeholder="e.g. Sony"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          <Input
            label="Sale Price ($)"
            name="price"
            type="number"
            step="0.01"
            value={pricing.price}
            onChange={handlePriceChange}
            required
          />
          <div className="relative">
            <Input
              label="Regular Price ($)"
              name="originalPrice"
              type="number"
              step="0.01"
              value={pricing.originalPrice}
              onChange={handlePriceChange}
            />
            {pricing.discountPercent > 0 && pricing.discountPercent < 100 && (
              <span className="absolute -top-3 right-0 bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full animate-pulse shadow-lg shadow-emerald-200 flex items-center gap-1">
                <Tag size={10} /> {pricing.discountPercent}% OFF
              </span>
            )}
          </div>
          <Input
            label="Inventory Stock"
            name="stock"
            type="number"
            defaultValue={editItem?.stock}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
              Category
            </label>
            <select
              name="category"
              defaultValue={editItem?.category}
              className="p-4 bg-slate-50 rounded-2xl font-bold text-sm outline-none focus:ring-2 ring-indigo-500 appearance-none border-none cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={editItem?.description}
              placeholder="Describe your product..."
              className="p-4 bg-slate-50 rounded-2xl font-medium text-sm h-32 resize-none outline-none focus:ring-2 ring-indigo-500 border-none"
            />
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-4xl border-2 border-dashed border-slate-200 group hover:border-indigo-400 transition-all">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-32 h-32 bg-white rounded-2xl border flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
              {previewImage ? (
                <img
                  src={previewImage}
                  className="w-full h-full object-cover"
                  alt="Preview"
                />
              ) : (
                <ImageIcon
                  size={32}
                  className="text-slate-200 group-hover:text-indigo-400 transition-colors"
                />
              )}
            </div>
            <div className="flex-1 w-full text-center sm:text-left">
              <h4 className="text-sm font-bold text-slate-700">
                Product Image
              </h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-4 tracking-tight">
                Upload high resolution JPG/PNG
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            className="flex-2 bg-slate-900 text-white font-black p-5 rounded-2xl hover:bg-indigo-600 shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            {editItem ? <Save size={18} /> : <PlusCircle size={18} />}
            {editItem ? "UPDATE PRODUCT" : "PUBLISH LISTING"}
          </button>
          <button
            type="button"
            onClick={() => {
              if (setEditItem) setEditItem(null);
              setActiveTab("products");
            }}
            className="flex-1 font-bold text-slate-400 hover:text-rose-500 transition-colors"
          >
            Discard
          </button>
        </div>
      </form>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-black uppercase text-slate-400 px-1 tracking-widest">
      {label}
    </label>
    <input
      {...props}
      className="p-4 bg-slate-50 rounded-2xl font-bold text-sm outline-none focus:ring-2 ring-indigo-500 transition-all placeholder:text-slate-300 border-none"
    />
  </div>
);

export default SellerDashboardAddProduct;
