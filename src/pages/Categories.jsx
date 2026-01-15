import CategoriesCard from "../component/CategoriesCard";
import ProductData from "../Data/ProductData";

const Categories = () => {
  const categories = [...new Set(ProductData.map((item) => item.category))];

  return (
    <div className="m-4 min-h-126">
      <h1 className="text-xl text-gray-700 m-2">Categories</h1>
      <div className="flex flex-wrap">
        {categories.map((title, index) => (
          <CategoriesCard key={index} title={title} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
