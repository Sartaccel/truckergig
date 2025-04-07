import React, { useState, useEffect, createRef, useRef } from "react";
import styles from "./About.module.scss";
import Link from "next/link";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import urls from "../../utilities/AppSettings";
import axios from "axios";
import { Modal, Card } from "react-bootstrap";
import * as IoIcons from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";

const About: React.FC = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [promotions, setPromotions] = useState();

  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      // Add event listener
      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleIntersection = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target); // Stop observing after animation
          }
        });
      };

      const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.7, // Trigger when 70% of the element is visible
      });

      const elements = document.querySelectorAll(`.${styles['slide-right']}, .${styles['slide-left']}`);
      elements.forEach((el) => observer.observe(el));

      return () => {
        elements.forEach((el) => observer.unobserve(el));
      };
    }
  }, []);

  useEffect(() => {
    axios.get(`${urls.baseUrl}summary`).then(function(response) {
      console.log(response.data.data);
      var Ve = response.data.data.promotions;
      if (Ve != null) {
        setPromotions(response.data.data.promotions.videoUrl);
      }
    });
  }, []);

  const size = useWindowSize();

  const newLocal = "section-subtitle";
  return (
    <>
      <Modal
        size="lg"
        className={`${styles["summary-content"]} `}
        show={show}
        onHide={handleClose}
      >
        {/* <IoIcons.IoIosClose
          size="25"
          className={`${styles["summary-close"]} `}
          onClick={handleClose}
        /> */}

        <Modal.Body className={`${styles["popup-body"]} `}>
          <iframe
            width="100%"
            height="100%"
            src={promotions}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          ></iframe>
        </Modal.Body>
      </Modal>
      <div className="row p-2">
        <div className="col">
          {/* <Breadcrumb> */}

          {/* <div>
              {size.width}px / {size.height}px
            </div> */}
          {/* <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>About Us</Breadcrumb.Item>
          </Breadcrumb> */}
        </div>
      </div>

      <div className={`${styles["about-page"]} container pt-0`}>
      <div className={styles.eventHead}>
        <Image
          src="/images/sss.jpg"
          alt="Truck in Logistics"
          layout="fill"
          priority={false} 
          className={styles.eventImage}
        />
        <div className={styles.overlay}>
          <h2 className={styles.title}>ABOUT US</h2>
          <p className={styles.description}>
          Revolutionizing logistics with innovative solutions.
          </p>
        </div>
      </div>
        <div className={`${styles["about-page"]} container pt-5`}>
          <div className="row align-items-center">
            {/* Content Section */}
            <div className={`col-12 col-lg-6 ${styles["fade-in-left"]}`}>
            <div className={styles["section-subtitle"]}>ABOUT US</div>
              <div className={styles["main-title"]}>
                We Make Logistics Seamless
              </div>
              <p
                className={styles["content-para"]}
                style={{ textAlign: "justify" }}
              >
                TruckerGIG is a marketplace platform serving the Supply Chain
                and Logistics industry. We provide managed services through
                professionals, technology, and products to ensure an efficient
                supply chain. Our goal is to streamline operations, enhance
                connectivity, and drive innovation in the logistics sector.
                TruckerGIG maintains a Transportation Resource Management data
                registry with transportation carriers, brokers and facilitates
                integration of data through services offered by vendors
              </p>

              <h5 style={{ color: " #ff8800" }}>
                Key Logistics & Technology Services
              </h5>

              <ul className={styles["services-list"]}>
                <li>
                  <FaCheckCircle className={styles["orange-tick"]} /> Dispatch
                  Service
                </li>
                <li>
                  <FaCheckCircle className={styles["orange-tick"]} />
                  Carrier and Driver onboarding
                </li>
                <li>
                  <FaCheckCircle className={styles["orange-tick"]} /> Telematics
                  Data Services
                </li>
                <li>
                  <FaCheckCircle className={styles["orange-tick"]} />
                  API based integration
                </li>
              </ul>
            </div>

            <div
              className={`${styles["video-section"]} col-12 col-sm-12 col-md-12 col-lg-6 pt-5 mt-5`}
            >
              <div className={`${styles["about-box"]}`}>
                <div className={`${styles["box-overlay"]}`}></div>
           
                {size.width >= 768 ? (
                  <a className={`${styles["videopopup"]}`} onClick={handleShow}>
                    <img src="/images/viedoimg.jpg" alt="video-thumbnail" />
                    <div className={`${styles["sonar-wrapper"]}`}>
                      <div className={`${styles["sonar-emitter"]}`}>
                        <i className={`${styles["ion-arrow-right-b"]}`} />
                        <div className={`${styles["sonar-wave"]}`}></div>
                      </div>
                    </div>
                  </a>
                ) : (
                  <a
                    className={`${styles["videopopup"]}`}
                    href={promotions}
                    target="_blank"
                  >
                    <img
                      src="https://development.truckergig.com/pub/static/frontend/TGIG/webstorev3/en_US/images/about.jpg"
                      alt="video-thumbnail"
                    />
                    <div className={`${styles["sonar-wrapper"]}`}>
                      <div className={`${styles["sonar-emitter"]}`}>
                        <i
                          className={`${styles["ion-arrow-right-b"]}  ${styles["play-icon"]}`}
                        />
                        <div className={`${styles["sonar-wave"]}`}></div>
                      </div>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-sm-12 col-md-6">
              <div className={`${styles["service-subtitle"]}`}>MARKETPLACE</div>
              <div className={`${styles["main-title"]}`}>
                What we <strong>DO?</strong>
              </div>
            </div>
          </div>
          <div className="row">
          <Link href="">
  <div className="row align-items-center my-4 flex-row-reverse">
    <div className={`col-md-6 ${styles['slide-right']}  `}>
      <h5 className={`${styles["service-heading"]}`}>
        Marketplace 
      </h5>
      <p className={`${styles["content-para"]}`}>
      TruckerGig’s Marketplace is a seamless platform connecting shippers, carriers, and brokers worldwide for hassle-free freight movement. With real-time load matching, transparent pricing, and direct shipper access, we ensure efficiency and cost savings across global markets. Our smart search filters and bidding system help carriers find the best-paying loads, while shippers get reliable transport solutions. Integrated telematics and tracking provide end-to-end visibility, ensuring smooth cross-border operations. Whether you're a small fleet or an independent trucker, TruckerGig simplifies freight booking with speed, security, and transparency on a global scale.      </p>
    </div>
    <div className="col-md-6 text-start slide-left shrink-animation shrink-animation-delay-2">
      <img
        className={`${styles["service-icon"]}`}
        src="/images/ma.jpg"
        alt="tech-partner"
        style={{ width: "100%", maxWidth: "400px", height: "auto" }}
      />
    </div>
  </div>
</Link>

<Link href="">
  <div className="row align-items-center my-4">
    <div className={`col-md-6 ${styles['slide-left']}  shrink-animation shrink-animation-delay-3`}>
      <h5 className={`${styles["service-heading"]}`}>
       Driver Service
      </h5>
      <p className={`${styles["content-para"]}`}>
      TruckerGig empowers truck drivers with the tools and support they need to succeed. Our platform offers job listings, easy onboarding, and compliance tracking to simplify driver management. With telematics integration, real-time route assistance, and fuel discounts, we help drivers maximize efficiency and savings. Whether you’re an independent owner-operator or part of a large fleet, TruckerGig provides seamless access to loads, reliable support, and essential resources to keep you moving. Drive smarter, earn more, and stay connected with TruckerGig’s driver-focused solutions.      </p>
    </div>
    <div className="col-md-6 text-end slide-right shrink-animation shrink-animation-delay-4">
      <img
        className={`${styles["service-icon"]}`}
        src="/images/Driver.jpg"
        alt="tech-partner"
        style={{ width: "100%", maxWidth: "370px", height: "auto" }}
      />
    </div>
  </div>
</Link>

<Link href="">
      <div className="row align-items-center my-4 flex-row-reverse">
        <div
          className={`col-md-6 ${styles['slide-right']}  shrink-animation shrink-animation-delay-5 animate-on-scroll`}
        >
          <h5 className={`${styles["service-heading"]}`}>Dispatch Service</h5>
          <p className={`${styles["content-para"]}`}>
            TruckerGig’s Dispatch Service streamlines freight movement by connecting carriers and drivers with the right loads in real time. Our automated load assignment and AI-driven route optimization ensure maximum efficiency and reduced downtime. With 24/7 dispatch support, real-time tracking, and seamless communication, drivers can focus on the road while we handle the logistics. Whether for local, regional, or international hauls, our dispatch system ensures timely deliveries and better earnings. TruckerGig empowers fleets and independent drivers with a smarter, faster, and more reliable dispatching experience globally.
          </p>
        </div>
        <div
          className={`col-md-6 text-start slide-left shrink-animation shrink-animation-delay-6 animate-on-scroll`}
        >
          <img
            className={`${styles["service-icon"]}`}
            src="/images/marketp;lace.png"
            alt="tech-partner"
            style={{ width: "100%", maxWidth: "400px", height: "auto" }}
          />
        </div>
      </div>
    </Link>

          </div>
          <div className="row"></div>
          {/* -------------------------MEMBERS SECTION------------------------- */}
          <div className={`${styles["board-subtitle"]}`}>
            Board of Directors and Strategic Advisors
          </div>
          <div className="row mt-4">
            {/* -----------------member 1---------------- */}
            <div className="col-12 col-sm-6 col-md-4 col-lg-4 p-3 ">
              <div className={`card ${styles.card} d-flex flex-column`}>
                <img
                  className={`card-img-top ${styles["board-image"]}`}
                  src="/images/Charan Shikh.jpg"
                  alt="Charan Shikh"
                />
                <div
                  className={`card-body ${styles["card-body"]} d-flex flex-column justify-content-between`}
                >
                  <p className={`${styles["board-name"]}`}>
                    <b>Dr. Charan Shikh</b>
                  </p>
                  <p className={`${styles["board-text"]}`}>
                    President at Indo-American Chamber of Commerce.
                    Doctorpreneur, philanthropist, speaker, and consultant
                    specializing in healthcare, IT, and international trade.
                  </p>
                </div>
              </div>
            </div>

            {/* ---------------------member 2----------- */}
            <div className="col-12 col-sm-6 col-md-4 col-lg-4 p-3">
              <div className={`card ${styles.card} d-flex flex-column`}>
                <img
                  className={`card-img-top ${styles["board-image"]}`}
                  src="/images/Jim Handoush.jpg"
                  alt="Jim Handoush"
                />
                <div
                  className={`card-body ${styles["card-body"]} d-flex flex-column justify-content-between`}
                >
                  <p className={`${styles["board-name"]}`}>
                    <b>Jim Handoush</b>
                  </p>
                  {/* <p className={`${styles['board-text']}`}>CEO of DexFreight with over 10 years of experience in the logistics industry.</p> */}
                  <p className={`${styles["board-text"]}`}>
                    CEO of DexFreight with 10+ years in logistics. A seasoned
                    executive with expertise in management, operations, finance,
                    and technology-driven industry advancements.
                  </p>
                </div>
              </div>
            </div>

            {/* --------------------member 3---- */}
            <div className="col-12 col-sm-6 col-md-4 col-lg-4 p-3">
              <div className={`card ${styles.card} d-flex flex-column`}>
                <img
                  className={`card-img-top ${styles["board-image"]}`}
                  src="/images/Mahesh Vinayagam.jpg"
                  alt="Mahesh Vinayagam"
                />
                <div
                  className={`card-body ${styles["card-body"]} d-flex flex-column justify-content-between`}
                >
                  <p className={`${styles["board-name"]}`}>
                    <b>Mahesh Vinayagam</b>
                  </p>
                  <p className={`${styles["board-text"]}`}>
                    Entrepreneur and RPA evangelist with 20+ years of experience
                    in technology, business development, and startup growth
                    within financial services and travel industries.
                  </p>
                </div>
              </div>
            </div>

            {/* ----------member 4----------------- */}
            <div className="col-12 col-sm-6 col-md-4 col-lg-4 p-3">
              <div className={`card ${styles.card} d-flex flex-column`}>
                <img
                  className={`card-img-top ${styles["board-image"]}`}
                  src="/images/Jeremy Estep.jpg"
                  alt="Jeremy Estep"
                />
                <div
                  className={`card-body ${styles["card-body"]} d-flex flex-column justify-content-between`}
                >
                  <p className={`${styles["board-name"]}`}>
                    <b>Jeremy Estep</b>
                  </p>
                  <p className={`${styles["board-text"]}`}>
                    Enterprise executive with expertise in SaaS-based supply
                    chain technology, digital transformation, and operational
                    excellence across multiple industries.
                  </p>
                </div>
              </div>
            </div>

            {/* -----------------member 5--------- */}
            <div className="col-12 col-sm-6 col-md-4 col-lg-4 p-3">
              <div className={`card ${styles.card} d-flex flex-column`}>
                <img
                  className={`card-img-top ${styles["board-image"]}`}
                  src="/images/Jonah Carney.jpg"
                  alt="Jonah Carney"
                />
                <div
                  className={`card-body ${styles["card-body"]} d-flex flex-column justify-content-between`}
                >
                  <p className={`${styles["board-name"]}`}>
                    <b>Jonah Carney</b>
                  </p>
                  <p className={`${styles["board-text"]}`}>
                    Sales and negotiation professional with 5+ years of
                    experience and 4+ years specializing in logistics and
                    freight management solutions.
                  </p>
                </div>
              </div>
            </div>

            {/* -----------------member 6-------------------- */}
            <div className="col-12 col-sm-6 col-md-4 col-lg-4 p-3">
              <div className={`card ${styles.card} d-flex flex-column `}>
                <img
                  className={`card-img-top ${styles["board-image"]}`}
                  src="/images/Brad Reinhardt.jpg"
                  alt="Brad Reinhardt"
                />
                <div
                  className={`card-body ${styles["card-body"]} d-flex flex-column justify-content-between`}
                >
                  <p className={`${styles["board-name"]}`}>
                    <b>Brad Reinhardt</b>
                  </p>
                  <p className={`${styles["board-text"]}`}>
                    Logistics and warehouse expert with 15+ years of experience
                    in operations, supply chain management, and
                    distribution strategies.
                  </p>{" "}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default About;
