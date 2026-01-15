import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuItems } from "./MenuItems";

const MegaMenu = () => {
  return (
    <nav className="my-10">
      <ul className="flex space-x-6">
        {MenuItems.map((menu, index) => (
          <MenuItem key={index} menu={menu} />
        ))}
      </ul>
    </nav>
  );
};

const MenuItem = ({ menu }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        to={menu.title === "Products" ? "/products" : "/categories"}
        className="font-semibold py-2 "
      >
        {menu.title}
      </Link>

      {menu.submenu.length > 0 && isOpen && (
        <div className="absolute left-0 top-full mt-2 bg-white shadow-lg border z-10 flex flex-col space-y-2 p-3 w-56">
          {menu.submenu.map((sub, i) => (
            <SubMenuItem key={i} sub={sub} />
          ))}
        </div>
      )}
    </li>
  );
};

const SubMenuItem = ({ sub }) => {
  const [isSubOpen, setIsSubOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsSubOpen(true)}
      onMouseLeave={() => setIsSubOpen(false)}
    >
      <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer font-medium">
        <Link to={`/category/${sub.title.toLowerCase()}`}>{sub.title}</Link>
      </div>

      {sub.submenu && isSubOpen && (
        <ul className="absolute right-full top-0 ml-2 bg-white shadow-lg border w-64 p-2">
          {sub.submenu.map((item, j) => (
            <li
              key={j}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MegaMenu;
