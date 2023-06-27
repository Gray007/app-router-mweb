import React, { FC } from "react";
import { Product } from "../FibreCampaign";

interface ProductCardProps extends Product {}

const ProductCard: FC<ProductCardProps> = ({
  subcategory,
  productRate,
  productName,
}) => {
  return (
    <div className="bg-gray-800 rounded-xl h-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform flex flex-col">
      <div className="p-4">
        <h3 className="text-xl font-bold text-white">{productName}</h3>
        <p className="mt-2 text-sm text-gray-300">{subcategory}</p>
      </div>
      <div className="flex-grow"></div>
      <div className="bg-gray-700 p-4 flex justify-between items-center">
        <span className="text-lg font-extrabold text-green-400">
          {`R ${productRate}`}
        </span>
        <a
          href=""
          className="text-blue-400 text-sm font-semibold hover:underline"
        >
          Check Coverage
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
