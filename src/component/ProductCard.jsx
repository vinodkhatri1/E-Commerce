import Stars from "./Stars";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ productdt }) => {
  const { addToCart } = useCart();
  if (!productdt) return null;
  return (
    <div className="h-96 w-90 m-1 border-2 border-gray-200 ">
      <div className="pl-10 border-b-2 border-b-gray-200">
        <Link to={`/products/${productdt.id}`}>
          <img
            className="h-60 transition-transform duration-200 hover:scale-110 cursor-pointer"
            src={`/image/${productdt.category}/${productdt.image}`}
            alt={productdt.title}
          />
        </Link>
      </div>
      <div className="pl-4 p-1 ">
        <p className="text-[14px] text-gray-500">{productdt.category}</p>
        <Link to={`/products/${productdt.id}`}>
          <h2 className="font-bold text-[16px] hover:underline cursor-pointer">
            {productdt.title}
          </h2>
        </Link>
        <div className="flex gap-2">
          <div className="mt-1">
            <Stars rating={productdt.rating} />
          </div>
          <p className="font-sans"> {productdt.rating}</p>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-xl text-blue-600 font-sans">
              ${productdt.price}
            </p>
            {productdt.originalPrice !== null && (
              <p className="flex gap-2">
                <span className="line-through font-sans">
                  ${productdt.originalPrice}
                </span>
                <span className="font-bold font-sans text-green-600">
                  -{productdt.discountPercent}%
                </span>
              </p>
            )}
          </div>
          <button
            className="h-8 w-12 mr-2 bg-pink-500 text-white px-4 rounded-[5px] hover:bg-blue-500 cursor-pointer"
            onClick={() => addToCart(productdt)}
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
