import axios from "axios";
import { test } from "node:test";
import React, { FC, useEffect, useState } from "react";
import { FibreCampaignProps } from "./FibreCampaign";

const campaignsURL =
  "https://apigw.mweb.co.za/prod/baas/proxy/marketing/campaigns/fibre?channels=120&visibility=public";

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
    <div className='flex justify-center'>
      <fieldset className="grid grid-cols-1 gap-2 w-44 sm:gap-4">
        <legend className="sr-only">Campaigns</legend>
        {campaigns.map((promo) => (
          <div key={promo.code}>
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
              className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
            >
              <div className="flex items-center justify-between">
                <p className="text-gray-700">{promo.name}</p>

                <svg
                  className="hidden h-5 w-5 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {/* <p className="mt-1 text-gray-900">£9.99</p> */}
            </label>
          </div>
        ))}
      </fieldset>
    </div>
  );
};

export default PromoSelect;
