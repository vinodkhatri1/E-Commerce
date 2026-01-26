import React, { useState } from "react";
import {
  X,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  User as UserIcon,
  MapPin,
  Home,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const LogIn = ({ onClose }) => {
  const { login } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");

    if (isSignUp) {
      // Check if user already exists
      if (users.find((u) => u.email === formData.email)) {
        return setError("User already exists!");
      }

      // Save user to registry
      users.push(formData);
      localStorage.setItem("registeredUsers", JSON.stringify(users));

      // Create address object compatible with UserProfile and Checkout components
      const addressData = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        zip: formData.zipCode, // Mapped to 'zip' to match UserProfile.jsx state
      };

      // Store specifically for auto-fill functionality
      localStorage.setItem(
        `address_${formData.email}`,
        JSON.stringify(addressData),
      );

      login({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
      });
      onClose();
    } else {
      // Standard Login Logic
      const foundUser = users.find(
        (u) => u.email === formData.email && u.password === formData.password,
      );

      if (foundUser) {
        login({
          name: `${foundUser.firstName} ${foundUser.lastName}`,
          email: foundUser.email,
        });
        onClose();
      } else {
        setError("Invalid email or password!");
      }
    }
  };

  return (
    <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 relative max-h-[90vh] overflow-y-auto">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 transition-colors"
      >
        <X size={20} />
      </button>

      <div className="mb-6 text-center">
        <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight italic">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">
          {isSignUp
            ? "Join us to start shopping"
            : "Enter your details to sign in"}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 text-[10px] font-black uppercase tracking-widest p-3 rounded-xl text-center mb-6 border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Auth Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 md:col-span-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-11 pr-4 py-3 text-sm font-bold focus:border-indigo-500 outline-none transition-all"
                placeholder="email@example.com"
              />
            </div>
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-11 pr-12 py-3 text-sm font-bold focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Profile & Shipping Info (Only shown during Sign Up) */}
        {isSignUp && (
          <div className="pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                First Name
              </label>
              <input
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:border-indigo-500 outline-none"
                placeholder="Alex"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Last Name
              </label>
              <input
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:border-indigo-500 outline-none"
                placeholder="Doe"
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Shipping Address
              </label>
              <div className="relative">
                <Home
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-11 pr-4 py-3 text-sm font-bold focus:border-indigo-500 outline-none"
                  placeholder="123 Street Name"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                City
              </label>
              <input
                name="city"
                required
                value={formData.city}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:border-indigo-500 outline-none"
                placeholder="New York"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                ZIP Code
              </label>
              <input
                name="zipCode"
                required
                value={formData.zipCode}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:border-indigo-500 outline-none"
                placeholder="10001"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black text-sm flex items-center justify-center gap-3 hover:bg-indigo-500 transition-all uppercase tracking-widest shadow-lg shadow-indigo-600/20 mt-4"
        >
          {isSignUp ? "Create Account" : "Sign In"} <ArrowRight size={18} />
        </button>
      </form>

      <div className="mt-8 text-center border-t border-gray-50 pt-6">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-colors"
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "New here? Create an account"}
        </button>
      </div>
    </div>
  );
};

export default LogIn;
