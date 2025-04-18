import React, { useState, useEffect } from 'react'
import styles from '../Saved.module.scss'
import { FaBusinessTime, FaRegClock } from "react-icons/fa";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Favjobs } from './Favjobs';
import Router from "next/router";
import { BsCalendar3 } from "react-icons/bs";
import urls from "../../../utilities/AppSettings";

export const Favorite = (props) => {
  
  const [savjobs, setsavjobs] = useState([])

  useEffect(() => {
    const Authtoken = localStorage.getItem("Authorization");
    console.log(Authtoken)

    axios.get(`${urls.baseUrl}savedjobs/list`,

      {
        headers: { Authorization: Authtoken }
      })

      .then(function (response) {

        if (response.status === 200)
         {
          const saved = (response.data.data)
          setsavjobs(saved)
        }
        else {
          window.location.reload();
          window.localStorage.clear();
          window.sessionStorage.clear();
          Router.push("/login");
        }
      })
      .catch(function (error) {
        window.location.reload();
        window.localStorage.clear();
        window.sessionStorage.clear();
        Router.push("/login");
      });

  }, [])


  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} newestOnTop={false}
        closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <div className={`${styles["jobpagecont"]}`}>
          {savjobs.map((x,i) =>{
                        return <Favjobs   key={i} items={x} />
                    })}
        </div>
    </>
  )
}
