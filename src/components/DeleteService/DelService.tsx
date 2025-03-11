import React, { useState, useEffect, createRef, useRef } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./DelService.module.scss";
import axios from "axios";
import { browserName } from "react-device-detect";
import urls from "../../utilities/AppSettings";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from "next/router";
interface HomeCardProps {
    carddata: any;
}

const Popup: React.FC<HomeCardProps> = ({ carddata }) => {
    const [show, setShow] = useState(false);
    const [source, setsource] = useState("");
    const handleClose = () => setShow(false);
    const [active, setActive] = useState(false);
    const handleClick = (e) => {
        setActive(!active);
    };


    const setshowpopup = (popupdata) => {
        console.log(popupdata)

    };

    const setDelPopup = (popupdata) => {
        console.log(popupdata)
        setShow(true);
        setsource(popupdata.id)
    }

    const setEdit = (popupdata) => {
        console.log(popupdata)
        Router.push({
          pathname: "/editservice",
          query: { serviceid: popupdata.id}
        });
    }

    const onSave = (popupdata) => {
        console.log(popupdata)
        const param = {
            ids: popupdata.id
        }
        const Authtoken = localStorage.getItem("Authorization");
        axios.delete(`${urls.clientsUrl}services/delete`,
            {
                headers: { Authorization: Authtoken },
                data: { id: source }
            }
        ).then(function (response) {
            if (response.status === 200) {
                toast.success('Service Deleted Sucessfully', {
                    theme: "dark", position: "top-right", autoClose: 5000, hideProgressBar: false,
                    closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
                });
                setShow(false);
                setTimeout(() => { window.location.reload(); }, 3000);
            } else {
                toast.error(response.data.headers.message, {
                    theme: "dark", position: "top-right", autoClose: 5000, hideProgressBar: false,
                    closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
                });
            }

        });
    };

    const onClose = () => {
        setShow(false);
    }

    return (
        <>
            <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} newestOnTop={false}
                closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="row">
                <div className="col-6">
                    <i className={`${styles["card-slider-btn"]} bi bi-pencil-fill`} onClick={() => { setEdit(carddata); }}></i>
                </div>
                <div className="col-6">
                    <i className={`${styles["card-slider-btn"]} bi bi-trash`} onClick={() => { setDelPopup(carddata); }}></i>
                </div>
            </div>
            <Modal
                className={`${styles["modal-content"]} `}
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <h5>Delete Confirmation</h5>
                </Modal.Header>
                <Modal.Body>
                    <p className="float-left">Are you sure want to delete this service?</p></Modal.Body>
                <Modal.Footer>
                    <button className={`${styles["card-modal-btn"]} `} onClick={(e) => { onSave(e) }}>Yes</button>
                    <button className={`${styles["card-modal-btn"]} `} onClick={(e) => { onClose() }}>No</button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default Popup;
