import { Link } from "react-router-dom";

const CategoriesCard = ({ title }) => {
  return (
    <div className="flex flex-wrap m-2">
      <div className="h-20 w-57 bg-gray-100 flex items-center justify-center">
        <Link to={`/category/${title}`}>
          <p className="hover:text-blue-600 cursor-pointer">{title}</p>
        </Link>
      </div>
    </div>
  );
};

export default CategoriesCard;
