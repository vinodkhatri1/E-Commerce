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
  Settings,
  Package,
  CreditCard
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import MegaMenu from "./MegaMenu";
import Cart from "./Cart";
import LogIn from "./LogIn";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import ProductData from "../Data/ProductData";

const Header = () => {
  // --- Global Auth State ---
  const { user, isLoginOpen, openLogin, closeLogin, logout } = useAuth();

  // --- Local States ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);

  // Search & Recommendation States
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef(null);
  const { cart, isCartOpen, openCart, closeCart } = useCart();
  const isEmpty = cart.length === 0;

  const categories = [...new Set(ProductData?.map((p) => p.category) || [])];

  // --- Handle Logout with Redirect ---
  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to Home after logout
  };

  // --- Search Logic ---
  useEffect(() => {
    if (searchTerm.trim().length > 1) {
      const filtered = ProductData.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 6);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e, selectedTerm) => {
    if (e) e.preventDefault();
    const termToSearch = selectedTerm || searchTerm;
    if (termToSearch.trim()) {
      navigate(`/search?q=${termToSearch}`);
      setShowSuggestions(false);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="shadow-md sticky top-0 z-30 bg-white">
      <div className="container mx-auto h-16 sm:h-20 flex items-center justify-between px-4 sm:px-6">
        
        {/* Left: Logo */}
        <Link to="/" className="shrink-0 z-40">
          <img className="h-10 sm:h-14 w-auto" src={logo} alt="Home" />
        </Link>

        {/* Center: Search Bar */}
        <div className="relative flex-1 max-w-md mx-2 md:mx-6" ref={searchRef}>
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center border-2 border-blue-500 rounded-lg overflow-hidden"
          >
            <input
              className="bg-white h-10 w-full px-3 outline-none text-sm md:text-base"
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => searchTerm.length > 1 && setShowSuggestions(true)}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
            <button
              type="submit"
              className="bg-blue-500 h-10 w-10 md:w-12 flex items-center justify-center text-white hover:bg-blue-600 transition shrink-0"
            >
              <Search size={20} />
            </button>
          </form>

          {/* Recommendations */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white shadow-2xl rounded-b-lg border border-gray-200 z-50 overflow-hidden mt-1">
              {/* ... (Existing Recommendation Code) ... */}
              {suggestions.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-3 hover:bg-blue-50 cursor-pointer transition border-b border-gray-50 last:border-none"
                  onClick={() => {
                    setSearchTerm(product.title);
                    handleSearchSubmit(null, product.title);
                  }}
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
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Icons & Desktop Menu */}
        <ul className="flex items-center gap-4 sm:gap-6 text-xl font-medium text-gray-700">
          <div className="hidden lg:block">
            <MegaMenu />
          </div>

          {/* --- USER ACCOUNT DROPDOWN --- */}
          {/* We use 'group' on the LI to handle hover state */}
          <li className="relative group z-40">
            <div 
              className="cursor-pointer hover:text-blue-600 transition py-2" // Added py-2 to help bridge gap
              onClick={!user ? openLogin : undefined}
            >
              {user ? (
                <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-blue-500 text-white rounded-full flex items-center justify-center font-bold shadow-md ring-2 ring-white ring-offset-2 ring-offset-gray-50">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              ) : (
                <User size={24} />
              )}
            </div>

            {/* The Dropdown Menu */}
            {user && (
              <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                <div className="w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  
                  {/* Menu Header (User Info) */}
                  <div className="p-4 bg-gray-50/50 border-b border-gray-100">
                    <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>

                  {/* Menu Links */}
                  <div className="p-2 space-y-1">
                    <Link to="/profile" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition-colors">
                      <User size={18} /> My Profile
                    </Link>
                    <Link to="/orders" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition-colors">
                      <Package size={18} /> Orders
                    </Link>
                    <Link to="/settings" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition-colors">
                      <Settings size={18} /> Settings
                    </Link>
                  </div>

                  {/* Menu Footer (Logout) */}
                  <div className="p-2 border-t border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                    >
                      <LogOut size={18} /> Log Out
                    </button>
                  </div>

                </div>
              </div>
            )}
          </li>

          {/* Cart Icon */}
          <li
            className="cursor-pointer relative hover:text-blue-600 transition"
            onClick={openCart}
          >
            <ShoppingCart
              size={24}
              className={isEmpty ? "" : "text-blue-600"}
            />
            {!isEmpty && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                {cart.length}
              </span>
            )}
          </li>

          <Link
            to="/sell"
            className="hidden md:flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full font-bold ml-2 hover:bg-black hover:scale-105 transition-all shadow-lg shadow-gray-900/20 text-sm"
          >
            <span>Sell</span>
          </Link>

          <li className="cursor-pointer hover:text-blue-600 transition hidden sm:block">
            <Moon size={24} />
          </li>

          {/* Hamburger Icon */}
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
              
              {/* ... (Categories Mobile Logic) ... */}
              <li>
                 <button
                  onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
                  className="flex items-center justify-between w-full py-2 border-b border-gray-100"
                >
                  <span className="text-xl font-bold">Categories</span>
                  {isMobileCategoryOpen ? <ChevronDown /> : <ChevronRight />}
                </button>
                {/* ... Mobile Submenu ... */}
              </li>

              <li className="border-b border-gray-100 py-2">
                <button className="flex items-center gap-3 w-full">
                  <Moon size={20} />
                  <span>Dark Mode</span>
                </button>
              </li>

              {/* Mobile Auth Section */}
              <li className="pt-4">
                {user ? (
                   <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                           <p className="font-bold text-gray-900">{user.name}</p>
                           <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <Link to="/profile" className="block text-gray-600" onClick={()=>setIsMobileMenuOpen(false)}>My Profile</Link>
                      <Link to="/orders" className="block text-gray-600" onClick={()=>setIsMobileMenuOpen(false)}>My Orders</Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full mt-4 bg-white border border-gray-200 text-red-600 py-2 rounded-lg font-bold flex items-center justify-center gap-2"
                      >
                        <LogOut size={18} /> Log Out
                      </button>
                   </div>
                ) : (
                   <button
                     onClick={() => {
                       openLogin();
                       setIsMobileMenuOpen(false);
                     }}
                     className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold shadow-lg shadow-blue-200"
                   >
                     Login / Register
                   </button>
                )}
              </li>
            </ul>
          </div>
        )}

        {/* Cart Overlay */}
        {isCartOpen && <Cart setIsOpenCart={closeCart} />}

        {/* Login Modal */}
        {isLoginOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
              onClick={closeLogin}
            />
            <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4">
              <LogIn onClose={closeLogin} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;