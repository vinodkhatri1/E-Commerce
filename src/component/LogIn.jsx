import React, { useState, useEffect } from "react";
import {
  X,
  Mail,
  Lock,
  User,
  MapPin,
  Home,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const LogIn = ({ onClose }) => {
  const { login } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState("buyer");

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (
      formData.email === "admin@shop.com" &&
      formData.password === "admin123"
    ) {
      return login({ ...formData, role: "admin", name: "Global Admin" });
    }

    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");

    if (isSignUp) {
      if (users.find((u) => u.email === formData.email)) {
        return setError("This email is already registered.");
      }

      const newUser = {
        ...formData,
        role,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
      };

      users.push(newUser);
      localStorage.setItem("registeredUsers", JSON.stringify(users));
      login(newUser);
    } else {
      const foundUser = users.find(
        (u) => u.email === formData.email && u.password === formData.password,
      );
      if (foundUser) login(foundUser);
      else setError("Invalid email or password.");
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
      <div className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-slate-900">
              {isSignUp ? "Join Us" : "Welcome Back"}
            </h2>
            <button
              onClick={onClose}
              className="text-slate-300 hover:text-slate-600"
            >
              <X size={20} />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-50 text-rose-600 text-[10px] font-black uppercase rounded-xl border border-rose-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {isSignUp && (
              <>
                <div className="flex p-1.5 bg-slate-100 rounded-2xl mb-4">
                  {["buyer", "seller"].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`flex-1 py-2 text-[10px] font-black uppercase rounded-xl transition-all ${role === r ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400"}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <CompactInput
                    name="firstName"
                    placeholder="First"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    icon={<User size={14} />}
                  />
                  <CompactInput
                    name="lastName"
                    placeholder="Last"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    icon={<User size={14} />}
                  />
                </div>
              </>
            )}

            <CompactInput
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              icon={<Mail size={14} />}
            />

            <div className="relative">
              <CompactInput
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                icon={<Lock size={14} />}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {isSignUp && (
              <div className="space-y-3 pt-1 animate-in fade-in">
                <CompactInput
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  icon={<Home size={14} />}
                />
                <div className="flex gap-3">
                  <CompactInput
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    icon={<MapPin size={14} />}
                  />
                  <CompactInput
                    name="zipCode"
                    placeholder="ZIP"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    icon={<MapPin size={14} />}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 mt-4 active:scale-95"
            >
              {isSignUp ? "Create Account" : "Sign In"} <ArrowRight size={16} />
            </button>
          </form>

          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
            }}
            className="w-full mt-8 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600"
          >
            {isSignUp
              ? "Already a member? Sign In"
              : "New here? Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

const CompactInput = ({ icon, ...props }) => (
  <div className="relative flex-1">
    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300">
      {icon}
    </div>
    <input
      required
      {...props}
      className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-3 text-xs font-bold focus:bg-white focus:border-indigo-500 outline-none transition-all"
    />
  </div>
);

export default LogIn;
