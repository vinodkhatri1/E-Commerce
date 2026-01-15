import { Link } from "react-router-dom";

const CategoriesCard = ({ title }) => {
  return (
    <div className="w-full p-2">
      <Link to={`/category/${title}`}>
        <div className="h-24 w-full bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200 cursor-pointer border border-gray-200 hover:border-blue-300">
          <p className="font-semibold text-gray-700 capitalize text-lg hover:text-blue-600 transition-colors">
            {title}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default CategoriesCard;