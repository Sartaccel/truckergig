import Head from 'next/head'
import LandingPage from "../sections/landing";
export default function Home() {
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

        <meta property="og:image" content="https://truckergigpro.s3.us-east-2.amazonaws.com/logo/share_image.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="1024" />

        <script type="text/javascript" src="../../../script/script.js"></script>
        <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>      </Head>
      <div className="main">
        <LandingPage />
      </div>
    </>
  );
}
