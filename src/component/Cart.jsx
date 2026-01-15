import { X } from "lucide-react";
import CartCard from "./CartCard";
import EmptyBaskat from "../assets/EmptyCart.png";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";

const Cart = ({ setIsOpenCart }) => {
  const { cart } = useCart();
  const emptyCart = cart.length === 0;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed top-0 right-0 z-10 w-96 h-screen bg-white overflow-auto">
      <div className="h-18 flex justify-between items-center mx-4">
        <h1 className="text-2xl font-medium">Your Cart</h1>
        <button onClick={() => setIsOpenCart(false)}>
          <X size={32} />
        </button>
      </div>

      {emptyCart ? (
        <div className="flex flex-col justify-center items-center p-4">
          <img className="h-48" src={EmptyBaskat} alt="EmptyCart" />
          <h1>Your cart is empty</h1>
        </div>
      ) : (
        <div className="mx-4">
          {cart.map((item) => (
            <CartCard key={item.id} item={item} />
          ))}

          <div className="flex justify-between mx-4 mb-4 text-2xl font-bold">
            <h1>Total</h1>
            <h1>${total.toFixed(2)}</h1>
          </div>

          <button className="bg-blue-500 h-12 w-full my-5 text-white font-bold">
            CHECKOUT
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
