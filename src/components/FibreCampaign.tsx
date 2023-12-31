"use client";

import axios from "axios";
import { FC, useEffect, useState } from "react";
import PromoSelect from "./PromoSelect";
import ProviderToggle from "./ui/ProviderToggle";
import Filters from "./ui/Filters";
import ProductCard from "./ui/ProductCard";
import FibreProviders from "./FibreProviders";

export const logoBaseURL = "https://www.mweb.co.za/media/images/providers";

const providerInfo = [
  {
    code: "centurycity",
    name: "Century City Connect",
    url: `${logoBaseURL}/provider-century.png`,
  },
  {
    code: "evotel",
    name: "Evotel",
    url: `${logoBaseURL}/provider-evotel.png`,
  },
  {
    code: "octotel",
    name: "Octotel",
    url: `${logoBaseURL}/provider-octotel.png`,
  },
  {
    code: "vumatel",
    name: "Vumatel",
    url: `${logoBaseURL}/provider-vuma.png`,
  },
  {
    code: "openserve",
    name: "Openserve",
    url: `${logoBaseURL}/provider-openserve.png`,
  },
  {
    code: "frogfoot",
    name: "Frogfoot",
    url: `${logoBaseURL}/provider-frogfoot.png`,
  },
  {
    code: "mfn",
    name: "MFN",
    url: `${logoBaseURL}/provider-metrofibre.png`,
  },
  {
    code: "vodacom",
    name: "Vodacom",
    url: `${logoBaseURL}/provider-vodacom.png`,
  },
  {
    code: "linkafrica",
    name: "Link Africa",
    url: `${logoBaseURL}/provider-linkafrica.png`,
  },
  {
    code: "linklayer",
    name: "Link Layer",
    url: `${logoBaseURL}/provider-link-layer.png`,
  },
  {
    code: "lightstruck",
    name: "Lightstruck",
    url: `${logoBaseURL}/provider-lightstruck.png`,
  },
  {
    code: "mitchells",
    name: "Mitchells Fibre",
    url: `${logoBaseURL}/provider-mitchells.png`,
  },
  {
    code: "vumareach",
    name: "Vuma Reach",
    url: `${logoBaseURL}/provider-vuma.png`,
  },
];

const priceRanges: PriceRange[] = [
  { min: 0, max: 699, label: "R0 - R699" },
  { min: 700, max: 999, label: "R700 - R999" },
  { min: 1000, max: 9999, label: "R1000+" },
];

export interface Product {
  productCode: string;
  productName: string;
  productRate: number;
  subcategory: string;
}

// interface Promo {
//   promoCode: string;
//   products: Product[];
// }

interface PriceRange {
  min: number;
  max: number;
  label: string;
}

export interface FibreCampaignProps {
  campaigns: [
    {
      code: string;
      name: string;
      promocodes: string[];
    }
  ];
}

const baseURL = "https://apigw.mweb.co.za/prod/baas/proxy";

const FibreCampaign: FC<FibreCampaignProps> = ({ campaigns }) => {
  const [promocodesSelected, setPromocodesSelected] = useState(
    campaigns[0].promocodes
  );
  const [summarizedProducts, setSummarizedProducts] = useState([]);
  // const [providers, setProviders] = useState([]);
  const [providersWithInfo, setProvidersWithInfo] = useState([]);
  const [checkedProviders, setCheckedProviders] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

  const getSummarizedProduct = ({
    productCode,
    productName,
    productRate,
    subcategory,
  }: Product) => {
    const provider = subcategory
      .replace("Uncapped", "")
      .replace("Capped", "")
      .trim();
    return { productCode, productName, productRate, provider };
  };

  const getProductsFromPromo = (pc) => {
    const promoCode = pc.promoCode;
    return pc.products.reduce(
      (prods, p: Product) => [...prods, getSummarizedProduct(p)],
      []
    );
  };

  const filterByPriceRanges = (product) => {
    if (selectedPriceRanges.length === 0) {
      return true;
    }

    for (const range of selectedPriceRanges) {
      const price = product.productRate;
      if (price >= range.min && price <= range.max) {
        return true;
      }
    }

    return false;
  };

  useEffect(() => {
    if (promocodesSelected.length !== 0) {
      axios
        .get(
          `${baseURL}/marketing/products/promos/${promocodesSelected.join(
            ","
          )}?sellable_online=true`
        )
        .then((response) => {
          const updatedProducts = response.data.reduce(
            (prods, pc) => [...prods, ...getProductsFromPromo(pc)],
            []
          );

          setSummarizedProducts(updatedProducts);
          const updatedProviders: string[] = [
            ...new Set(updatedProducts.map((p) => p.provider)),
          ];
          // setProviders(updatedProviders);
          setProvidersWithInfo(
            updatedProviders.map(
              (name) =>
                providerInfo.find((p) => p.name === name) ?? {
                  code: "",
                  name,
                  url: "",
                }
            )
          );
          setCheckedProviders([updatedProviders[0] || ""]);
          setSelectedPriceRanges([]);
        });
    }
  }, [promocodesSelected]);

  useEffect(() => {
    const selectedProviderSet = new Set(checkedProviders);
    let filteredProducts = summarizedProducts.filter((p) =>
      selectedProviderSet.has(p.provider)
    );

    filteredProducts =
      selectedPriceRanges.length !== 0
        ? filteredProducts.filter(filterByPriceRanges)
        : filteredProducts;

    filteredProducts = filteredProducts.sort(
      (pa, pb) => pa.productRate - pb.productRate
    );
    setSelectedProducts(filteredProducts);
  }, [selectedPriceRanges, checkedProviders]);

  return (
    <div className="flex flex-col bg-gradient-to-b from-cyan-500 to-cyan-950">
      <section className="w-full mx-auto bg-gray-900 sm:gap-4 text-center text-white">
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:py-16 lg:px-8">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold sm:text-4xl">Fibre products</h2>

            <p className="mt-4 pb-2 sm:pb-4 text-gray-300">
              Select a Fibre infrastructure provider below, browse the products
              available and complete a coverage search
            </p>
          </div>
          <ProviderToggle
            providers={providersWithInfo}
            setCheckedProviders={setCheckedProviders}
            checkedProviders={checkedProviders}
          />
        </div>
      </section>
      <div className="flex flex-col text-center mx-auto sm:rounded-xl bg-black p-2 sm:p-8 sm:my-12">
        <h2 className="text-2xl p-2 sm:pb-4 font-bold sm:text-3xl">Current promotions</h2>
        <PromoSelect
          setPromocodesSelected={setPromocodesSelected}
          campaigns={campaigns}
        />
      </div>

      {/* <div className="bg-hero-pattern bg-cover bg-repeat py-8 px-4 sm:px-6 lg:px-8"> */}
      <div className=" pb-8 px-4 bg-black sm:px-6 lg:px-8 sm:rounded-t-xl">
        <div className="max-w-7xl mx-auto">
          <Filters
            selectedPriceRanges={selectedPriceRanges}
            setSelectedPriceRanges={setSelectedPriceRanges}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {selectedProducts.map((product: Product, index) => (
              <div key={product.productCode + index} className="w-full h-full">
                <ProductCard
                  productCode={product.productCode}
                  subcategory={product.provider}
                  productName={product.productName}
                  productRate={product.productRate}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-4 justify-center"></div>
    </div>
  );
};

export default FibreCampaign;
