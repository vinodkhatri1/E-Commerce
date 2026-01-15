import Stars from "./Stars";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ productdt }) => {
  const { addToCart } = useCart();
  if (!productdt) return null;

  return (
    <div className="w-full h-full bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group">
      
      {/* Image Area */}
      <div className="h-64 p-4 border-b border-gray-100 flex items-center justify-center bg-gray-50 relative overflow-hidden">
        <Link to={`/products/${productdt.id}`} className="w-full h-full flex justify-center">
          <img
            className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-110"
            src={`/image/${productdt.category}/${productdt.image}`}
            alt={productdt.title}
          />
        </Link>
        {productdt.discountPercent && (
             <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                 -{productdt.discountPercent}%
             </span>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          {productdt.category}
        </p>
        
        <Link to={`/products/${productdt.id}`}>
          <h2 className="font-bold text-gray-800 text-base mb-2 line-clamp-2 hover:text-blue-600 transition">
            {productdt.title}
          </h2>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <Stars rating={productdt.rating} />
          <span className="text-xs text-gray-500">({productdt.rating})</span>
        </div>

        {/* Price & Action - Pushed to bottom */}
        <div className="mt-auto flex justify-between items-end">
          <div>
            <p className="text-lg font-bold text-blue-600">
              ${productdt.price}
            </p>
            {productdt.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${productdt.originalPrice}
                </span>
            )}
          </div>

          <button
            className="bg-gray-100 text-gray-800 p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
            onClick={() => addToCart(productdt)}
            title="Add to Cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;