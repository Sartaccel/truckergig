import React, { useState, useEffect, createRef, useRef } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Popup.module.scss";
import * as IoIcons from "react-icons/io";
import * as FcIcons from "react-icons/fc";
import * as ImIcons from "react-icons/im";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import axios from "axios";
import router from "next/router";
import { browserName } from "react-device-detect";
import urls from "../../utilities/AppSettings";
import Image from "next/image";
import GoogleLogin from "../Sociallogins/GoogleLogin";
import FacebookLogin from "../Sociallogins/FacebookLogin";

interface HomeCardProps {
  carddata: any;
}

const Popup: React.FC<HomeCardProps> = ({ carddata }) => {
  
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(false);
  const [auth, setAuth] = useState<string | null>(null);
  const [list, setlist] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAuth(localStorage.getItem("Authorization"));
    }
  }, []);

  const handleClose = () => setShow(false);

  const handleClick = () => {
    setActive(!active);
  };

  const postData = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.warn("Email cannot be empty");
  };

  const Address6 = require("ip-address").Address6;
  const address = new Address6("2001:0:ce49:7601:e866:efff:62c3:fffe");
  const teredo = address.inspectTeredo();

  const handleClickContinueasGuest = () => {
    const params = {
      serviceId: carddata.id,
      isGuest: "1",
      ipAddress: teredo.client4,
      browserType: browserName,
    };
    axios
      .post(`${urls.baseUrl}clickouts/add`, params)
      .then((response) => {
        const data = response.data.headers;
        if (data.statusCode === 200) {
          setlist(data);
        } else {
          console.warn("Clickout failed:", response.data);
        }
      });

    window.open(carddata.externalUrl, "_blank");
  };

  const setshowpopup = (popupdata: any) => {
    if (popupdata.isExternal === 0 || !popupdata.externalUrl) {
      router.push({
        pathname: "/getaquote",
        query: { serviceid: popupdata.id, id: popupdata.serviceCategoryId },
      });
    } else if (popupdata.isExternal === 1) {
      const auth = localStorage.getItem("Authorization"); // Ensure auth is properly retrieved
  
      if (auth) {
        const params = {
          serviceId: popupdata.id,
          isGuest: "1",
          ipAddress: teredo.client4,
          browserType: browserName,
        };
  
        axios.post(`${urls.baseUrl}clickouts/add`, params)
          .then((response) => {
            const data = response.data.headers;
            if (data.statusCode === 200) {
              setlist(data);
              window.open(popupdata.externalUrl, "_blank"); // Open only after API success
            } else {
              console.warn("Error occurred while processing request.");
            }
          })
          .catch((error) => {
            console.error("API error:", error);
            console.warn("Failed to connect. Please try again.");
          });
  
      } else {
        setShow(true);
      }
    }
  };
  

  return (
    <>
      <button
        className={`${styles["card-slider-btn"]} `}
        onClick={() => {
          setshowpopup(carddata);
        }}
      >
        {/* {carddata.buttonText} */}
         <FaIcons.FaExternalLinkAlt size={20} />
      </button>

      <Modal
        className={`${styles["modal-content"]} `}
        show={show}
        onHide={handleClose}
      >
        <Modal.Body>
          <Modal.Title className={`${styles["modal-title"]} `}>
            Let's get Started.
          </Modal.Title>
          <IoIcons.IoIosClose
            size="25"
            className={`${styles["modal-close"]} `}
            onClick={handleClose}
          />
          <Image
            className={`${styles["popup-logo"]} `}
            src="/images/logo_black.png"
            alt="Truckergiglogo"fill
          />
          <p className={`${styles["modal-lead"]} `}>
            How do you want to signup?
          </p>
          {/* <div className={styles.authButtons}>
  <ul className={styles.buttonList}>
    <li className={styles.buttonItem}>
      <a
        className={styles.iconButton}
        onClick={handleClick}
        href="#"
        data-bs-toggle="collapse"
      >
        <MdIcons.MdEmail size="28" />
      </a>
    </li>
    <li className={styles.buttonItemWide}>
      <div className={styles.googleButton}>
        <GoogleLogin />
      </div>
    </li>
  </ul>
</div> */}
<div className={styles.authSection}>
  <ul className={styles.authList}>
    <li className={styles.authItem}>
      <a
        className={styles.iconWrapper}
        onClick={handleClick}
        href="#"
        data-bs-toggle="collapse"
      >
        <MdIcons.MdEmail size="28" />
        <span>Email</span>
      </a>
    </li>
    <li className={styles.authItem}>
      <div className={styles.googleWrapper}>
        <GoogleLogin />
      </div>
    </li>
  </ul>
</div>
          <div className={`${active ? "show" : "hidden"} mail-login`}>
            <form>
              <input type="text" placeholder="Enter your Email" />
              <button
                type="submit"
                className={`${styles["form-btn"]} `}
                onClick={postData}
              >
                Go
              </button>
            </form>
          </div>
          <div>
            <button
              onClick={() => {
                handleClickContinueasGuest();
                handleClose();
              }}
              className={`${styles["card-modal-btn"]} `}
            >
              Continue as Guest{" "}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default Popup;
