import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import User from "lucide-react/dist/esm/icons/user";
import ShoppingCart from "lucide-react/dist/esm/icons/shopping-cart";
import Search from "lucide-react/dist/esm/icons/search";
import Menu from "lucide-react/dist/esm/icons/menu";
import X from "lucide-react/dist/esm/icons/x";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import Heart from "lucide-react/dist/esm/icons/heart";
import LogOut from "lucide-react/dist/esm/icons/log-out";
import LayoutDashboard from "lucide-react/dist/esm/icons/layout-dashboard";
import Package from "lucide-react/dist/esm/icons/package";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import Mail from "lucide-react/dist/esm/icons/mail";
import Phone from "lucide-react/dist/esm/icons/phone";
import Home from "lucide-react/dist/esm/icons/home";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import ProductData from "../Data/ProductData";
import logo from "../assets/logo.png";

import Cart from "./Cart";
import LogIn from "./LogIn";

const Header = () => {
  const navigate = useNavigate();
  const { user, isLoginOpen, openLogin, closeLogin, logout } = useAuth();
  const { cart, isCartOpen, openCart, closeCart, wishlist } = useCart();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const searchContainerRef = useRef(null);
  const userMenuRef = useRef(null);

  const dynamicCategories = useMemo(() => {
    return [...new Set(ProductData?.map((p) => p.category) || [])];
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside, {
      passive: true,
    });
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const suggestions = useMemo(() => {
    if (debouncedTerm.trim().length === 0) return [];

    const lowerTerm = debouncedTerm.toLowerCase();

    return ProductData.filter((p) => {
      const matchesTerm = p.title.toLowerCase().includes(lowerTerm);
      const matchesCategory =
        selectedCat === "All" || p.category === selectedCat;
      return matchesTerm && matchesCategory;
    }).slice(0, 5);
  }, [debouncedTerm, selectedCat]);

  const handleSearchSubmit = useCallback(
    (e, termOverride) => {
      if (e) e.preventDefault();

      const term = termOverride || searchTerm;

      if (term.trim()) {
        const catParam =
          selectedCat !== "All"
            ? `&category=${encodeURIComponent(selectedCat)}`
            : "";

        navigate(`/search?q=${encodeURIComponent(term.trim())}${catParam}`);
        setShowSuggestions(false);
      }
    },
    [searchTerm, selectedCat, navigate],
  );

  return (
    <>
      <div className="bg-gray-50 border-b border-gray-100 hidden lg:block font-sans">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center text-[11px] font-black text-gray-500 uppercase tracking-[0.15em]">
          <div className="flex items-center gap-6">
            <a className="hover:text-indigo-600 transition-colors flex items-center gap-2">
              <Phone size={12} className="text-indigo-500" /> +1 (469) 42*-**44
            </a>
            <a className="hover:text-indigo-600 transition-colors flex items-center gap-2">
              <Mail size={12} className="text-indigo-500" /> info@store.com
            </a>
          </div>
          <div className="flex items-center gap-6">
            <Link
              to="/shop"
              className="hover:text-indigo-600 transition-colors"
            >
              Shop
            </Link>
            <Link
              to="/store-locator"
              className="hover:text-indigo-600 transition-colors flex items-center gap-1.5"
            >
              <MapPin size={12} /> Store Locator
            </Link>
            <Link
              to="/orders"
              className="hover:text-indigo-600 transition-colors flex items-center gap-1.5"
            >
              <Package size={12} /> Track Your Order
            </Link>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-0 md:h-20 flex items-center justify-between gap-x-4">
          <Link to="/" className="shrink-0 order-1">
            <img
              className="h-15 md:h-18 w-auto"
              src={logo}
              alt="Logo"
              loading="eager"
            />
          </Link>

          <div
            className="hidden md:block flex-1 max-w-2xl relative order-2"
            ref={searchContainerRef}
          >
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center w-full bg-gray-100 rounded-lg overflow-hidden border-2 border-transparent focus-within:border-indigo-600 focus-within:bg-white transition-all shadow-sm"
            >
              <div className="relative shrink-0 hidden md:block">
                <select
                  value={selectedCat}
                  onChange={(e) => setSelectedCat(e.target.value)}
                  className="appearance-none bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 pl-4 pr-10 py-3 rounded-l-lg border-r border-gray-200 outline-none cursor-pointer h-full transition-colors capitalize truncate max-w-37.5"
                >
                  <option value="All">All Categories</option>
                  {dynamicCategories.map((cat) => (
                    <option className="bg-white" key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <ChevronDown size={14} strokeWidth={3} />
                </div>
              </div>

              <input
                className="flex-1 bg-transparent text-sm px-4 py-2.5 outline-none"
                placeholder="Search products..."
                value={searchTerm}
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <button
                type="submit"
                className="bg-indigo-600 text-white p-3 hover:bg-indigo-700 transition-colors"
              >
                <Search size={20} />
              </button>
            </form>

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden z-50">
                {suggestions.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSearchSubmit(null, p.title)}
                    className="px-4 py-3 hover:bg-indigo-50 cursor-pointer flex items-center gap-3 border-b border-gray-50 last:border-0"
                  >
                    <img
                      src={
                        p.image?.startsWith("data:")
                          ? p.image
                          : `/image/${p.category}/${p.image}`
                      }
                      className="w-10 h-10 object-contain shrink-0"
                      alt=""
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {p.title}
                      </p>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">
                        {p.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-4 order-3">
            <div>
              <Link to="/" className="shrink-0 order-1">
                <Home />
              </Link>
            </div>
            <Link to="/wishlist" className="relative p-2">
              <Heart size={22} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <div
              onClick={openCart}
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full cursor-pointer transition-colors"
            >
              <ShoppingCart size={22} />
              {cart?.length > 0 && (
                <span className="absolute top-0 right-0 h-5 w-5 flex items-center justify-center rounded-full text-[10px] font-bold text-white bg-indigo-600 ring-2 ring-white">
                  {cart.length}
                </span>
              )}
            </div>

            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() =>
                  user
                    ? setIsUserDropdownOpen(!isUserDropdownOpen)
                    : openLogin()
                }
                className="flex items-center gap-2 p-1 md:p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <User size={22} />
                <div className="hidden lg:block text-left">
                  <p className="text-[10px] text-gray-400 leading-none">
                    Hello, {user ? user.name.split(" ")[0] : "Sign in"}
                  </p>
                  <p className="text-xs font-bold text-gray-800 flex items-center">
                    Account{" "}
                    <ChevronDown
                      size={12}
                      className={`ml-1 transition-transform ${isUserDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </p>
                </div>
              </button>

              {user && isUserDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 w-56 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-4 bg-gray-50 border-b border-gray-100">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                      Account
                    </p>
                    <p className="text-sm font-bold truncate">{user.name}</p>
                  </div>
                  <Link
                    to="/UserProfile"
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setIsUserDropdownOpen(false);
                    }}
                  >
                    <User size={16} /> My Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setIsUserDropdownOpen(false);
                    }}
                  >
                    <Package size={16} /> Orders
                  </Link>
                  {(user?.role === "seller" || user?.role === "admin") && (
                    <Link
                      to="/seller-dashboard"
                      className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-indigo-50 text-indigo-600 transition-colors font-bold"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <LayoutDashboard size={18} />
                      {user.role === "admin"
                        ? "Admin Panel"
                        : "Seller Dashboard"}
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-bold border-t"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-1.5 text-gray-600"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              className="w-full bg-gray-100 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 ring-indigo-500 transition-all"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600"
            >
              <Search size={18} />
            </button>
          </form>
        </div>

        <div className="bg-slate-900 text-white text-[11px] font-bold">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 py-2.5 overflow-x-auto no-scrollbar whitespace-nowrap uppercase tracking-wider">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex items-center gap-2 hover:text-indigo-400 transition-colors shrink-0"
            >
              <Menu size={14} /> All Categories
            </button>
            <div className="flex gap-6 items-center md:ml-40">
              <Link
                to="/shop"
                className="hover:text-indigo-400 transition-colors shrink-0"
              >
                Best Sellers
              </Link>
              <Link
                to="/deals"
                className="hover:text-indigo-400 transition-colors shrink-0"
              >
                Today's Deals
              </Link>
              <Link
                to="/products"
                className="hover:text-indigo-400 transition-colors shrink-0"
              >
                All Products
              </Link>
              {dynamicCategories.slice(0, 5).map((cat) => (
                <Link
                  key={cat}
                  to={`/category/${cat}`}
                  className="hover:text-indigo-400 transition-colors shrink-0 capitalize"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-black/60 z-100 transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-101 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="bg-slate-800 text-white p-6 flex items-center gap-4">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
            <User size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest leading-none mb-1">
              Welcome
            </p>
            {user ? (
              <p className="font-bold text-lg truncate">{user.name}</p>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openLogin();
                }}
                className="font-bold text-lg hover:text-indigo-300 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col h-[calc(100%-88px)] bg-white">
          <div className="flex-1 overflow-y-auto p-5">
            <h3 className="text-gray-400 hover:text-blue-600 text-[12px] font-black uppercase tracking-[0.2em] ml-3 mb-4 bg-white pb-2">
              <Link to="/categories" onClick={() => setIsMobileMenuOpen(false)}>
                Shop Categories
              </Link>
            </h3>
            <div className="space-y-1 pb-4">
              {dynamicCategories.map((cat) => (
                <Link
                  key={cat}
                  to={`/category/${cat}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl text-sm font-bold transition-all capitalize"
                >
                  {cat} <ChevronRight size={16} className="opacity-30" />
                </Link>
              ))}
            </div>
          </div>

          <div className="p-5 pb-8 border-t border-gray-100 bg-white shrink-0 space-y-1 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-20">
            <button
              onClick={() => !user && openLogin()}
              className="flex items-center gap-2 p-1 md:p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <User size={22} />
              <div className="block text-left">
                <p className="text-[10px] text-gray-400 leading-none">
                  Hello, {user ? user.name.split(" ")[0] : "Sign in"}
                </p>
                <p className="text-xs font-bold text-gray-800 flex items-center">
                  Account{" "}
                  <ChevronDown
                    size={12}
                    className={`ml-1 transition-transform ${isUserDropdownOpen ? "rotate-180" : ""}`}
                  />
                </p>
              </div>
            </button>

            {user && (
              <>
                <Link
                  to="/UserProfile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
                >
                  <User size={18} /> Your Account
                </Link>
                <Link
                  to="/orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
                >
                  <Package size={18} /> Returns & Orders
                </Link>
                {(user?.role === "seller" || user?.role === "admin") && (
                  <Link
                    to="/seller-dashboard"
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-indigo-50 text-indigo-600 transition-colors font-bold"
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    <LayoutDashboard size={18} />
                    {user.role === "admin" ? "Admin Panel" : "Seller Dashboard"}
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 text-sm text-red-600 hover:bg-red-50 rounded-lg font-bold mt-2"
                >
                  <LogOut size={18} /> Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {isCartOpen && <Cart setIsOpenCart={closeCart} />}
      {isLoginOpen && <LogIn onClose={closeLogin} />}
    </>
  );
};

export default Header;
