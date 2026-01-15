import { useParams } from "react-router-dom";
import ProductCard from "../component/ProductCard";
import ProductData from "../Data/ProductData";

const Category = () => {
  const { category } = useParams();

  // Filter products of this category
  const products = ProductData.filter((p) => p.category === category);

  return (
    <div className="min-h-screen">
      <h1 className="text-xl font-semibold mb-4 m-4">
        {category.toUpperCase()}
      </h1>

      <div className="flex flex-wrap m-5">
        {products.length > 0 ? (
          products.map((item) => <ProductCard key={item.id} productdt={item} />)
        ) : (
          <p className="text-gray-500">No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Category;
