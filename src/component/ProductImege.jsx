import React from "react";

const ProductImege = ({ pic, setImage }) => {
  if (!pic) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {pic.map((item, index) => (
        <div 
            key={index} 
            className="border-2 border-transparent hover:border-blue-500 rounded-md overflow-hidden cursor-pointer transition p-1"
            onClick={() => setImage(item)}
        >
            <img
            className="w-16 h-16 object-contain"
            src={item}
            alt={`Thumbnail ${index + 1}`}
            />
        </div>
      ))}
    </div>
  );
};

export default ProductImege;