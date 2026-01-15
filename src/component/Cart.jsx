import { X } from "lucide-react";
import CartCard from "./CartCard";
import EmptyBaskat from "../assets/EmptyCart.png";
import { useCart } from "../context/CartContext";
// Removed unused useEffect import

const Cart = ({ setIsOpenCart }) => {
  const { cart } = useCart();
  const emptyCart = cart.length === 0;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay to dim background (optional but recommended) */}
      <div 
        className="fixed inset-0 bg-black/50 z-10" 
        onClick={() => setIsOpenCart(false)} 
      />

      {/* Main Cart Drawer */}
      <div className="fixed top-0 right-0 z-20 w-full sm:w-96 h-screen bg-white shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="h-16 flex justify-between items-center px-6 border-b">
          <h1 className="text-xl font-bold">Your Cart ({cart.length})</h1>
          <button 
            onClick={() => setIsOpenCart(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {emptyCart ? (
            <div className="flex flex-col justify-center items-center h-full p-6 text-center">
              <img className="w-48 mb-4 opacity-80" src={EmptyBaskat} alt="EmptyCart" />
              <h2 className="text-xl font-semibold text-gray-700">Your cart is empty</h2>
              <p className="text-gray-500 mt-2">Looks like you haven't added anything yet.</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {cart.map((item) => (
                <CartCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer Section (Total + Checkout) - Fixed at bottom */}
        {!emptyCart && (
          <div className="border-t p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-600">Total</span>
              <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
            </div>

            <button className="w-full bg-blue-600 h-12 rounded-lg text-white font-bold hover:bg-blue-700 transition-colors active:scale-95">
              CHECKOUT
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;