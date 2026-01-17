import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.png";
import {
  User,
  ShoppingCart,
  Moon,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import MegaMenu from "./MegaMenu";
import Cart from "./Cart";
import LogIn from "./LogIn";
import { useCart } from "../context/CartContext";
import ProductData from "../Data/ProductData";

const Header = () => {
  const [isOpenLogIn, setIsOpenLogIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);

  // Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const { cart, isCartOpen, openCart, closeCart } = useCart();
  const isEmpty = cart.length === 0;

  const categories = [...new Set(ProductData?.map((p) => p.category) || [])];

  // Logic to handle search submission
  const handleSearchSubmit = (e, selectedTerm) => {
    if (e) e.preventDefault();
    const termToSearch = selectedTerm || searchTerm;

    if (termToSearch.trim()) {
      // 1. Hide suggestions immediately
      setShowSuggestions(false);
      // 2. Navigate to search page
      navigate(`/search?q=${encodeURIComponent(termToSearch.trim())}`);
      // 3. Close mobile menu and remove focus from input
      setIsMobileMenuOpen(false);
      inputRef.current?.blur();
    }
  };

  // Logic to handle clicking a specific suggestion
  const handleSuggestionClick = (product) => {
    setSearchTerm(product.title);
    // Explicitly close before submitting
    setShowSuggestions(false);
    handleSearchSubmit(null, product.title);
  };

  // Filter products for suggestions
  useEffect(() => {
    if (searchTerm.trim().length > 1) {
      const filtered = ProductData.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 6);
      setSuggestions(filtered);
      // Only show if we aren't "submitting"
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  // Close when clicking anywhere outside the search container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="shadow-sm sticky top-0 z-30 bg-white border-b border-slate-100">
      <div className="container mx-auto h-16 sm:h-20 flex items-center justify-between px-4 sm:px-6">
        {/* Left: Logo */}
        <Link
          to="/"
          className="shrink-0 z-40 transition-transform hover:scale-105"
        >
          <img className="h-10 sm:h-12 w-auto" src={logo} alt="Home" />
        </Link>

        {/* Center: Search Bar */}
        <div className="relative flex-1 max-w-xl mx-4 md:mx-10" ref={searchRef}>
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-slate-100 border-2 border-transparent focus-within:border-indigo-500 focus-within:bg-white rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
          >
            <div className="pl-4 text-slate-400">
              <Search size={18} />
            </div>
            <input
              ref={inputRef}
              className="bg-transparent h-11 w-full px-3 outline-none text-sm md:text-base font-medium text-slate-700 placeholder:text-slate-400"
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onFocus={() => {
                if (searchTerm.length > 1) setShowSuggestions(true);
              }}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
            />

            <div className="flex items-center pr-1 gap-1">
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setShowSuggestions(false);
                  }}
                  className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <X size={18} />
                </button>
              )}
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all active:scale-95 hidden sm:block"
              >
                Search
              </button>
              <button
                type="submit"
                className="p-2 bg-indigo-600 text-white rounded-xl sm:hidden"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Recommendation Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-[120%] left-0 w-full bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-3xl border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="p-4 flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50 border-b border-slate-50">
                <TrendingUp size={14} /> Suggestions
              </div>

              <div className="py-2">
                {suggestions.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-indigo-50 cursor-pointer transition-all group"
                    onClick={() => handleSuggestionClick(product)}
                  >
                    <div className="w-12 h-12 bg-white rounded-xl overflow-hidden flex-shrink-0 p-1.5 border border-slate-100 group-hover:border-indigo-200 shadow-sm">
                      <img
                        src={`/image/${product.category}/${product.image}`}
                        alt=""
                        className="w-full h-full object-contain"
                        onError={(e) =>
                          (e.target.src = "https://via.placeholder.com/50")
                        }
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors line-clamp-1">
                        {product.title}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        {product.category}
                      </span>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all"
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handleSearchSubmit()}
                className="w-full p-4 text-center text-sm font-bold text-indigo-600 bg-indigo-50/30 hover:bg-indigo-50 transition-colors border-t border-slate-50"
              >
                View all results for "{searchTerm}"
              </button>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden lg:block">
            <MegaMenu />
          </div>
          <button
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors"
            onClick={() => setIsOpenLogIn(true)}
          >
            <User size={24} />
          </button>
          <button
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 relative transition-colors"
            onClick={openCart}
          >
            <ShoppingCart
              size={24}
              className={isEmpty ? "" : "text-indigo-600"}
            />
            {!isEmpty && (
              <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center ring-2 ring-white">
                {cart.length}
              </span>
            )}
          </button>
          <Link
            to="/sell"
            className="hidden md:flex bg-indigo-600 text-white px-6 py-2.5 rounded-2xl font-bold text-sm hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-95 ml-2"
          >
            Sell
          </Link>
          <button
            className="lg:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
