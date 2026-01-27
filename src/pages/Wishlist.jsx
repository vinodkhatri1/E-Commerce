import React from "react";
import { Link } from "react-router-dom";
import Heart from "lucide-react/dist/esm/icons/heart";
import Trash2 from "lucide-react/dist/esm/icons/trash-2";
import ShoppingBag from "lucide-react/dist/esm/icons/shopping-bag";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import ChevronLeft from "lucide-react/dist/esm/icons/chevron-left";
import { useCart } from "../context/CartContext";

const Wishlist = () => {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="w-20 h-20 bg-pink-50 text-pink-300 rounded-full flex items-center justify-center mb-6">
          <Heart size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Your wishlist is empty
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Save items you love to find them easily later.
        </p>
        <Link
          to="/shop"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
        >
          Continue Shopping <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <Link
          to="/shop"
          className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1 mb-4"
        >
          <ChevronLeft size={16} /> Back to Shop
        </Link>
        <h1 className="text-4xl font-black text-gray-900 flex items-center gap-3">
          My Wishlist{" "}
          <span className="text-lg font-normal text-gray-400">
            ({wishlist.length} items)
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
          >
            <div className="relative aspect-square bg-gray-50 p-6 flex items-center justify-center">
              <img
                src={
                  product.image?.startsWith("data:")
                    ? product.image
                    : `/image/${product.category}/${product.image}`
                }
                alt={product.title}
                className="h-full w-auto object-contain group-hover:scale-110 transition-transform"
              />
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="p-5">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">
                {product.category}
              </p>
              <h3 className="font-bold text-gray-800 line-clamp-1 mb-4">
                {product.title}
              </h3>

              <div className="flex items-center justify-between">
                <span className="text-xl font-black text-gray-900">
                  ${product.price}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-gray-900 text-white p-3 rounded-xl hover:bg-blue-600 transition-colors"
                  title="Add to Cart"
                >
                  <ShoppingBag size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
