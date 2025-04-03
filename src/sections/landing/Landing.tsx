import React, { useState, useEffect, createRef, useRef } from "react";
import styles from "./Landing.module.scss";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
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
  const [candidates, setCandidates] = useState(0);
  const [jobs, setJobs] = useState("");
  const [carriers, setCarriers] = useState(0);
  const [vendors, setVendors] = useState(0);
  const [greet, setGreet] = useState("");
  const [act, setAct] = useState("");

  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const summaryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    AOS.init({ duration: 1000,
     });
  }, []);
  
  useEffect(() => {
    axios
      .get(`${urls.baseUrl}summary`)
      .then((response) => {
        console.log(response.data.data);

        const actualCandidates = parseNumber(response.data.data.candidates?.in_progress);
        const actualJobs = parseNumber(response.data.data.jobs?.open);
        const actualCarriers = parseNumber(response.data.data.carriers?.active);
        const actualVendors = parseNumber(response.data.data.vendors?.active);

        setJobs(response.data.data.jobs.open);

        setCandidates(actualCandidates);
        setCarriers(actualCarriers);
        setVendors(actualVendors);

        animateNumber(setCandidates, actualCandidates);
        animateNumber(setCarriers, actualCarriers);
        animateNumber(setVendors, actualVendors);

        const Ve = response.data.data.greetings;
        if (Ve?.imagePath) {
          setGreet(Ve.imagePath);
          handleShow();
        } else {
          handleClose();
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.8 } // Trigger when 50% of the section is visible
    );

    if (summaryRef.current) {
      observer.observe(summaryRef.current);
    }

    return () => {
      if (summaryRef.current) {
        observer.unobserve(summaryRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      animateNumber(setCandidates, candidates);
      animateNumber(setCarriers, carriers);
      animateNumber(setVendors, vendors);
    }
  }, [isVisible]);

  const parseNumber = (value: any): number => {
    if (typeof value === "string") {
      return Number(value.replace(/,/g, "")) || 0; // Remove commas and convert to number
    }
    return typeof value === "number" ? value : 0; // Default to 0 if undefined or invalid
  };

  const animateNumber = (setState: React.Dispatch<React.SetStateAction<number>>, actualValue: number) => {
    if (isNaN(actualValue) || actualValue < 0) {
      console.warn("Invalid number received for animation:", actualValue);
      return;
    }

    let start = 0;
    const duration = 2000; // 2 seconds animation
    const increment = Math.ceil(actualValue / (duration / 50));

    const interval = setInterval(() => {
      start += increment;
      setState((prev) => Math.min(start, actualValue));

      if (start >= actualValue) {
        setState(actualValue);
        clearInterval(interval);
      }
    }, 50);
  };

  

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
                  src="../../images/Newslider-03.jpg"
                  alt="first-slide"
                />

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

              </Carousel.Item>
              <Carousel.Item interval={6000}>
                <img
                  className={`${styles["img-width"]} d-block w-100`}
                  src="../../images/home22.jpg"
                  alt="second-slide"
                />

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

              </Carousel.Item>
              <Carousel.Item interval={6000}>
                <img
                  className={`${styles["img-width"]} d-block w-100`}
                  src="../../images/New_Home.jpg"
                  alt="third-slide"
                />

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

              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
 
    <div className="container-fluid service-tab landing-service" data-aos="fade-up">
      <h5 className={styles["section-title"]}>Marketplace</h5>
      <div className="row">

        <div className="col-md-6 col-lg-4 p-0 m-0 d-flex justify-content-center">
          <div className={styles.card}>
            <img className={styles["card-img"]} src="/images/marketplace_1.jpg" alt="dispatch-logo"/>
            <div className={styles.overlay}>
              <h3 className={styles.cardheading}>Dispatch Services</h3>
           </div>

            <div className={styles["inner-card"]}>

            <div className={styles["card-inside"]} style={{ maxWidth: "280px" }}>
            <img
              className={styles["card-Innerimg"]}
              src="/images/dispatch-logo.png"
              alt="dispatch-logo"
              style={{ width: "80px" }}
            />
            <div className={styles["card-body"]}>
              <h4 className={`${styles["service-heading"]}`}>Dispatch Services</h4>
              <p>Get your dispatch done with real-time scenarios of trucks and trailers, after-hours support, and a lot more.</p>
            </div>
          </div>

            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 mb-4 d-flex  p-0 m-0 justify-content-center">
          <div className={styles.card}>
            <img className={styles["card-img"]} src="/images/marketplace_2.jpg" alt="driver-logo" />
            <div className={styles.overlay}>
              <h3 className={styles.cardheading}>Carrier & Driver Onboarding</h3>
           </div>
            <div className={styles["inner-card"]}>
            <div className={styles["card-inside"]} style={{ maxWidth: "280px" }}>
            <img
              className={styles["card-Innerimg"]}
              src="/images/driver-logo.png"
              alt="driver-logo"
              style={{ width: "80px" }}
            />
            <div className={styles["card-body"]}>
              <h4 className={`${styles["service-heading"]}`}>Carrier & Driver Onboarding</h4>
              <p>Customers can get access to our database on a subscription basis.</p>
            </div>
          </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 mb-4 d-flex  p-0 m-0 justify-content-center">
          <div className={styles.card}>
            <img className={styles["card-img"]} src="/images/marketplace_3.jpg" alt="service-logo" />
            <div className={styles.overlay}>
              <h3 className={styles.cardheading}>Marketplace</h3>
           </div>
            <div className={styles["inner-card"]}>
            <div className={styles["card-inside"]} style={{ maxWidth: "280px" }}>
            <img
              className={styles["card-Innerimg"]}
              src="/images/service-logo.png"
              alt="service-logo"
              style={{ width: "80px" }}
            />
            <div className={styles["card-body"]}>
              <h4 className={`${styles["service-heading"]}`}>Marketplace</h4>
              <p>Trucks/Trailers Leasing, Fleet management, API & Integrations, and more.</p>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="container">
  <h5 className={`${styles["section-title"]}`}>Summary</h5>
  <div className="row align-items-center">
    
    <div className="col-12 col-lg-3">
      <div className={`${styles["summary-tab"]}`}>
        <h3>{vendors}+</h3>
        <h5>Vendors Onboarded</h5>
      </div>
      <div className={`${styles["summary-tab"]}`}>
        <h3>{carriers}+</h3>
        <h5>Carriers Connected</h5>
      </div>
      <div className={`${styles["summary-tab"]}`}>
        <h3>{candidates}+</h3>
        <h5>Drivers Onboarded</h5>
      </div>
    </div>

    <div className="col-12 col-lg-4 text-center">
      <img
        src="/images/summary.jpg"
        alt="summary image"
        className={`${styles["summary-image"]}`}
      />
    </div>

    <div className="col-12 col-lg-5">
      <div className={`${styles["summary-feature"]}`}>
        <div className={`${styles["feature-icon"]}`}>
          <i className="bi bi-box-seam"></i>
        </div>
        <div>
          <h5> Vendors Onboarded</h5>
          <p>Expanding business networks with seamless onboarding.</p>
        </div>
      </div>
      <div className={`${styles["summary-feature"]}`}>
        <div className={`${styles["feature-icon"]}`}>
          <i className="bi bi-truck"></i>
        </div>
        <div>
          <h5>Carriers Connected</h5>
          <p>Enhancing freight movement with a vast carrier network.</p>
        </div>
      </div>
      <div className={`${styles["summary-feature"]}`}>
        <div className={`${styles["feature-icon"]}`}>
          <i className="bi bi-person-badge-fill"></i>
        </div>
        <div>
          <h5>Drivers Onboarded</h5>
          <p>Connecting drivers to better jobs and secure earnings.</p>
        </div>
      </div>
    </div>
    
  </div>
</div>


      {/* <div className="container-fluid service-tab">
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
             
              <li>
                <span>Get your dispatch done with real-time scenarios of trucks and trailers, after-hours support, and a lot more.
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
        </div> */}
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
       
       {/* <div className="row landing-service">
          <div className="col-xxl-12 d-flex justify-content-center">
             <Button
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
            </Modal>
          </div>
        </div>  */}
      {/* </div> */}
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

      <div className="container-fluid" data-aos="fade-up" style={{marginTop:"70px"}}>
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
              src="/images/Talent Turbo TP.png"
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
        </Slider>
        </div>
      </div>

      {/* <div className="container-fluid">
        <div className="row">
          <h5 className={`${styles["section-title"]}`}>Located at</h5>
          <iframe width="100%" height="500"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.2902989781996!2d-84.1728210853004!3d34.062071824660514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5992725955555%3A0x35ee53621f787334!2s11555%20Medlock%20Bridge%20Rd%20Suite%20100%2C%20Johns%20Creek%2C%20GA%2030097%2C%20USA!5e0!3m2!1sen!2sin!4v1658471178075!5m2!1sen!2sin"></iframe>
        </div>
      </div> */}


<div className={styles["testimonials-container"]}>
      <h5 className={styles["section-title"]}>Testimonials</h5>
      <div className={styles["review-section"]} data-aos="fade-up">
        <div className={styles.reviewBox}>
          <div className={`${styles.review} ${styles.left}`}>
            <h3 className={styles["review-title"]}>Noah Oliver</h3>
            <p className={styles["review-para"]}>
              Just started using it, it gives you a good idea of the truck route
              but trust your experience more but overall great site.
            </p>
          </div>
          <div className={`${styles.review} ${styles.center}`}>
            <h3 className={styles["review-title"]}>Daniel Alexander</h3>
            <p className={styles["review-para"]}>
              TruckerGIG has made it so easy to find a job. I’m an owner operator
              and It helped me finding my favorite lane. I was able to find the
              address easily.
            </p>
          </div>
          <div className={`${styles.review} ${styles.right}`}>
            <h3 className={styles["review-title"]}>John David</h3>
            <p className={styles["review-para"]}>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </div>
        </div>
      </div>
    </div> 
      <Chatbot></Chatbot>
    </>
  );
};

export default Landing;
