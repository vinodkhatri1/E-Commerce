import { useState } from "react";
import ProductCard from "../component/ProductCard";
import productData from "../Data/ProductData";

const Products = () => {
  const [sort, setSort] = useState("default");

  const sortedProducts = [...productData].sort((a, b) => {
    if (sort === "asc") return a.price - b.price;
    if (sort === "desc") return b.price - a.price;
    return 0; // default
  });

  return (
    <div>
      <div className="flex justify-between mx-8 my-4">
        <h1 className="font-semibold mt-0.5">PRODUCTS</h1>

        <select
          className="border-2 rounded-sm w-45 h-8 font-medium p-0.5 text-sm"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="asc">Price (low to high)</option>
          <option value="desc">Price (high to low)</option>
        </select>
      </div>

      <div className="flex flex-wrap m-5">
        {sortedProducts.map((item) => (
          <ProductCard key={item.id} productdt={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;
