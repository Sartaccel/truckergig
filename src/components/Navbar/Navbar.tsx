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

  const [dropdown, setdropdown] = useState([]);
  const [candidates, setCandidates] = useState("");
  const [jobs, setJobs] = useState("");
  const [carriers, setCarriers] = useState("");
  const [vendors, setVendors] = useState("");

  useEffect(() => {
    // axios
    //   .get(`${urls.baseUrl}services/categories/list`)

    //   .then(function (response) {
    //     const data = response.data.data.map((x: any) => {
    //       return {
    //         label: x.name,
    //         value: x.id,
    //       };
    //     });
    //     setdropdown(data);
    //   });
    axios.get(`${urls.baseUrl}summary`).then(function (response) {
      setCandidates(response.data.data.candidates.in_progress);
      setJobs(response.data.data.jobs.open);
      setCarriers(response.data.data.carriers.active);
      setVendors(response.data.data.vendors.active);
    });
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
    Router.push("/marketplace");
  };

  const myService = () => {
    Router.push("/myservice");
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className={`${styles["navbar-fixed"]} navbarcolor `}
    >
      <Container fluid className={`${styles["navbar-content"]}`}>
        <Navbar.Brand>
          <Link href="/">
            <a className={`${styles["navbar-brand"]} ${styles.logo}`}>
              <img
                className="logo_image"
                src="/images/logo_black.png"
                alt="logo"
              />
            </a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav className="mr-auto">
            <Nav>
              {/* <form className={`${styles["option-group"]} `}>
                <div className="input-group"> */}
              {/* <div className={`${styles["react-select"]} `}>
                    <span className={`${styles["menu-icon"]} `}>
                      <i className="bi-list-ul"></i>
                    </span>&nbsp; */}
              {/* <div
                      className={`${styles["react-select-dropdown"]} test-class react_select_dropdown`}
                    >
                      <Select
                        className={`${styles["dropdown-select"]} `}
                        styles={customStyles}
                        placeholder="Categories"
                        value={selectedOption}
                        onChange={(value, { action }) =>
                          handleChange(
                            value,
                            action,
                            setSelectedOption,
                            "Categories"
                          )
                        }
                        options={dropdown}
                        components={{
                          IndicatorSeparator: () => null,
                        }}
                        isClearable={true}
                      />
                    </div> */}
              {/* </div> */}

              {/* <input
                    type="text"
                    className="form-control col-xs-5"
                    placeholder="Search your need here"
                    value={SearchList}
                    onChange={(event) => setSearchList(event.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="btn btn-secondary"
                  >
                    <i className="bi-search"></i>
                  </button>
                </div>
              </form> */}
            </Nav>
          </Nav>
          <Nav>
            <div className="navbar-nav">
              <Link href="/about">
                <a href="#" className={`nav-link ${router.pathname==="/about" ? "active" : ""}`}>
                  About Us
                </a>
              </Link>
     
              <Link href="/marketplace">
                <a href="#" className={`nav-link ${router.pathname==="/marketplace" ? "active" : ""}`}>
                  Marketplace
                </a>
              </Link>
              <Link href="/events">
                <a href="#" className={`nav-link ${router.pathname==="/events" ? "active" : ""}`}>
                  Events
                </a>
              </Link>
              <Link href="/blognews">
                <a href="#" className={`nav-link ${router.pathname==="/blognews" || router.pathname === "/blognewsdetail" ? "active" : ""}`}>
                  Blog/News
                </a>
              </Link>
              {/* <Dropdown className="margin-fixs">
                  <Dropdown.Toggle
                    split
                    variant="Secondary"
                    id="dropdown-split-basic"
                    className="nav-link"
                  >
                    4PL
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item className="jmr4pl" href="https://www.jmr4pl.com/" target='_blank'>
                      JMRPL
                    </Dropdown.Item>
                    
                  </Dropdown.Menu>
                </Dropdown> */}
              {/* <Link href="/jobs">
                <a href="#" className="nav-link">
                  Jobs
                </a>
              </Link> */}
              {!Ath ? (
                <Dropdown className="margin-fixs">
                  <Dropdown.Toggle
                    split
                    variant="Secondary"
                    id="dropdown-split-basic"
                    className={`nav-link ${router.pathname==="/generalinfo"  || router.pathname==="/vendor"  ? "active" : ""}`}>
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
                <Link href="/customerlogin">
                  <a href="#" className={`nav-link ${router.pathname==="/customerlogin" ? "active" : ""}`}>
                    Login<i className="bi bi-person-fill pl-1"></i>
                  </a>
                </Link>
              ) : (
                <div>
                  <Dropdown className="margin-fixs">
                    <Dropdown.Toggle
                      split
                      variant="Secondary"
                      id="dropdown-split-basic"
                      className="nav-link"
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

              {/* {!Ath ? (
                <Link href="/customerlogin">
                  <a href="#" className="nav-link">
                    <i className="bi bi-person-fill"></i>Login
                  </a>
                </Link>
              ) : (
                <div>
                  <Dropdown className={`${styles["login-name"]} `}>
                    Hi,{Name}
                    <Dropdown.Toggle
                      split
                      variant="Secondary"
                      id="dropdown-split-basic"
                      // className="nav-link"
                    />
                    <Dropdown.Menu>
                      <Dropdown.Item href="" onClick={logout}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )} */}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Topbar;
