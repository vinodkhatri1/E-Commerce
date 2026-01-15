import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../component/ProductCard";
import ReviewComments from "../component/ReviewComments";
import Stars from "../component/Stars";
import { ShoppingCart, CreditCard } from "lucide-react";
import ProductImege from "../component/ProductImege";
import ProductData from "../Data/ProductData";
import { useCart } from "../context/CartContext";

const Product = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = ProductData.find((p) => p.id === Number(id));
  const [image, setImage] = useState("");

  useEffect(() => {
    if (product) {
      setImage(`/image/${product.category}/${product.image}`);
    }
  }, [id, product]);

  if (!product) return <p className="p-10 text-xl">Product not found</p>;

  const pic = [`/image/${product.category}/${product.image}`];
  const products = ProductData.filter((p) => p.category === product.category);

  return (
    <div>
      <div className="flex justify-between ml-5 min-h-145 border-b-2 pt-8 border-gray-200">
        <div className="w-2xl">
          <img className="h-80" src={image} alt={product.title} />
          <ProductImege pic={pic} setImage={setImage} />
        </div>

        <div className="w-2xl">
          <h2 className="text-[24px]">{product.title}</h2>

          <div className="flex gap-2">
            <Stars rating={product.rating} />
            <p>{product.rating}</p>
          </div>

          <p className="text-xl text-blue-600">${product.price}</p>
          {product.originalPrice !== null && (
            <p className="flex gap-2 text-sm">
              <span className="line-through">${product.originalPrice}</span>
              <span className="font-bold">-{product.discountPercent}%</span>
            </p>
          )}
          <div className="flex gap-4">
            <span className="font-bold">Brand:</span>
            <span>{product.brand}</span>
          </div>

          <div className="flex gap-4">
            <span className="font-bold">Category:</span>
            <span>{product.category}</span>
          </div>

          <div className="flex gap-4">
            <span className="font-bold">Stock:</span>
            <span>{product.stock}</span>
          </div>

          <h4 className="font-bold mt-4">About the product</h4>
          <p>{product.description}</p>

          <div className="flex gap-2 my-4">
            <button
              className="h-8 w-12 mr-2 px-4 bg-pink-500 text-white rounded hover:bg-pink-800 cursor-pointer"
              onClick={() => addToCart(product)}
            >
              <ShoppingCart size={16} />
            </button>

            <button
              className="h-8 w-12 mr-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-800 cursor-pointer"
              onClick={() => addToCart(product)}
            >
              <CreditCard size={16} />
            </button>
          </div>
        </div>

        <ReviewComments />
      </div>

      <h1 className="ml-5 mt-7 mb-2 text-4xl font-bold">Similar Products</h1>
      <div className="flex flex-wrap justify-between m-3">
        {products.length > 0 ? (
          products
            .slice(0, 4)
            .map((item) => <ProductCard key={item.id} productdt={item} />)
        ) : (
          <p className="text-gray-500">No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Product;
