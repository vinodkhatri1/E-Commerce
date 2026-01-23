import { useParams } from "react-router-dom";
import ProductCard from "../component/ProductCard";
import ProductData from "../Data/ProductData";

const Category = () => {
  const { category } = useParams();

  const products = ProductData.filter(
    (p) => p.category.toLowerCase() === category?.toLowerCase(),
  );

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 uppercase border-b pb-2">
        {category}
      </h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <ProductCard key={item.id} productdt={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-gray-500 text-lg">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default Category;
