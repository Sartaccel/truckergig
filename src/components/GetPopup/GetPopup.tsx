import React, { useState, useEffect, createRef, useRef } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./GetPopup.module.scss";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import axios from "axios";
import router from "next/router";
import { browserName } from "react-device-detect";
import Link from "next/link";
import GoogleLogin from "../Sociallogins/GoogleLogin";
import FacebookLogin from "../Sociallogins/FacebookLogin";
import urls from "../../utilities/AppSettings";
// import  Getaquote  from "../../sections/Getaquote";

const GetPopup: React.FC = () => {
    const [show, setShow] = useState(false);
    const [popupdata, setpopupdata] = useState<any>();

    const handleClose = () => setShow(false);
    const handleShow = (element) => {
        console.log(element)
        if (element.isExternal === 1) {
            setShow(true);
        }
        else if(element.isExternal === 0){
            //refresh get a quote
            router.push({
                pathname: "/getaquotes",
                query: { serviceid: element.id, id: element.serviceCategoryId },
              });
              return;
            //  window.location.href="/getaquotes/?serviceid="+element.id+"&id="+element.serviceCategoryId
            //   return Getaquote();
              
        
                // axios.get(`${urls.baseUrl}services/related?serviceCategoryId=${params.serviceCategoryId}`)
        
                //     .then(function (response) {
                //         const data = response.data.data;
                //         setquote(data)
                //     })
        }
        else if(element.serviceCategoryId=== undefined){
            // router.push("/service")
            window.location.href="/getaquotes/?serviceid="+element.id+"&id="+element.serviceCategoryId

        }
    }
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
        console.log(popupdata)
        const params = {
            serviceId: popupdata.id,
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
        window.open( popupdata.externalUrl, "_blank");
    };

    const [list, setlist] = useState([]);


    if (typeof window !== "undefined") {
        const Authtoken = localStorage ? localStorage.getItem("Authorization") : "";

    }

    // const Auth = localStorage.getItem("Authorization");


    const [selectedData, setselectedData] = useState();

    const [quote, setquote] = useState([])


    useEffect(() => {
        const params = { "serviceName": "", "serviceCategoryId": router.query.id, "serviceFilterId": 0 };
        axios.post(`${urls.baseUrl}services`, params)

            .then(function (response) {
                const data = response.data.data;
                if (response.status === 200 && data.length) {
                    var check_orders = data.filter(order => (order.id == router.query.serviceid));
                    setselectedData(check_orders[0])
                }
            })


        axios.get(`${urls.baseUrl}services/related?serviceCategoryId=${params.serviceCategoryId}`)

            .then(function (response) {
                const data = response.data.data;
                setquote(data)
            })
    }, [])

    return (
        <>
            {
                quote && quote.map(function (element, idx) {
                    return (
                        <div className={`${styles["quote-image"]} `}>
                            <Link href="" >
                                <a>
                                    <img className={`${styles["getaquote-image"]} `}
                                        src={element.logoPath}
                                        alt={element.serviceName}
                                        onClick={() => {
                                            setpopupdata(element)
                                            handleShow(element);
                                          }}
                                    />
                                </a>
                            </Link>
                        </div>
                    )
                })
            }
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
export default GetPopup;
