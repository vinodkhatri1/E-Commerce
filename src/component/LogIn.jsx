import React, { useState } from "react";
import { 
  X, 
  Mail, 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff,
  Github 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 1. Import the Context Hook

const LogIn = ({ onClose }) => {
  const { login } = useAuth(); // 2. Get the login function from Context
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  // Local state for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // 3. Create mock user data (In a real app, this comes from an API)
    const mockUserData = { 
      name: "Demo User", 
      email: email || "user@example.com" 
    };

    // 4. Update Global Auth State
    login(mockUserData);
    
    // Note: We usually don't need 'navigate("/")' here if we want the user 
    // to stay on the Product Page to finish buying. 
    // But if you WANT to force them to Home, uncomment the next line:
    // navigate("/"); 
  };

  return (
    <div className="w-full max-w-100 bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 relative overflow-hidden">
      
      {/* Close Button (X) */}
      <button 
        onClick={onClose} 
        className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 transition-colors p-2 hover:bg-gray-50 rounded-full"
      >
        <X size={20} strokeWidth={2} />
      </button>

      {/* Header */}
      <div className="mb-8 text-center">
        <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Lock size={24} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm text-gray-500 mt-2 font-medium">
          Please enter your details to sign in.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-5">
        
        {/* Email Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-600 ml-1 uppercase tracking-wide">Email</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
              <Mail size={18} />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl pl-11 pr-4 py-3.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium placeholder:text-gray-400"
              placeholder="name@company.com"
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center ml-1">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">Password</label>
            <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline">
              Forgot?
            </a>
          </div>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
              <Lock size={18} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl pl-11 pr-10 py-3.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium placeholder:text-gray-400"
              placeholder="••••••••"
              required
            />
            {/* Password Toggle Eye */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Primary Button */}
        <button 
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          Sign In
          <ArrowRight size={18} strokeWidth={2.5} />
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-400 font-bold tracking-wider">Or continue with</span>
        </div>
      </div>

      {/* Social Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 h-11 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-medium text-sm text-gray-700 shadow-sm">
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>
        <button className="flex items-center justify-center gap-2 h-11 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-medium text-sm text-gray-700 shadow-sm">
          <Github size={18} />
          GitHub
        </button>
      </div>

    </div>
  );
};

export default LogIn;