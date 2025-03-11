import React, { useState, useEffect } from "react";
import { Modal, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Summary.module.scss";
import axios from "axios";
import * as IoIcons from "react-icons/io";
import urls from "../../utilities/AppSettings";

const Summary: React.FC = () => {
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
      <div className="container">
        <h1 className={`${styles["summary-title"]} `}>
          Summary of{" "}
          <img
            className={`${styles["summary-logo"]} `}
            src="/images/logo_black.png"
            alt="logo"
          />
        </h1>

        <div className="row">
          <div className="col-sm-3">
            <img
              className={`${styles["summary-icon"]} `}
              src="/images/VendorIcon.png"
              alt="logo"
            />
            <h1>{vendors}+ </h1>
            <h4>Vendors</h4>
          </div>
          <div className="col-sm-3">
            <img
              className={`${styles["summary-icon"]} `}
              src="/images/DriverIcon.png"
              alt="logo"
            />
            <h1>{candidates}+ </h1>
            <h4>Drivers</h4>
          </div>
          <div className="col-sm-3">
            <img
              className={`${styles["summary-icon"]} `}
              src="/images/DriverJobIcon.png"
              alt="logo"
            />
            <h1>{jobs}+ </h1>
            <h4>Driver Jobs</h4>
          </div>
          <div className="col-sm-3">
            <img
              className={`${styles["summary-icon"]} `}
              src="/images/CarrierIcon.png"
              alt="logo"
            />
            <h1>{carriers}+ </h1>
            <h4>Carriers</h4>
          </div>
        </div>
      </div>
    </>
  );
};
export default Summary;
