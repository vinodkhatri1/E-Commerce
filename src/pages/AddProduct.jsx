import { PlusCircle, Save, Tag, Image as ImageIcon } from "lucide-react";

const AddProduct = ({
  editItem,
  previewImage,
  setPreviewImage,
  pricing,
  handlePriceChange,
  handleImageChange,
  handleFormSubmit,
  categories,
  setEditItem,
  setActiveTab,
}) => {
  return (
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
  );
};

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

export default AddProduct;
