import React, { useState, useEffect, createRef, useRef } from "react";
import styles from "./About.module.scss";
import Link from "next/link";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import urls from "../../utilities/AppSettings";
import axios from "axios";
import { Modal, Card } from "react-bootstrap";
import * as IoIcons from "react-icons/io";

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
    axios
      .get(`${urls.baseUrl}summary`)
      .then(function (response) {
        console.log(response.data.data);
        var Ve = (response.data.data.promotions)
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
          <iframe width="100%" height="100%" src={promotions} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"></iframe>

        </Modal.Body>
      </Modal>
      <div className='row p-2'>
        <div className='col'>
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
        <div className={`${styles["about-section"]} row`}>
          <div className="col-12 col-sm-12 col-md-12 col-lg-6">
            <div className={`${styles["section-subtitle"]}`}>ABOUT US</div>
            <div className={`${styles["main-title"]}`}>
              Vision and Mission
            </div>
            <p className={`${styles["content-para"]}`}>
              {/* A Global Marketplace that solves all your trucking problems and driver's needs. At TruckerGIG we aim to change the future of transportation. To accomplish this, we have combined the best of innovative technology with a social community to connect and drive the trucking industry. */}
              TruckerGIG is a marketplace platform serving the needs of the Supply Chain and Logistics industry as a one stop shop. TruckerGIG provides Managed Services through professionals, products, and
              technology to ensure an efficient supply chain.<br />
              The TruckerGIG marketplace supports a growing number of partners involved in moving shipments
              throughout the country, allowing customers to register their products and services for prospective
              clients to easily view and engage.<br />
              TruckerGIG maintains a Transportation Resource Management data registry with transportation
              carriers, brokers and facilitates integration of data through services offered by vendors. Following
              are the four major services offered:
              <li>Dispatch Service</li>
              <li>Carrier and Driver onboarding</li>
              <li>Telematics Data Services</li>
              <li>API based integration</li>
            </p>
          </div>
          <div
            className={`${styles["video-section"]} col-12 col-sm-12 col-md-12 col-lg-6 mt-5 pt-5`}
          >
            <div className={`${styles["about-box"]}`}>
              <div className={`${styles["box-overlay"]}`}></div>
              {/* {size.width >=768?} */}
              {/* <a
                className={`${styles["videopopup"]}`}

                // href={promotions}
                // target="_blank"
                onClick={handleShow}
              > */}
              {size.width >= 768 ? <a
                className={`${styles["videopopup"]}`}
                onClick={handleShow}
              ><img
                  src="https://truckergigpro.s3.us-east-2.amazonaws.com/images/about.jpg"
                  alt="video-thumbnail"
                />
                <div className={`${styles["sonar-wrapper"]}`}>
                  <div className={`${styles["sonar-emitter"]}`}>
                    <i className={`${styles["ion-arrow-right-b"]}`} />
                    <div className={`${styles["sonar-wave"]}`}></div>
                  </div>
                </div>
              </a> : <a
                className={`${styles["videopopup"]}`}
                href={promotions}
                target="_blank"
              ><img
                  src="https://development.truckergig.com/pub/static/frontend/TGIG/webstorev3/en_US/images/about.jpg"
                  alt="video-thumbnail"
                />
                <div className={`${styles["sonar-wrapper"]}`}>
                  <div className={`${styles["sonar-emitter"]}`}>
                    <i className={`${styles["ion-arrow-right-b"]}`} />
                    <div className={`${styles["sonar-wave"]}`}></div>
                  </div>
                </div>
              </a>}

            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6">
            <div className={`${styles["service-subtitle"]}`}>Marketplace</div>
            <div className={`${styles["main-title"]}`}>
              What we <strong>DO?</strong>
            </div>
          </div>
        </div>
        <div className="row">
          <Link href="/marketplace">
            <div className="col- col-sm- col-md-6 col-lg-6">
              <div className={`${styles["service-menu"]}`}>
                <span>
                  <img
                    className={`${styles["service-icon"]}`}
                    src="/images/driver-icon.png"
                    alt="driver-icon"
                  />
                </span>
                <div className={`${styles["service-item"]}`}>
                  <h5 className={`${styles["service-heading"]}`}>DISPATCH</h5>
                  <p className={`${styles["content-para"]}`}>
                    Get your dispatch done with real time scenario of truck &amp;
                    trailers, after hours support and lot more.
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <Link href="/marketplace">
            <div className="col- col-sm- col-md-6 col-lg-6">
              <div className={`${styles["service-menu"]}`}>
                <span>
                  <img
                    className={`${styles["service-icon"]}`}
                    src="/images/shipper-icon.png"
                    alt="shipper-icon"
                  />
                </span>
                <div className={`${styles["service-item"]}`}>
                  <h5 className={`${styles["service-heading"]}`}>FACTORING</h5>
                  <p className={`${styles["content-para"]}`}>
                    Turn your raised invoices to immediate cash with our factoring
                    partners.
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <Link href="/jobs">
            <div className="col- col-sm- col-md-6 col-lg-6">
              <div className={`${styles["service-menu"]}`}>
                <span>
                  <img
                    className={`${styles["service-icon"]}`}
                    src="/images/brokericon.png"
                    alt="broker-icon"
                  />
                </span>
                <div className={`${styles["service-item"]}`}>
                  <h5 className={`${styles["service-heading"]}`}>DRIVER</h5>
                  <p className={`${styles["content-para"]}`}>
                    Find the hot jobs and highly paid jobs for you &amp; find the
                    best people for your jobs.
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <Link href="/marketplace">
            <div className="col- col-sm- col-md-6 col-lg-6">
              <div className={`${styles["service-menu"]}`}>
                <span>
                  <img
                    className={`${styles["service-icon"]}`}
                    src="/images/enter-crm.png"
                    alt="tech-partner"
                  />
                </span>
                <div className={`${styles["service-item"]}`}>
                  <h5 className={`${styles["service-heading"]}`}>

                  Marketplace
                    SERVICES
</h5>
                  <p className={`${styles["content-para"]}`}>
                    We got you all covered. All trucking needs at one place.
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="row">
          <Link href="/marketplace">
            <div className="col- col-sm- col-md-4 col-lg-4">
              <div className={`${styles["service-menu"]}`}>
                <span>
                  <img
                    className={`${styles["service-icon"]}`}
                    src="/images/driver-icon.png"
                    alt="driver-icon"
                  />
                </span>
                <div className={`${styles["service-item"]}`}>
                  <h5 className={`${styles["service-heading"]}`}>DISPATCH</h5>
                  <p className={`${styles["content-para"]}`}>
                  Track your trucks and trailers in real time, get 24/7 support, and manage dispatch easily.
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <Link href="/generalinfo">
            <div className="col- col-sm- col-md-4 col-lg-4">
              <div className={`${styles["service-menu"]}`}>
                <span>
                  <img
                    className={`${styles["service-icon"]}`}
                    src="/images/brokericon.png"
                    alt="broker-icon"
                  />
                </span>
                <div className={`${styles["service-item"]}`}>
                  <h5 className={`${styles["service-heading"]}`}>DRIVER</h5>
                  <p className={`${styles["content-para"]}`}>
                  Find the best people for your jobs.
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <Link href="/marketplace">
            <div className="col- col-sm- col-md-4 col-lg-4">
              <div className={`${styles["service-menu"]}`}>
                <span>
                  <img
                    className={`${styles["service-icon"]}`}
                    src="/images/enter-crm.png"
                    alt="tech-partner"
                  />
                </span>
                <div className={`${styles["service-item"]}`}>
                  <h5 className={`${styles["service-heading"]}`}>
                  Marketplace
                  </h5>
                  <p className={`${styles["content-para"]}`}>
                  We got you all covered. All trucking needs at one place.
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        {/* -------------------------MEMBERS SECTION------------------------- */}
        <div className={`${styles["board-subtitle"]}`}>Board of Directors and Strategic Advisors</div>
<div className="row mt-4" >
  {/* -----------------member 1---------------- */}
  <div className="col-12 col-sm-6 col-md-4 col-lg-4 p-3 ">
    <div className={`card ${styles.card} d-flex flex-column`}>
      <img
        className={`card-img-top ${styles['board-image']}`}
        src="/images/Charan Shikh.jpg"
        alt="Charan Shikh"
      />
      <div className={`card-body ${styles['card-body']} d-flex flex-column justify-content-between`}>
        <p className={`${styles['board-name']}`}><b>Dr. Charan Shikh</b></p>
        {/* <p className={`${styles['board-text']}`}>President at Indo-American Chamber of Commerce.</p> */}
        <p className={`${styles['board-text']}`}>
        President at Indo-American Chamber of Commerce. Doctorpreneur, philanthropist, speaker, and consultant specializing in healthcare, IT, and international trade.
        </p>
      </div>
    </div>
  </div>

  {/* ---------------------member 2----------- */}
  <div className="col-12 col-sm-6 col-md-4 col-lg-4 p-3">
    <div className={`card ${styles.card} d-flex flex-column`}>
      <img
        className={`card-img-top ${styles['board-image']}`}
        src="/images/Jim Handoush.jpg"
        alt="Jim Handoush"
      />
      <div className={`card-body ${styles['card-body']} d-flex flex-column justify-content-between`}>
        <p className={`${styles['board-name']}`}><b>Jim Handoush</b></p>
        {/* <p className={`${styles['board-text']}`}>CEO of DexFreight with over 10 years of experience in the logistics industry.</p> */}
        <p className={`${styles['board-text']}`}>
        CEO of DexFreight with 10+ years in logistics. A seasoned executive with expertise in management, operations, finance, and technology-driven industry advancements.
        </p>
      </div>
    </div>
  </div>

  {/* --------------------member 3---- */}
  <div className="col-12 col-sm-6 col-md-4 col-lg-4 p-3">
    <div className={`card ${styles.card} d-flex flex-column`}>
      <img
        className={`card-img-top ${styles['board-image']}`}
        src="/images/Mahesh Vinayagam.jpg"
        alt="Mahesh Vinayagam"
      />
      <div className={`card-body ${styles['card-body']} d-flex flex-column justify-content-between`}>
        <p className={`${styles['board-name']}`}><b>Mahesh Vinayagam</b></p>
        <p className={`${styles['board-text']}`}>
        Entrepreneur and RPA evangelist with 20+ years of experience in technology, business development, and startup growth within financial services and travel industries.
        </p>
      </div>
    </div>
  </div>

  {/* ----------member 4----------------- */}
  <div className="col-12 col-sm-6 col-md-4 col-lg-4 p-3">
    <div className={`card ${styles.card} d-flex flex-column`}>
      <img
        className={`card-img-top ${styles['board-image']}`}
        src="/images/Jeremy Estep.jpg"
        alt="Jeremy Estep"
      />
      <div className={`card-body ${styles['card-body']} d-flex flex-column justify-content-between`}>
        <p className={`${styles['board-name']}`}><b>Jeremy Estep</b></p>
        <p className={`${styles['board-text']}`}>
        Enterprise executive with expertise in SaaS-based supply chain technology, digital transformation, and operational excellence across multiple industries.
        </p>
      </div>
    </div>
  </div>

  {/* -----------------member 5--------- */}
  <div className="col-12 col-sm-6 col-md-4 col-lg-4 p-3">
    <div className={`card ${styles.card} d-flex flex-column`}>
      <img
        className={`card-img-top ${styles['board-image']}`}
        src="/images/Jonah Carney.jpg"
        alt="Jonah Carney"
      />
      <div className={`card-body ${styles['card-body']} d-flex flex-column justify-content-between`}>
        <p className={`${styles['board-name']}`}><b>Jonah Carney</b></p>
        <p className={`${styles['board-text']}`}>
        Sales and negotiation professional with 5+ years of experience and 4+ years specializing in logistics and freight management solutions.
        </p>
      </div>
    </div>
  </div>

  {/* -----------------member 6-------------------- */}
  <div className="col-12 col-sm-6 col-md-4 col-lg-4 p-3">
    <div className={`card ${styles.card} d-flex flex-column `}>
      <img
        className={`card-img-top ${styles['board-image']}`}
        src="/images/Brad Reinhardt.jpg"
        alt="Brad Reinhardt"
      />
      <div className={`card-body ${styles['card-body']} d-flex flex-column justify-content-between`}>
        <p className={`${styles['board-name']}`}><b>Brad Reinhardt</b></p>
        <p className={`${styles['board-text']}`}>
        Logistics and warehouse expert with 15+ years of experience in operations, supply chain management, and distribution strategies.</p>      </div>
    </div>
  </div>
</div>

{/* -----------------MAPS-------------------- */}
      
      {/* <div className="container-fluid">
        <div className="row">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.2902989781996!2d-84.1728210853004!3d34.062071824660514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5992725955555%3A0x35ee53621f787334!2s11555%20Medlock%20Bridge%20Rd%20Suite%20100%2C%20Johns%20Creek%2C%20GA%2030097%2C%20USA!5e0!3m2!1sen!2sin!4v1658471178075!5m2!1sen!2sin"
            width="100%"
            height="400"
          />
        </div>
      </div> */}
      {/* -----------------MAPS- ENDS-------------------- */}

      {/* -----------------CONTACT-------------------- */}
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6">
            <div className={`${styles["section-subtitle-contact"]}`}>
              CONTACT
            </div>
            <div className={`${styles["main-title"]}`}>
              Send us an <strong>Email</strong>
            </div>
            <div className="form-group">
              <Link href="/contactus">
                <button className={`${styles["click-btn"]}`} type="submit">
                  CLICK HERE
                </button>
              </Link>
            </div>
          </div>

           {/* <div className="col-12 col-sm-12 col-md-6">
            <div className={`${styles["section-subtitle-add"]}`}>Contact Info</div>
            <div className={`${styles["main-title"]}`}>
              Contact <strong>Info</strong>
            </div>
            <div className={`${styles["address-content"]}`}>
              <p className={`${styles["content-para"]}`}>
                Our Professional team is here for you 24/7.
              </p>
            </div>
            <div className="main-address">
              <div className="row">
                <div className={`${styles["left-column"]}`}>
                  <h6>Address:</h6>
                </div>
                <div className={`${styles["right-column"]}`}>
                  <p>11555 Medlock Bridge Road, Suite 100, Johns Creek, GA-30097</p>
                </div>
                <div className="row"></div>
                <div className={`${styles["left-column"]}`}>
                  <h6>Phone:</h6>
                </div>
                <div className={`${styles["right-column"]}`}>
                  <p>(833) 353-7773</p>
                </div>
              </div>
              <div className="row">
                <div className={`${styles["left-column"]}`}>
                  <h6>Email:</h6>
                </div>
                <div className={`${styles["right-column"]}`}>
                  <p>contactus@truckergig.com</p>
                </div>
              </div>
            </div>
          </div>  */}
         </div> 
      </div>
      </div>
    </>
    
  );
};

export default About;
