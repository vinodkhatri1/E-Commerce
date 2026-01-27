import { useState } from "react";
import ProductCard from "../component/ProductCard";
import productData from "../Data/ProductData";

const Products = () => {
  const [sort, setSort] = useState("default");

  const sortedProducts = [...productData].sort((a, b) => {
    if (sort === "asc") return a.price - b.price;
    if (sort === "desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
          All Products
        </h1>

        <div className="flex items-center gap-3">
          <span className="text-gray-600 text-sm font-medium">Sort By:</span>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="asc">Price (Low to High)</option>
            <option value="desc">Price (High to Low)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((item) => (
          <ProductCard key={item.id} productdt={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;
