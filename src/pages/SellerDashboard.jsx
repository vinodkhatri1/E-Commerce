import { useState, useMemo, useEffect } from "react";
import { useProducts } from "../context/productContext";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  RotateCcw,
  Menu,
  User,
  Home,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardView from "./SellerDashboardDashboard";
import Products1 from "./Products1";
import AddProduct from "./AddProduct";

const SellerDashboard = () => {
  const {
    products,
    categories,
    deleteProduct,
    addProduct,
    updateProduct,
    resetData,
  } = useProducts();

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [editItem, setEditItem] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [pricing, setPricing] = useState({
    price: "",
    originalPrice: "",
    discountPercent: 0,
  });

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

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) header.style.display = "none";
    return () => {
      if (header) header.style.display = "";
    };
  }, []);

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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest("[data-dd='seller']")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      ...data,
      id: editItem ? editItem.id : Date.now(),
      price: Number(pricing.price),
      originalPrice: Number(pricing.originalPrice) || 0,
      discountPercent: pricing.discountPercent,
      stock: Number(data.stock),
      image: previewImage || (editItem ? editItem.image : "placeholder.png"),
    };

    if (editItem) {
      updateProduct(editItem.id, payload);
    } else {
      addProduct(payload);
    }

    setEditItem(null);
    setPreviewImage("");
    setPricing({ price: "", originalPrice: "", discountPercent: 0 });
    setActiveTab("products");
  };

  return (
    <div className="flex min-h-screen bg-[#fcfcfd] text-slate-900 font-sans">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 bg-white border-r p-6 flex-col z-40">
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
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-red-500 font-bold p-2"
        >
          <RotateCcw size={14} /> Reset All Data
        </button>
      </aside>

      {/* MOBILE HEADER */}
      <header className="md:hidden fixed top-0 inset-x-0 z-50 bg-white border-b px-4 h-14 flex items-center justify-between">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg hover:bg-slate-100"
        >
          <Menu size={22} />
        </button>

        <span className="font-black text-blue-600 uppercase">Seller Hub</span>
      </header>

      {/* MOBILE OVERLAY */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300
          ${mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* MOBILE DRAWER */}
      <aside
        className={`fixed top-14 left-0 z-50 h-[calc(100vh-3.5rem)] w-64 bg-white border-r
          transform transition-transform duration-300 ease-in-out md:hidden
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-blue-600 uppercase">
              Seller Hub
            </h2>
            <button onClick={() => setMobileOpen(false)}>
              <X size={20} />
            </button>
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

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-8 px-4 sm:px-6 lg:px-8">
        <header className="mb-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black capitalize">
                {activeTab}
              </h1>

              <p className="mt-1 text-xs sm:text-sm font-bold text-slate-400">
                Managing {products.length} Items
              </p>
            </div>

            {/* PROFILE DROPDOWN */}
            <div className="relative" data-dd="seller">
              <button
                onClick={() => setMenuOpen((p) => !p)}
                className="p-2 rounded-xl hover:bg-slate-100 transition"
              >
                <User size={22} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 sm:right-0 left-0 sm:left-auto mt-2 w-full sm:w-40 bg-white border rounded-xl shadow-lg z-50">
                  <button
                    onClick={() => {
                      navigate("/UserProfile");
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-slate-50 font-bold flex items-center gap-2"
                  >
                    <User size={16} /> Profile
                  </button>

                  <button
                    onClick={() => {
                      navigate("/");
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-slate-50 font-bold flex items-center gap-2"
                  >
                    <Home size={16} /> Home
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {activeTab === "dashboard" && (
          <DashboardView
            products={products}
            categories={categories}
            analytics={analytics}
          />
        )}

        {activeTab === "products" && (
          <Products1
            products={products}
            setEditItem={setEditItem}
            deleteProduct={deleteProduct}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "add" && (
          <AddProduct
            editItem={editItem}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
            pricing={pricing}
            handlePriceChange={handlePriceChange}
            handleImageChange={handleImageChange}
            handleFormSubmit={handleFormSubmit}
            categories={categories}
            setEditItem={setEditItem}
            setActiveTab={setActiveTab}
          />
        )}
      </main>
    </div>
  );
};

// HELPERS
const TabButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${
      active
        ? "bg-blue-50 text-blue-600 shadow-sm"
        : "text-slate-400 hover:bg-slate-50"
    }`}
  >
    {icon} {label}
  </button>
);

export default SellerDashboard;
