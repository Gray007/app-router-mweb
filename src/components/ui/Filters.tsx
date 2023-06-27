import React, { useState } from "react";

interface FiltersProps {
  selectedPriceRanges: PriceRange[];
  setSelectedPriceRanges: React.Dispatch<React.SetStateAction<PriceRange[]>>;
}
interface PriceRange {
  min: number;
  max: number;
  label: string;
}

const priceRanges: PriceRange[] = [
  { min: 0, max: 699, label: "R0 - R699" },
  { min: 700, max: 999, label: "R700 - R999" },
  { min: 1000, max: 9999, label: "R1000+" },
];

const Filters: React.FC<FiltersProps> = ({
  selectedPriceRanges,
  setSelectedPriceRanges,
}) => {
  const handleRangeSelection = (range: PriceRange) => {
    setSelectedPriceRanges((prevSelection: PriceRange[]) => {
      const isSelected = prevSelection.some(
        (selectedRange: PriceRange) => selectedRange.label === range.label
      );
      if (isSelected) {
        return prevSelection.filter(
          (selectedRange: PriceRange) => selectedRange.label !== range.label
        );
      } else {
        return [...prevSelection, range];
      }
    });
  };

  const handleResetSelection = () => {
    setSelectedPriceRanges([]);
  };

  return (
    <div className="flex gap-4 justify-center sm:justify-start p-4">
      <div className="relative">
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-blue-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75">
            <span className="block rounded-lg bg-black px-8 py-3 text-sm font-medium hover:bg-transparent">
              Price
            </span>
          </summary>
          <div className="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2">
            <div className=" w-40 sm:w-96 rounded border border-gray-200 bg-white">
              <header className="flex items-center justify-between p-4">
                <span className="text-sm text-gray-700">
                  {selectedPriceRanges.length} Selected
                </span>
                <button
                  type="button"
                  className="text-sm text-gray-900 underline underline-offset-4"
                  onClick={handleResetSelection}
                >
                  Reset
                </button>
              </header>
              <ul className="space-y-1 border-t border-gray-200 p-4">
                {priceRanges.map((range) => (
                  <li key={range.label}>
                    <label
                      htmlFor={range.label}
                      className="inline-flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id={range.label}
                        className="h-5 w-5 rounded border-gray-300"
                        checked={selectedPriceRanges.some(
                          (selectedRange: PriceRange) =>
                            selectedRange.label === range.label
                        )}
                        onChange={() => handleRangeSelection(range)}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {range.label}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </details>
      </div>
      <summary className="flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-blue-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75">
        <span className="block rounded-lg bg-black px-8 py-3 text-sm font-medium hover:bg-transparent">
          Speed
        </span>
      </summary>
    </div>
  );
};

export default Filters;
