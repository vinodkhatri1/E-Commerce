import React, { useState, useMemo, useDeferredValue, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/productContext";
import { useAuth } from "../context/AuthContext";

import LayoutDashboard from "lucide-react/dist/esm/icons/layout-dashboard";
import Package from "lucide-react/dist/esm/icons/package";
import PlusCircle from "lucide-react/dist/esm/icons/plus-circle";
import Search from "lucide-react/dist/esm/icons/search";
import LogOut from "lucide-react/dist/esm/icons/log-out";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import RefreshCw from "lucide-react/dist/esm/icons/refresh-cw";

import DashboardViewGraph from "../component/DashboardViewGraph";
import SellerDashboardProduct from "../component/SellerDashboardProduct";
import SellerDashboardAddProduct from "../component/SellerDashboardAddProduct";

const SellerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, deleteProduct, categories } =
    useProducts();

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

  useEffect(() => {
    if (!user || (user.role !== "seller" && user.role !== "admin")) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const myVisibleProducts = useMemo(() => {
    if (!user || !user.email) return [];
    if (user.role === "admin") return products;
    return products.filter((p) => {
      return p.sellerId === user.email;
    });
  }, [products, user]);

  const filteredProducts = useMemo(() => {
    const query = deferredSearchQuery.toLowerCase();
    return myVisibleProducts.filter(
      (p) =>
        p.title?.toLowerCase().includes(query) ||
        p.brand?.toLowerCase().includes(query),
    );
  }, [myVisibleProducts, deferredSearchQuery]);

  const analytics = useMemo(() => {
    const totalVal = myVisibleProducts.reduce(
      (sum, p) => sum + (Number(p.price) || 0) * (Number(p.stock) || 0),
      0,
    );
    return {
      totalVal,
      lowStockCount: myVisibleProducts.filter(
        (p) => (Number(p.stock) || 0) < 10,
      ).length,
      avgPrice: myVisibleProducts.length
        ? totalVal / myVisibleProducts.length
        : 0,
    };
  }, [myVisibleProducts]);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPricing((prev) => {
      const updated = { ...prev, [name]: value };
      const salePrice = parseFloat(updated.price) || 0;
      const regPrice = parseFloat(updated.originalPrice) || 0;

      if (regPrice > salePrice && salePrice > 0) {
        const percentage = ((regPrice - salePrice) / regPrice) * 100;
        updated.discountPercent = Math.round(percentage);
      } else {
        updated.discountPercent = 0;
      }
      return updated;
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const r = new FileReader();
      r.onloadend = () => setPreviewImage(r.result);
      r.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      title: formData.get("title"),
      brand: formData.get("brand"),
      category: formData.get("category"),
      description: formData.get("description"),
      stock: Number(formData.get("stock")),
      price: Number(pricing.price),
      originalPrice: Number(pricing.originalPrice),
      discountPercent: pricing.discountPercent,
      image: previewImage,
      sellerId: user?.email,
      updatedAt: new Date().toISOString(),
    };

    if (editItem) {
      updateProduct(editItem.id, data);
    } else {
      addProduct({ ...data, id: Date.now() });
    }

    setEditItem(null);
    setPreviewImage(null);
    setPricing({ price: "", originalPrice: "", discountPercent: 0 });
    setActiveTab("products");
  };

  const openAddTab = () => {
    setEditItem(null);
    setPreviewImage(null);
    setPricing({ price: "", originalPrice: "", discountPercent: 0 });
    setActiveTab("add");
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setPricing({
      price: item.price.toString(),
      originalPrice: item.originalPrice?.toString() || "",
      discountPercent: item.discountPercent || 0,
    });
    setPreviewImage(item.image);
    setActiveTab("add");
  };

  const handleReload = () => {
    window.location.reload();
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      <nav className="fixed bottom-0 left-0 right-0 z-40 h-20 bg-white/80 backdrop-blur-lg border-t border-slate-100 md:fixed md:top-35 md:h-screen md:w-24 md:flex-col md:border-t-0 md:border-r md:pt-12 md:pb-10 flex items-center justify-around md:justify-start md:gap-8">
        <div className="flex md:flex-col items-center justify-around w-full md:gap-6">
          <NavButton
            active={activeTab === "products"}
            onClick={() => setActiveTab("products")}
            icon={<Package />}
            label="Items"
          />
          <NavButton
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
            icon={<LayoutDashboard />}
            label="Stats"
          />
          <NavButton
            active={activeTab === "add"}
            onClick={openAddTab}
            icon={<PlusCircle />}
            label="New"
          />
        </div>

        <button
          onClick={logout}
          className="hidden md:flex mt-auto group p-4 rounded-3xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all active:scale-90"
          title="Logout"
        >
          <LogOut size={22} strokeWidth={2.5} />
        </button>
      </nav>

      <main className="flex-1 p-6 md:p-12 max-w-6xl mx-auto w-full mb-20 md:mb-0">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {user.role === "admin" ? (
                <>
                  <ShieldCheck className="text-rose-500" size={18} />
                  <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">
                    Global Admin Access
                  </p>
                </>
              ) : (
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Merchant Dashboard
                </p>
              )}
            </div>
            <h2 className="text-2xl font-black">
              {user.role === "admin"
                ? "Platform Control"
                : `Welcome, ${user.name}`}
            </h2>
          </div>

          <button
            onClick={handleReload}
            className="group flex items-center gap-2 px-4 py-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-md transition-all active:scale-95"
            title="Reload System"
          >
            <RefreshCw
              size={18}
              className="transition-transform duration-500 group-hover:rotate-180"
            />
            <span className="hidden sm:block font-bold text-xs uppercase tracking-wider">
              Reload
            </span>
          </button>
        </header>

        {activeTab === "products" && (
          <div className="mb-8 relative max-w-md animate-in fade-in slide-in-from-left-4">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search Listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-none shadow-sm outline-none focus:ring-2 ring-indigo-500 font-bold transition-all"
            />
          </div>
        )}

        <div className="transition-all duration-300">
          {activeTab === "dashboard" && (
            <DashboardViewGraph
              products={myVisibleProducts}
              categories={categories}
              analytics={analytics}
            />
          )}

          {activeTab === "products" && (
            <SellerDashboardProduct
              products={filteredProducts}
              deleteProduct={deleteProduct}
              setEditItem={handleEditClick}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === "add" && (
            <SellerDashboardAddProduct
              user={user}
              editItem={editItem}
              setEditItem={setEditItem}
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

const NavButton = ({ active, icon, onClick, label }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-3xl transition-all ${
      active
        ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200 scale-105"
        : "text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
    }`}
  >
    {React.cloneElement(icon, { size: 24, strokeWidth: active ? 2.5 : 2 })}
    <span className="text-[8px] font-black uppercase mt-1.5 tracking-tighter">
      {label}
    </span>
  </button>
);

export default SellerDashboard;
