import React from "react";
import { LockKeyholeOpen, CircleUserRound, KeyRound } from "lucide-react";

const LogIn = () => {
  return (
    <div className="fixed z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white h-60 w-96 flex items-center justify-center rounded-lg">
      <div className="flex flex-col gap-4 w-full px-6">
        <div className="flex items-center justify-center gap-2 text-xl font-semibold">
          <LockKeyholeOpen />
          Login
          <LockKeyholeOpen />
        </div>
        <div className="flex items-center bg-white outline-2 outline-black w-full rounded px-2">
          <label htmlFor="user" className="mr-2">
            <CircleUserRound />
          </label>
          <input
            id="user"
            type="text"
            className="h-10 w-full outline-none"
            placeholder="Username"
          />
        </div>
        <div className="flex items-center bg-white outline-2 outline-black w-full rounded px-2">
          <label htmlFor="pass" className="mr-2">
            <KeyRound />
          </label>
          <input
            id="pass"
            type="password"
            className="h-10 w-full outline-none"
            placeholder="Password"
          />
        </div>
        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          LogIn
        </button>
      </div>
    </div>
  );
};

export default LogIn;
