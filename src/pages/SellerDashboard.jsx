import React, { useState, useMemo, useCallback, useDeferredValue } from "react";
import LayoutDashboard from "lucide-react/dist/esm/icons/layout-dashboard";
import Package from "lucide-react/dist/esm/icons/package";
import PlusCircle from "lucide-react/dist/esm/icons/plus-circle";
import Search from "lucide-react/dist/esm/icons/search";
import Settings2 from "lucide-react/dist/esm/icons/settings-2";
import { useProducts } from "../context/productContext";

import DashboardViewGraph from "../component/DashboardViewGraph";
import SellerDashboardProduct from "../component/SellerDashboardProduct";
import SellerDashboardAddProduct from "../component/SellerDashboardAddProduct";

const SellerDashboard = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    categories,
    resetData,
  } = useProducts();

  const [activeTab, setActiveTab] = useState("products");
  const [editItem, setEditItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [previewImage, setPreviewImage] = useState(null);
  const [pricing, setPricing] = useState({
    price: "",
    originalPrice: "",
    discountPercent: 0,
  });

  const analytics = useMemo(() => {
    if (!products || products.length === 0) {
      return { totalVal: 0, lowStockCount: 0, avgPrice: 0 };
    }
    const totalVal = products.reduce(
      (sum, p) => sum + (Number(p?.price) || 0) * (Number(p?.stock) || 0),
      0,
    );
    const lowStockCount = products.filter(
      (p) => (Number(p?.stock) || 0) < 10,
    ).length;
    const avgPrice =
      products.reduce((sum, p) => sum + (Number(p?.price) || 0), 0) /
      products.length;

    return { totalVal, lowStockCount, avgPrice };
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = deferredSearchQuery.toLowerCase();
    return products.filter((p) => {
      const title = p?.title?.toLowerCase() || "";
      const brand = p?.brand?.toLowerCase() || "";
      return title.includes(query) || brand.includes(query);
    });
  }, [products, deferredSearchQuery]);

  const handlePriceChange = useCallback((e) => {
    const { name, value } = e.target;

    setPricing((prev) => {
      const newPricing = { ...prev, [name]: value };
      if (newPricing.price && newPricing.originalPrice) {
        const disc =
          ((newPricing.originalPrice - newPricing.price) /
            newPricing.originalPrice) *
          100;
        newPricing.discountPercent = disc > 0 ? Math.round(disc) : 0;
      } else {
        newPricing.discountPercent = 0;
      }
      return newPricing;
    });
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);

      const productData = {
        title: formData.get("title"),
        brand: formData.get("brand"),
        category: formData.get("category"),
        description: formData.get("description"),
        stock: formData.get("stock"),
        price: pricing.price,
        originalPrice: pricing.originalPrice,
        discountPercent: pricing.discountPercent,
        image: previewImage,
      };

      if (editItem) {
        updateProduct(editItem.id, productData);
      } else {
        addProduct(productData);
      }

      setEditItem(null);
      setPreviewImage(null);
      setPricing({ price: "", originalPrice: "", discountPercent: 0 });
      setActiveTab("products");
    },
    [editItem, pricing, previewImage, addProduct, updateProduct],
  );

  // Handler for "New" button click
  const handleNewClick = useCallback(() => {
    setEditItem(null);
    setPreviewImage(null);
    setPricing({ price: "", originalPrice: "", discountPercent: 0 });
    setActiveTab("add");
  }, []);

  // Handler for "Edit" click (passed to child)
  const handleEditClick = useCallback((item) => {
    setEditItem(item);
    setPricing({
      price: item.price,
      originalPrice: item.originalPrice || item.price,
      discountPercent: item.discountPercent,
    });
    setPreviewImage(item.image);
    setActiveTab("add");
  }, []);

  // Separate handlers for tab switching to ensure stable props for NavButtons
  const setTabDashboard = useCallback(() => setActiveTab("dashboard"), []);
  const setTabProducts = useCallback(() => setActiveTab("products"), []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      <nav className="fixed bottom-0 left-0 right-0 z-40 h-20 bg-white/80 backdrop-blur-md border-t border-slate-200 flex flex-row items-center justify-around md:relative md:h-screen md:w-20 md:flex-col md:border-t-0 md:border-r md:justify-start md:pt-12 md:gap-5">
        <div className="hidden md:flex mb-4 p-4 bg-indigo-50 rounded-2xl text-indigo-600">
          <Settings2 size={20} strokeWidth={2.5} />
        </div>
        <NavButton
          active={activeTab === "products"}
          onClick={setTabProducts}
          icon={<Package />}
          label="Items"
        />
        <NavButton
          active={activeTab === "dashboard"}
          onClick={setTabDashboard}
          icon={<LayoutDashboard />}
          label="Stats"
        />
        <NavButton
          active={activeTab === "add"}
          onClick={handleNewClick}
          icon={<PlusCircle />}
          label="New"
        />

        <button
          onClick={resetData}
          className="hidden md:flex mt-auto mb-10 text-[10px] font-black text-slate-300 hover:text-rose-500 uppercase tracking-tighter"
        >
          Reset DB
        </button>
      </nav>

      <main className="flex-1 p-4 sm:p-8 lg:p-12 pb-28 md:pb-12 overflow-y-auto w-full max-w-6xl mx-auto">
        {activeTab !== "add" && (
          <div className="mb-8 relative max-w-md animate-in fade-in slide-in-from-top-2 duration-700">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-3xl border border-slate-200 shadow-sm focus:ring-2 ring-indigo-500 outline-none font-bold text-sm transition-all"
            />
          </div>
        )}

        <div className="transition-all duration-300">
          {activeTab === "dashboard" && (
            <DashboardViewGraph
              products={products}
              categories={categories}
              analytics={analytics}
            />
          )}

          {activeTab === "products" && (
            <SellerDashboardProduct
              products={filteredProducts}
              setActiveTab={setActiveTab}
              deleteProduct={deleteProduct}
              setEditItem={handleEditClick}
            />
          )}

          {activeTab === "add" && (
            <SellerDashboardAddProduct
              editItem={editItem}
              previewImage={previewImage}
              pricing={pricing}
              handlePriceChange={handlePriceChange}
              handleImageChange={handleImageChange}
              handleFormSubmit={handleFormSubmit}
              categories={categories}
              setActiveTab={setActiveTab}
            />
          )}
        </div>
      </main>
    </div>
  );
};

// PERFORMANCE: Memoized to prevent re-renders when parent state (like Search) changes
const NavButton = React.memo(({ active, icon, onClick, label }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-4 rounded-3xl transition-all duration-300 group
      ${
        active
          ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200 scale-110"
          : "text-slate-400 hover:text-indigo-600 hover:bg-indigo-50/50"
      }`}
  >
    {React.cloneElement(icon, { size: 26, strokeWidth: active ? 2.5 : 2 })}
    <span
      className={`text-[9px] font-black uppercase mt-1.5 md:hidden ${
        active ? "opacity-100" : "opacity-60"
      }`}
    >
      {label}
    </span>
  </button>
));

export default SellerDashboard;
