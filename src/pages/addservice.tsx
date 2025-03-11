import Head from "next/head";
import React from "react";
import Addservice from "../sections/AddService/AddService";
const AddServices: React.FC = () => {
  return (
    <>
      <Head>
        <title>TruckerGIG Services</title>
        <meta
          name="description"
          content="TruckerGIG is the global marketplace and 'one-stop-shop' to bring all the service providers and vendors servicing the shippers, brokers and transportation carriers. The overall objective is to provide a seamless experience, help to identify the right provider, optimize the costs, improve productivity, efficiency and profitability."
        />
      </Head>
      <div className="main">
        <Addservice />
      </div>
    </>
  );
};

export default AddServices;
