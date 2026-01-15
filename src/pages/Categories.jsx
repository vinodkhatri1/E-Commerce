import CategoriesCard from "../component/CategoriesCard";
import ProductData from "../Data/ProductData";

const Categories = () => {
  // Safe check if ProductData exists
  if (!ProductData) return null;

  const categories = [...new Set(ProductData.map((item) => item.category))];

  return (
    <div className="container mx-auto px-4 py-8 min-h-[50vh]">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-600 pl-4">
        All Categories
      </h1>
      
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((title, index) => (
          <CategoriesCard key={index} title={title} />
        ))}
      </div>
    </div>
  );
};

export default Categories;