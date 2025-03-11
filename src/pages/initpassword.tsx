import Head from 'next/head';
import React from "react";
import SetPassword from './../sections/setpassword/SetPassword';

const InitPassword: React.FC = () => {
  return (
    <>
      <Head>
        <title>TruckerGIG SetPassword</title>
        <meta
          name="description"
          content="TruckerGIG is the global marketplace and 'one-stop-shop' to bring all the service providers and vendors servicing the shippers, brokers and transportation carriers. The overall objective is to provide a seamless experience, help to identify the right provider, optimize the costs, improve productivity, efficiency and profitability."
        />
      </Head>
      <div className="main">
        <SetPassword />
      </div>
    </>
  );
};

export default InitPassword;