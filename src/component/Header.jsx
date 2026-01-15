import logo from "../assets/logo.png";
import { User, ShoppingCart, Moon, Search, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import MegaMenu from "./MegaMenu";
import Cart from "./Cart";
import LogIn from "./LogIn";
import { useCart } from "../context/CartContext";
import ProductData from "../Data/ProductData"; // Import data for mobile menu

const Header = () => {
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [isOpenLogIn, setIsOpenLogIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);

  const { cart } = useCart();
  const isEmpty = cart.length === 0;

  // Extract categories for Mobile Menu
  const categories = [...new Set(ProductData?.map((p) => p.category) || [])];

  return (
    <div className="shadow-md sticky top-0 z-30 bg-white">
      <div className="container mx-auto h-16 sm:h-20 flex items-center justify-between px-4 sm:px-6">
        
        {/* Left: Logo */}
        <Link to="/" className="flex-shrink-0 z-40">
          <img className="h-10 sm:h-14 w-auto" src={logo} alt="Home" />
        </Link>

        {/* Center: Search Bar (Desktop/Tablet Only) */}
        <div className="hidden md:flex items-center border-2 border-blue-500 rounded-lg overflow-hidden flex-1 max-w-md mx-6">
          <input
            className="bg-white h-10 w-full px-3 outline-none"
            type="text"
            placeholder="Search products..."
          />
          <button className="bg-blue-500 h-10 w-12 flex items-center justify-center text-white hover:bg-blue-600 transition">
            <Search size={20} />
          </button>
        </div>

        {/* Right: Icons & Desktop Menu */}
        <ul className="flex items-center gap-4 sm:gap-6 text-xl font-medium text-gray-700">
          
          {/* Desktop MegaMenu (Hidden on Mobile) */}
          <div className="hidden lg:block">
            <MegaMenu />
          </div>

          <li className="cursor-pointer hover:text-blue-600 transition" onClick={() => setIsOpenLogIn(true)}>
            <User size={24} />
          </li>

          <li className="cursor-pointer relative hover:text-blue-600 transition" onClick={() => setIsOpenCart(true)}>
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

          {/* Dark Mode (Hidden on Mobile, moved to drawer) */}
          <li className="cursor-pointer hover:text-blue-600 transition hidden sm:block">
            <Moon size={24} />
          </li>

          {/* Hamburger Icon (Visible on Mobile/Tablet) */}
          <li 
            className="cursor-pointer lg:hidden z-40" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </li>
        </ul>

        {/* ============================== */}
        {/* MOBILE MENU DRAWER             */}
        {/* ============================== */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-30 bg-white pt-20 px-4 overflow-y-auto lg:hidden animate-in slide-in-from-right duration-200">
            
            {/* Mobile Search */}
            <div className="flex items-center border-2 border-blue-500 rounded-lg overflow-hidden mb-6">
              <input
                className="bg-white h-12 w-full px-3 outline-none"
                type="text"
                placeholder="Search products..."
              />
              <button className="bg-blue-500 h-12 w-14 flex items-center justify-center text-white">
                <Search size={24} />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <ul className="space-y-4 font-medium text-lg">
              
              {/* Expandable Categories */}
              <li>
                <button 
                    onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
                    className="flex items-center justify-between w-full py-2 border-b border-gray-100"
                >
                    <span className="text-xl font-bold">Categories</span>
                    {isMobileCategoryOpen ? <ChevronDown /> : <ChevronRight />}
                </button>

                {/* Dropdown list */}
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
                        <Link 
                            to="/products"
                            className="block text-blue-600 font-bold py-1"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            View All Products
                        </Link>
                    </div>
                )}
              </li>

              <li className="border-b border-gray-100 py-2">
                 <button className="flex items-center gap-3 w-full" onClick={() => console.log("Toggle Dark Mode")}>
                    <Moon size={20} />
                    <span>Dark Mode</span>
                 </button>
              </li>

              <li className="py-2">
                <button 
                    onClick={() => { setIsOpenLogIn(true); setIsMobileMenuOpen(false); }}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold"
                >
                    Login / Register
                </button>
              </li>
            </ul>
          </div>
        )}

        {/* Modals */}
        {isOpenCart && <Cart setIsOpenCart={setIsOpenCart} />}

        {isOpenLogIn && (
          <>
            <div
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
              onClick={() => setIsOpenLogIn(false)}
            />
            <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4">
                 <LogIn />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;