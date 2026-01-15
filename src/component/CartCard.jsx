import { CirclePlus, CircleMinus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

const CartCard = ({ item }) => {
  const { addToCart, removeFromCart, decreaseQuantity } = useCart();

  return (
    <div className="flex gap-1 justify-between border-2 border-gray-200 mt-3 p-2">
      <img
        className="h-20"
        src={`/image/${item.category}/${item.image}`}
        alt={item.title}
      />

      <div className="w-32">
        <h5 className="font-bold text-sm">{item.title}</h5>
        <p className="font-bold">${item.price}</p>

        <div className="flex gap-2 items-center">
          <CircleMinus
            size={16}
            className="cursor-pointer"
            onClick={() => decreaseQuantity(item.id)}
          />
          {item.quantity}
          <CirclePlus
            size={16}
            className="cursor-pointer"
            onClick={() => addToCart(item)}
          />
        </div>
      </div>

      <div className="flex items-center">
        <Trash2
          className="text-red-600 cursor-pointer"
          onClick={() => removeFromCart(item.id)}
        />
      </div>
    </div>
  );
};

export default CartCard;
