import logo from "../assets/logo.png";
import { User, ShoppingCart, Moon, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import MegaMenu from "./MegaMenu";
import Cart from "./Cart";
import LogIn from "./LogIn";
import { useCart } from "../context/CartContext";

const Header = () => {
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [isOpenLogIn, setIsOpenLogIn] = useState(false);

  const { cart } = useCart();
  const isEmpty = cart.length === 0;

  return (
    <div className="shadow-xl sticky top-0 z-20">
      <div className="bg-white h-20 flex items-center justify-between p-6">
        <Link to="/">
          <img className="h-14" src={logo} alt="Home" />
        </Link>

        <div className="flex items-center border-2 border-blue-500 rounded-sm">
          <input
            className="bg-white h-11 w-64 px-3"
            type="text"
            placeholder="Search"
          />
          <button className="bg-blue-500 h-11 w-14 text-white pl-3">
            <Search size={32} />
          </button>
        </div>

        <ul className="flex items-center text-xl gap-12 font-medium">
          <MegaMenu />

          <li className="cursor-pointer" onClick={() => setIsOpenLogIn(true)}>
            <User />
          </li>

          <li className="cursor-pointer" onClick={() => setIsOpenCart(true)}>
            <ShoppingCart
              className={
                isEmpty ? "text-red-600" : "text-red-500 fill-red-600 "
              }
            />
          </li>

          <li className="cursor-pointer">
            <Moon />
          </li>
        </ul>

        {isOpenCart && (
          <>
            <div
              className="fixed inset-0 bg-black/60 z-10"
              onClick={() => setIsOpenCart(false)}
            />
            <Cart setIsOpenCart={setIsOpenCart} />
          </>
        )}

        {isOpenLogIn && (
          <>
            <div
              className="fixed inset-0 bg-black/60 z-10"
              onClick={() => setIsOpenLogIn(false)}
            />
            <LogIn />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
