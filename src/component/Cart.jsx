import { X, ArrowRight } from "lucide-react";
import CartCard from "./CartCard";
import EmptyBaskat from "../assets/EmptyCart.png";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const Cart = ({ setIsOpenCart }) => {
  const { cart } = useCart();
  const navigate = useNavigate(); // Initialize navigation
  const emptyCart = cart.length === 0;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Function to handle checkout button click
  const handleCheckout = () => {
    setIsOpenCart(false); // Close the cart drawer
    navigate("/checkout"); // Navigate to the checkout page
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={() => setIsOpenCart(false)}
      />

      {/* Main Cart Drawer */}
      <div className="fixed top-0 right-0 z-50 w-full sm:w-96 h-screen bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="h-16 flex justify-between items-center px-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">
            Your Cart ({cart.length})
          </h1>
          <button
            onClick={() => setIsOpenCart(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {emptyCart ? (
            <div className="flex flex-col justify-center items-center h-full p-6 text-center">
              <img
                className="w-48 mb-4 opacity-80"
                src={EmptyBaskat}
                alt="EmptyCart"
              />
              <h2 className="text-xl font-semibold text-gray-700">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mt-2">
                Looks like you haven't added anything yet.
              </p>
              <Link to="/products">
                <button
                  onClick={() => setIsOpenCart(false)}
                  className="mt-6 text-blue-600 font-bold hover:underline"
                >
                  Start Shopping
                </button>
              </Link>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {cart.map((item) => (
                <CartCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer Section */}
        {!emptyCart && (
          <div className="border-t p-6 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="text-2xl font-bold text-gray-900">
                ${total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 h-14 rounded-xl text-white font-bold text-lg hover:bg-blue-700 transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
            >
              Checkout Now
              <ArrowRight size={20} />
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">
              Shipping & taxes calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
