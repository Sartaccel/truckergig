import React, { useState, useEffect } from "react";
import { Modal, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Popup.module.scss";
import axios from "axios";
import * as IoIcons from "react-icons/io";
// import * as FcIcons from "react-icons/fc";
// import * as ImIcons from "react-icons/im";
// import * as FaIcons from "react-icons/fa";
// import * as MdIcons from "react-icons/md";
import urls from "../../utilities/AppSettings";
const SummaryPopup: React.FC = () => {
  const [show, setShow] = useState(false);
  const [candidates, setCandidates] = useState("");
  const [jobs, setJobs] = useState("");
  const [carriers, setCarriers] = useState("");
  const [vendors, setVendors] = useState("");
  useEffect(() => {

    axios.get(`${urls.baseUrl}summary`).then(function (response) {

      setCandidates(response.data.data.candidates.in_progress);
      setJobs(response.data.data.jobs.open);
      setCarriers(response.data.data.carriers.active);
      setVendors(response.data.data.vendors.active);
    });
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [active, setActive] = useState(false);
  const handleClick = (e) => {
    setActive(!active);
  };

  return (
    <>
      <button className={`${styles["card-slider-btn"]} `} onClick={handleShow}>
        {" "}
        Learn More
      </button>
      <Modal
        size="lg"
        className={`${styles["summary-content"]} `}
        show={show}
        onHide={handleClose}
      >
        <IoIcons.IoIosClose
          size="25"
          className={`${styles["summary-close"]} `}
          onClick={handleClose}
        />
        <Modal.Title className={`${styles["summary-title"]} `}>
          Greetings from TruckerGIG
        </Modal.Title>
        <Modal.Body>
          <img
            className={`${styles["popup-logo"]} `}
            src="/images/logo_black.png"
            alt="logo"
          />

        </Modal.Body>
      </Modal>
    </>
  );
};
export default SummaryPopup;
