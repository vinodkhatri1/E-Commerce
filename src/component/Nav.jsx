import { Link } from "react-router-dom";
import Laptop from "../assets/Laptop.png";

const Nav = () => {
  return (
    <div className="bg-[#e3edf6] w-full">
      <div className="container mx-auto px-4 py-8 sm:py-12 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
        
        {/* Text Content */}
        <div className="flex flex-col gap-4 text-center md:text-left items-center md:items-start max-w-xl">
          <h3 className="font-medium text-red-600 text-lg uppercase tracking-wide">
            Hot Sale
          </h3>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
            The best notebook <br className="hidden sm:block" />
            collection 2025
          </h1>
          <h2 className="text-lg sm:text-xl font-medium text-gray-600">
            Exclusive offer <span className="text-red-600 font-bold">-50%</span>{" "}
            off this week
          </h2>
          <Link to={`/category/laptops`}>
            <button className="bg-white text-gray-900 rounded-lg h-12 px-8 font-bold shadow-sm hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
              Shop Now
            </button>
          </Link>
        </div>

        {/* Image */}
        <div className="w-full max-w-md md:max-w-lg">
          <img className="w-full h-auto object-contain drop-shadow-xl" src={Laptop} alt="Laptop Banner" />
        </div>
      </div>
    </div>
  );
};

export default Nav;