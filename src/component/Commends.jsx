import Stars from "./Stars";

const Comments = () => {
  return (
    <div className="mb-4 p-4 bg-gray-50 rounded-lg w-full">
      <div className="flex items-center justify-between mb-2">
        <h5 className="font-bold text-gray-900">atuny0</h5>
        <div className="flex items-center gap-2">
          <span>
            <Stars rating={5} />
          </span>
          <span className="font-medium text-sm text-gray-600">5.0</span>
        </div>
      </div>
      
      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
        The product is nice. I got the delivery on time. I am using it for the
        last four months. My experience with this product is very good.
      </p>
    </div>
  );
};

export default Comments;