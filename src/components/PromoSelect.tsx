import axios from "axios";
import { test } from "node:test";
import React, { FC, useEffect, useState } from "react";
import { FibreCampaignProps } from "./FibreCampaign";

const campaignsURL = process.env.API_URL || "";

interface PromoSelectProps extends FibreCampaignProps {
  setPromocodesSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

const PromoSelect: FC<PromoSelectProps> = ({
  setPromocodesSelected,
  campaigns,
}) => {
  const [selectedPromoCode, setSelectedPromoCode] = useState(campaigns[0].code);

  const handlePromoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPromoCode(event.target.value);
    setPromocodesSelected(
      campaigns
        .filter((c) => c.code === event.target.value)
        .flatMap((c) => c.promocodes)
    );
  };

  return (
    <div className="w-full p-2 justify-center touch-pan-x overflow-auto">
      <div className="flex flex-nowrap sm:justify-center w-full">
        <fieldset className="flex flex-row gap-2 sm:gap-4">
          <legend className="sr-only">Campaigns</legend>
          {campaigns.map((promo) => (
            <div
              key={promo.code}
              className="flex-shrink-0 flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-blue-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
            >
              <input
                type="radio"
                name="CampaignsOption"
                value={promo.code}
                onChange={handlePromoChange}
                id={promo.code}
                checked={promo.code === selectedPromoCode}
                className="peer hidden [&:checked_+_label_svg]:block"
              />

              <label
                htmlFor={promo.code}
                className="w-full h-full cursor-pointer rounded-full bg-black px-8 py-3 text-sm font-medium hover:bg-transparent shadow-sm peer-checked:bg-transparent"
              >
                <div className="flex items-center justify-between">
                  <p className="text-white">{promo.name}</p>
                </div>
              </label>
            </div>
          ))}
        </fieldset>
      </div>
    </div>
  );
};

export default PromoSelect;
