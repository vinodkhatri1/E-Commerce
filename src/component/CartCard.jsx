import { CirclePlus, CircleMinus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

const CartCard = ({ item }) => {
  const { addToCart, removeFromCart, decreaseQuantity } = useCart();

  return (
    <div className="flex items-center gap-3 border border-gray-200 rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="h-20 w-20 shrink-0 bg-gray-50 rounded-md overflow-hidden p-1 flex items-center justify-center">
        <img
          className="h-full w-full object-contain"
          src={`/image/${item.category}/${item.image}`}
          alt={item.title}
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h5 className="font-bold text-sm text-gray-800 truncate pr-2">
          {item.title}
        </h5>
        <p className="font-bold text-blue-600 mt-1">${item.price}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => decreaseQuantity(item.id)}
            className="text-gray-500 hover:text-blue-600 transition-colors"
          >
            <CircleMinus size={20} />
          </button>

          <span className="font-semibold text-sm w-4 text-center">
            {item.quantity}
          </span>

          <button
            onClick={() => addToCart(item)}
            className="text-gray-500 hover:text-blue-600 transition-colors"
          >
            <CirclePlus size={20} />
          </button>
        </div>
      </div>

      {/* Delete Button */}
      <div className="flex items-center pl-2 border-l border-gray-100">
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-gray-400 hover:text-red-500 p-2 transition-colors"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartCard;
