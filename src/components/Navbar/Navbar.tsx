import React, { useState, useEffect, createRef, useRef } from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import Select from "react-select";
import axios from "axios";
import Router, {useRouter} from "next/router";
import Dropdown from "react-bootstrap/Dropdown";
import { Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav } from "react-bootstrap";
import urls from "../../utilities/AppSettings";
import { Loader } from "../Loader";
import { Spin } from "antd";


const Topbar: React.FC = () => {
  const [active, setActive] = useState(false);
  const handleClick = (e) => {
    setActive(!active);
  };
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#4A4A4A",
      color: "red !important",
      borderStyle: "unset",
    }),
  };

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [dropdown, setdropdown] = useState([]);
  const [candidates, setCandidates] = useState("");
  const [jobs, setJobs] = useState("");
  const [carriers, setCarriers] = useState("");
  const [vendors, setVendors] = useState("");

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  let lastScrollY = 0;

  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
  };

  handleResize(); // Check on first load
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 5 && currentScrollY < 150) {
        setHidden(true);
      } else if (currentScrollY >= 150) {
        setHidden(false);
        setScrolled(true);
      } else {
        setScrolled(false); 
        setHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    axios
      .get(`${urls.baseUrl}summary`)
      .then((response) => {
        setCandidates(response.data.data.candidates.in_progress);
        setJobs(response.data.data.jobs.open);
        setCarriers(response.data.data.carriers.active);
        setVendors(response.data.data.vendors.active);
      })
      .catch((error) => {
        console.error("Error fetching summary data:", error);
      });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [categories, setcategories] = useState([]);
  const [service, setservice] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  // const [SearchList, setSearchList] = useState('')

  const handleChange = (value, action, selectOptionSetter, name) => {
    switch (name) {
      case "Categories":
        if (action == "clear") {
          selectOptionSetter(null);
          Router.push({
            pathname: "/",
          });
        } else {
          selectOptionSetter(value);
          Router.push({
            pathname: "/",
          });
          Router.push({
            pathname: "/marketplaces",
            query: { id: value.value },
          });
        }
        break;

      default:
        break;
    }
  };

  let Ath = false;
  let Name = "";
  if (typeof window !== "undefined") {
    const Authtoken = localStorage ? localStorage.getItem("Authorization") : "";
    if (Authtoken) {
      Ath = true;
      const use = localStorage.getItem("user");
      const clientName = localStorage.getItem("Clientname");
      console.log(localStorage.getItem("Clientname"));
      const useset = JSON.parse(use);
      console.log(useset);
      if (useset) {
        Name = useset.firstName ? useset.firstName : clientName;
      }
    }
  }

  const logout = () => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    Router.push("/");
  };

  const myService = () => {
    Router.push("/myservice");
  };


  return (
    <>
    <Navbar
      collapseOnSelect
      expand="lg"
      className={`${styles[isMobile ? "navbar-other" : router.pathname === "/" ? "navbar-fixed" : "navbar-other"]}
      ${scrolled ? styles["scrolled"] : ""} ${hidden ? styles["hidden"] : ""}`}
    >
      <Container fluid className={`${styles["navbar-content"]} d-flex align-items-center justify-content-between`}>
      <div className="d-flex align-items-center justify-content-between w-100 navbar-header">
        <Navbar.Brand>
          <Link href="/">
            <a className={`${styles["navbar-brand"]} ${styles.logo}`}>
              <img
                className="logo_image"
                src="/images/TruckerGIG_white.png"
                alt="logo"
              />
            </a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </div>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav className="mr-auto">
            {/* <Nav>
             
            </Nav> */}
          </Nav>
          <Nav>
            <div className="navbar-nav">
              <Link href="/about">
                <a href="#" className={`nav-link ${styles["navbar-color"]} ${router.pathname==="/about" ? "active" : ""}`}>
                  About Us
                </a>
              </Link>
     
              <Link href="/marketplace">
                <a href="#" className={`nav-link  ${styles["navbar-color"]} ${router.pathname==="/marketplace" ? "active" : ""}`}>
                  Marketplace
                </a>
              </Link>
              <Link href="/events">
                <a href="#" className={`nav-link  ${styles["navbar-color"]} ${router.pathname==="/events" ? "active" : ""}`}>
                  Events
                </a>
              </Link>
              <Link href="/blognews">
                <a href="#" className={`nav-link  ${styles["navbar-color"]} ${router.pathname==="/blognews" || router.pathname === "/blognewsdetail" ? "active" : ""}`}>
                  Blogs/News
                </a>
              </Link>
              {!Ath ? (
                <Dropdown className="margin-fixs">
                  <Dropdown.Toggle
                    split
                    variant="Secondary"
                    id="dropdown-split-basic"
                    className={`nav-link ${styles["navbar-color"]} ${router.pathname==="/generalinfo"  || router.pathname==="/vendor"  ? "active" : ""}`}>
                    Register
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/generalinfo">
                      Driver Registration
                    </Dropdown.Item>
                    <Dropdown.Item href="/vendor">
                      {" "}
                      Vendor Registration
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                ""
              )}

              {!Ath ? (
            
               <Link href="/login">
                 <a className={`${styles.getStartedButton} login-link ${router.pathname === "/login" ? "active" : ""}`}>
                   <span>Login</span>
                   <div className={styles["arrow-circle"]}>
                     <i className={`${styles["arrow-icon"]} bi bi-person-fill pl-1`}></i>
                   </div>
                 </a>
               </Link>
             
              ) : (
                <div>
                  <Dropdown className="margin-fixs">
                    <Dropdown.Toggle
                      split
                      variant="Secondary"
                      id="dropdown-split-basic"
                      className={`nav-link ${styles["navbar-color"]} ${router.pathname==="/myservice" ? "active" : ""}`}
                    >
                      Hi,{Name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="" onClick={myService}>
                        My Service
                      </Dropdown.Item>
                      <Dropdown.Item href="" onClick={logout}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}

            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};
export default Topbar;
