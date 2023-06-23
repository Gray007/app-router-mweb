import Image from "next/image";
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
    <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {providers.map((provider) => (
        <div
          key={provider.name}
          className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
        >
          <div className="flex flex-row items-center gap-1 sm:gap-2 justify-between align-middle">
            <span className="inline-block rounded-lg bg-gray-50 p-3">
              <Image
                src={
                  provider.url ||
                  "https://www.evotel.co.za/wp-content/uploads/2022/06/mweb-1.png"
                }
                alt={provider.name}
                className="provider-image aspect-video"
                width={64}
                height={32}
              />
            </span>
            <h2 className="align-baseline font-bold">{provider.name}</h2>
            <label
              htmlFor={provider.name}
              className="relative h-8 w-14 cursor-pointer"
            >
              <input
                type="checkbox"
                value={provider.name}
                checked={checkedProviders.includes(provider.name)}
                onChange={handleCheckboxChange}
                id={provider.name}
                className="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"
              />

              <span className="absolute inset-y-0 start-0 z-10 m-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-black text-gray-400 transition-all peer-checked:start-6 peer-checked:text-green-600">
                <svg
                  data-unchecked-icon
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>

                <svg
                  data-checked-icon
                  xmlns="http://www.w3.org/2000/svg"
                  className="hidden h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500"></span>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProviderToggle;
