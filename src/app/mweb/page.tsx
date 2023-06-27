import FibreCampaign from "@/components/FibreCampaign";
import axios from "axios";
import { FC, useState } from "react";

interface pageProps {}

const campaignsURL = process.env.API_URL || "";

const page: FC<pageProps> = async () => {
  const { data } = await axios.get(campaignsURL);

  return (
    <>
      <FibreCampaign campaigns={data.campaigns} />
    </>
  );
};

export default page;
