import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="p-4 sm:p-5">
      <div className="container mx-auto flex flex-col-reverse md:flex-row bg-[#e3edf6] min-h-100 w-full rounded-xl overflow-hidden">
        <div className="w-full md:w-1/2 flex relative">
          <img
            className="w-full h-64 md:h-auto object-cover md:object-center"
            src="https://shopify-xrh7.onrender.com/banner.jpg"
            alt="Promotion Banner"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center p-8 md:p-12 gap-4">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
            Don't miss the offer!
          </h1>
          <h2 className="text-xl md:text-[30px] font-bold text-gray-600">
            Grab it now
          </h2>
          <Link to={`/products`}>
            <button className="h-12 w-36 bg-white font-bold rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition-colors duration-300">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
