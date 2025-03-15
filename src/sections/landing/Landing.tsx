import React, { useState, useEffect, createRef, useRef } from "react";
import styles from "./Landing.module.scss";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import Slider from "react-slick";
import { Next, Previous } from "../../components/cards/SlickCustomArrows";
import urls from "../../utilities/AppSettings";
import Modal from "react-bootstrap/Modal";
import ModalDialog from "react-bootstrap/ModalDialog";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import Button from "react-bootstrap/Button";
import * as IoIcons from "react-icons/io";
import Chatbot from "../../components/Chatbot/Chatbot";



const Landing: React.FC = () => {
  const [candidates, setCandidates] = useState("");
  const [jobs, setJobs] = useState("");
  const [carriers, setCarriers] = useState("");
  const [vendors, setVendors] = useState("");
  const [greet, setGreet] = useState();
  const [act, setAct] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    axios
      .get(`${urls.baseUrl}summary`)

      .then(function (response) {
        console.log(response.data.data);
        setCandidates(response.data.data.candidates.in_progress);
        setJobs(response.data.data.jobs.open);
        setCarriers(response.data.data.carriers.active);
        setVendors(response.data.data.vendors.active);
        var Ve = (response.data.data.greetings)
        if (Ve != null) {
          setGreet(response.data.data.greetings.imagePath);
          handleShow();
        }
        else if (Ve == null) {
          handleClose();
        }
      });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
        {/* <Modal.Title className={`${styles["summary-title"]} `}>
          Greetings from TruckerGIG
        </Modal.Title> */}
        <Modal.Body>
          <img
            className={`${styles["popup-greet"]} `}
            src={greet}
            alt="logo"
          />

        </Modal.Body>
      </Modal>
      <div className="container-fluid home-slider">
        <div className="row">
          <div className={`${styles["slider"]} col-12`}>
            <Carousel prevLabel=" " nextLabel=" " fade>
              <Carousel.Item interval={6000}>
                <img
                  className={`${styles["img-width"]} d-block w-100`}
                  src="../../images/slider-01.png"
                  alt="first-slide"
                />
                {/* <Carousel.Caption> */}
                <div className={`${styles["inner"]}`}>
                  <h1 className={`${styles["welcome-title"]}`}>
                    Welcome to{" "}
                    <span className={`${styles["truck-title"]}`}>
                      TruckerGIG
                    </span>
                  </h1>
                  <p className={`${styles["truck-para"]}`}>
                    A Global marketplace that brings all your trucking needs in
                    one great platform.
                  </p>

                  <div className={`${styles["get-button"]}`}>
                    <Link href="/marketplace">
                      <a className={`${styles["start-text"]}`}>Get Started</a>
                    </Link>
                  </div>
                </div>
                {/* </Carousel.Caption> */}
              </Carousel.Item>
              <Carousel.Item interval={6000}>
                <img
                  className={`${styles["img-width"]} d-block w-100`}
                  src="../../images/slider-02.jpg"
                  alt="second-slide"
                />
                {/* <Carousel.Caption> */}
                <div className={`${styles["inner"]}`}>
                  <h1 className={`${styles["welcome-title"]}`}>
                    Welcome to{" "}
                    <span className={`${styles["truck-title"]}`}>
                      TruckerGIG
                    </span>
                  </h1>
                  <p className={`${styles["truck-para"]}`}>
                    We want to radically transform the future of transportation
                    at TRUCKERGIG. To accomplish this, we have combined the best
                    of innovative technology with a social community to connect
                    and drive the trucking industry.
                  </p>
                  <div className={`${styles["get-button"]}`}>
                    <Link href="/marketplace">
                      <a className={`${styles["start-text"]}`}>Get Started</a>
                    </Link>
                  </div>
                </div>
                {/* </Carousel.Caption> */}
              </Carousel.Item>
              <Carousel.Item interval={6000}>
                <img
                  className={`${styles["img-width"]} d-block w-100`}
                  src="../../images/slider-03.jpg"
                  alt="third-slide"
                />
                {/* <Carousel.Caption> */}
                <div className={`${styles["inner"]}`}>
                  <h1 className={`${styles["welcome-title"]}`}>
                    Welcome to{" "}
                    <span className={`${styles["truck-title"]}`}>
                      TruckerGIG
                    </span>
                  </h1>
                  <p className={`${styles["truck-para"]}`}>
                    Register today at TRUCKERGIG and Let us manage your work
                    flawlessly and be on top of everything your team is up to.
                  </p>
                  <div className={`${styles["get-button"]}`}>
                    <Link href="/marketplace">
                      <a className={`${styles["start-text"]}`}>Get Started</a>
                    </Link>
                  </div>
                </div>
                {/* </Carousel.Caption> */}
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
      {/* <div className="container">
        <h5 className={`${styles["section-title"]}`}>Summary</h5>
        <div className="row">
          <div className="col-12 col-lg-6">
            <div
              className={`${styles["summary-tab"]} ${styles["leftanime-tab"]}`}
            >
              <h3>{vendors}+</h3>
              <h5>Vendors Onboarded</h5>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div
              className={`${styles["summary-tab"]} ${styles["rightanime-tab"]}`}
            >
              <h3>{carriers}+</h3>
              <h5>Carriers Connected</h5>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-6">
            <div
              className={`${styles["summary-tab"]} ${styles["leftanime-tab"]}`}
            >
              <h3>{jobs}+</h3>
              <h5>Jobs Available</h5>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div
              className={`${styles["summary-tab"]} ${styles["rightanime-tab"]}`}
            >
              <h3>{candidates}+</h3>
              <h5>Drivers Onboarded</h5>
            </div>
          </div>
        </div>
      </div> */}
      <div className="container">
        <h5 className={`${styles["section-title"]}`}>Summary</h5>
        <div className="row">
          <div className="col-12 col-lg-4">
            <div
              className={`${styles["summary-tab"]} ${styles["leftanime-tab"]}`}
            >
              <h3>{vendors}+</h3>
              <h5>Vendors Onboarded</h5>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div
              className={`${styles["summary-tab"]} ${styles["rightanime-tab"]}`}
            >
              <h3>{carriers}+</h3>
              <h5>Carriers Connected</h5>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div
              className={`${styles["summary-tab"]} ${styles["rightanime-tab"]}`}
            >
              <h3>{candidates}+</h3>
              <h5>Drivers Onboarded</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid service-tab">
        <h5 className={`${styles["section-title"]}`}>Marketplace</h5>
        <div className="row landing-service">
          <div className="col-md-12 col-lg-4 d-flex justify-content-center">
            <div className={`${styles["service-container"]}`}>
              <img
                className={`${styles["service-logo"]}`}
                src="/images/dispatch-logo.png"
                alt="dispatch-logo"
              />
            </div>
          </div>

          <div className="col-md-12 col-lg-8">
            <h4 className={`${styles["service-heading"]}`}>Dispatch Services</h4>
            <ul className={`${styles["service-listing"]}`}>
              {/* <li>
                <span>
                  Are you a owner operator or carrier looking for Truck
                  Dispatch.
                </span>
              </li> */}
              <li>
                <span>Get your dispatch done with real-time scenarios of trucks and trailers, after-hours support, and a lot more.
                </span>
              </li>
              {/* <li>
                <span>
                  {" "}
                  We discover the most active loads required for your freight
                  and acquire the best rate available according to the market
                  condition.
                </span>
              </li> */}
            </ul>
          </div>
        </div>
        {/* <div className="row landing-service">
          <div className="col-md-12 col-lg-4 d-flex justify-content-center">
            <div className={`${styles["service-container"]}`}>
              <img
                className={`${styles["service-logo"]}`}
                src="/images/invoice-logo.png"
                alt="factoring-logo"
              />
            </div>
          </div>

          <div className="col-md-12 col-lg-8">
            <h4 className={`${styles["service-heading"]}`}>FACTORING</h4>
            <ul className={`${styles["service-listing"]}`}>
              <li>
                <span>
                  Turn your raised invoices to immediate cash with our factoring partners.
                </span>
              </li>
            </ul>
          </div>
        </div> */}
        <div className="row landing-service">
          <div className="col-md-12 col-lg-4 d-flex justify-content-center">
            <div className={`${styles["service-container"]}`}>
              <img
                className={`${styles["service-logo"]}`}
                src="/images/driver-logo.png"
                alt="driver-logo"
              />
            </div>
          </div>

          <div className="col-md-12 col-lg-8">
            <h4 className={`${styles["service-heading"]}`}>Carrier and Driver Onboarding</h4>
            <ul className={`${styles["service-listing"]}`}>
              <li>
                <span>
                  Customers can get access to our database on a subscription basis.
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="row landing-service">
          <div className="col-md-12 col-lg-4 d-flex justify-content-center">
            <div className={`${styles["service-container"]}`}>
              <img
                className={`${styles["service-logo"]}`}
                src="/images/service-logo.png"
                alt="service-logo"
              />
            </div>
          </div>

          <div className="col-md-12 col-lg-8">
            <h4 className={`${styles["service-heading"]}`}>Marketplace</h4>
            <ul className={`${styles["service-listing"]}`}>
              <li>
                <span>
                  Trucks/Trailers Leasing, Fleet management, TMS/WMS providers, API & Integrations, Factoring,
                  Insurance and much more.
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="row landing-service">
          <div className="col-xxl-12 d-flex justify-content-center">
            {/* <Button
              className={`${styles["explore-button"]}`}
              // variant="primary"
              onClick={handleShow}
            >
              Explore
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Our Services</Modal.Title>
              </Modal.Header>
              <Modal.Body>Our Services Modal Page</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal> */}
          </div>
        </div>
      </div>
      {/* <div className="col- col-sm- col-md-6 col-lg-4">
            <div className={`${styles["service-menu"]}`}>
              <span>
                <img
                  className={`${styles["service-icon"]}`}
                  src="/images/shipper-icon.png"
                  alt="service-icon"
                />
              </span>
              <div className={`${styles["service-item"]}`}>
                <h5 className={`${styles["service-heading"]}`}>Marketplace</h5>
                <p className={`${styles["content-para"]}`}>
                  Click here to shop products, accessories, and services.
                </p>
                <div className={`${styles["more-button"]}`}>
                  <Link href="/servicepage">
                    <a className={`${styles["more-text"]}`}>More</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col- col-sm- col-md-6 col-lg-4">
            <div className={`${styles["service-menu"]}`}>
              <span>
                <img
                  className={`${styles["service-icon"]}`}
                  src="/images/driver-icon.png"
                  alt="driver-icon"
                />
              </span>
              <div className={`${styles["service-item"]}`}>
                <h5 className={`${styles["service-heading"]}`}>DRIVER JOBS</h5>
                <p className={`${styles["content-para"]}`}>
                  Click here to find driver jobs and make yourself a more
                  competitive Driver.
                </p>
                <div className={`${styles["more-button"]}`}>
                  <Link href="/servicepage">
                    <a className={`${styles["more-text"]}`}>More</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col- col-sm- col-md-6 col-lg-4">
            <div className={`${styles["service-menu"]}`}>
              <span>
                <img
                  className={`${styles["service-icon"]}`}
                  src="/images/brokericon.png"
                  alt="vendor-icon"
                />
              </span>
              <div className={`${styles["service-item"]}`}>
                <h5 className={`${styles["service-heading"]}`}>
                  VENDOR REGISTRATION
                </h5>
                <p className={`${styles["content-para"]}`}>
                  Click here to list your products/services on TruckerGIG
                </p>
                <div className={`${styles["more-button"]}`}>
                  <Link href="/servicepage">
                    <a className={`${styles["more-text"]}`}>More</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col- col-sm- col-md-6 col-lg-4">
            <div className={`${styles["service-menu"]}`}>
              <span>
                <img
                  className={`${styles["service-icon"]}`}
                  src="/images/enter-crm.png"
                  alt="tech-partners-icon"
                />
              </span>
              <div className={`${styles["service-item"]}`}>
                <h5 className={`${styles["service-heading"]}`}>
                  TECH PARTNERS
                </h5>
                <p className={`${styles["content-para"]}`}>
                  Contact us for providing ELD integration services to increase
                  the truck visibility of your clients.
                </p>
                <div className={`${styles["more-button"]}`}>
                  <Link href="/servicepage">
                    <a className={`${styles["more-text"]}`}>More</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col- col-sm- col-md-6 col-lg-4">
            <div className={`${styles["service-menu"]}`}>
              <span>
                <img
                  className={`${styles["service-icon"]}`}
                  src="/images/owner-icon.png"
                  alt="owner-icon"
                />
              </span>
              <div className={`${styles["service-item"]}`}>
                <h5 className={`${styles["service-heading"]}`}>
                  OWNER OPERATORS
                </h5>
                <p className={`${styles["content-para"]}`}>
                  Click here to shop products, accessories, and services to make
                  you a more competitive Owner Operator
                </p>
                <div className={`${styles["more-button"]}`}>
                  <Link href="/servicepage">
                    <a className={`${styles["more-text"]}`}>More</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col- col-sm- col-md-6 col-lg-4">
            <div className={`${styles["service-menu"]}`}>
              <span>
                <img
                  className={`${styles["service-icon"]}`}
                  src="/images/carrier-icon.png"
                  alt="carrier-icon"
                />
              </span>
              <div className={`${styles["service-item"]}`}>
                <h5 className={`${styles["service-heading"]}`}>CARRRIERS</h5>
                <p className={`${styles["content-para"]}`}>
                  Click here to shop products, accessories, and services to make
                  you a more competitive Carrier
                </p>
                <div className={`${styles["more-button"]}`}>
                  <Link href="/servicepage">
                    <a className={`${styles["more-text"]}`}>More</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>  */}

      <div className="container-fluid">
        <div className="row partners">
          <h5 className={`${styles["section-title"]}`}>Our Partners</h5>

          <Slider {...settings}>
          <div className={`${styles["partner-tab"]}`}>
              <img
                className={`${styles["service-icon"]}`}
                src="/images/DexFreight TP.png"
                alt="dexfreight-logo"
              />
            </div>
            <div className={`${styles["partner-tab"]}`}>
              <img
                className={`${styles["service-icon"]}`}
              src="/images/Kale Logistics TP.png"
              alt="kale-logo"
            />
          </div>
          <div className={`${styles["partner-tab"]}`}>
            <img
              className={`${styles["service-icon"]}`}
              src="/images/ORT TP.png"
              alt="OTR Solutions-logo"
            />
          </div>
          <div className={`${styles["partner-tab"]}`}>
            <img
              className={`${styles["service-icon"]}`}
              src="/images/qBotica TP.png"
              alt="qbotica-logo"
            />
          </div>

          <div className={`${styles["partner-tab"]}`}>
            <img
              className={`${styles["service-icon"]}`}
              src="/images/Talent turbo TP.png"
              alt="Talent Turbo-logo"
            />
          </div>
          <div className={`${styles["partner-tab"]}`}>
            <img
              className={`${styles["service-icon"]}`}
              src="/images/teamone TP.png"
              alt="Teamone Logistics-logo"
            />
          </div>

          <div className={`${styles["partner-tab"]}`}>
            <img
              className={`${styles["service-icon"]}`}
              src="/images/Trucker cloud TP.png"
              alt="trucker-cloud-logo"
            />
          </div>
          {/* <div className={`${styles["partner-tab"]}`}>
            <img
              className={`${styles["service-icon"]}`}
              src="/images/turbo_sales.jpg"
              alt="turbosales-logo"
            />
          </div> */}
        </Slider>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <h5 className={`${styles["section-title"]}`}>Located at</h5>
          <iframe width="100%" height="500"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.2902989781996!2d-84.1728210853004!3d34.062071824660514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5992725955555%3A0x35ee53621f787334!2s11555%20Medlock%20Bridge%20Rd%20Suite%20100%2C%20Johns%20Creek%2C%20GA%2030097%2C%20USA!5e0!3m2!1sen!2sin!4v1658471178075!5m2!1sen!2sin"></iframe>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <h5 className={`${styles["section-title"]}`}>Testimonials</h5>
          <div className={`${styles["review-section"]} col-xxl-12`}>
            <Carousel fade>
              <Carousel.Item className={`${styles["review"]}`}>
                <div className={`${styles["review-sec"]}`}>
                  <h3 className={`${styles["review-title"]}`}>Noah Oliver</h3>
                  <p className={`${styles["review-para"]}`}>
                    Just started using it, it gives you a good idea of the truck
                    route but trust your experience more but overall great site.
                  </p>
                </div>
              </Carousel.Item>
              <Carousel.Item className={`${styles["review"]}`}>
                <div className={`${styles["review-sec"]}`}>
                  <h3 className={`${styles["review-title"]}`}>
                    Daniel Alexander
                  </h3>
                  <p className={`${styles["review-para"]}`}>
                    TruckerGIG has made it so easy to find a job. I’m an owner
                    operator and It helped me finding my favorite lane. I was
                    able to find the address easily.
                  </p>
                </div>
              </Carousel.Item>
              <Carousel.Item className={`${styles["review"]}`}>
                <div className={`${styles["review-sec"]}`}>
                  <h3 className={`${styles["review-title"]}`}>John David</h3>
                  <p className={`${styles["review-para"]}`}>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </div>
              </Carousel.Item>
            </Carousel>
            {/* <div className={`${styles["section-subtitle-contact"]}`}>
              CONTACT
            </div>
            <div className={`${styles["main-title"]}`}>
              Send Us An <strong>Email</strong>
            </div>
            <div className="form-group">
              <Link href="/contactus">
                <button className={`${styles["click-btn"]}`} type="submit">
                  CLICK HERE
                </button>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
      <Chatbot></Chatbot>
    </>
  );
};

export default Landing;
