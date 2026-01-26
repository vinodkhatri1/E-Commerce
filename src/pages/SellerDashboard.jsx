import React, {
  useState,
  useMemo,
  useCallback,
  useDeferredValue,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

// Icons
import LayoutDashboard from "lucide-react/dist/esm/icons/layout-dashboard";
import Package from "lucide-react/dist/esm/icons/package";
import PlusCircle from "lucide-react/dist/esm/icons/plus-circle";
import Search from "lucide-react/dist/esm/icons/search";
import Settings2 from "lucide-react/dist/esm/icons/settings-2";
import LogOut from "lucide-react/dist/esm/icons/log-out";
import Lock from "lucide-react/dist/esm/icons/lock";

// Contexts
import { useProducts } from "../context/productContext";
import { useAuth } from "../context/AuthContext";

// Components
import DashboardViewGraph from "../component/DashboardViewGraph";
import SellerDashboardProduct from "../component/SellerDashboardProduct";
import SellerDashboardAddProduct from "../component/SellerDashboardAddProduct";

const SellerDashboard = () => {
  // --- 1. ALL HOOKS MUST BE DECLARED AT THE VERY TOP ---
  const { user, openLogin, logout } = useAuth();
  const navigate = useNavigate();

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

  // 🛡️ REDIRECT EFFECT: If user logs out, send them home immediately
  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  // Logout Handler
  const handleLogout = useCallback(() => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/", { replace: true });
    }
  }, [logout, navigate]);

  // Analytics Calculation
  const analytics = useMemo(() => {
    if (!products || products.length === 0)
      return { totalVal: 0, lowStockCount: 0, avgPrice: 0 };
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

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    const query = deferredSearchQuery.toLowerCase();
    return products.filter((p) => {
      const title = p?.title?.toLowerCase() || "";
      const brand = p?.brand?.toLowerCase() || "";
      return title.includes(query) || brand.includes(query);
    });
  }, [products, deferredSearchQuery]);

  // Form Handlers
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
      if (editItem) updateProduct(editItem.id, productData);
      else addProduct(productData);

      setEditItem(null);
      setPreviewImage(null);
      setPricing({ price: "", originalPrice: "", discountPercent: 0 });
      setActiveTab("products");
    },
    [editItem, pricing, previewImage, addProduct, updateProduct],
  );

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

  // --- 2. RENDER LOGIC ---

  // If user is null, return nothing while the useEffect handles the navigate
  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      {/* SIDEBAR NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 h-20 bg-white/80 backdrop-blur-md border-t border-slate-200 flex flex-row items-center justify-around md:sticky md:top-0 md:h-screen md:w-20 md:flex-col md:border-t-0 md:border-r md:justify-start md:pt-12 md:gap-5">
        <div className="hidden md:flex mb-4 p-4 bg-indigo-50 rounded-2xl text-indigo-600">
          <Settings2 size={20} strokeWidth={2.5} />
        </div>

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
          onClick={() => {
            setEditItem(null);
            setPreviewImage(null);
            setActiveTab("add");
          }}
          icon={<PlusCircle />}
          label="New"
        />

        <div className="hidden md:flex mt-auto mb-6 flex-col items-center gap-4 w-full">
          <button
            onClick={handleLogout}
            className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
          <button
            onClick={resetData}
            className="text-[10px] font-black text-slate-300 hover:text-indigo-500 uppercase tracking-tighter"
          >
            Reset
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 sm:p-8 lg:p-12 pb-28 md:pb-12 overflow-y-auto w-full max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              Hello, {user?.name?.split(" ")[0]}
            </h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Store Management
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="md:hidden flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider bg-rose-50 px-3 py-2 rounded-lg"
          >
            <LogOut size={14} /> Logout
          </button>
        </header>

        {activeTab !== "add" && activeTab !== "dashboard" && (
          <div className="mb-8 relative max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-3xl border border-slate-200 shadow-sm focus:ring-2 ring-indigo-500 outline-none font-bold text-sm"
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

const NavButton = React.memo(({ active, icon, onClick, label }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-4 rounded-3xl transition-all duration-300 group ${active ? "bg-indigo-600 text-white shadow-xl scale-110" : "text-slate-400 hover:text-indigo-600 hover:bg-indigo-50/50"}`}
  >
    {React.cloneElement(icon, { size: 26, strokeWidth: active ? 2.5 : 2 })}
    <span
      className={`text-[9px] font-black uppercase mt-1.5 md:hidden ${active ? "opacity-100" : "opacity-60"}`}
    >
      {label}
    </span>
  </button>
));

export default SellerDashboard;
