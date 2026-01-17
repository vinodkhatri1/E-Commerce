import React from "react";
import { LockKeyholeOpen, CircleUserRound, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate

// 2. Accept 'onClose' as a prop from the parent component
const LogIn = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // A. Close the popup first (if the function exists)
    if (onClose) {
      onClose();
    }
    
    // B. Then navigate to Home
    navigate("/");
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
      <div className="p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
            <LockKeyholeOpen size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition">
            <CircleUserRound className="text-gray-400 mr-2" />
            <input
              id="user"
              type="text"
              className="w-full outline-none text-gray-700"
              placeholder="Username"
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition">
            <KeyRound className="text-gray-400 mr-2" />
            <input
              id="pass"
              type="password"
              className="w-full outline-none text-gray-700"
              placeholder="Password"
            />
          </div>

          {/* 3. Changed from Link to Button with onClick handler */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition active:scale-95 flex items-center justify-center"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;