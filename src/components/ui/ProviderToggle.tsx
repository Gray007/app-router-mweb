// import Image from "next/image";
import React, { useState, ChangeEvent } from "react";

interface Provider {
  code: string;
  name: string;
  url: string;
}

interface ProviderToggleProps {
  providers: Provider[];
  setCheckedProviders: React.Dispatch<React.SetStateAction<string[]>>;
  checkedProviders: string[];
}

const ProviderToggle: React.FC<ProviderToggleProps> = ({
  providers,
  setCheckedProviders,
  checkedProviders,
}) => {
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setCheckedProviders(
      checked
        ? (prevProviders) => [...prevProviders, value]
        : (prevProviders) =>
            prevProviders.filter((provider) => provider !== value)
    );
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 p-2">
      {providers.map((provider, index) => (
        <div
          key={`${provider.code}_${index}`}
          className="flex flex-col items-center rounded-xl border border-gray-100 p-1 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
        >
          <label
            htmlFor={provider.name}
            className="relative aspect-w-16 aspect-h-10"
          >
            <input
              type="checkbox"
              value={provider.name}
              checked={checkedProviders.includes(provider.name)}
              onChange={handleCheckboxChange}
              id={provider.name}
              className="absolute inset-0 opacity-0 z-10 cursor-pointer"
            />
            <img
              src={provider.url || "/MwebLogo.jpg"}
              alt={provider.name}
              className={`w-28 h-16 object-cover p-2 rounded-xl ${
                checkedProviders.includes(provider.name)
                  ? ""
                  : "filter grayscale"
              } hover:opacity-75 transition-all`}
            />
            <div className="absolute inset-0 flex items-center justify-center hover:cursor-pointer bg-black bg-opacity-90 rounded-xl opacity-0 hover:opacity-100 transition-opacity">
              <h2 className="text-white text-xs font-bold">{provider.name}</h2>
            </div>
          </label>
        </div>
      ))}
    </div>
  );
};

export default ProviderToggle;
