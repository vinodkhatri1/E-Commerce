import React from "react";

const ProductImege = ({ pic, setImage }) => {
  return (
    <div className="flex">
      {pic.map((item, index) => (
        <img
          className="w-12 cursor-pointer hover:border-2 hover:border-black"
          key={index}
          onClick={() => {
            setImage(item);
          }}
          src={item}
          alt=""
        />
      ))}
    </div>
  );
};

export default ProductImege;
