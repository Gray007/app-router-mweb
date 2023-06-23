import FibreCampaign from "@/components/FibreCampaign";
import PromoSelect from '@/components/PromoSelect'
import ToggleButton from "@/components/ToggleButton";
import axios from "axios";
import { FC, useState } from "react";

interface pageProps {}

const campaignsURL =
  "https://apigw.mweb.co.za/prod/baas/proxy/marketing/campaigns/fibre?channels=120&visibility=public";

const page: FC<pageProps> = async () => {
  const { data } = await axios.get(campaignsURL); 

  return (
    <>
      <FibreCampaign campaigns={data.campaigns} />
      {/* <ToggleButton /> */}
    </>
  );
};

export default page;
