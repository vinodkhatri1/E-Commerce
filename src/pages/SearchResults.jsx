import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import ProductData from "../Data/ProductData";
import ProductCard from "../component/ProductCard"; // Adjust this path to where your ProductCard is saved

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (query) {
      const lowerQuery = query.toLowerCase();

      const results = ProductData.filter((product) => {
        return (
          product.title.toLowerCase().includes(lowerQuery) ||
          product.category.toLowerCase().includes(lowerQuery) ||
          product.brand.toLowerCase().includes(lowerQuery)
        );
      });

      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Search Header */}
      <div className="mb-8 border-b border-gray-100 pb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Results for <span className="text-blue-600">"{query}"</span>
        </h1>
        <p className="text-gray-500 mt-2">
          We found {filteredProducts.length} products matching your search.
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        /* Grid Layout using your ProductCard */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <div key={item.id} className="h-full">
              <ProductCard productdt={item} />
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No matches found
            </h2>
            <p className="text-gray-500 mb-6">
              Sorry, we couldn't find any products matching "{query}". Try
              checking your spelling or using more general keywords.
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition transform hover:scale-105"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
