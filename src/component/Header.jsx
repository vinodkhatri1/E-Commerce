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
  LogOut,
  Package,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import MegaMenu from "./MegaMenu";
import Cart from "./Cart";
import LogIn from "./LogIn";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import ProductData from "../Data/ProductData";

const Header = () => {
  const { user, isLoginOpen, openLogin, closeLogin, logout } = useAuth();
  const { cart, isCartOpen, openCart, closeCart } = useCart();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const isEmpty = cart.length === 0;

  const categories = [...new Set(ProductData?.map((p) => p.category) || [])];

  useEffect(() => {
    if (searchTerm.trim().length > 1) {
      const filtered = ProductData.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()),
      ).slice(0, 6);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSearchSubmit = (e, selectedTerm) => {
    if (e) e.preventDefault();
    const termToSearch = selectedTerm || searchTerm;
    if (termToSearch.trim()) {
      navigate(`/search?q=${encodeURIComponent(termToSearch.trim())}`);
      setShowSuggestions(false);
      setIsMobileMenuOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  return (
    <div className="shadow-md sticky top-0 z-30 bg-white">
      <div className="container mx-auto h-16 sm:h-20 flex items-center justify-between px-4 sm:px-6">
        {/* Left: Logo */}
        <Link to="/" className="shrink-0 z-50">
          <img className="h-10 sm:h-14 w-auto" src={logo} alt="Home" />
        </Link>

        {/* Center: Search Bar */}
        <div className="relative flex-1 max-w-md mx-2 md:mx-6" ref={searchRef}>
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center border-2 border-blue-500 rounded-lg overflow-hidden bg-white"
          >
            <input
              ref={inputRef}
              className="h-10 w-full px-3 outline-none text-sm"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
            />
            <button
              type="submit"
              className="bg-blue-500 h-10 px-3 text-white transition-colors hover:bg-blue-600"
            >
              <Search size={20} />
            </button>
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white shadow-xl border mt-1 z-50 rounded-b-lg overflow-hidden">
              {suggestions.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleSearchSubmit(null, p.title)}
                  className="p-3 border-b flex items-center gap-2 cursor-pointer hover:bg-blue-50"
                >
                  <img
                    src={`/image/${p.category}/${p.image}`}
                    className="w-8 h-8 object-contain"
                    alt=""
                  />
                  <span className="text-sm truncate">{p.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Actions */}
        <ul className="flex items-center gap-3 sm:gap-6 text-gray-700">
          <li className="hidden lg:block">
            <MegaMenu />
          </li>

          {/* User Desktop */}
          <li className="relative group hidden sm:block">
            <div
              className="cursor-pointer py-2"
              onClick={!user ? openLogin : undefined}
            >
              {user ? (
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              ) : (
                <User size={24} />
              )}
            </div>
            {user && (
              <div className="absolute right-0 top-full bg-white shadow-xl rounded-lg border w-48 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all p-2 z-50">
                <Link
                  to="/UserProfile"
                  className="block p-2 hover:bg-gray-100 rounded text-sm font-medium"
                >
                  My Profile
                </Link>
                <Link
                  to="/seller-dashboard"
                  className="block p-2 hover:bg-gray-100 rounded text-sm font-medium"
                >
                  Seller Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left p-2 hover:bg-red-50 text-red-600 rounded text-sm flex items-center gap-2 border-t mt-1"
                >
                  <LogOut size={16} /> Log Out
                </button>
              </div>
            )}
          </li>

          {/* Cart Icon */}
          <li
            className="relative cursor-pointer hover:text-blue-600 transition"
            onClick={openCart}
          >
            <ShoppingCart
              size={24}
              className={isEmpty ? "" : "text-blue-600"}
            />
            {!isEmpty && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center border-2 border-white font-bold">
                {cart.length}
              </span>
            )}
          </li>

          {/* THE SELL BUTTON (Desktop) */}
          <Link
            to="/sell"
            className="hidden md:flex items-center gap-2 bg-gray-900 text-white px-5 py-2 rounded-full font-bold hover:scale-105 transition-all text-sm shrink-0"
          >
            Sell
          </Link>

          {/* Mobile Toggle */}
          <li
            className="lg:hidden cursor-pointer z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={28} className="text-blue-600" />
            ) : (
              <Menu size={28} />
            )}
          </li>
        </ul>

        {/* --- MOBILE SIDEBAR DRAWER --- */}
        <div
          className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          className={`fixed top-0 right-0 h-full w-70 bg-white z-40 shadow-2xl transform transition-transform duration-300 lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex flex-col h-full pt-20 px-6">
            {user ? (
              <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <p className="font-bold text-sm truncate">{user.name}</p>
                  <p className="text-[10px] text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  openLogin();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold mb-6"
              >
                Login
              </button>
            )}

            <nav className="space-y-4 flex-1">
              {/* SELL BUTTON (Inside Mobile Menu) */}
              <Link
                to="/sell"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 text-lg font-bold text-blue-600 py-2 border-b"
              >
                <Package size={20} /> Sell a Product
              </Link>

              <Link
                to="/UserProfile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-semibold py-2 border-b"
              >
                Profile
              </Link>

              <button
                onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
                className="flex justify-between items-center w-full text-lg font-semibold py-2 border-b"
              >
                Categories{" "}
                {isMobileCategoryOpen ? <ChevronDown /> : <ChevronRight />}
              </button>

              {isMobileCategoryOpen && (
                <div className="pl-4 space-y-2 max-h-40 overflow-y-auto">
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      to={`/category/${cat}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-gray-500 capitalize py-1"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              )}
            </nav>

            {user && (
              <button
                onClick={handleLogout}
                className="mb-10 flex items-center gap-3 text-red-600 font-bold py-4 border-t"
              >
                <LogOut size={20} /> Logout
              </button>
            )}
          </div>
        </div>

        {/* Modals */}
        {isCartOpen && <Cart setIsOpenCart={closeCart} />}
        {isLoginOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closeLogin}
            />
            <div className="relative w-full max-w-md">
              <LogIn onClose={closeLogin} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
