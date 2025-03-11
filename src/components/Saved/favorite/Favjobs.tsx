import React, { useState, useEffect } from 'react'
import styles from '../Saved.module.scss'
import { FaBusinessTime, FaRegClock } from "react-icons/fa";
import { BsCalendar3 } from "react-icons/bs";

export const Favjobs = (props: any) => {
  return (
    <>
      <div className={`${styles["savesjobcards"]}`}>
        <div className="row">
          <div className="col-sm-3 col-md-3 col-xl-3 col-6">
            <img
              src={props.items.companyLogo}
              alt={props.items.companyName}
              className={`${styles["imgsect"]}`}
            />
          </div>
          <div className="col-sm-10 col-md-8 col-xl-8 col-12">
            <h4 className={`${styles["jobtitle"]}`}>{props.items.title}</h4>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-12 col-12">
                <h5 className={`${styles["jobcompany"]}`}>
                  {props.items.companyName}
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
                        <p className={`${styles["jobtime"]}`}>Full-time </p>
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
                            props.items.dateJobPosted
                          ).toLocaleDateString()}
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
    </>
  );
};
