import React, { useState, useEffect } from 'react'
import styles from '../Saved.module.scss'
import { FaBookmark, FaBusinessTime, FaRegClock, FaShareAlt } from "react-icons/fa";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import router from 'next/router';
import SocialShare from '../../SocialShare/SocialShare';
import Link from "next/link";
import { BsCalendar3 } from "react-icons/bs";
import urls from "../../../utilities/AppSettings";

export const JobDescription = ({
  categoryId,
  id,
  companyId,
  companyName,
  description,
  companyLogo,
  location,
  title,
  benefits,
  bonus,
  pay,
  dateJobPosted,
}: any) => {
  const [aplnm, setaplnm] = useState([]);
  const [aplem, setaplem] = useState([]);
  const [aplcm, setaplcm] = useState([]);
  const [tkkn, settkkn] = useState("");

  useEffect(() => {
    if (localStorage) {
      const Authtoken = localStorage.getItem("Authorization");
      const userdetail = localStorage.getItem("user");
      const userdetailnew = userdetail ? JSON.parse(userdetail) : [];
      if (userdetailnew) {
        setaplnm(userdetailnew.firstName ? userdetailnew.firstName : "");
        setaplem(userdetailnew.emailId ? userdetailnew.emailId : "");
        setaplcm(userdetailnew.phone ? userdetailnew.phone : "");
        settkkn(Authtoken);
      }
    }
  });

  const token = tkkn;
  const applicantName = aplnm;
  const applicantEmail = aplem;
  const applicantContactNumber = aplcm;
  const message = "Highly interested in this job";
  const jobId = id;
  const jobparams = {
    categoryId,
    jobId,
    companyId,
    applicantName,
    applicantEmail,
    applicantContactNumber,
    message,
  };

  const applyjob = () => {
    const params = jobparams;
    axios
      .post(`${urls.baseUrl}apply/job`, params)

      .then(function (response) {
        if (response.status === 200) {
          toast.success("Job Applied Sucessfully", {
            theme: "dark",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // router.push("/contactus");
        } else {
          window.location.reload();
          localStorage.clear();
          sessionStorage.clear();
          toast.error("Please Login!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          router.push("/customerlogin");
        }
      })
      .catch(function (error) {
        toast.error("Please Login!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const savejob = () => {
    const params = { jobId: jobId };
    const tokens = token;
    axios

      .post(`${urls.baseUrl}savedjobs/add`, params, {

        headers: {
          Authorization: tokens,
        },
      })
      .then(function (response) {
        if (response.status === 200) {
          toast.success(" 👍🏼 Jobs added successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: "customId",
          });
        } else {
          window.location.reload();
          localStorage.clear();
          sessionStorage.clear();
          router.push("/customerlogin");
        }
      })
      .catch(function (error) {
        window.location.reload();
        localStorage.clear();
        sessionStorage.clear();
        router.push("/customerlogin");
      });
  };

  var Authtoken = "";

  if (typeof window !== "undefined") {
    Authtoken = localStorage.getItem("Authorization");
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        limit={1}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="row">
        <div className="col-sm-6 col-md-6 col-12">
          <h5>{title}</h5>
        </div>
        <div className="col-sm-6 col-md-6 col-12">
          {Authtoken ? (
            <div className="row">
              <div
                className={`${styles["savecnt"]} col-sm-6 col-md-6 col-xl-4 col-6`}
              >
                <div className="row" onClick={savejob}>
                  <div className="col-sm-1 col-md-6 col-xl-1 col-2">
                    <FaBookmark />
                  </div>
                  <div className="col-sm-11 col-md-6 col-xl-8 col-10">
                    <p className={`${styles["jobtime"]}`}>SAVE</p>
                  </div>
                </div>
              </div>

              <div
                className={`${styles["savecnt"]} col-sm-6 col-md-6 col-xl-4 col-6`}
              >
                <SocialShare />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="col-sm-12 col-md-12 col-md-12 col-12">
        <div className={`${styles["jobsidecards"]}`}>
          <div className="col-sm-12 col-xl-12 col-md-12 col-12">
            <div className="row">
              <div className="col-sm-6 col-md-6 col-xl-4 col-12">
                <img
                  src={companyLogo}
                  alt={companyName}
                  className={`${styles["mini"]}`}
                />
              </div>
              <div className="col-sm-6 col-md-6 col-xl-8 col-12">
                <h6 className={`${styles["jobtitle"]}`}>{companyName}</h6>
                <h6>{location}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="col-sm-12 col-md-12 col-md-12 col-12">
        <div className={`${styles["jobapply"]}`}>
          <div className="row">
            <div className="col-sm-4 col-md-4 col-xl-4 col-6">
              <div className="row">
                <div className="col-sm-1 col-md-6 col-xl-2 col-2">
                  <FaBusinessTime />
                </div>
                <div className="col-sm-11 col-md-6 col-xl-10 col-10">
                  <p className={`${styles["jobtime"]}`}>Full-time </p>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-md-4 col-xl-4 col-6">
              <div className="row">
                <div className="col-sm-1 col-md-6 col-xl-2 col-2">
                  <BsCalendar3 />
                </div>
                <div className="col-sm-11 col-md-6 col-xl-10 col-10">
                  <p className={`${styles["jobtime"]}`}>
                    {new Date(dateJobPosted).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className={`${styles["jobdesc"]}`}>
        <h5>Pay: {pay ? pay : "Decent Pay"}</h5>
        <h6>Job Benefits:</h6>
        <p>{benefits ? benefits : "no benefits"}</p>
        <h6>Job Bonus:</h6>
        <p>{bonus ? bonus : "no bonus"}</p>
        <h6>Job Description:</h6>
        <p>{description ? description : "no description"}</p>
      </div>
      <div>
        <Link href="/generalinfo">
          <button className={`${styles["applybtn"]}`}>Apply Now</button>
        </Link>
        {/* <button onClick={applyjob} className={`${styles["applybtn"]}`}>
          Apply Now
        </button> */}
      </div>
    </>
  );
};