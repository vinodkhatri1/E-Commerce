import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  ShoppingCart,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Heart,
} from "lucide-react";

// --- CONTEXT & DATA ---
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import ProductData from "../Data/ProductData";
import logo from "../assets/logo.png";

// --- MODALS ---
import Cart from "./Cart";
import LogIn from "./LogIn";

const Header = () => {
  const navigate = useNavigate();

  // Auth & Cart Contexts
  const { user, isLoginOpen, openLogin, closeLogin, logout } = useAuth();
  const { cart, isCartOpen, openCart, closeCart } = useCart();

  // State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchContainerRef = useRef(null);

  // Dynamic Category Extraction
  const dynamicCategories = [
    ...new Set(ProductData?.map((p) => p.category) || []),
  ];

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const filtered = ProductData.filter((p) => {
        const matchesTerm = p.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCat === "All" || p.category === selectedCat;
        return matchesTerm && matchesCategory;
      }).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, selectedCat]);

  const handleSearchSubmit = (e, termOverride) => {
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
  };

  return (
    <>
      <header className="sticky top-0 z-[100] bg-white border-b border-gray-100 shadow-sm">
        {/* --- 1. Main Navigation Row --- */}
        <div className="max-w-[1440px] mx-auto px-4 py-3 md:py-0 md:h-20 flex flex-wrap items-center justify-between gap-y-3 gap-x-4">
          {/* Logo - Always stays at top left */}
          <Link to="/" className="flex-shrink-0 order-1">
            <img className="h-14 md:h-18 w-auto" src={logo} alt="Logo" />
          </Link>

          {/* Search Bar - Full width on mobile (order 3), inline on desktop (order 2) */}
          <div
            className="w-full md:flex-1 md:max-w-2xl relative order-3 md:order-2"
            ref={searchContainerRef}
          >
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center w-full bg-gray-100 rounded-lg overflow-hidden border-2 border-transparent focus-within:border-indigo-600 focus-within:bg-white transition-all shadow-sm"
            >
              <select
                className="hidden sm:block bg-gray-200 text-[11px] rounded-lg font-bold text-gray-600 px-3 py-3 outline-none cursor-pointer hover:bg-gray-300 border-r border-gray-200"
                value={selectedCat}
                onChange={(e) => setSelectedCat(e.target.value)}
              >
                <option className="bg-gray-100" value="All">
                  All
                </option>
                {dynamicCategories.map((cat) => (
                  <option className="bg-gray-100" key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <input
                className="flex-1 bg-transparent text-[16px] md:text-sm px-3 md:px-4 py-2 md:py-2.5 outline-none min-w-0"
                placeholder="Search..."
                value={searchTerm}
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <button
                type="submit"
                className="bg-indigo-600 text-white p-2.5 md:p-3 hover:bg-indigo-700 transition-colors shrink-0"
              >
                <Search size={18} className="md:w-5 md:h-5" />
              </button>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden z-[110] max-h-[60vh] overflow-y-auto">
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
                      className="w-8 h-8 md:w-10 md:h-10 object-contain shrink-0"
                      alt={p.title}
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

          {/* User Actions - Stays at top right */}
          <div className="flex items-center gap-1 sm:gap-3 order-2 md:order-3">
            <Link
              to="/wishlist"
              className="hidden sm:flex p-2 text-gray-600 hover:bg-gray-100 rounded-full"
            >
              <Heart size={22} />
            </Link>

            <div
              onClick={!user ? openLogin : undefined}
              className="relative group p-1 md:p-2 text-gray-600 hover:bg-gray-100 rounded-full cursor-pointer flex items-center gap-2"
            >
              <User size={22} />
              <div className="hidden lg:block text-left">
                <p className="text-[10px] text-gray-400 leading-none">
                  Hello, {user ? user.name.split(" ")[0] : "Sign in"}
                </p>
                <p className="text-xs font-bold text-gray-800 flex items-center">
                  Account <ChevronDown size={12} />
                </p>
              </div>

              {/* User Dropdown */}
              {user && (
                <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="bg-white rounded-xl shadow-2xl border border-gray-100 w-52 overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b border-gray-100">
                      <p className="text-sm font-bold truncate">{user.name}</p>
                    </div>
                    <Link
                      to="/UserProfile"
                      className="block px-4 py-3 text-sm hover:bg-gray-50"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/seller-dashboard"
                      className="block px-4 py-3 text-sm hover:bg-gray-50"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-bold border-t"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div
              onClick={openCart}
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full cursor-pointer"
            >
              <ShoppingCart size={22} />
              {cart?.length > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 md:h-5 md:w-5 flex items-center justify-center rounded-full text-[9px] md:text-[10px] font-bold text-white bg-indigo-600 ring-2 ring-white">
                  {cart.length}
                </span>
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

        {/* --- 2. Amazon-style Category Bar --- */}
        <div className="bg-slate-900 text-white text-[11px] font-bold">
          <div className="max-w-[1440px] mx-auto px-4 flex items-center gap-4 py-2 overflow-x-auto no-scrollbar whitespace-nowrap">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex items-center gap-1 hover:outline hover:outline-1 hover:outline-white px-2 py-1 shrink-0"
            >
              <Menu size={14} /> All
            </button>
            <Link
              to="/shop"
              className="hover:outline hover:outline-1 hover:outline-white px-2 py-1 shrink-0"
            >
              Best Sellers
            </Link>
            <Link
              to="/deals"
              className="hover:outline hover:outline-1 hover:outline-white px-2 py-1 shrink-0"
            >
              Today's Deals
            </Link>
            {dynamicCategories.slice(0, 5).map((cat) => (
              <Link
                key={cat}
                to={`/category/${cat}`}
                className="hover:outline hover:outline-1 hover:outline-white px-2 py-1 shrink-0 capitalize"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* --- Mobile Sidebar (Cleaned) --- */}
      <div
        className={`fixed inset-0 bg-black/60 z-[100] transition-opacity ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div
        className={`fixed top-0 left-0 h-full w-[300px] bg-white z-[101] transform transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="bg-slate-800 text-white p-5 flex items-center gap-3">
          <User size={24} />
          <p className="font-bold text-lg">
            Hello, {user ? user.name : "Sign In"}
          </p>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="ml-auto"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4">
          <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-4">
            Shop By Category
          </h3>
          <div className="space-y-2">
            {dynamicCategories.map((cat) => (
              <Link
                key={cat}
                to={`/category/${cat}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg text-sm font-medium capitalize"
              >
                {cat} <ChevronRight size={16} />
              </Link>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <Link
              to="/UserProfile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-sm text-gray-600"
            >
              Your Account
            </Link>
            <Link
              to="/orders"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-sm text-gray-600"
            >
              Returns & Orders
            </Link>

            {!user ? (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openLogin();
                }}
                className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-lg font-bold"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={logout}
                className="w-full mt-4 text-red-600 py-3 font-bold border border-red-100 rounded-lg"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>

      {/* --- Modals --- */}
      {isCartOpen && <Cart setIsOpenCart={closeCart} />}
      {isLoginOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <LogIn onClose={closeLogin} />
        </div>
      )}
    </>
  );
};

export default Header;
