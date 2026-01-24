import Star from "lucide-react/dist/esm/icons/star";
import StarHalf from "lucide-react/dist/esm/icons/star-half";

const Stars = ({ rating, size = 16 }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        if (rating >= star) {
          return (
            <Star
              key={star}
              size={size}
              className="fill-yellow-400 text-yellow-400"
            />
          );
        } else if (rating >= star - 0.5) {
          return (
            <StarHalf
              key={star}
              size={size}
              className="fill-yellow-400 text-yellow-400"
            />
          );
        } else {
          return (
            <Star
              key={star}
              size={size}
              className="text-gray-200 fill-gray-100"
            />
          );
        }
      })}
    </div>
  );
};
export default Stars;
