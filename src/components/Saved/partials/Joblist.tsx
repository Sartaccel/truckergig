import React, { useState, useEffect } from "react";
import styles from '../Saved.module.scss'
import { FaBookmark, FaBusinessTime, FaRegClock } from "react-icons/fa";
import { BsCalendar3 } from "react-icons/bs";

import Image from "next/image";
export const Joblist = (props) => {
  const [activeJob, setactiveJob] = useState("");
  const setcurrentJob = (selectedjob) => {
    props.setcurrentJob(selectedjob);
    setactiveJob(selectedjob.id);
  };

  return (
    <>
      {props.joblistdata.map(function (element, idx) {
        return (
          <div className={element.id === activeJob ? "cardActive" : ""}>
            <div
              className={`${styles["jobcards"]}`}
              onClick={() => {
                setcurrentJob(element);
              }}
            >
              <div className="row">
                <div className="col-sm-3 col-md-3 col-xl-3 col-6">
                  <Image
                    src={element.companyLogo}
                    alt={element.companyName}
                    className={`${styles["imgsec"]}`}
                  />
                </div>
                <div className="col-sm-10 col-md-8 col-xl-8 col-12">
                  <h4 className={`${styles["jobtitle"]}`}>{element.title}</h4>
                  <div className="row">
                    <div className="col-sm-12 col-md-12 col-xl-12 col-12">
                      <h5 className={`${styles["jobcompany"]}`}>
                        {element.companyName}
                      </h5>
                    </div>
                    <div className="col-12">
                      <div className="row">
                        <div className="col-sm-6 col-md-6 col-xl-6 col-6">
                          <div className="row">
                            <div className="col-sm-1 col-md-6 col-xl-2 col-2">
                              <FaBusinessTime />
                            </div>
                            <div className="col-sm-11 col-md-6 col-xl-10 col-10">
                              <p className={`${styles["jobtime"]}`}>
                                Full-time{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-xl-6 col-6">
                          <div className="row">
                            <div className="col-sm-1 col-md-6 col-xl-2 col-2">
                              <BsCalendar3 />
                            </div>
                            <div className="col-sm-11 col-md-6 col-xl-10 col-10">
                              <p className={`${styles["jobtime"]}`}>
                                {new Date(
                                  element.dateJobPosted
                                ).toLocaleDateString()}
                                {/* {element.dateJobPosted} */}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};