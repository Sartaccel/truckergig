import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import { useRouter } from "next/router";
import Dropdown from "react-bootstrap/Dropdown";
import { Navbar, Container, Nav } from "react-bootstrap";
import urls from "../../utilities/AppSettings";

// ClientOnly wrapper
const ClientOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <>{children}</>;
};

const Topbar: React.FC = () => {
  const router = useRouter();

  // Navbar state
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expanded, setExpanded] = useState(false); // 👈 control collapse menu

  // Auth state
  const [Ath, setAth] = useState(false);
  const [Name, setName] = useState("");

  // Summary counts
  const [candidates, setCandidates] = useState("");
  const [jobs, setJobs] = useState("");
  const [carriers, setCarriers] = useState("");
  const [vendors, setVendors] = useState("");

  const handleAuthChange = () => {
    const Authtoken = localStorage.getItem("Authorization");
    if (Authtoken) {
      setAth(true);
      const use = localStorage.getItem("user");
      const clientName = localStorage.getItem("Clientname");
      if (use) {
        const useset = JSON.parse(use);
        setName(useset.firstName || clientName || "");
      } else {
        setName(clientName || "");
      }
    } else {
      setAth(false);
      setName("");
    }
  };

  useEffect(() => {
    // Detect mobile
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    // Scroll behavior
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 5 && currentScrollY < 150) setHidden(true);
      else if (currentScrollY >= 150) {
        setHidden(false);
        setScrolled(true);
      } else {
        setHidden(false);
        setScrolled(false);
      }

      // 👇 close navbar on scroll
      setExpanded(false);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("authChanged", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    // Fetch summary data
    const fetchSummary = async () => {
      try {
        const response = await fetch(`${urls.baseUrl}/summary`);
        const data = await response.json();
        setCandidates(data.data.candidates.in_progress);
        setJobs(data.data.jobs.open);
        setCarriers(data.data.carriers.active);
        setVendors(data.data.vendors.active);
      } catch (err) {
        console.error("Error fetching summary:", err);
      }
    };
    fetchSummary();

    // Initial auth check
    handleAuthChange();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("authChanged", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  // Logout
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.dispatchEvent(new Event("authChanged"));
    router.push("/");
    setExpanded(false); // close menu after logout
  };

  const myService = () => {
    router.push("/myservice");
    setExpanded(false); // close menu after click
  };

  return (
    <ClientOnly>
      <Navbar
        collapseOnSelect
        expand="lg"
        expanded={expanded}
        onToggle={(isOpen) => setExpanded(isOpen)} // 👈 manual toggle
        className={`${styles[
          isMobile ? "navbar-other" : router.pathname === "/" ? "navbar-fixed" : "navbar-other"
        ]} ${scrolled ? styles["scrolled"] : ""} ${hidden ? styles["hidden"] : ""}`}
      >
        <Container
          fluid
          className={`${styles["navbar-content"]} d-flex align-items-center justify-content-between`}
        >
          <div className="d-flex align-items-center justify-content-between w-100 navbar-header">
            <Navbar.Brand>
              <Link
                href="/"
                className={`${styles["navbar-brand"]} ${styles.logo}`}
                onClick={() => setExpanded(false)}
              >
                <img
                  className="logo_image"
                  src="/images/TruckerGIG_white.png"
                  alt="TruckerGIG Logo"
                />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          </div>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav className="mr-auto"></Nav>
            <Nav>
              <div className="navbar-nav">
                <Link
                  href="/about"
                  className={`nav-link ${styles["navbar-color"]} ${
                    router.pathname === "/about" ? "active" : ""
                  }`}
                  onClick={() => setExpanded(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/marketplace"
                  className={`nav-link ${styles["navbar-color"]} ${
                    router.pathname === "/marketplace" ? "active" : ""
                  }`}
                  onClick={() => setExpanded(false)}
                >
                  Marketplace
                </Link>
                <Link
                  href="/events"
                  className={`nav-link ${styles["navbar-color"]} ${
                    router.pathname === "/events" ? "active" : ""
                  }`}
                  onClick={() => setExpanded(false)}
                >
                  Events
                </Link>
                <Link
                  href="/blognews"
                  className={`nav-link ${styles["navbar-color"]} ${
                    router.pathname === "/blognews" ||
                    router.pathname === "/blognewsdetail"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => setExpanded(false)}
                >
                  Blogs/News
                </Link>

                {!Ath ? (
                  <>
                    <Dropdown className="margin-fixs">
                      <Dropdown.Toggle
                        split
                        variant="Secondary"
                        id="dropdown-split-basic"
                        className={`nav-link ${styles["navbar-color"]}`}
                      >
                        Register
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="/generalinfo">
                          Driver Registration
                        </Dropdown.Item>
                        <Dropdown.Item href="/vendor">
                          Vendor Registration
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    <Link
                      href="/login"
                      className={`${styles.getStartedButton} login-link ${
                        router.pathname === "/login" ? "active" : ""
                      }`}
                      onClick={() => setExpanded(false)}
                    >
                      <span>Login</span>
                      <div className={styles["arrow-circle"]}>
                        <i
                          className={`${styles["arrow-icon"]} bi bi-person-fill pl-1`}
                        ></i>
                      </div>
                    </Link>
                  </>
                ) : (
                  <Dropdown className="margin-fixs" >
                    <Dropdown.Toggle
                      split
                      variant="Secondary"
                      id="dropdown-split-basic"
                      className={`nav-link ${styles["navbar-color"]}`}
                    >
                      Hi, {Name}
                    </Dropdown.Toggle>
                 <Dropdown.Menu>
  <Dropdown.Item
    onClick={() => {
      myService();
      setExpanded(false);
    }}
  >
    My Service
  </Dropdown.Item>
  <Dropdown.Item
    onClick={() => {
      logout();
      setExpanded(false);
    }}
  >
    Logout
  </Dropdown.Item>
</Dropdown.Menu>

                  </Dropdown>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </ClientOnly>
  );
};

export default Topbar;
