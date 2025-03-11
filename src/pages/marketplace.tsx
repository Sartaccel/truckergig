import Head from "next/head";
import Services from "../sections/service";
export default function Service() {
  return (
    <>
      <Head>
        <title>
          TruckerGIG Connects Transportation Logistics Professionals and
          Organizations
        </title>
        <meta
          name="description"
          content="TruckerGIG is the global marketplace and 'one-stop-shop' to bring all the service providers and vendors servicing the shippers, brokers and transportation carriers. The overall objective is to provide a seamless experience, help to identify the right provider, optimize the costs, improve productivity, efficiency and profitability."
        />
        <meta name="robots" content="nofollow" />
      </Head>
      <div className="main">
        <Services />
      </div>
    </>
  );
}
