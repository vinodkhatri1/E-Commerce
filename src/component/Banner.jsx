import React from "react";
import { Link } from "react-router-dom";

const banner = () => {
  return (
    <div className="p-5">
      <div className="container flex bg-[#e3edf6] h-112 w-auto">
        <div className="flex">
          <img
            className="h-112"
            src="https://shopify-xrh7.onrender.com/banner.jpg"
            alt=""
          />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold">Don't miss the offer!</h1>
          <h2 className="text-[30px] font-bold">Grab it now</h2>
          <Link to={`/products`}>
            <button className="h-12 w-32 bg-white font-bold rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default banner;
