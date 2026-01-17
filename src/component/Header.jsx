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

  // Search & Recommendation States
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef(null);
  const inputRef = useRef(null); // Reference to input for blurring
  const { cart, isCartOpen, openCart, closeCart } = useCart();
  const isEmpty = cart.length === 0;

  const categories = [...new Set(ProductData?.map((p) => p.category) || [])];

  // Logic: Live filtering
  useEffect(() => {
    if (searchTerm.trim().length > 1) {
      const filtered = ProductData.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 6);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  // Logic: Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logic: Submit Search
  const handleSearchSubmit = (e, selectedTerm) => {
    if (e) e.preventDefault();
    const termToSearch = selectedTerm || searchTerm;

    if (termToSearch.trim()) {
      navigate(`/search?q=${encodeURIComponent(termToSearch.trim())}`);
      setShowSuggestions(false); // Fix: Close suggestions on submit
      setIsMobileMenuOpen(false);
      inputRef.current?.blur(); // Fix: Dismiss mobile keyboard
    }
  };

  // Logic: Click Recommendation
  const handleSuggestionClick = (product) => {
    setSearchTerm(product.title);
    setShowSuggestions(false); // Fix: Close suggestions immediately
    handleSearchSubmit(null, product.title);
  };

  return (
    <div className="shadow-md sticky top-0 z-30 bg-white">
      <div className="container mx-auto h-16 sm:h-20 flex items-center justify-between px-4 sm:px-6">
        {/* Left: Logo */}
        <Link to="/" className="shrink-0 z-40">
          <img className="h-10 sm:h-14 w-auto" src={logo} alt="Home" />
        </Link>

        {/* Center: FIXED Search Bar */}
        <div className="relative flex-1 max-w-md mx-2 md:mx-6" ref={searchRef}>
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center border-2 border-blue-500 rounded-lg overflow-hidden transition-colors focus-within:border-blue-700"
          >
            <input
              ref={inputRef}
              className="bg-white h-10 w-full px-3 outline-none text-sm md:text-base"
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => searchTerm.length > 1 && setShowSuggestions(true)}
            />

            {/* Clear Button (X) */}
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setShowSuggestions(false);
                }}
                className="px-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={18} />
              </button>
            )}

            {/* Search Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 h-10 px-4 flex items-center justify-center text-white hover:bg-blue-600 transition shrink-0"
            >
              <Search size={20} />
            </button>
          </form>

          {/* Recommendation Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white shadow-2xl rounded-b-lg border border-gray-200 z-50 overflow-hidden mt-1 animate-in fade-in duration-200">
              <div className="p-2 text-[10px] font-bold text-gray-400 uppercase bg-gray-50 tracking-wider">
                Recommended Products
              </div>
              {suggestions.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-3 hover:bg-blue-50 cursor-pointer transition border-b border-gray-50 last:border-none"
                  onClick={() => handleSuggestionClick(product)}
                >
                  <img
                    src={product.image}
                    alt=""
                    className="w-8 h-8 object-contain bg-gray-100 rounded"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/40")
                    }
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-800 line-clamp-1">
                      {product.title}
                    </span>
                    <span className="text-[10px] text-blue-500 font-semibold uppercase">
                      {product.category}
                    </span>
                  </div>
                </div>
              ))}
              <div
                className="p-3 text-center text-sm text-blue-600 font-bold hover:bg-blue-100 cursor-pointer border-t transition-colors"
                onClick={() => handleSearchSubmit()}
              >
                View all results for "{searchTerm}"
              </div>
            </div>
          )}
        </div>

        {/* Right: Old Sell, Cart, and Moon Icons Restored */}
        <ul className="flex items-center gap-4 sm:gap-6 text-xl font-medium text-gray-700">
          <div className="hidden lg:block">
            <MegaMenu />
          </div>

          <li
            className="cursor-pointer hover:text-blue-600 transition"
            onClick={() => setIsOpenLogIn(true)}
          >
            <User size={24} />
          </li>

          {/* Old Cart Button Style */}
          <li
            className="cursor-pointer relative hover:text-blue-600 transition"
            onClick={openCart}
          >
            <ShoppingCart
              size={24}
              className={isEmpty ? "" : "text-blue-600"}
            />
            {!isEmpty && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </li>

          {/* Old Sell Button Style */}
          <Link
            to="/sell"
            className="hidden md:flex items-center gap-2 bg-gray-900 text-white px-6 py-2 rounded-full font-bold ml-4 hover:scale-105 transition-transform"
          >
            <span>Sell</span>
          </Link>

          <li className="cursor-pointer hover:text-blue-600 transition hidden sm:block">
            <Moon size={24} />
          </li>

          <li
            className="cursor-pointer lg:hidden z-40"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </li>
        </ul>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-30 bg-white pt-20 px-4 overflow-y-auto lg:hidden">
            <ul className="space-y-4 font-medium text-lg">
              <li>
                <button
                  onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
                  className="flex items-center justify-between w-full py-2 border-b border-gray-100"
                >
                  <span className="text-xl font-bold">Categories</span>
                  {isMobileCategoryOpen ? <ChevronDown /> : <ChevronRight />}
                </button>

                {isMobileCategoryOpen && (
                  <div className="pl-4 mt-2 space-y-3 border-l-2 border-blue-100 ml-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat}
                        to={`/category/${cat}`}
                        className="block capitalize text-gray-600 hover:text-blue-600 py-1"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              <li className="border-b border-gray-100 py-2">
                <button className="flex items-center gap-3 w-full">
                  <Moon size={20} />
                  <span>Dark Mode</span>
                </button>
              </li>

              <li className="py-2">
                <button
                  onClick={() => {
                    setIsOpenLogIn(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold"
                >
                  Login / Register
                </button>
              </li>
            </ul>
          </div>
        )}

        {isCartOpen && <Cart setIsOpenCart={closeCart} />}
        {isOpenLogIn && (
          <>
            <div
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
              onClick={() => setIsOpenLogIn(false)}
            />
            <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4">
              <LogIn onClose={() => setIsOpenLogIn(false)} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
