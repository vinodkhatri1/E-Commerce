import X from "lucide-react/dist/esm/icons/x";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import Lock from "lucide-react/dist/esm/icons/lock";
import CartCard from "./CartCard";
import EmptyBaskat from "../assets/EmptyCart.png";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = ({ setIsOpenCart }) => {
  const { cart } = useCart();
  const { user, openLogin } = useAuth();
  const navigate = useNavigate();
  const emptyCart = cart.length === 0;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 25;
  const total = (subtotal + shipping).toFixed(2);

  const handleCheckout = () => {
    if (!user) {
      setIsOpenCart(false);
      openLogin();
      return;
    }
    setIsOpenCart(false);
    navigate("/checkout");
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-100 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpenCart(false)}
      />

      <div className="fixed top-0 right-0 z-110 w-full sm:w-112.5 h-screen bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-gray-100">
        <div className="h-20 flex justify-between items-center px-8 border-b border-gray-100">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-sm text-gray-500 font-medium mt-0.5">
              {cart.length} {cart.length === 1 ? "Item" : "Items"}
            </p>
          </div>
          <button
            onClick={() => setIsOpenCart(false)}
            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-50/50">
          {emptyCart ? (
            <div className="flex flex-col justify-center items-center h-full p-8 text-center">
              <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                <img
                  className="w-24 opacity-50"
                  src={EmptyBaskat}
                  alt="EmptyCart"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-500 max-w-62.5 mx-auto leading-relaxed">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link to="/products">
                <button
                  onClick={() => setIsOpenCart(false)}
                  className="mt-8 px-8 py-3 bg-gray-900 text-white rounded-full font-bold shadow-lg hover:bg-black transition-all hover:-translate-y-1"
                >
                  Start Shopping
                </button>
              </Link>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {cart.map((item) => (
                <CartCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {!emptyCart && (
          <div className="border-t border-gray-100 p-8 bg-white">
            <div className="space-y-3 mb-8">
              <div className="flex justify-between items-center text-gray-600">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold text-gray-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span className="font-medium">Shipping</span>
                <span
                  className={`font-bold ${shipping === 0 ? "text-green-600" : "text-gray-900"}`}
                >
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold text-gray-900 pt-4 border-t border-gray-50">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-indigo-600 h-14 rounded-xl text-white font-bold text-lg hover:bg-indigo-700 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 shadow-xl shadow-indigo-200"
            >
              {user ? (
                <>
                  Checkout Now <ArrowRight size={20} />
                </>
              ) : (
                <>
                  Login to Checkout <Lock size={18} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
