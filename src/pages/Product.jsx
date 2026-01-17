import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../component/ProductCard";
import ReviewComments from "../component/ReviewComments";
import Stars from "../component/Stars";
import { ShoppingCart, CreditCard } from "lucide-react";
import ProductImege from "../component/ProductImege";
import ProductData from "../Data/ProductData";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Product = () => {
  const { id } = useParams();
  const { addToCart, openCart } = useCart();

  const product = ProductData.find((p) => p.id === Number(id));
  const [image, setImage] = useState("");
const { isLoggedIn, openLogin } = useAuth();

const handleBuyNow = () => {
    // 3. THE CHECK: Is user logged in?
    if (!isLoggedIn) {
      openLogin(); // If no, open the modal immediately
      return;      // Stop here. Do not add to cart.
    }

    // If yes, proceed normally
    addToCart(product);
    openCart();
  };
  useEffect(() => {
    if (product) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setImage(`/image/${product.category}/${product.image}`);
      // Scroll to top when product changes
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  if (!product)
    return (
      <div className="p-10 text-center text-xl text-red-500">
        Product not found
      </div>
    );

  // Assuming product has multiple images, or reusing same for demo
  const pic = [`/image/${product.category}/${product.image}`];

  const similarProducts = ProductData.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main Product Section */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 border-b border-gray-200 pb-12">
        {/* Left: Images */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <div className="w-full max-w-lg aspect-square bg-white border rounded-xl overflow-hidden mb-4 flex items-center justify-center p-4">
            <img
              className="w-full h-full object-contain"
              src={image}
              alt={product.title}
            />
          </div>
          <ProductImege pic={pic} setImage={setImage} />
        </div>

        {/* Right: Details */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {product.title}
          </h2>

          <div className="flex items-center gap-3 mb-4">
            <Stars rating={product.rating} />
            <span className="text-sm text-gray-500">
              ({product.rating} Rating)
            </span>
          </div>

          <div className="mb-6">
            <p className="text-3xl font-bold text-blue-600">${product.price}</p>
            {product.originalPrice && (
              <p className="flex gap-2 text-sm text-gray-500 mt-1">
                <span className="line-through">${product.originalPrice}</span>
                <span className="font-bold text-green-600">
                  -{product.discountPercent}% Off
                </span>
              </p>
            )}
          </div>

          {/* Specs */}
          <div className="space-y-2 mb-6 text-sm sm:text-base text-gray-700">
            <div className="flex">
              <span className="font-bold w-24">Brand:</span>
              <span>{product.brand}</span>
            </div>
            <div className="flex">
              <span className="font-bold w-24">Category:</span>
              <span className="capitalize">{product.category}</span>
            </div>
            <div className="flex">
              <span className="font-bold w-24">Stock:</span>
              <span
                className={
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="font-bold text-gray-900 mb-2">About the product</h4>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-auto">
            <button
              className="flex-1 h-12 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition flex items-center justify-center gap-2 font-bold"
              onClick={() => addToCart(product)}
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>

          <button
  onClick={handleBuyNow}
  className="flex-1 h-14 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-lg shadow-xl shadow-gray-200 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
>
  <CreditCard size={22} />
  Buy Now
</button>
          </div>
        </div>
      </div>

      {/* Reviews & Similar Products */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reviews taking up 2/3 on desktop, full on mobile */}
        <div className="lg:col-span-4">
          <ReviewComments />
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="mt-16">
        <h1 className="text-2xl font-bold mb-6 border-l-4 border-blue-600 pl-4">
          Similar Products
        </h1>
        {similarProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similarProducts.slice(0, 4).map((item) => (
              <ProductCard key={item.id} productdt={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No similar products found.</p>
        )}
      </div>
    </div>
  );
};

export default Product;
