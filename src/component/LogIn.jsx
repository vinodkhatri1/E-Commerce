import React from "react";
import { LockKeyholeOpen, CircleUserRound, KeyRound } from "lucide-react";

const LogIn = () => {
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
          <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition active:scale-95">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;