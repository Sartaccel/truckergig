import React from "react";
import Link from "next/link";
import styles from './Footer.module.scss'; // Ensure SCSS is correctly imported
import 'boxicons/css/boxicons.min.css';

const Footer: React.FC = () => {
  return (
    <div className={`${styles["footer-part"]}`}>
      <section className={`${styles["footer-section"]} pt-10 mt-5`}>
        <div className="container">
          <div className="row">
            {/* Logo and Contact Section */}
            <div className="col-lg-12">
              <div className={`${styles["footer-logo-and-info"]}`}>
                {/* Logo */}
                <div className={`${styles["footer-logo"]}`}>
                  <Link href="/">
                    <a>
                      <img
                        className="logo_image"
                        src="/images/logo_black.png"
                        alt="logo"
                      />
                    </a>
                  </Link>
                </div>
                {/* Address, My Accounts, Other Links, About Us */}
                <div className={`${styles["footer-info"]}`}>
                  <div className={`${styles["footer-contact-info"]}`}>
                    <h2>Address</h2>
  
                    {/* Address */}
                    <div className={`${styles["footer-icons"]}`}>
                      <i className="bx bx-location-plus"></i>
                      <span>11555 Medlock Bridge Road,Suite 100,Johns Creek, GA-30097</span>
                      <br />
                      <span>  </span>
                    </div>
  
                    {/* Phone */}
                    <div className={`${styles["footer-contact-item"]}`}>
                      <i className="bx bx-phone"></i>
                      <span>(833) 353-7773</span>
                    </div>
  
                    {/* Email */}
                    <div className={`${styles["footer-contact-item"]}`}>
                      <i className="bx bx-envelope"></i>
                      <span>contactus@truckergig.com</span>
                    </div>
                  </div>

                  <div className={`${styles["footer-links"]}`}>
                    <div className={`${styles["quick-links"]}`}>
                      <h2>My Accounts</h2>
                      <ul>
                        <Link href="/customerlogin">
                          <li><a href="#">Login</a></li>
                        </Link>
                        <Link href="/generalinfo">
                          <li><a href="#">Driver Register</a></li>
                        </Link>
                        <Link href="/vendor">
                          <li><a href="#">Vendor Register</a></li>
                        </Link>
                      </ul>
                    </div>
                    <div className={`${styles["quick-links"]}`}>
                      <h2>Other Links</h2>
                      <ul>
                        <Link href="/privacypolicy">
                          <li><a href="#">Privacy Policy</a></li>
                        </Link>
                        <Link href="/terms">
                          <li><a href="#">Terms & Conditions</a></li>
                        </Link>
                        <Link href="/contactus">
                          <li><a href="#">Contact Us</a></li>
                        </Link>
                      </ul>
                    </div>
                    <div className={`${styles["quick-links"]}`}>
                      <h2>Resources</h2>
                      <ul>
                        <Link href="/about">
                          <li><a href="#">About Us</a></li>
                        </Link>
                        <Link href="/partners">
                          <li><a href="#">Partners</a></li>
                        </Link>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Proud Members Section */}
          <div className="row">
            <div className="col-lg-12">
              <div className={`${styles["single-footer-widget"]} ${styles["proud-members"]}`}>
                <div className={styles["proud-members-title"]}>
                  <div className={styles["proud-line-left"]}></div>
                  <h2>PROUD MEMBERS OF</h2>
                  <div className={styles["proud-line-right"]}></div>
                </div>
                {/* Proud Member Logos */}
                <div className="row justify-content-center">
                  <div className="col-md-3 d-flex justify-content-center">
                    <img className="h_60" src="/images/ltna.png" alt="logo" />
                  </div>
                  <div className="col-md-3 d-flex justify-content-center">
                    <img className="h_60" src="/images/footer-img-2.png" alt="image" />
                  </div>
                  <div className="col-md-3 d-flex justify-content-center">
                    <img className="h_60" src="/images/bita.png" alt="image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright Section */}
      <div className={`${styles["copyright-area"]} bg-dark ptb-5`}>
        <div className="container">
          <div className={`${styles["copyright-area-content"]}`}>
            <p>© 2025 TruckerGIG. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
