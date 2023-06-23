import React, { FC } from "react";
import { Product } from "../FibreCampaign";

interface ProductCardProps extends Product {}

const ProductCard: FC<ProductCardProps> = ({
  subcategory,
  productRate,
  productName,
  productCode,
}) => {
  return (
    <div
      key={productCode}
      className="rounded-2xl max-w-sm bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 p-1 shadow-xl"
    >
      <a className="block rounded-xl bg-white p-2 sm:p-6 lg:p-8" href="">
        <div>
          <div className="flex justify-between sm:gap-2">
            <h3 className="text-base font-bold text-gray-900 sm:text-xl">
              {productName}
            </h3>
            <span className="rounded-full hidden break-keep sm:contents px-3 py-1.5 text-xs font-extrabold text-green-600">
              {`R${productRate}`}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            {subcategory}{" "}
            <span className="rounded-full sm:hidden bg-green-100 px-3 py-1.5 text-xs font-extrabold text-green-600">
              {`R ${productRate}`}
            </span>
          </p>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;
