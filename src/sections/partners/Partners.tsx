// import React, { useState, useEffect, createRef, useRef } from "react";
// import styles from "./Partners.module.scss";
// import Slider from "react-slick";
// import Breadcrumb from 'react-bootstrap/Breadcrumb'

// const Partners: React.FC = () => {
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 1000,
//     slidesToShow: 6,
//     slidesToScroll: 1,
//     initialSlide: 0,
//     autoplay: true,
//     autoplaySpeed: 1000,
//     responsive: [
//       {
//         breakpoint: 1200,
//         settings: {
//           slidesToShow: 6,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 992,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <>
//      <div className='row p-2'>
//         <div className='col'>
//           {/* <Breadcrumb>
//             <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
//             <Breadcrumb.Item active>Partners</Breadcrumb.Item>
//           </Breadcrumb> */}
//         </div>
//       </div>
//       <div className={`${styles["partners-page"]} container`}>
//         <div className={`row`}>
//           <div className="col-12">
//             <h2 className={`${styles["partner-title"]}`}>Our Partners</h2>
//           </div>
//           <div className={`${styles["about-partner"]}`}>
//             <p>
//             TruckerGIG provides the Largest Transportation Logistics network 
//             with over a million contacts, and we are growing swiftly. Our mission 
//             is to connect Transportation Logistics professionals and organizations 
//             for better productivity and success rate.
//             </p>
//           </div>
//         </div>
//         <div className="partnerpage-slider">
//         <Slider {...settings}>
//             <div className={`${styles["partner-tab"]}`}>
//               <img
//                 className={`${styles["service-icon"]}`}
//                 src="/images/dexfreight-logo.png"
//                 alt="dexfreight-logo"
//               />
//             </div>
//             <div className={`${styles["partner-tab"]}`}>
//               <img
//                 className={`${styles["service-icon"]}`}
//               src="/images/Kale.jpg"
//               alt="kale-logo"
//             />
//           </div>
//           <div className={`${styles["partner-tab"]}`}>
//             <img
//               className={`${styles["service-icon"]}`}
//               src="/images/OTR Solutions.png"
//               alt="OTR Solutions-logo"
//             />
//           </div>
//           <div className={`${styles["partner-tab"]}`}>
//             <img
//               className={`${styles["service-icon"]}`}
//               src="/images/qbotica.jpg"
//               alt="qbotica-logo"
//             />
//           </div>

//           <div className={`${styles["partner-tab"]}`}>
//             <img
//               className={`${styles["service-icon"]}`}
//               src="/images/Talent Turbo.png"
//               alt="Talent Turbo-logo"
//             />
//           </div>
//           <div className={`${styles["partner-tab"]}`}>
//             <img
//               className={`${styles["service-icon"]}`}
//               src="/images/Teamone Logistics.png"
//               alt="Teamone Logistics-logo"
//             />
//           </div>

//           <div className={`${styles["partner-tab"]}`}>
//             <img
//               className={`${styles["service-icon"]}`}
//               src="/images/trucker-cloud.png"
//               alt="trucker-cloud-logo"
//             />
//           </div>
//           {/* <div className={`${styles["partner-tab"]}`}>
//             <img
//               className={`${styles["service-icon"]}`}
//               src="/images/turbo_sales.jpg"
//               alt="turbosales-logo"
//             />
//           </div> */}
//         </Slider>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Partners;
import React from "react";
import styles from "./Partners.module.scss";
import Slider from "react-slick";

const Partners: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "ease-in-out",
    pauseOnHover: false, // Keeps running smoothly
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 5, slidesToScroll: 1 } },
      { breakpoint: 992, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className={`${styles["partners-page"]} container`}>
      <div className="row">
        <div className="col-12">
          <h2 className={styles["partner-title"]}>Our Partners</h2>
        </div>
        <div className={styles["about-partner"]}>
          <p>
            TruckerGIG provides the Largest Transportation Logistics network
            with over a million contacts, and we are growing swiftly. Our
            mission is to connect Transportation Logistics professionals and
            organizations for better productivity and success rate.
          </p>
        </div>
      </div>
      <div className="partnerpage-slider">
        <Slider {...settings}>
          {[
            "/images/dexfreight-logo.png",
            "/images/Kale.jpg",
            "/images/OTR Solutions.png",
            "/images/qbotica.jpg",
            "/images/Talent Turbo.png",
            "/images/Teamone Logistics.png",
            "/images/trucker-cloud.png",
          ].map((src, index) => (
            <div className={styles["partner-tab"]} key={index}>
              <img
                className={styles["service-icon"]}
                src={src}
                alt={`partner-logo-${index}`}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Partners;

