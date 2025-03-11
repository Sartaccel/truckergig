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

import GoogleLogin from "../Sociallogins/GoogleLogin";
import FacebookLogin from "../Sociallogins/FacebookLogin";

interface HomeCardProps {
  carddata: any;
}

const Popup: React.FC<HomeCardProps> = ({ carddata }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const [active, setActive] = useState(false);
  const handleClick = (e) => {
    setActive(!active);
  };

  const postData = (e) => {
    alert("email not empty");
  };

  var Address6 = require("ip-address").Address6;
  var address = new Address6("2001:0:ce49:7601:e866:efff:62c3:fffe");
  var teredo = address.inspectTeredo();
  teredo.client4;

  const handleClickContinueasGuest = () => {
    const params = {
      serviceId: carddata.id,
      isGuest: "1",
      ipAddress: teredo.client4,
      browserType: browserName,
    };
    axios

      .post(`${urls.baseUrl}clickouts/add`, params)

      .then(function (response) {
        const data = response.data.headers;
        if (data.statusCode == 200) {
          setlist(data);
        } else {
          alert("error");
        }
      });
    window.open(carddata.externalUrl, "_blank");
  };

  const [list, setlist] = useState([]);

  const Auth = localStorage.getItem("Authorization");

  const setshowpopup = (popupdata) => {
    console.log(popupdata)
    if (popupdata.isExternal == 0  || popupdata.externalUrl === null || popupdata.externalUrl === undefined) {
      router.push({
        pathname: "/getaquote",
        query: { serviceid: popupdata.id, id: popupdata.serviceCategoryId },
      });
    } else if (popupdata.isExternal == 1) {
      if (Auth) {
        const params = {
          serviceId: carddata.id,
          isGuest: "1",
          ipAddress: teredo.client4,
          browserType: browserName,
        };
        axios

          .post(`${urls.baseUrl}clickouts/add`, params)

          .then(function (response) {
            const data = response.data.headers;
            if (data.statusCode == 200) {
              setlist(data);
            } else {
              alert("error");
            }
          });
        window.open(carddata.externalUrl, "_blank");
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
        {carddata.buttonText}
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
          <img
            className={`${styles["popup-logo"]} `}
            src="/images/logo_black.png"
            alt="Truckergiglogo"
          />
          <p className={`${styles["modal-lead"]} `}>
            How do you want to signup?
          </p>
          <div className={` align-center`}>
            <ul className="p-0">
              <li className={`${styles["modal-list"]} `}>
                <a
                  className={`${active ? "active" : ""} `}
                  onClick={handleClick}
                  href="#"
                  data-bs-toggle="collapse"
                >
                  <MdIcons.MdEmail
                    size="25"
                    style={{ color: "rgb(15, 10, 36)" }}
                  />{" "}
                </a>
              </li>
              <li className={`${styles["modal-list"]}`}>
                <FacebookLogin />
              </li>
              <li className={`${styles["modal-list"]}`}>
                <GoogleLogin />
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
