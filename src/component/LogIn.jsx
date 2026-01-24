import React, { useState } from "react";
import X from "lucide-react/dist/esm/icons/x";
import Mail from "lucide-react/dist/esm/icons/mail";
import Lock from "lucide-react/dist/esm/icons/lock";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import Eye from "lucide-react/dist/esm/icons/eye";
import EyeOff from "lucide-react/dist/esm/icons/eye-off";
import UserIcon from "lucide-react/dist/esm/icons/user";
import { useAuth } from "../context/AuthContext";

const LogIn = ({ onClose }) => {
  const { login } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");

    if (isSignUp) {
      const userExists = users.find((u) => u.email === email);
      if (userExists) return setError("User already exists!");

      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem("registeredUsers", JSON.stringify(users));

      login({ name, email });
      onClose();
    } else {
      const foundUser = users.find(
        (u) => u.email === email && u.password === password,
      );

      if (foundUser) {
        login({ name: foundUser.name, email: foundUser.email });
        onClose();
      } else {
        setError("Invalid email or password!");
      }
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 relative">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 transition-colors"
      >
        <X size={20} />
      </button>

      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          {isSignUp
            ? "Sign up to start selling and buying."
            : "Enter your details to sign in."}
        </p>
      </div>

      {error && (
        <p className="text-red-500 text-xs text-center mb-4 font-bold">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600 ml-1">
              FULL NAME
            </label>
            <div className="relative">
              <UserIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 border rounded-xl pl-11 pr-4 py-3 outline-none focus:border-indigo-500"
                placeholder="John Doe"
              />
            </div>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600 ml-1">
            EMAIL ADDRESS
          </label>
          <div className="relative">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border rounded-xl pl-11 pr-4 py-3 outline-none focus:border-indigo-500"
              placeholder="email@example.com"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600 ml-1">
            PASSWORD
          </label>
          <div className="relative">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border rounded-xl pl-11 pr-10 py-3 outline-none focus:border-indigo-500"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
        >
          {isSignUp ? "Sign Up" : "Sign In"} <ArrowRight size={18} />
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-sm font-bold text-indigo-600 hover:underline"
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
