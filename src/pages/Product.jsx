import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../component/ProductCard";
import ReviewComments from "../component/ReviewComments";
import Stars from "../component/Stars";
import ShoppingCart from "lucide-react/dist/esm/icons/shopping-cart";
import CreditCard from "lucide-react/dist/esm/icons/credit-card";
import Heart from "lucide-react/dist/esm/icons/heart";
import ProductImege from "../component/ProductImege";
import ProductData from "../Data/ProductData";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Product = () => {
  const { id } = useParams();
  const { addToCart, openCart, toggleWishlist, isInWishlist } = useCart();
  const { user, openLogin } = useAuth();

  const product = ProductData.find((p) => p.id === Number(id));
  const [image, setImage] = useState("");

  const activeWishlist = product ? isInWishlist(product.id) : false;

  const handleBuyNow = () => {
    if (!user) {
      openLogin();
      return;
    }
    addToCart(product);
    openCart();
  };

  useEffect(() => {
    if (product) {
      setImage(product.image);
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  if (!product)
    return (
      <div className="p-10 text-center text-xl text-red-500 font-bold">
        Product not found
      </div>
    );

  const pic = [product.image];

  const similarProducts = ProductData.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 border-b border-gray-200 pb-12">
        {/* Left: Images */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <div className="w-full max-w-lg aspect-square bg-white border border-gray-100 rounded-2xl overflow-hidden mb-4 flex items-center justify-center p-6 shadow-sm">
            <img
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
              src={image}
              alt={product.title}
            />
          </div>
          <ProductImege pic={pic} setImage={setImage} />
        </div>

        {/* Right: Details */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
            {product.title}
          </h2>

          <div className="flex items-center gap-3 mb-6">
            <Stars rating={product.rating} />
            <span className="text-sm font-semibold text-slate-500">
              ({product.rating} Rating)
            </span>
          </div>

          <div className="mb-8">
            <p className="text-4xl font-black text-blue-600">
              ${product.price}
            </p>
            {product.originalPrice && (
              <p className="flex items-center gap-2 text-sm mt-1">
                <span className="line-through text-slate-400 font-medium">
                  ${product.originalPrice}
                </span>
                <span className="font-black text-green-600 bg-green-50 px-2 py-0.5 rounded uppercase text-[10px]">
                  -{product.discountPercent}% Off
                </span>
              </p>
            )}
          </div>

          {/* Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 mb-8 text-slate-700">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-400 text-sm uppercase w-20">
                Brand:
              </span>
              <span className="font-bold">{product.brand}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-400 text-sm uppercase w-20">
                Category:
              </span>
              <span className="font-bold capitalize">{product.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-400 text-sm uppercase w-20">
                Stock:
              </span>
              <span
                className={`font-bold ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>

          <div className="mb-10">
            <h4 className="font-black text-slate-900 mb-2 uppercase text-xs tracking-widest">
              About the product
            </h4>
            <p className="text-slate-600 leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-auto">
            <button
              className="flex-1 min-w-40 h-14 bg-blue-600 text-white hover:bg-slate-900 rounded-2xl transition-all flex items-center justify-center gap-2 font-black uppercase text-xs tracking-widest shadow-lg shadow-blue-100"
              onClick={() => addToCart(product)}
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 h-14 bg-gray-500 text-white hover:bg-black  rounded-xl font-bold text-lg shadow-xl shadow-gray-200 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <CreditCard size={20} />
              Buy Now
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product)}
              title={
                activeWishlist ? "Remove from Wishlist" : "Add to Wishlist"
              }
              className={`w-14 h-14 rounded-2xl transition-all duration-300 flex items-center justify-center border-2 ${
                activeWishlist
                  ? "bg-pink-50 border-pink-200 text-pink-600"
                  : "bg-white border-slate-100 text-slate-400 hover:text-pink-600 hover:border-pink-200"
              }`}
            >
              <Heart
                size={24}
                fill={activeWishlist ? "currentColor" : "none"}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-12">
        <ReviewComments />
      </div>

      {/* Similar Products */}
      <div className="mt-20">
        <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-4">
          Similar Products
          <div className="h-1 flex-1 bg-slate-100 rounded-full"></div>
        </h3>
        {similarProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {similarProducts.slice(0, 4).map((item) => (
              <ProductCard key={item.id} productdt={item} />
            ))}
          </div>
        ) : (
          <p className="text-slate-400 font-medium italic">
            No similar products found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default Product;
