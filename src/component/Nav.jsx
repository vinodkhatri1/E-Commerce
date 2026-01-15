import { Link } from "react-router-dom";
import Laptop from "../assets/Laptop.png";
const Nav = () => {
  return (
    <div className="bg-[#e3edf6]">
      <div className="container flex justify-between items-center py-6 ">
        <div className="flex flex-col gap-4 pl-8">
          <h3 className="text-shadow-lg font-medium text-red-600 text-shadow-amber-500">
            Hot Sale
          </h3>
          <h1 className="text-5xl font-bold ">
            The best notebook <br />
            collection 2025
          </h1>
          <h2 className="text-xl font-medium ">
            Exclusive offer <span className="text-red-600 font-sans">-50%</span>{" "}
            off this week
          </h2>
          <Link to={`/category/laptops`}>
            <button className="bg-white rounded-md h-12 w-64 font-medium hover:bg-blue-600 hover:text-white cursor-pointer">
              Grab the opportunity Now
            </button>
          </Link>
        </div>
        <div>
          <img className="" src={Laptop} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Nav;
